import React from "react";
import { Link } from "react-router-dom";
import { Layout, Menu, Row, Col } from 'antd'
import { GithubOutlined } from "@ant-design/icons"


const { Footer } = Layout

function TipFooter() {
  return (
    <Footer style={{ "padding": 0, "margin": 0 }}>
      <Row justify="center" align="middle">
        <Col span={24}>
          <Menu theme="dark" mode="horizontal">
            <Menu.Item key="disclaimer">
              <Link to="/disclaimer">
                Disclaimer
              </Link>
            </Menu.Item>
            <Menu.Item key="faq">
              <Link to="/faq">
                FAQ
              </Link>
            </Menu.Item>
            <Menu.Item key="getmonero">
              <a href="https:getmonero.org">
                GetMonero
              </a>
            </Menu.Item>
            <Menu.Item key="github">
              <a
                href="https:github.com/hundehausen/tipxmr"
                target="_blank"
                rel="noopener noreferrer"

              >
                <GithubOutlined />
              </a>
            </Menu.Item>
          </Menu>
        </Col>
      </Row>
    </Footer >
  );
}

export default TipFooter;
