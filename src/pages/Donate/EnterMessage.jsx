// @ts-nocheck
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import {
  Row,
  Col,
  Typography,
  Form,
  Input,
  InputNumber,
  Button,
  Tooltip,
} from "antd";
import { BulbOutlined, DesktopOutlined } from "@ant-design/icons";

const { Title } = Typography;

const layout = {
  labelCol: {
    span: 0,
  },
  wrapperCol: {
    span: 24,
  },
};
const secondsLayout = {
  labelCol: {
    span: 0,
  },
  wrapperCol: {
    span: 24,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 10,
    span: 5,
  },
};

const PriceInfo = () => {
  return (
    <div flex="auto">
      <Title level={5}>How is this price calculated?</Title>
      {/* <ul> */}
      {/*   <li>- Price per second = {secondPrice} XMR</li> */}
      {/*   <li>- Price per character = {charPrice} XMR</li> */}
      {/* </ul> */}
      <p>
        Total Cost = (SecondPrice * Seconds) + (CharacterPrice * Characters)
      </p>
    </div>
  );
};

const MessageForm = ({
  message,
  setMessage,
  charLimit,
  setShowEnterMessage,
  setShowPayment,
  setDonor,
  seconds,
  setSeconds,
  secondPrice,
  total,
  usdConvert,
}) => {
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      {...layout}
      name="tip"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        name="name"
        rules={[
          {
            required: false,
            default: "anon",
            message: "Please input your username!",
          },
        ]}
      >
        <Input
          size="large"
          placeholder="Your name"
          onChange={(e) => {
            setDonor(e.target.value);
          }}
          maxLength={15}
        />
      </Form.Item>
      <Form.Item name="message">
        <div>
          <Input.TextArea
            size="large"
            autosize={{ minRows: 4, maxRows: 7 }}
            maxLength={charLimit}
            placeholder="Enter your message here..."
            onChange={(e) => {
              setMessage(e.target.value);
            }}
          />
          <p style={{ textAlign: "right" }}>
            {message ? message.length + "/" + charLimit : null}
          </p>
        </div>
      </Form.Item>

      {secondPrice ? (
        <Form.Item
          {...secondsLayout}
          name="seconds"
          style={{ textAlign: "center" }}
        >
          Showtime in seconds:
          <InputNumber size="large" step={1} min={1} defaultValue={5} onChange={(seconds) => setSeconds(seconds)} />
        </Form.Item>) : null}

      <Form.Item>
        <Tooltip title={PriceInfo} placement="bottom">
          <div style={{ textAlign: "center", marginBottom: "1em" }}>
            Price: {total.toFixed(5)} XMR = {usdConvert} $
            <div>
              <BulbOutlined size="large" />
            </div>
          </div>

        </Tooltip>
      </Form.Item>


      <Form.Item {...tailLayout}>
        <Button
          type="primary"
          htmlType="submit"
          size="large"
          onClick={() => {
            setShowEnterMessage(false);
            setShowPayment(true);
          }}
        >
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

const EnterMessage = ({
  donor,
  setDonor,
  setMessage,
  setShowEnterMessage,
  setShowPayment,
  displayName,
  secondPrice,
  total,
  setTotal,
  message,
  charLimit,
  charPrice,
  streamUrl,
  streamPlatform,
  streamLanguage,
  streamDescription,
  streamCategory,
}) => {
  const [usdPrice, setUsdPrice] = useState();
  const usdConvert = (usdPrice * total).toFixed(2);
  const [seconds, setSeconds] = useState(0);

  const { register, handleSubmit, errors } = useForm();

  useEffect(() => {
    // Get MoneroPrice as number
    fetch("https://api.coinpaprika.com/v1/tickers/xmr-monero?quotes=USD")
      .then((response) => response.json())
      .then((res) => res.quotes.USD.price)
      .then(setUsdPrice)
      .catch(console.error);
  }, []);

  useEffect(() => {
    setTotal(secondPrice * seconds + message.length * charPrice);
  }, [message, seconds]);

  // useEffect(() => {
  //   setUsdConvert((usdPrice * total).toFixed(2));
  // }, [total, usdPrice]);

  return (
    <Row justify="center" align="middle">
      {/* Information on the Streamer */}
      <Col>
        <Row
          justify="center"
          align="middle"
          gutter={[16, 0]}
          style={{ textAlign: "center" }}
        >
          <Col className="gutter-row" flex="0 1 auto">
            <Title level={1}>{displayName}</Title>
          </Col>
          <Col className="gutter-row" flex="0 1 500px">
            <Title level={2}>
              <Tooltip title="Stream category">
                #{streamCategory}
              </Tooltip>
              <span> | </span>
              <Tooltip title="Stream language">
                {streamLanguage}
              </Tooltip>
              <span> | </span>
              <Tooltip title="Go to stream">
                <a href={streamUrl}>
                  <DesktopOutlined style={{ fontSize: "2rem", color: "rgba(255, 255, 255, 0.85)" }} />
                </a>
              </Tooltip>
            </Title>
          </Col>
        </Row>
      </Col>

      {/* Enter message form */}
      <Col span={24}>
        <MessageForm
          message={message}
          setMessage={setMessage}
          charLimit={180}
          setShowEnterMessage={setShowEnterMessage}
          setDonor={setDonor}
          setShowPayment={setShowPayment}
          seconds={seconds}
          secondPrice={secondPrice}
          total={total}
          setSeconds={setSeconds}
          charPrice={charPrice}
          setTotal={setTotal}
          usdConvert={usdConvert}
        />
      </Col>
    </Row>
  );
};
EnterMessage.propTypes = {
  donor: PropTypes.string,
  setDonor: PropTypes.func,
  setMessage: PropTypes.func,
  setShowEnterMessage: PropTypes.func,
  setShowPayment: PropTypes.func,
  displayName: PropTypes.string,
  secondPrice: PropTypes.number,
  total: PropTypes.number,
  setTotal: PropTypes.func,
  message: PropTypes.string,
  charLimit: PropTypes.number,
  charPrice: PropTypes.number,
  streamUrl: PropTypes.string,
  streamPlatform: PropTypes.string,
  streamLanguage: PropTypes.string,
  streamDescription: PropTypes.string,
  streamCategory: PropTypes.string,
};
export default EnterMessage;
