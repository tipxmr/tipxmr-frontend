import landingIcon from "../images/landing-screen.svg";
import { Button, Row, Col, Card, List, Typography } from "antd";
import "./styles/Landing.less";
import { streamerCard, viewerCard } from "../data/LandingData";
import OverviewCard from "../components/OverviewCard";

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
              <Col span={10} className="gutter-row">
                <OverviewCard
                  title={streamerCard.title}
                  buttonLink={streamerCard.buttonLink}
                  bulletpoints={streamerCard.bulletpoints}
                  buttonCta={streamerCard.buttonCta}
                />
              </Col>
              <Col span={10} className="gutter-row">
                <OverviewCard
                  title={viewerCard.title}
                  buttonLink={viewerCard.buttonLink}
                  bulletpoints={viewerCard.bulletpoints}
                  buttonCta={viewerCard.buttonCta}
                />
              </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default Landing;
