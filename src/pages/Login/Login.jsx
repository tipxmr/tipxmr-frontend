import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { useWallet, openFromSeed } from "../../context/wallet";
import { isValidMnemoicLength, getMnemonicHash } from "../../libs/monero";
import { useRecoilValue } from "recoil";
import { streamerState, dispatcherState } from "../../store/atom";
import { isNil } from "ramda";
import socket_streamer from "../../libs/socket_streamer";
import monerojs from "../../libs/monero";
import { Typography, Row, Col, List, Button, Checkbox, Select, Spin } from "antd";

const { Title } = Typography
const { Option } = Select

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

function convertFlag(language) {
  switch (language) {
    case "German":
      return "🇩🇪";
    case "French":
      return "🇲🇫";
    case "Esperanto":
      return "🏴‍☠️";
    case "Spanish":
      return "🇪🇦";
    case "Russian":
      return "🇷🇺";
    case "Italian":
      return "🇮🇹";
    case "Japanese":
      return "🇯🇵";
    case "Portuguese":
      return "🇵🇹";
    case "Dutch":
      return "🇳🇱";
    default:
      return "🇬🇧";
  }
}

function LanguageSelector({ languages, language, onChange }) {
  // Build list of language items, alphabetically sorted
  const languageItems = languages.map((language) => {
    return (
      <Option key={language} value={language}>
        {convertFlag(language) + " " + language}
      </Option>
    );
  });

  return (
    <Row justify="center" align="middle">
      <Col>
        <span
          htmlFor="languages"
        >
          Seed language:
      </span>
        <Select
          id="languages"
          name="languages"
          defaultValue={language}
          onChange={onChange}
          style={{ width: "200px" }}
        >
          {languageItems}
        </Select>

      </Col>
    </Row>
  );
}
// Defining property types
LanguageSelector.propTypes = {
  language: PropTypes.string,
  languages: PropTypes.array,
  onChange: PropTypes.func,
};

function PickUserName({ onChange, isLoading, userNameError }) {
  return (
    <div className="text-center mt-10">
      <h2 className="text-2xl">Pick your username</h2>
      <input
        className="text-xmrgray-darker p-2 rounded focus:border-none"
        onChange={onChange}
        disabled={isLoading}
      ></input>
      <p className="text-xmrorange mt-2">{userNameError}</p>
      <p className="tracking-tight text-xs text-xmrgray-light mt-2">
        This name cannot be changed once chosen
      </p>
    </div>
  );
}

const defaultLanguage = languages[1];

function Login() {
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

  function login() {
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

  function createWallet(lang) {
    setIsLoading(true);
    monerojs
      .createWallet(lang)
      .then(monerojs.getMnemonic)
      .then(setSeed)
      .then(() => setIsLoading(false));
  }

  function handleCreateWallet() {
    setCreationMode(true);
    createWallet(language);
  }

  // function for the LanguageSelector function, which sets the language state from the selected event target of the LanguageSelector
  function handleLanguageChange(value) {
    setLanguage(value);
  }

  function handleUserNameChange(event) {
    setUserName(event.target.value);
  }

  function handleSeedChanged(event) {
    setSeed(event.target.value);
  }

  // TODO Verify username input (lenght.., form errors)
  return (
    <div>

      {/* Create/enter seed area */}
      <Row justify="center" align="middle">
        <Col span={20}>

          {/* Headline */}
          <Row justify="center">
            <Col>
              <Title level={2} style={{ "text-align": "center" }}>
                Your Seed 👛
            </Title>
              {creationMode ? (
                <LanguageSelector
                  language={language}
                  languages={languages}
                  /* onChange={handleLanguageChange} */
                  align="middle"
                />
              ) : null}

              {/* Continue Button */}
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

              {/* Text area  */}
              <Row justify="center" align="middle">
                <Col>
                  <div className="flex justify-center mt-3 space-x-4">
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
                      <Spin />
                      /* <Loading text="Loading your wallet" /> */
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
      </Row>

      {/* Information Area */}
      <Row justify="center" align="middle">
        <Col>
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

      {/* Agreement of responsibility */}
      <Row justify="center" align="middle">
        <Col>
          <Checkbox onChange={() => setIsChecked(!isChecked)}>I understand that I am responsible for my own security and that TipXMR.live is not liable if I mess up</Checkbox>
        </Col>
      </Row>

      {/* Create Account Button */}
      <Row justify="center" align="middle">
        <Col>
          <Button
            type="primary"
            disabled={isChecked && !isLoading}
            loading={isLoading}
            onClick={login}
          >
            Create Account
        </Button>
        </Col>
      </Row>
    </div>
  );
}

export default Login;
