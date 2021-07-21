import { Col, Layout, Menu, Row } from "antd";
import logo from "../images/tipxmr-live.png";
import { Link } from "react-router-dom";
import "./TipHeader.less";

const { Header } = Layout;

const TipHeader = () => {
  return (
    <Header className="header">
      <Row justify="space-around" align="middle">
        <Col span={8}>
          <img src={logo} width={180} />
        </Col>
        <Col span={8} offset={8}>
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
            <Menu.Item key="1">
              <Link to="/">Home</Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/streamerpage">Streams</Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link to="/donate/hundehausen">Donate</Link>
            </Menu.Item>
            <Menu.Item key="4">
              <Link to="/login">Login/Signup</Link>
            </Menu.Item>
          </Menu>
        </Col>
      </Row>
    </Header>
  );
};

export default TipHeader;
