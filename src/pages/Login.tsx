import { Input, Button, Checkbox, Col, Row, Typography } from "antd";
import { isNil } from "ramda";
import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { openFromSeed, useWallet } from "../context/wallet";
import monerojs, {
  getMnemonicHash,
  isValidMnemoicLength,
} from "../libs/monero";
import socket_streamer from "../libs/socket_streamer";
import { dispatcherState, streamerState } from "../store/atom";

const { Title } = Typography;
const defaultStateSeed = "";
const { TextArea } = Input;

const Login = () => {
  const [seed, setSeed] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatcher = useRecoilValue(dispatcherState);
  const streamer = useRecoilValue(streamerState);
  const [wallet, dispatch] = useWallet();
  const { isPending, isResolved } = wallet.status;
  const isWalletOpen = !isNil(wallet.wallet) && isNil(wallet.error);
  const [userName, setUserName] = useState(null);
  const [userNameNotSet, setUserNameNotSet] = useState(false);
  const [userNameError, setUserNameError] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    if (isValidMnemoicLength(seed) && !isWalletOpen && !isPending) {
      console.log("25 words reached");
      login();
      dispatch(openFromSeed(seed));
    }
  }, [dispatcher, isWalletOpen, isPending, dispatch, seed]);

  if (isWalletOpen && isResolved) <Redirect to="/dashboard" />;

  // TODO: make this cleaner
  const login = () => {
    const _id = getMnemonicHash(seed);
    // Login procedure
    socket_streamer.login(_id, userName, (response) => {
      console.log("CB response:", response);
      if (!(response instanceof Error)) {
        setUserNameNotSet(false);
        dispatcher.updateStreamer(response);
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
  };

  const handleSeedChanged = (event) => {
    setSeed(event.target.value);
  };

  return (
    <div>
      <Row gutter={[0, 24]}>
        {/* Headline */}
        <Col span={24}>
          <Row justify="center">
            <Col>
              <Title level={2} style={{ textAlign: "center" }}>
                Login
              </Title>
            </Col>
          </Row>
        </Col>

        {/* Text area  */}
        <Col span={24}>
          <Row justify="center" align="middle">
            <Col span={8}>
              <TextArea
                rows={5}
                id="seed"
                name="seed"
                placeholder="Open your wallet by entering your 25 seed words..."
                value={isLoading ? defaultStateSeed : seed}
                style={{ resize: "none" }}
                onChange={handleSeedChanged}
              />
            </Col>
          </Row>
        </Col>

        {/* Agreement of responsibility */}
        <Col span={24}>
          <Row justify="center" align="middle">
            <Col>
              <Checkbox onChange={() => setIsChecked(!isChecked)}>
                I understand that I am responsible for my own security and that
                TipXMR.live is not liable if I mess up
              </Checkbox>
            </Col>
          </Row>
        </Col>

        {/* Login Button */}
        <Col span={24}>
          <Row justify="center" align="middle">
            <Col>
              <Button
                type="primary"
                disabled={!isChecked || (isChecked && !isLoading)}
                loading={isLoading}
                onClick={login}
              >
                Login
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
