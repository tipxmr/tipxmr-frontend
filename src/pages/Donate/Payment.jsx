import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import monerojs from "../../libs/monero";
import { Row, Col, Spin, Typography, Image, Divider } from "antd";
import { WalletOutlined } from "@ant-design/icons";
import "./index.less";
import "../../styles/index.less";
import MessagePreview from "./MessagePreview";

const { Title } = Typography;
const Payment = ({
  displayName,
  donor,
  message,
  subaddress,
  getSubaddress,
  total,
}) => {
  const [qrcode, setQrcode] = useState("");
  const [paymentUri, setPaymentUri] = useState(null);

  useEffect(() => {
    if (subaddress === null) {
      getSubaddress();
    }
  }, [getSubaddress, subaddress]);

  const createPaymentUri = () => {
    let uri;
    if (total > 0) {
      uri = "monero:" + subaddress + "?tx_amount=" + total;
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
        setQrcode(qrcode);
      }
    };
    generateQrCode();
  }, [subaddress, createPaymentUri]);

  const handleClick = (e) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
  };

  return (
    <Row
      justify="center"
      align="middle"
      className="text-center"
      gutter={[0, 14]}
    >
      <Col span={24}>
        <Spin size="large" />
        <Title level={3}>Waiting for payment...</Title>
      </Col>

      <Col span={24}>
        {total ? (
          <span style={{ lineHeight: "1" }}>
            Transfer at least <Title level={2}>{total} XMR</Title>
          </span>
        ) : (
          <span>Transfer any amount of XMR to</span>
        )}
      </Col>

      {/* QRCode */}
      <Col span={24}>
        <Image src={qrcode} alt="qr code" preview={false} />
      </Col>

      {/* Payment Link */}
      <Col>
        <a href={paymentUri} onClick={handleClick}>
          <WalletOutlined /> Pay from desktop wallet
        </a>
      </Col>

      {/* Preview the message */}
      <MessagePreview message={message} donor={donor} total={total} />
    </Row>
  );
};

Payment.propTypes = {
  displayName: PropTypes.string,
  message: PropTypes.string,
  donor: PropTypes.string,
  subaddress: PropTypes.string,
  getSubaddress: PropTypes.func,
  total: PropTypes.number,
};

export default Payment;
