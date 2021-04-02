import {
  Button,
  Card,
  Col,
  Input,
  InputNumber,
  Progress,
  Row,
  Statistic,
  Table,
  Typography,
} from "antd";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { SyncStatus } from "../../components";
import { useWalletState } from "../../context/wallet";
import useWalletSynchronisation from "../../hook/useWalletSynchronisation";
import monerojs from "../../libs/monero";
import socketio from "../../libs/socket_streamer";
import { streamerState } from "../../store/atom";
import "../../styles/index.less";
import "./Dashboard.less";

const { Title } = Typography;

const Wallet = () => {
  const columns = [
    {
      title: "Inout",
      dataIndex: "inout",
      key: "inout",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Height",
      dataIndex: "height",
      key: "height",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Confirmations",
      dataIndex: "numConfirmations",
      key: "numConfirmations",
    },
  ];

  const {
    isActive,
    isDone,
    progress,
    start,
    stop,
    balance,
    unlockedBalance,
  } = useWalletSynchronisation();

  const wallet = useWalletState();
  const streamerConfig = useRecoilValue(streamerState);
  const [tableData, setTableData] = useState(null);
  // transaction states
  const [totalTransactions, setTotalTransactions] = useState(0);
  const [transactionCounter, setTransactionCounter] = useState({
    incoming: 0,
    outgoing: 0,
  });
  // withdraw states
  const [isValidAddress, setIsValidAddress] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState(0);
  const [isValidAmount, setIsValidAmount] = useState(false);
  const [withdrawAddress, setWithdrawAddress] = useState(null);

  // start or stop sync
  const handleSync = () => {
    if (isActive) {
      stop();
    } else {
      start();
    }
  };

  const fillTable = async (txs) => {
    // amount, height, date, confirmations, incoming/outgoing
    const data = await txs
      .slice(0)
      .reverse() // because table should show newest tx first
      .map((tx, index) => {
        const { height, timestamp } = tx.state.block.state;
        const { numConfirmations, isIncoming } = tx.state;
        let amount = null;
        let inout = "incoming";
        const date = new Date(timestamp * 1000).toLocaleString();
        if (isIncoming) {
          amount =
            parseFloat(tx.state.incomingTransfers[0].state.amount) /
            Math.pow(10, 12);
          inout = "incoming";
          setTransactionCounter((prevState) => ({
            ...prevState,
            incoming: prevState.incoming + 1,
          }));
        } else {
          amount =
            parseFloat(tx.state.outgoingTransfer.state.amount) /
            Math.pow(10, 12);
          inout = "outgoing";
          setTransactionCounter((prevState) => ({
            ...prevState,
            outgoing: prevState.outgoing + 1,
          }));
        }
        return { inout, amount, height, date, numConfirmations };
      });
    setTableData(data);
  };

  useEffect(() => {
    if (isDone) {
      // get all transactions
      monerojs.getTxs(wallet.wallet).then((txs) => {
        // fill the table with data
        fillTable(txs);
        // Set number of total transactions
        setTotalTransactions(txs.length);
      });
      // set Online status to true
      socketio.emitUpdateOnlineStatus(streamerConfig._id, true);
    } else {
      // set Online status to false
      socketio.emitUpdateOnlineStatus(streamerConfig._id, false);
    }
  }, [isDone, wallet.wallet, streamerConfig._id, unlockedBalance, balance]);

  // Withdraw
  const handleAddressChange = (event) => {
    const withdrawAddress = event.target.value;
    setWithdrawAddress(withdrawAddress);
    setIsValidAddress(monerojs.isValidAddress(withdrawAddress.trim()));
  };

  const handleWithdrawAllButton = () => {
    setWithdrawAmount(unlockedBalance);
    amountValidation(unlockedBalance);
  };

  const handleWithdrawAmountChange = (e) => {
    const amount = parseFloat(e);
    console.log("Amount: ", amount);
    setWithdrawAmount(amount);
    amountValidation(amount);
  };

  const amountValidation = (amount) => {
    if (amount <= 0) {
      setIsValidAmount(false);
      console.error("Withdraw amount is 0 or negative");
    } else if (amount > unlockedBalance) {
      setIsValidAmount(false);
      console.error("Withdraw amount is greater than unlocked balance");
    } else {
      setIsValidAmount(true);
    }
  };

  const withdraw = async () => {
    console.log("Withdraw request");
    console.log("Wallet:", wallet);
    console.log("withdrawAddress:", withdrawAddress);
    console.log("withdrawAmount:", withdrawAmount);
    wallet.wallet
      .getDaemonHeight()
      .then((daemonHeight) => console.log("DeamonHeight:", daemonHeight));
    wallet.wallet
      .getHeight()
      .then((walletHeight) => console.log("WalletHeight:", walletHeight));
    monerojs
      .createTx(wallet.wallet, withdrawAddress, withdrawAmount)
      .then((tx) => {
        if (!(tx instanceof Error)) {
          console.log("Tx created:", tx);
        } else {
          console.error("error with tx:", tx);
        }
      });
  };

  return (
    <div>
      <Row
        justify="center"
        align="middle"
        gutter={[12, 12]}
        className="text-center"
      >
        <Col span={24}>
          <SyncStatus synced={isDone} />
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="🔓 balance"
              value={unlockedBalance}
              precision={5}
              suffix="XMR"
            />
            <Statistic
              title="🔒 balance"
              value={balance}
              precision={5}
              suffix="XMR"
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Incoming Transactions"
              value={transactionCounter.incoming}
            />
            <Statistic
              title="outgoing Transactions"
              value={transactionCounter.outgoing}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Title level={4}>Blockchain Sync</Title>
            <Progress percent={progress} status={isActive} />
            <Button type="primary" onClick={handleSync}>
              {isActive ? "Stop Sync" : "Start Sync"}
            </Button>
          </Card>
        </Col>
        <Col span={24}>
          <Card>
            <Row justify="space-around" align="middle">
              <Col span={24}>
                <Title level={2}>Withdraw funds</Title>
              </Col>

              <Col>
                <p>Amount</p>
                <InputNumber
                  name="withdrawAmount"
                  className="min-width"
                  min={0.00001}
                  max={unlockedBalance}
                  value={withdrawAmount}
                  step={0.001}
                  onChange={handleWithdrawAmountChange}
                />
                <Button type="secondary" onClick={handleWithdrawAllButton}>
                  All
                </Button>
              </Col>

              <Col>
                Destination Address
                <Input
                  name="withdrawAddress"
                  size="large"
                  onChange={handleAddressChange}
                />
              </Col>

              <Button type="primary">Withdraw</Button>
            </Row>
          </Card>
        </Col>

        <Col span={24}>
          <Table columns={columns} dataSource={tableData} />
        </Col>
      </Row>
    </div>
  );
};

Wallet.propTypes = {};

export default Wallet;
