import { Col, Card, Typography, Divider } from "antd";
import PropTypes from "prop-types";
import "../../styles/index.less";

const { Title } = Typography;

const MessagePreview = ({ message, donor, total }) => {
  return (
    <Col span={24} className="text-left gutter-row">
      <Divider />
      <Title level={2} className="text-center">
        Preview:{" "}
      </Title>
      <Card
        title={
          <span>
            <Title level={4} className="inline">
              {donor}
            </Title>{" "}
            tipped
          </span>
        }
        extra={<Title level={4}>{total} XMR</Title>}
      >
        <Title level={5} className="text-center">
          {message}
        </Title>
      </Card>
    </Col>
  );
};

MessagePreview.propTypes = {
  message: PropTypes.string,
  donor: PropTypes.string,
  total: PropTypes.number,
};

export default MessagePreview;
