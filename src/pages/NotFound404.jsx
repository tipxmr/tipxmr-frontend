import { Row, Col, Typography } from "antd";
import { SmileOutlined } from "@ant-design/icons";

const { Title } = Typography;

const NotFound404 = () => {
  return (
    <Row justify="center" align="middle">
      <Col span={24}>
        <Row justify="center" align="middle">
          <Col>
            <Title level={1}>Error: 404</Title>
            <SmileOutlined rotate={180} />
            <Title level={4}>There does not seem to be anything here</Title>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default NotFound404;
