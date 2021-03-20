import { useEffect, useState } from "react";
import { StreamerCard } from "../components";
import socketio from "../libs/socket_donator";
import { Row, Col, Layout, Menu, Typography } from "antd";

const { Sider, Content } = Layout;
const { Title } = Typography;

// For testing without a running backend
const alex = {
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
};

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

  const [onlineStreamers, setOnlineStreamers] = useState(null);

  useEffect(() => {
    socketio.emitGetOnlineStreamers();
    socketio.onGetOnlineStreamer(setOnlineStreamers);
  }, []);

  const RenderStreamerCards = () => {
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
    // return null;
    return <StreamerCard key={7} streamer={alex} />;
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
          <Col span={6}>
            <RenderStreamerCards />
          </Col>
        </Row>
      </Content>
    </Layout>
    //   <CategoryNav
    //     activeCategory={activeCategory}
    //     stateSetter={setActiveCategory}
    //     categories={categories}
    //   />

    //   <div className="bg-xmrgray-darker m-16"></div>
  );
};
export default StreamerPage;
