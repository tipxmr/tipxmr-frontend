import { Divider, Button, Checkbox, Col, List, Row, Spin, Typography } from "antd";
import { isNil } from "ramda";
import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { LanguageSelector, PickUserName } from "../../components";
import { openFromSeed, useWallet } from "../../context/wallet";
import monerojs, { getMnemonicHash, isValidMnemoicLength } from "../../libs/monero";
import socket_streamer from "../../libs/socket_streamer";
import { dispatcherState, streamerState } from "../../store/atom";

const { Title } = Typography
const importantList = [
  {
    title: 'Secure your seed',
    description: "Please write your seedphrase on a piece of paper. DO NOT STORE IT ON THE COMPUTER."
  },
  {
    title: 'Keep your seed secret',
    description: "Anybody that knows the seed can access funds stored on the wallet. Do not share it with others."
  },
  {
    title: "Don't get phished",
    description: "Before you sign into TipXMR with your seed, make sure that you are actually using TipXMR. Verify the URL and check the 🔒 in your browser."
  },
  {
    title: "Regularly withdraw to a different wallet",
    description: "Just to be on the save side, do not keep large amounts on your TipXMR wallet. You should regularly withdraw funds to another Monero wallet, like CakeWallet or Monerujo."
  },

];
const defaultStateSeed = "";
const languages = [
  "Dutch",
  "English",
  "Esperanto",
  "French",
  "German",
  "Italian",
  "Japanese",
  "Portuguese",
  "Russian",
  "Spanish",
];
const defaultLanguage = languages[1];

const Login = () => {
  // states
  const [language, setLanguage] = useState(defaultLanguage);
  const [seed, setSeed] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatcher = useRecoilValue(dispatcherState);
  const streamer = useRecoilValue(streamerState);
  const [wallet, dispatch] = useWallet();
  const { isPending, isResolved } = wallet.status;
  const isWalletOpen = !isNil(wallet.wallet) && isNil(wallet.error);
  const [creationMode, setCreationMode] = useState(false);
  const [userName, setUserName] = useState(null);
  const [userNameNotSet, setUserNameNotSet] = useState(false);
  const [userNameError, setUserNameError] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  // this useEffect gets triggered, when the state lanugage changes
  useEffect(() => {
    if (creationMode) {
      createWallet(language);
    }
  }, [language]);

  useEffect(() => {
    // if 25 words are reached
    if (isValidMnemoicLength(seed) && !isWalletOpen && !isPending) {
      console.log("25 words reached");
      login();
      dispatch(openFromSeed(seed));
    }
  }, [dispatcher, isWalletOpen, isPending, dispatch, seed]);

  // Das streamer.restoreHeight, weil er erst weiterleiten soll,
  // wenn die Streamer Config vom Backend gesendet wurde
  if (
    isWalletOpen &&
    isResolved &&
    streamer.userName &&
    streamer.userName !== "" &&
    !userNameNotSet
  ) {
    console.log("Redirected");
    return <Redirect to="/dashboard" />;
  }

  const login = () => {
    const _id = getMnemonicHash(seed);
    // Login procedure
    socket_streamer.login(_id, userName, (response) => {
      console.log("CB response:", response);
      if (!(response instanceof Error)) {
        setUserNameNotSet(false);
        dispatcher.updateStreamer(response.data);
      } else if (
        response.message ===
        "_id not found and no userName for userCreation was sent"
      ) {
        setUserNameNotSet(true);
        setUserNameError("No Username was set.");
        console.error("No Username was set.");
      } else if (response.message === "Username is already taken") {
        setUserNameNotSet(true);
        setUserNameError("Username is already taken.");
        console.error("Username is already taken.");
      }
    });
  }

  const createWallet = (lang) => {
    setIsLoading(true);
    monerojs
      .createWallet(lang)
      .then(monerojs.getMnemonic)
      .then(setSeed)
      .then(() => setIsLoading(false));
  }

  const handleCreateWallet = () => {
    setCreationMode(true);
    createWallet(language);
  }

  // LanguageSelector handler
  const handleLanguageChange = (value) => {
    setLanguage(value);
  }

  const handleUserNameChange = (event) => {
    setUserName(event.target.value);
  }

  const handleSeedChanged = (event) => {
    setSeed(event.target.value);
  }

  return (
    <div>
      <Row gutter={[0, 24]}>

        {/* Headline */}
        <Col span={24}>
          <Row justify="center">
            <Col>
              <Title level={2} style={{ "text-align": "center" }}>
                Your Seed 👛
              </Title>
              {creationMode ? (
                <LanguageSelector
                  language={language}
                  languages={languages}
                  onChange={handleLanguageChange}
                  align="middle"
                />
              ) : null}
            </Col>
          </Row>
        </Col>

        {/* Continue Button */}
        <Col span={24}>
          <Row justify="center">
            <Col>
              <Button
                type="primary"
                disabled={isLoading}
                loading={isLoading}
                onClick={handleCreateWallet}
                align="middle"
                justify="center"
              >
                Create New Wallet
                  </Button>
            </Col>
          </Row>
        </Col>

        {/* Text area  */}
        <Col span={24}>
          <Row justify="center" align="middle">
            <Col span={20}>


              <Row justify="center" align="middle">
                <Col>
                  <div>
                    {/* TODO Use an ant.design component */}
                    <textarea
                      className="select-all outline-none text-gray-200 text-justify border-4 border-dashed border-xmrorange-lighter p-5 bg-xmrgray-darker rounded"
                      id="seed"
                      name="seed"
                      rows="4"
                      cols="50"
                      placeholder="Open your wallet by entering your 25 seed words..."
                      value={isLoading ? defaultStateSeed : seed}
                      style={{ resize: "none" }}
                      onChange={handleSeedChanged}
                    />
                    {isPending && !creationMode ? (
                      <div>
                        <Spin />
                      </div>
                    ) : null}
                  </div>
                  {!isLoading && (creationMode || userNameNotSet) ? (
                    <PickUserName
                      onChange={handleUserNameChange}
                      isLoading={isLoading}
                      userNameError={userNameError}
                    />
                  ) : null}
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>

        {/* Information Area*/}
        <Col span={24}>
          <Row justify="center" align="middle">
            <Col>
              <Divider />
              <Title level={2} style={{ "text-align": "center" }}> ⚠️ Important ⚠️</Title>
              <p>Your seed phrase is the ultimate backup for your Monero wallet.</p>
              <List
                itemLayout="horizontal"
                dataSource={importantList}
                renderItem={item => (
                  <List.Item>
                    <List.Item.Meta
                      title={item.title}
                      description={item.description}
                    />
                  </List.Item>
                )}
              />
            </Col>
          </Row>
        </Col>

        {/* Agreement of responsibility */}
        <Col span={24}>
          <Row justify="center" align="middle">
            <Col>
              <Checkbox onChange={() => setIsChecked(!isChecked)}>I understand that I am responsible for my own security and that TipXMR.live is not liable if I mess up</Checkbox>
            </Col>
          </Row>
        </Col>

        {/* Create Account Button */}
        <Col span={24}>
          <Row justify="center" align="middle">
            <Col>
              <Button
                type="primary"
                disabled={!isChecked || (isChecked && !isLoading)}
                loading={isLoading}
                onClick={login}
              >
                Create Account
        </Button>
            </Col>
          </Row>
        </Col>

      </Row>
    </div >
  );
}

export default Login;
