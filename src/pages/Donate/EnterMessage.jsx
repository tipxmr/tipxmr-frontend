// @ts-nocheck
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Row,
  Col,
  Typography,
  Divider,
  Form,
  Slider,
  Input,
  InputNumber,
  Button,
  Tooltip,
} from "antd";
import { DesktopOutlined } from "@ant-design/icons";
import "./index.less"

const { Title, Text } = Typography;
const { TextArea } = Input;

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
    span: 8,
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

const IntegerStep = ({ seconds, setSeconds }) => {
  const marks = {
    1: "1 sec",
    15: "15 secs",
    30: "30 secs",
    45: "45 secs",
    60: "1 min",
  };

  return (
    <Row justify="center">
      <Col span={15}>
        <Slider
          marks={marks}
          min={1}
          max={60}
          onChange={setSeconds}
          value={typeof seconds === "number" ? seconds : 0}
        />
      </Col>
      <Col span={1}>
        <InputNumber
          min={1}
          max={60}
          defaultValue={seconds}
          value={seconds}
          onChange={setSeconds}
        />
      </Col>
    </Row>
  );
};
IntegerStep.propTypes = {
  seconds: PropTypes.number,
  setSeconds: PropTypes.func,
}

const PriceInfo = ({
  secondPrice,
  charPrice,
  usdConvert,
  seconds,
  message,
}) => {
  return (
    <div style={{ fontSize: "120%" }}>
      <Title level={3}>How is this price calculated?</Title>
      <ul>
        <li>- Price per second = {secondPrice} XMR</li>
        <li>- Price per character = {charPrice} XMR</li>
      </ul>
      <Text code>
        {usdConvert}$ = ({secondPrice}$ * {seconds} secs ) + ({charPrice}$ *{" "}
        {message.length})
      </Text>
    </div>
  );
};
PriceInfo.propTypes = {
  secondPrice: PropTypes.number,
  charPrice: PropTypes.number,
  usdConvert: PropTypes.number,
  seconds: PropTypes.number,
  message: PropTypes.string,
}

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
  charPrice,
}) => {
  const handleMessage = (value) => {
    setMessage(value.target.value);
  };
  const handleDonor = (e) => {
    setDonor(e.target.value);
  };
  const onFinish = (values) => {
    console.log("Success:", values);
    setShowEnterMessage(false);
    setShowPayment(true);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    setSeconds(seconds);
  }, [seconds, setSeconds]);

  return (
    <Form
      {...layout}
      name="tip"
      initialValues={{
        remember: true,
        seconds: 12,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        name="name"
        rules={[
          {
            required: true,
            default: "anon",
            message: "Please enter a name",
          },
        ]}
      >
        <Input
          size="large"
          placeholder="Your name"
          onChange={handleDonor}
          maxLength={15}
        />
      </Form.Item>
      <Form.Item>
        <div>
          <Form.Item name="message">
            <TextArea
              size="large"
              autosize={{ minRows: 4, maxRows: 7 }}
              maxLength={charLimit}
              placeholder="Enter your message here..."
              onChange={handleMessage}
            />
          </Form.Item>
          <p style={{ textAlign: "right" }}>
            {message ? message.length + "/" + charLimit : null}
          </p>
        </div>
      </Form.Item>

      {secondPrice ? (
        <Form.Item
          {...secondsLayout}
          style={{ textAlign: "center", display: "inline" }}
        >
          <Title level={5}>How long should your message show?</Title>
          <IntegerStep seconds={seconds} setSeconds={setSeconds} />
        </Form.Item>
      ) : null}

      <Divider />
      {/* Price Information in USD */}
      <Tooltip
        placement="bottom"
        title={
          <PriceInfo
            secondPrice={secondPrice}
            charPrice={charPrice}
            usdConvert={usdConvert}
            seconds={seconds}
            message={message}
          />
        }
      >
        <div style={{ textAlign: "center" }}>
          <Title level={2}>
            Price: {total.toFixed(5)} XMR = {usdConvert} $
          </Title>
        </div>
      </Tooltip>

      {/* Button to continue */}
      <Form.Item name="submitButton" {...tailLayout}>
        <Button type="primary" htmlType="submit" size="large">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
MessageForm.propTypes = {
  message: PropTypes.string,
  setMessage: PropTypes.func,
  charLimit: PropTypes.number,
  setShowEnterMessage: PropTypes.func,
  setShowPayment: PropTypes.func,
  setDonor: PropTypes.func,
  seconds: PropTypes.number,
  setSeconds: PropTypes.func,
  secondPrice: PropTypes.number,
  total: PropTypes.number,
  usdConvert: PropTypes.number,
  charPrice: PropTypes.number,
}

const EnterMessage = ({
  donor,
  setDonor,
  setMessage,
  setShowEnterMessage,
  setShowPayment,
  displayName,
  secondPrice,
  charLimit,
  charPrice,
  stream,
  total,
  setTotal,
  message,
  goal,
  goalReached,
  streamUrl,
  streamPlatform,
  streamLanguage,
  streamDescription,
  streamCategory,
}) => {
  const [usdPrice, setUsdPrice] = useState();
  const [usdConvert, setUsdConvert] = useState();
  const [seconds, setSeconds] = useState(5);

  const roundXMR = (number, decimals) => {
    const factorOfTen = Math.pow(10, decimals);
    return Math.round(number * factorOfTen) / factorOfTen;
  };
  useEffect(() => {
    // Get MoneroPrice as number
    fetch("https://api.coinpaprika.com/v1/tickers/xmr-monero?quotes=USD")
      .then((response) => response.json())
      .then((res) => res.quotes.USD.price)
      .then(setUsdPrice)
      .catch(console.error);
  }, []);

  useEffect(() => {
    // Update the total price of tip
    const total = secondPrice * seconds + message.length * charPrice;
    setTotal(roundXMR(total, 6));
    setUsdConvert((usdPrice * total).toFixed(2));
  }, [message, seconds, charPrice, secondPrice, setTotal, total, usdPrice]);

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
              <Tooltip title="Stream category">#{streamCategory}</Tooltip>
              <span> | </span>
              <Tooltip title="Stream language">{streamLanguage}</Tooltip>
              <span> | </span>
              <Tooltip title="Go to stream">
                <a href={streamUrl}>
                  <DesktopOutlined
                    className="desktop-icon"
                  />
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
          charLimit={charLimit}
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
