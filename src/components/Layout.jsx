import logo from "../images/tipxmr-live.png";
import { Layout, Menu, Row, Col } from 'antd';
// import { tiplayout } from "../styles/tiplayout"

// const { SubMenu } = Menu;
const { Header, Footer, Content } = Layout;

function TipLayout() {
    return (
        <Layout>
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
            <Content>This is some awesome Content</Content>
            <Footer>This is a footer</Footer>
        </Layout >
    )
}

export default TipLayout
