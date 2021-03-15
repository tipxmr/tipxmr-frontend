import { Layout } from "antd";
import { TipHeader, TipFooter } from "./";
import "./TipLayout.less";

const { Content } = Layout;

const TipLayout = ({ children }) => {
  return (
    <Layout>
      <TipHeader userName="Tester" />
      <Content className="content">{children}</Content>
      <TipFooter />
    </Layout>
  );
};

export default TipLayout;
