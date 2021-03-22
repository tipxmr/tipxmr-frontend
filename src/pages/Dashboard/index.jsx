import { useState } from "react";
import { useRouteMatch, Route, Link, Redirect } from "react-router-dom";
import Overview from "./Overview";
import Wallet from "./Wallet";
import Settings from "./Settings";
import AnimationSettings from "./AnimationSettings";
import Animation from "../Animation";
import TransactionSubscription from "../../components/TransactionSubscription";
import { Row, Col, Menu, Layout } from "antd";
import "../../styles/index.less";

const { Sider, Content } = Layout;

const Dashboard = () => {
  const { path, url } = useRouteMatch();

  const [activeCategroy, setActiveCategory] = useState("overview");
  const [collapsed, setCollapsed] = useState(false);

  const handleActiveCategory = (e) => {
    setActiveCategory(e.key);
  };

  return (
    <div>
      <Layout>
        <Sider
          collapisble
          collapsed={collapsed}
          onCollapse={() => setCollapsed(!collapsed)}
          width={250}
        >
          <Menu
            theme="dark"
            defaultSelectedKeys={["overview"]}
            mode="inline"
            className="semi-large-font"
            onClick={handleActiveCategory}
          >
            <Menu.Item key="overview"><Link to={`${url}/overview`}>Overview</Link></Menu.Item>
            <Menu.Item key="wallet"><Link to={`${url}/wallet`}>Wallet</Link></Menu.Item>
            <Menu.Item key="account"><Link to={`${url}/settings`}>Account Settings</Link></Menu.Item>
            <Menu.Item key="animation"><Link to={`${url}/animation`}>Animation Settings</Link></Menu.Item>
            <Menu.Item key="preview"><Link to={`${url}/preview`}>Preview</Link></Menu.Item>
            <Menu.Item key="logout"><Link to={`${url}/logout`}>Logout</Link></Menu.Item>
          </Menu>
        </Sider>

        <TransactionSubscription />
        <Content>
          <Row justify="center" className="padding-left">
            <Col span={24}>
              <Route exact path={path}>
                <Redirect to={`${path}/overview`} />
              </Route>
              <Route path={`${path}/overview`}>
                <Overview />
              </Route>
              <Route path={`${path}/wallet`}>
                <Wallet />
              </Route>
              <Route path={`${path}/settings`}>
                <Settings />
              </Route>
              <Route path={`${path}/animation`}>
                <AnimationSettings />
              </Route>
              <Route path={`${path}/preview`}>
                <Animation />
              </Route>
            </Col>
          </Row>
        </Content>
      </Layout>
    </div>
  );
};

export default Dashboard;
