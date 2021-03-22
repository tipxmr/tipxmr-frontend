import { useState } from "react";
import { Row, Col, Statistic, Table, Typography, Tag } from "antd";
import "./Dashboard.less";
import "../../styles/index.less";

const { Title } = Typography;
const SyncStatus = ({ synced }) => {
  return (
    <Tag color={synced ? "blue" : "magenta"} className="padding-around">
      {synced
        ? "Your wallet is up to date"
        : "Your wallet still needs to catch up"}
    </Tag>
  );
};

const Overview = () => {
  const [isSynced, setIsSynced] = useState(false);

  const [data, setData] = useState([
    {
      id: 1,
      donor: "Fluffypony",
      message:
        "Hey Guys, I really like this project. I wish I would have thought of that!",
      amount: "501",
    },
    {
      id: 2121,
      donor: "Nicolas van Saberhagen",
      message: "I am not the creator of Monero, but I wish I was!",
      amount: "420",
    },
    {
      id: 10231,
      donor: "AlexAnarcho",
      message: "Just awesome",
      amount: "0,000501",
    },
    {
      id: 91234,
      donor: "N00b_Styler",
      message:
        "Ich hab, ich hab, ich hab STYLE UND DAS GELD. ICH HAB ALL DAS - na ihr wisst schon",
      amount: "0,1231",
    },
  ]);

  const columns = [
    {
      title: "Donor",
      dataIndex: "donor",
      key: "donor",
    },
    {
      title: "Message",
      dataIndex: "message",
      key: "message",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
  ];
  return (
    <Row
      justify="center"
      align="middle"
      gutter={[12, 12]}
      className="text-center"
    >
      <Col span={24}>
        <SyncStatus synced={isSynced} />
      </Col>

      <Col span={8}>
        <Statistic
          title="Your balance"
          value={1337}
          precision={5}
          suffix="XMR"
        />
      </Col>

      <Col span={8}>
        <Statistic
          title="Total money earned"
          value={4321}
          precision={5}
          suffix="XMR"
        />
      </Col>

      <Col span={8}>
        <Statistic
          title="Earnings last month"
          value={1337}
          precision={5}
          suffix="XMR"
        />
      </Col>
      <Col span={24}>
        <Title level={2}>Recent Donations</Title>
        <Table columns={columns} dataSource={data} />
      </Col>
    </Row>
  );
};

export default Overview;
