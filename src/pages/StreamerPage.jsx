import { useEffect, useState } from "react";
import { StreamerCard, CategoryNav } from "../components";
import socketio from "../libs/socket_donator";
import { Row, Col, Layout, Menu, Typography } from "antd";

const { Sider, Content } = Layout;
const { Title } = Typography;

// TODO render the category page with a filter
const StreamerPage = () => {
  // ----------- STATES FOR CATEGORY NAV -----------
  const [categories, setCategories] = useState([
    "all",
    "gaming",
    "politics",
    "talk",
    "XXX",
  ]);
  const [collapsed, setCollapsed] = useState(false);

  // TODO implement category pictures
  const [activeCategory, setActiveCategory] = useState("all");

  // ----------- STREAMERCARD -----------
  const [onlineStreamers, setOnlineStreamers] = useState(null);
  useEffect(() => {
    socketio.emitGetOnlineStreamers();
    socketio.onGetOnlineStreamer(setOnlineStreamers);
  }, []);

  const renderStreamerCards = () => {
    if (onlineStreamers && onlineStreamers.value) {
      return onlineStreamers.value.map((streamer) => {
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
          defaultSelectedKeys={["1"]}
          mode="inline"
          style={{ fontSize: "1.5rem" }}
        >
          <Menu.Item key={1}>All</Menu.Item>
          <Menu.Item key={2}>Gaming</Menu.Item>
          <Menu.Item key={3}>Politics</Menu.Item>
          <Menu.Item key={4}>Music</Menu.Item>
          <Menu.Item key={5}>XXX</Menu.Item>
        </Menu>
      </Sider>
      <Content>
        <Row justify="center" style={{ paddingLeft: "5vw" }}>
          <Col span={24} style={{ textAlign: "center" }}>
            <Title level={1}>Online right now</Title>
          </Col>
        </Row>
      </Content>
    </Layout>
    //   <CategoryNav
    //     activeCategory={activeCategory}
    //     stateSetter={setActiveCategory}
    //     categories={categories}
    //   />

    //   <div className="bg-xmrgray-darker m-16">{renderStreamerCards()}</div>
  );
};
export default StreamerPage;
