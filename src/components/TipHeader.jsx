import { Col, Layout, Menu, Row } from 'antd';
import logo from "../images/tipxmr-live.png";
import { Link } from "react-router-dom"

const { Header } = Layout

// TODO show username when user is logged in
const TipHeader = () => {
  return (
    <Header>
      <Row justify="space-around" align="middle">
        <Col>
          <img src={logo} width={180} />
        </Col>
        <Col>
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
            <Menu.Item key="1"><Link to="/streamerpage">Streams</Link></Menu.Item>
            <Menu.Item key="2"><Link to="/donate">Donate</Link></Menu.Item>
            <Menu.Item key="3"><Link to="/login">Login/Signup</Link></Menu.Item>
          </Menu>
        </Col>
      </Row>
    </Header>

  );
}

export default TipHeader;
