import PropTypes from "prop-types";
import { Row, Col, Typography, Button } from "antd";
import "./index.less";
import MessagePreview from "./MessagePreview";

const { Title } = Typography;

const Success = ({
  setShowSuccess,
  setShowEnterMessage,
  message,
  donor,
  total,
}) => {
  const handleButton = () => {
    setShowSuccess(false);
    setShowEnterMessage(true);
  };

  return (
    <Row
      justify="center"
      align="middle"
      className="text-center"
      gutter={[0, 24]}
    >
      <Col span={24}>
        <Title level={1}>✅ 💯 🙏</Title>
        <Title level={2}>Your payment was successful!</Title>
      </Col>

      <MessagePreview message={message} donor={donor} total={total} />
      <Col>
        <Button type="primary" size="large" onClick={handleButton}>
          Tip again
        </Button>
      </Col>
    </Row>
  );
};

Success.propTypes = {
  setShowSuccess: PropTypes.func,
  setShowEnterMessage: PropTypes.func,
  message: PropTypes.string,
  donor: PropTypes.string,
  total: PropTypes.number,
};

export default Success;
