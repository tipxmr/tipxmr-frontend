import landingIcon from "../images/landing-screen.svg";
import { Link } from "react-router-dom";
import { Button, Row, Col, Card, List, Typography } from "antd";
import "./styles/Landing.less";
import cards from "../data/landing";

const { Title } = Typography;

const Landing = () => {
  return (
    <div>
      <Row gutter={[0, 48]}>
        <Col span={24}>
          {/* Headline and sample picture */}
          <Row justify="space-around" align="middle">
            <Col span={10}>
              <Title level={1} className="title-text">
                Monero donations in your livestream
              </Title>
            </Col>
            <Col span={10}>
              <img src={landingIcon} alt="tipxmr.live screen" />
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          {/* Cards for streamers and viewers */}
          <Row justify="space-around" align="middle">
            {cards.map((cardItem, index) => (
              <Col span={10} className="gutter-row">
                <Card
                  title={cardItem.title}
                  extra={
                    <Link to={cardItem.buttonLink}>
                      <Button type="primary">Get started now</Button>
                    </Link>
                  }
                >
                  <List
                    itemLayout="horizontal"
                    dataSource={cardItem.bulletpoints}
                    renderItem={(item) => (
                      <List.Item>
                        <List.Item.Meta
                          title={<a href="#">{item.title}</a>}
                          description={item.description}
                        />
                      </List.Item>
                    )}
                  ></List>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default Landing;
