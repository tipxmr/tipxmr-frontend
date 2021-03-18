import { Tag } from "antd";
import PropTypes from "prop-types";

const IsOnlineBadge = ({ isOnline }) => {
  return (
    <Tag color={isOnline ? "success" : "error"}>
      {isOnline ? "online" : "offline"}
    </Tag>
  );
};
IsOnlineBadge.propTypes = {
  isOnline: PropTypes.bool,
};

export default IsOnlineBadge;
