import { Tag } from "antd";

const IsOnlineBadge = ({ isOnline }) => {
  return (
    <Tag color={isOnline ? "success" : "error"}>
      {isOnline ? "online" : "offline"}
    </Tag>
  );
};

export default IsOnlineBadge;
