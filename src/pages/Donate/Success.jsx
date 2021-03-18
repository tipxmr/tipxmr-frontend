import PropTypes from "prop-types";
import { Row, Col, Typography, Button } from "antd";

const { Title } = Typography;

const Success = ({ setShowSuccess, setShowEnterMessage }) => {
  const handleButton = () => {
    setShowSuccess(false);
    setShowEnterMessage(true);
  };

  return (
    <Row justify="center" align="middle" style={{ textAlign: "center" }}>
      <Col span={24}>
        <Title level={1}>✅ 💯 🙏</Title>
        <Title level={2}>Your payment was successful!</Title>
        <Button type="primary" size="large" onClick={handleButton}>
          Tip again
        </Button>
      </Col>
    </Row>

    // <div className="flex flex-grow justify-center text-gray-200">
    //   <div className="text-center my-auto">
    //     <h2 className="text-6xl">
    //       <span role="img" aria-label="Green checkmark">
    //         ✅
    //       </span>
    //       <span role="img" aria-label="One hundo">
    //         💯
    //       </span>
    //       <span role="img" aria-label="High Five">
    //         🙏
    //       </span>
    //     </h2>
    //     <h2>We got it, {donor}!</h2>
    //     <h3>The payment was successful</h3>
    //     <div className="font-normal mt-6 border-t-4 border-dotted">
    //       <h2 className="pt-6">
    //         You sent <span className="font-black">{amount} XMR</span> to
    //         <span className="font-black">{" " + displayName}</span>{" "}
    //       </h2>
    //       <h2>with the message:</h2>
    //       <h2 className="pt-4 italic">{message}</h2>
    //     </div>
    //   </div>
    // </div>
  );
};
Success.propTypes = {
  displayName: PropTypes.string,
  message: PropTypes.string,
  donor: PropTypes.string,
  amount: PropTypes.number,
};
export default Success;
