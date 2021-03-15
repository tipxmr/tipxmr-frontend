import { Link } from "react-router-dom";
import { Layout, Row, Col } from "antd";
import { GithubOutlined } from "@ant-design/icons";
import "../styles/index.less";
import "./TipFooter.less";

const { Footer } = Layout;

const TipFooter = () => {
  return (
    <Footer className="zero-margin-padding footer">
      <Row justify="space-around" align="middle">
        <Col>
          <Link to="/disclaimer">Disclaimer</Link>
        </Col>

        <Col>
          <Link to="/faq">FAQ</Link>
        </Col>
        <Col>
          <a href="https://getmonero.org">GetMonero</a>
        </Col>
        <Col>
          <a
            href="https://github.com/hundehausen/tipxmr"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GithubOutlined />
          </a>
        </Col>
      </Row>
    </Footer>
  );
};

export default TipFooter;
