import React from "react";
import clsx from "clsx";
import landingIcon from "../images/landing-screen.svg";
import { Link } from "react-router-dom";
import { Button } from "antd";
import { Layout } from 'antd';

const { Header, Footer, Sider, Content } = Layout;

function LandingA() {
  return (
    <Layout>
      <Header>Header</Header>
      <Content>Content</Content>
      <Footer>Footer</Footer>
    </Layout >
  )
}

function Landing() {
  // TODO Textshadow with antd
  const textShadow = { textShadow: "0px 2px 2px rgba(0, 0, 0, 0.5)" };

  // TODO Style container with antd
  const containerStyle = clsx([
    "my-12",
    "flex-1",
    "p-6",
    "mx-3",
    "text-center",
    "rounded",
    "shadow-md",
    "border-4",
    "border-xmrorange",
  ]);
  // TODO Style list with antd
  const listStyle = clsx([
    "text-justify",
    "list-disc",
    "mx-8",
    "my-4",
    "text-lg",
    "tracking-tight",
    "leading-tight",
    "space-y-3",
  ]);

  // TODO migrate css from tailwind to antd
  return (
    <div className="container mx-auto">
      <div className="flex flex-col bg-xmrgray-darker">
        <div className="flex flex-row items-center">
          <div className="flex flex-1">
            <h1
              className="text-4xl sm:text-6xl text-xmrorange leading-tight tracking-tight m-4"
              style={textShadow}
            >
              Monero donations in your livestream
            </h1>
          </div>
          <div className="flex flex-1">
            <img src={landingIcon} alt="tipxmr.live screen" />
          </div>
        </div>
      </div>
      <div className="flex flex-col bg-xmrgray-darker">
        <div className="flex flex-row">
          <div className={containerStyle}>
            <span
              className="uppercase text-center text-2xl text-xmrorange-lighter"
              style={textShadow}
            >
              For Streamers
            </span>
            <ul className={listStyle}>
              <li>
                Earn monero with your livestream right now & reach your funding
                goals
              </li>
              <li>
                Customize your donation settings & interact with your audience
                live
              </li>
              <li>
                Pay a flat fee as low as $1 instead of a percentage - more money
                in your wallet
              </li>
            </ul>
            <Link to="/login">
              <Button type="primary">Get started now</Button>
            </Link>
          </div>

          <div className={containerStyle}>
            <span
              className="uppercase text-center text-2xl text-xmrorange-lighter"
              style={textShadow}
            >
              For Viewers
            </span>
            <ul className={listStyle}>
              <li>
                Support your favorite streamers financially with Monero, while
                staying private
              </li>
              <li>
                Fast and easy payments that allow you to use your own existing
                Monero wallet
              </li>
              <li>
                Watch streams right here on the website, no download needed
              </li>
            </ul>
            <Link to="/streamerpage">
              <Button type="primary">See who is streaming</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingA;
