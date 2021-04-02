import { Row, Col, Typography, Button } from "antd";
import { SmileOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Title } = Typography;

const NotFound404 = () => {
  return (
    <Row justify="center" align="middle">
      <Col span={24}>
        <Row
          justify="center"
          align="middle"
          gutter={[0, 24]}
          style={{ textAlign: "center" }}
        >
          <Col span={24}>
            <Title level={1}>This streamer doesn't exist</Title>
          </Col>
          <Col span={24}>
            <SmileOutlined rotate={180} style={{ fontSize: "2em" }} />
          </Col>
          <Col span={24}>
            <Title level={4}>Error: 404</Title>
          </Col>
          <Col>
            <Link to="/streamerpage">
              <Button type="primary" size="large">
                View all Livestreams
              </Button>
            </Link>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default NotFound404;
