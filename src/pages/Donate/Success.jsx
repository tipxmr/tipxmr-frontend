import PropTypes from "prop-types";
import { Row, Col, Typography, Button } from "antd";
import "./index.less"

const { Title } = Typography;

const Success = ({ setShowSuccess, setShowEnterMessage }) => {
  const handleButton = () => {
    setShowSuccess(false);
    setShowEnterMessage(true);
  };

  return (
    <Row justify="center" align="middle" className="text-center">
      <Col span={24}>
        <Title level={1}>✅ 💯 🙏</Title>
        <Title level={2}>Your payment was successful!</Title>
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
};

export default Success;
