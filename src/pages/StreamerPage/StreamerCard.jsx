import PropTypes from "prop-types";
import { FaTwitch, FaYoutube } from "react-icons/fa";
import tipxmr from "../images/tipxmr-button.png";
import { Link } from "react-router-dom";
import { Row, Col, Card, Image, Tag, Typography } from "antd";
import {
  EditOutlined,
  EllipsisOutlined,
  GiftOutlined,
} from "@ant-design/icons";
import "../styles/index.less";

const { Meta } = Card;
const { Title, Text } = Typography;
const iconLookup = {
  youtube: FaYoutube,
  twitch: FaTwitch,
};

const StreamIcon = ({ type }) => {
  const Icon = iconLookup[type];
  return <Icon className="inline" />;
};
StreamIcon.propTypes = {
  type: PropTypes.oneOf(["youtube", "twitch"]),
};

const TipButton = ({ streamerName }) => {
  return (
    <Link to={"/donate/" + streamerName}>
      <div className="center-div">
        <Image src={tipxmr} width={100} preview={false} />
      </div>
    </Link>
  );
};
TipButton.propTypes = {
  streamerName: PropTypes.string,
};

const StreamerCard = ({ streamer }) => {
  return (
    <Card
      cover={
        <img
          alt="example"
          /* src={streamer.profilePicture} */
          src="https://i.imgur.com/PW3XO3u.jpg"
        />
      }
      actions={[<TipButton streamerName={streamer.userName} />]}
      style={{ maxWidth: "300px", minWidth: "100px" }}
      className="text-center"
    >
      <Meta title={<Title level={2}>{streamer.displayName}</Title>} />
      <Row justify="center" align="middle" gutter={[12, 12]}>
        <Col className="gutter-row">
          <Tag>{streamer.stream.category}</Tag>
        </Col>
        <Col className="gutter-row">{streamer.stream.language}</Col>
        <Col className="gutter-row">
          <StreamIcon type={streamer.stream.platform} />
        </Col>
        <Col span={24} className="gutter-row" className="text-center">
          <Text type="secondary">{streamer.stream.description}</Text>
        </Col>
      </Row>
    </Card>
  );
};
StreamerCard.propTypes = {
  streamer: PropTypes.object,
};

export default StreamerCard;
