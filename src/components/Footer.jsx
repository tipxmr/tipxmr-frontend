import React from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { Layout, Row, Col } from 'antd'


const { Footer } = Layout

function TipFooter() {
  // TODO eliminate clsx
  const linkStyle = clsx([
    "transform",
    "hover:text-xmrorange-lighter",
    "hover:scale-110",
  ]);
  return (
    <Footer style={{ "background-color": "#4D4D4D" }
    }>
      <Row justify="space-around" align="middle">
        <Col>
          <Link to="/disclaimer" className={linkStyle}>
            Disclaimer
        </Link>
        </Col>
        <Col>
          <Link to="/faq" className={linkStyle}>
            FAQ
        </Link>
        </Col>
        <Col>
          <a href="https:getmonero.org" className={linkStyle}>
            GetMonero
        </a>
        </Col>
        <Col>
          <a
            href="https:github.com/hundehausen/tipxmr"
            target="_blank"
            rel="noopener noreferrer"
            className={linkStyle}
          >
            GitHub
        </a>
        </Col>
      </Row>
    </Footer >
  );
}

export default TipFooter;
