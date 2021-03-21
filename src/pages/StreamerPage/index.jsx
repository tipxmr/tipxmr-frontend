import { useEffect, useState } from "react";
import StreamerCard from "./";
import socketio from "../../libs/socket_donator";
import { Row, Col, Layout, Menu, Typography } from "antd";
import "../../styles/index.less";

const { Sider, Content } = Layout;
const { Title } = Typography;

const StreamerPage = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [collapsed, setCollapsed] = useState(false);

  const [onlineStreamers, setOnlineStreamers] = useState(null);

  useEffect(() => {
    socketio.emitGetOnlineStreamers();
    socketio.onGetOnlineStreamer(setOnlineStreamers);
  }, []);

  const handleActiveCategory = (e) => {
    setActiveCategory(e.key);
  };

  const RenderStreamerCards = () => {
    if (onlineStreamers) {
      return onlineStreamers.map((streamer) => {
        if (activeCategory === streamer.stream.category) {
          return (
            <StreamerCard key={streamer.displayName} streamer={streamer} />
          );
        } else if (activeCategory === "all") {
          return (
            <StreamerCard key={streamer.displayName} streamer={streamer} />
          );
        }
      });
    }
    return null;
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={() => setCollapsed(!collapsed)}
      >
        <Menu
          theme="dark"
          defaultSelectedKeys={["all"]}
          mode="inline"
          style={{ fontSize: "1.5rem" }}
          onClick={handleActiveCategory}
        >
          <Menu.Item key="all">All</Menu.Item>
          <Menu.Item key="gaming">Gaming</Menu.Item>
          <Menu.Item key="politics">Politics</Menu.Item>
          <Menu.Item key="music">Music</Menu.Item>
          <Menu.Item key="xxx">XXX</Menu.Item>
        </Menu>
      </Sider>
      <Content>
        <Row justify="center" style={{ paddingLeft: "5vw" }}>
          <Col span={24} className="text-center">
            <Title level={1}>Online right now</Title>
          </Col>
          <Col span={6}>
            <RenderStreamerCards />
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};
export default StreamerPage;
