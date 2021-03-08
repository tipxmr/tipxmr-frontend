import React from "react";
import logo from "../images/tipxmr-live.png";
import { Layout, Menu, Row, Col } from 'antd'

const { Header } = Layout

function TipHeader({ userName }) {
  return (
    <Header>
      <Row justify="space-around" align="middle">
        <Col>
          <img src={logo} width={180} />
        </Col>
        <Col>
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
            <Menu.Item key="1">Streams</Menu.Item>
            <Menu.Item key="2">Donate</Menu.Item>
            <Menu.Item key="3">Login/Signup</Menu.Item>
          </Menu>
        </Col>
      </Row>
    </Header>

  );
}

export default TipHeader;
