import { Row, Col, Typography, Card, List, Button } from "antd";
import {registrationInstructions} from '../../data/SignupData'

const { Title } = Typography;


const Info = ({ stateSetterInfo, stateSetterCreate }) => {
  const handleChange = () => {
    stateSetterInfo(false);
    stateSetterCreate(true);
  };

  return (
    <div>
      <Row gutter={[0, 48]}>
        <Col span={24}>
          <Row justify="center" align="middle">
            {/* Main Headline */}
            <Col span={8}>
              <Title level={1}>
                Accept Monero (XMR) in your livestreams today!
              </Title>
              <Title level={3}>Ready to go within minutes</Title>
            </Col>

            {/* Info Cards */}
            <Col span={12}>
              <Card title="OBS + Monero" bordered={false}>
                <p>
                  tipxmr.live uses the most popular streaming software, OBS, to
                  display donations
                </p>
              </Card>
              <Card title="Your keys, your coins!" bordered={false}>
                <p>
                  TipXMR provides a non-custodial WebAssembly Monero Wallet that
                  lives in your browser. This means that only you control you
                  funds.
                </p>
              </Card>
              <Card title="Interact with your audience" bordered={false}>
                <p>
                  Let donators send messages or GIFs directly into your stream.
                  There are many more features to customize.
                </p>
              </Card>
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          {/* Getting started information */}
          <Row justify="center">
            <Col span={20}>
              <Title level={2}>Get started with TipXMR in 5 easy steps:</Title>
              <List
                itemLayout="horizontal"
                dataSource={registrationInstructions}
                renderItem={(item) => (
                  <List.Item>
                    <List.Item.Meta
                      title={item.title}
                      description={item.description}
                    />
                  </List.Item>
                )}
              />
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          {/* Continue Button */}
          <Row justify="center" align="middle">
            <Col>
              <Button type="primary" onClick={handleChange}>
                Create TipXMR Account
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default Info;
