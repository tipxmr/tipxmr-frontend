import { Tag } from "antd";

interface IIsOnlineBadge {
  isOnline: boolean
}

const IsOnlineBadge = ({ isOnline }:  IIsOnlineBadge) => {
  return (
    <Tag color={isOnline ? "success" : "error"}>
      {isOnline ? "online" : "offline"}
    </Tag>
  );
};

export default IsOnlineBadge;
