import React, { useEffect, useState } from "react";
import { StreamerCard, CategoryNav } from "../components";
import socketio from "../libs/socket_donator";
import { Row, Col, Layout, Menu } from "antd"


const { Sider } = Layout

// TODO render the category page with a filter
function StreamerPage() {
  // ----------- STATES FOR CATEGORY NAV -----------
  const [categories, setCategories] = useState([
    "all",
    "gaming",
    "politics",
    "talk",
    "XXX",
  ]);

  // TODO implement category pictures
  const [activeCategory, setActiveCategory] = useState("all");

  // ----------- STREAMERCARD -----------
  const [onlineStreamers, setOnlineStreamers] = useState(null);
  useEffect(() => {
    socketio.emitGetOnlineStreamers();
    socketio.onGetOnlineStreamer(setOnlineStreamers);
  }, []);

  function renderStreamerCards() {
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
  }
  return (
    <div>
      <Row justify="center" align="center">
        <Col span={24}>
          <Layout>
            <Sider style={{ "color": "white" }}>
              <Menu>
                <Menu.Item>
                  nav1
                </Menu.Item>
                <Menu.Item>
                  nav2
                </Menu.Item>
              </Menu>
            </Sider>
          </Layout>
        </Col>
      </Row>
      {/* <CategoryNav */}
      {/*   activeCategory={activeCategory} */}
      {/*   stateSetter={setActiveCategory} */}
      {/*   categories={categories} */}
      {/* /> */}

      {/* <div className="bg-xmrgray-darker m-16">{renderStreamerCards()}</div> */}
    </div>
  );
}
export default StreamerPage;
