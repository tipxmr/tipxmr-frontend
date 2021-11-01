import { useState, useEffect, useCallback } from "react";
import monerojs from "../libs/monero";
import {
  Spin,
  Modal,
  List,
  Typography,
  Divider,
  Tooltip,
  Row,
  Col,
  Button,
  Switch,
} from "antd";
import { WalletOutlined, InfoCircleOutlined } from "@ant-design/icons";
import "../styles/index.less";

const { Title, Text } = Typography;

const TierInfo = () => {
  const data = [
    <Text type="secondary">
      The Basic model enables you to recieve XMR in livestreams. Great to get
      started.
    </Text>,
    <Text type="secondary">
      The Premium model allows full customization of your donations. Perfect for
      pros.
    </Text>,
  ];
  return (
    <div>
      <List
        size="small"
        header={
          <Title level={4} className="text-center">
            Basic or Premium?
          </Title>
        }
        dataSource={data}
        renderItem={(item) => <List.Item>{item}</List.Item>}
      />
    </div>
  );
};

const IntervalInfo = () => {
  return (
    <div className="text-center">
      <p>Pay for the whole year in advance,</p>
      <p>get one month for free!</p>
    </div>
  );
};

const Payment = () => {
  const [yearly, setYearly] = useState(true);
  const [isPremium, setIsPremium] = useState(true);
  const [amount, setAmount] = useState(0);
  const [qrCode, setQrCode] = useState("");
  const [paymentUri, setPaymentUri] = useState(null);

  const handleInterval = () => {
    setYearly(!yearly);
  };
  const handleTier = () => {
    setIsPremium(!isPremium);
  };

  const handleClick = (e) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
  };

  // For testing
  const [subaddress, setSubaddress] = useState(
    "45ZoRheLkX2H3UjYSFs2wP9yo739nQ7irZA2pX6MQr5FeebkC2n8hABYGQRCcrzJ2AaGbNUyR4EfvanP1G2H5DSrMWi97Sk"
  );

  // Activate the TipXMR wallet and get subaddresses from it
  // useEffect(() => {
  //   if (subaddress === null) {
  //     getSubaddress();
  //   }
  // }, [getSubaddress, subaddress]);

  const createPaymentUri = useCallback(() => {
    return amount > 0
      ? `monero:${subaddress}?tx_amount=${amount}`
      : `monero:${subaddress}`;
  }, [amount, subaddress])
  
  // generete QR Code on subaddress change
  useEffect(() => {
    const uri = createPaymentUri();
    setPaymentUri(uri);
    const generateQrCode = async () => {
      if (subaddress) {
        const qrcode = await monerojs.generateQrCode(uri);
        setQrCode(qrcode);
      }
    };
    generateQrCode();
  }, [subaddress, createPaymentUri]);

  useEffect(() => {
    const basePrice = isPremium ? 0.09 : 0.009;
    const factor = yearly ? 11 : 1;
    setAmount(basePrice * factor);
  }, [yearly, isPremium]);

  return (
    <Row
      justify="center"
      align="middle"
      gutter={[0, 16]}
      className="text-center"
    >
      <Col span={24}>
        Configure your membership for TipXMR{" "}
        <Tooltip title={TierInfo} placement="right">
          <InfoCircleOutlined />
        </Tooltip>
      </Col>

      <Col span={8}>
        <Text>One Month</Text>
      </Col>
      <Col span={6}>
        <Tooltip title={IntervalInfo}>
          <Switch defaultChecked onChange={handleInterval} />
        </Tooltip>
      </Col>
      <Col span={8}>
        <Text>One year</Text>
      </Col>

      <Col span={8}>
        <Text>Basic</Text>
      </Col>
      <Col span={6}>
        <Switch defaultChecked onChange={handleTier} />
      </Col>
      <Col span={8}>
        <Text>Premium</Text>
      </Col>

      <Divider />
      <Col span={24}>
        <img
          src={qrCode}
          alt="qr code"
          preview="false"
          style={{ margin: "0 auto" }}
        />
      </Col>
      <Col span={12}>
        <Button type="secondary">
          <a href={paymentUri} onClick={handleClick}>
            <WalletOutlined /> Pay from desktop wallet
          </a>
        </Button>
      </Col>
      <Col span={12}>
        <Button type="secondary">
          <a href={paymentUri} onClick={handleClick}>
            <WalletOutlined /> Pay from TipXMR wallet
          </a>
        </Button>
      </Col>
      <Divider />
      <Col span={24}>
        <Title level={3}>Total: {amount} XMR</Title>
      </Col>
    </Row>
  );
};

const InvoiceModal = () => {
  const [isPayed, setIsPayed] = useState(false);
  return (
    <Modal
      visible
      centered
      title={<Title level={2}>Invoice</Title>}
      closable={false}
      cancelButtonProps={{ visible: "false" }}
      footer={[
        <Row justify="center">
          <Button
            type="primary"
            disabled={!isPayed}
            icon={!isPayed ? <Spin size="small" /> : null}
            size="large"
          >
            {isPayed ? "Continue" : " Awaiting Payment"}
          </Button>
        </Row>,
      ]}
    >
      <Payment />
    </Modal>
  );
};

export default InvoiceModal;
