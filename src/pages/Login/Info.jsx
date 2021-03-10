import React from "react";
import { Row, Col, Typography, Card, List, Button } from "antd"


const { Title } = Typography

const stepByStep = [
  {
    title: "Step 1: Create your TipXMR account",
    description: "Follow the button below and create your TipXMR account. Just pick your username and continue - no email verification required"
  },
  {
    title: "Step 2: Secure your Monero Wallet",
    description: "Your Browser will generate a seedphrase for you. This is your Monero wallet. Write the seed on a piece of paper and keep is secure."
  },
  {
    title: "Step 3: Set up OBS with TipXMR",
    description: "Add a new browser source in your OBS and point it to your unique TipXMR URL."
  },
  {
    title: "Step 4: Customize your donation screen",
    description: "Make TipXMR your own by customizing the style of your tip messages."
  },
  {
    title: "Step 5: Start streaming!",
    description: "All done! You can now go live and Monero donations will be displayed directly in your stream."
  },

]

function Info({ stateSetterInfo, stateSetterCreate }) {
  function handleChange() {
    stateSetterInfo(false);
    stateSetterCreate(true);
  }

  return (
    <div>
      <Row justify="center" align="middle">

        {/* Main Headline */}
        <Col span={8}>
          <Title level={1}>
            Accept Monero (XMR) in your livestreams today!
          </Title>
          <Title level={3}>
            Ready to go within minutes
          </Title>
        </Col>

        {/* Info Cards */}
        <Col span={14}>
          <Card title="OBS + Monero" bordered={false}>
            <p>tipxmr.live uses the most popular streaming software, OBS, to display donations</p>
          </Card>
          <Card title="Your keys, your coins!" bordered={false}>
            <p>TipXMR provides a non-custodial WebAssembly Monero Wallet that lives in your browser. This means that only you control you funds.</p>
          </Card>
          <Card title="Interact with your audience" bordered={false}>
            <p>Let donators send messages or GIFs directly into your stream. There are many more features to customize.</p>
          </Card>
        </Col>
      </Row>

      {/* Getting started information */}
      <Row justify="center">
        <Col span={20}>
          <Title level={2}>Get started with TipXMR in 5 easy steps:</Title>
          <List
            itemLayout="horizontal"
            dataSource={stepByStep}
            renderItem={item => (
              <List.Item>
                <List.Item.Meta
                  title={item.title}
                  description={item.description}
                />
              </List.Item>)} />
        </Col>
      </Row>

      {/* Continue Button */}
      <Row justify="center" align="middle">
        <Col>
          <Button type="primary" justify="center" onClick={handleChange}>Create TipXMR Account</Button>
        </Col>
      </Row>
    </div>
  );
}

export default Info;
