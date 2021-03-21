import { useEffect, useState } from "react";
import { StreamerCard } from "../components";
import socketio from "../libs/socket_donator";
import { Row, Col, Layout, Menu, Typography } from "antd";

const { Sider, Content } = Layout;
const { Title } = Typography;

// For testing without a running backend
const alex = [
  {
    _id: "fa80ac5814a6fddee2fa29a1e62f5de4e3a233f07a51e886a3a1e7a8bce5abf7",
    animationSettings: {
      bgImg: "",
      charLimit: 99,
      charPrice: 0.0004,
      fontColor: "#FFFFFF",
      fontShadow: true,
      fontSize: "text-4xl",
      gifs: true,
      gifsMinAmount: 0,
      goal: 100,
      goalProgress: 0,
      goalReached: false,
      minAmount: 0,
      secondPrice: 0.00042,
      showGoal: true,
      sound: "",
    },
    creationDate: new Date("2020-09-01"),
    displayName: "AlexAnarcho",
    donationStats: {
      allDonations: [],
      largestDonation: 0,
      totalDonations: 0,
    },
    isOnline: false,
    isPremium: true,
    profilePicture:
      "data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=",
    restoreHeight: 667580,
    stream: {
      category: "politics",
      description: "I am a great streamer.",
      language: "🇩🇪",
      platform: "twitch",
      url: "https://www.twitch.tv/n00bprogrammer",
    },
    streamerSocketId: "",
    userName: "alexanarcho",
  },
];

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
          <Col span={24} style={{ textAlign: "center" }}>
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
