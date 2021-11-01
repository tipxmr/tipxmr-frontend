import { Card, Button, List } from "antd";
import { Link } from "react-router-dom";

interface IBulletpoint {
  title: string,
  description: string
}
interface IOverviewCard {
  title: string,
  buttonLink: string,
  buttonCta: string,
  bulletpoints: IBulletpoint,
}

const OverviewCard = ({title, buttonLink, bulletpoints, buttonCta}) => {
  return (
    <Card
      title={title}
      extra={
        <Link to={buttonLink}>
          <Button type="primary">{buttonCta}</Button>
        </Link>
      }
    >
      <List
        itemLayout="horizontal"
        dataSource={bulletpoints}
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
  );
};

export default OverviewCard;
