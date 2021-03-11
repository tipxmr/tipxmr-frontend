import landingIcon from "../images/landing-screen.svg";
import { Link } from "react-router-dom";
import { Button, Row, Col, Card, List, Typography } from "antd";
import "/src/styles/Landing.css"

const { Title } = Typography

const streamerList = [
  {
    title: "Earn monero with your livestream right now & reach your funding goals",
    description: "Some text"
  },
  {
    title: "Customize your donation settings & interact with your live",
    description: "Some text"
  },
  {
    title: "Pay a flat fee as low as $1 instead of a percentage - more money in your wallet",
    description: "Some text"
  },
]

const viewerList = [
  {
    title: "Support your favorite streamers financially with Monero, while staying private",
    description: "Some text"
  },
  {
    title: "Fast and easy payments that allow you to use your own existing Monero wallet",
    description: "Some text"
  },
  {
    title: "Watch streams right here on the website, no download needed",
    description: "Some text"
  },
]

const Landing = () => {

  // TODO gutters instead of inline styles
  return (
    <div>

      {/* Headline and sample picture */}
      <Row justify="space-around" align="middle" style={{ "margin-top": "2em" }}>
        <Col span={10}>
          <Title level={1} class="title-text">
            Monero donations in your livestream
          </Title>
        </Col>
        <Col span={10}>
          <img src={landingIcon} alt="tipxmr.live screen" />
        </Col>
      </Row>

      {/* Cards for streamers and viewers */}
      <Row justify="space-around" align="middle" style={{ "margin-top": "2em" }}>

        {/* Streamer Card */}
        <Col span={10}>
          <Card title="For Streamers" extra={<Link to="/login"><Button type="primary">Get started now</Button></Link>}>
            <List itemLayout="horizontal" dataSource={streamerList} renderItem={item => (
              <List.Item>
                <List.Item.Meta title={<a href="#">{item.title}</a>} description={item.description} />
              </List.Item>
            )}>
            </List>
          </Card>
        </Col>

        {/* Viewer Card */}
        <Col span={10}>
          <Card title="For Viewers" extra={<Link to="/streamerpage"><Button type="primary">See who is streaming</Button></Link>}>
            <List itemLayout="horizontal" dataSource={viewerList} renderItem={item => (
              <List.Item>
                <List.Item.Meta title={<a href="#">{item.title}</a>} description={item.description} />
              </List.Item>
            )}>
            </List>
          </Card>
        </Col>

      </Row>
    </div>

  );
}

export default Landing;
