import { useState, useEffect } from "react";
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

const { Title, Text } = Typography;

const TierInfo = () => {
  const data = [
    <Text type="secondary">
      The Basic model will enable you to recieve XMR in livestreams. Great to
      get started.
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
        header={<Title level={4}>Basic or Premium?</Title>}
        dataSource={data}
        renderItem={(item) => <List.Item>{item}</List.Item>}
      />
    </div>
  );
};

const IntervalInfo = () => {
  return <div>Pay for the whole year in advance, get one month for free!</div>;
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

  const createPaymentUri = () => {
    let uri;
    if (amount > 0) {
      uri = "monero:" + subaddress + "?tx_amount=" + amount;
    } else {
      uri = "monero:" + subaddress;
    }
    setPaymentUri(uri);
    return uri;
  };

  // generete QR Code on subaddress change
  useEffect(() => {
    const paymentUri = createPaymentUri();
    const generateQrCode = async () => {
      if (subaddress !== null) {
        const qrcode = await monerojs.generateQrCode(paymentUri);
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
    <Row justify="center" align="middle">
      <Col span={24}>
        <Row justify="center" gutter={[0, 24]}>
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
        </Row>
        <Divider />
        <Row justify="center" align="middle">
          <Col span={24}>
            <img
              src={qrCode}
              alt="qr code"
              preview={false}
              style={{ margin: "0 auto" }}
            />
          </Col>
          <Col>
            <a href={paymentUri} onClick={handleClick}>
              <WalletOutlined /> Pay from desktop wallet
            </a>
          </Col>
        </Row>
        <Divider />
        <Row justify="center" style={{ textAlign: "center" }}>
          <Col span={24}>
            <Title level={3}>Total: {amount} XMR</Title>
          </Col>
        </Row>
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
        <Button
          type="primary"
          disabled={!isPayed}
          icon={!isPayed ? <Spin size="small" /> : null}
          size="large"
        >
          {isPayed ? "Continue" : "Awaiting Payment"}
        </Button>,
      ]}
    >
      <Payment />
    </Modal>
  );
};

// For testing
const Invoice = () => {
  return (
    <div>
      <InvoiceModal />
    </div>
  );
};

export default Invoice;

// TODO confirmation on payment
// TODO continue button one payment is confirmed
// TODO integrate with backend (generate subaddress, confirm payment, confirm amount)
// TODO update the db to the new date
// TODO backend function to check if invoice is due on user login
// TODO create sockets for subaddress getting
