import { Row, Col, Typography, Divider, List } from "antd";
import { tips } from "../data/DisclaimerData";

const { Title, Text } = Typography;

const Disclaimer = () => {
  return (
    <Row justify="center" align="middle">
      <Col span={24}>
        {/* Heading */}
        <Row justify="center" align="middle">
          <Col>
            <Title level={1}>Introduction & Disclaimer</Title>
          </Col>
        </Row>

        {/* About Monero */}
        <Row justify="center" align="middle" style={{ textAlign: "center" }}>
          <Col span={8}>
            <p>
              Monero (XMR) is a cryptocurrency, in many ways similiar to
              Bitcoin. However, the main difference to Bitcoin is that{" "}
              <em>every transaction in Monero is private</em>.
            </p>

            <Divider />

            <p>
              This means that the sender, reciever and the amount of ever
              transaction are hidden with cryptographic techniques. While it is
              fascinating to some to learn about how Monero works, it is not
              required to be able to use it. Just like most drivers don't
              understand the internals of the combustion engine.
            </p>
          </Col>
        </Row>

        {/* Important Box */}
        <Row justify="center" align="middle">
          <Col span={10}>
            <Divider />
            <Title level={2}>
              <Text underline>Important:</Text>
            </Title>
            <p>
              At no point in time tipxmr.live has access to your Monero. We
              cannot spend it and we cannot guarantee it's safety. While the
              Monero protocol is very secure itself, your safety is your
              responsiblity.
            </p>
          </Col>
        </Row>

        {/* Safety Tipx */}
        <Row justify="center" align="middle">
          <Col span={12}>
            <Divider />
            <Title level={2}>Tips for your safety:</Title>
            <List
              itemLayout="horizontal"
              dataSource={tips}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    title={<Title level={4}>{item.title}</Title>}
                    description={<p>{item.description}</p>}
                  />
                </List.Item>
              )}
            />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default Disclaimer;
