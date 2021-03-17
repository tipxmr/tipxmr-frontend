// @ts-nocheck
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { Row, Col, Typography, Form, Input, Button } from "antd"

const { Title } = Typography

const layout = {
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
const MessageForm = ({ message, setMessage, charLimit }) => {
  const onFinish = (values) => { console.log('Success:', values); };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      {...layout}
      name="basic"
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
            message: 'Please input your username!',
          },
        ]}
      >
        <Input size="large" placeholder="Your name" />
      </Form.Item>
      <Form.Item name="message" rules={[{ required: true, message: "Please write message" }]}>
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
          {message ? message.length + "/" + charLimit : null}

        </div>
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit" size="large">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

const MessageArea = ({ message, setMessage, charLimit }) => {

  return (
    <div className="flex flex-grow relative h-32 mx-3">
    </div>
  );
}
MessageArea.propTypes = {
  message: PropTypes.string,
  setMessage: PropTypes.func,
  charLimit: PropTypes.number,
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

  const onSubmit = (data) => {
    console.log(data);
  };


  return (
    <Row justify="center" align="middle">

      {/* Information on the Streamer */}
      <Col>
        <Row justify="center" align="middle" gutter={[16, 0]} style={{ textAlign: "center" }}>
          <Col className="gutter-row" flex="0 1 auto"><Title>Tip {displayName} with Monero</Title></Col>
          <Col className="gutter-row" flex="0 1 500px"><Title>#{streamCategory} | {streamLanguage}</Title></Col>
          <Col className="gutter-row" flex="0 1 400px">
            <Title level={4}>{streamUrl}</Title>
          </Col>
        </Row>
      </Col>

      {/* Enter message form */}
      <Col span={24}>
        <MessageForm message={message} setMessage={setMessage} charLimit={180} />
      </Col>

    </Row >
    //     <form onSubmit={handleSubmit(onSubmit)}>
    //       <div className="flex flex-col text-center">
    //         <div className="flex flex-grow relative mx-3">
    //           <input
    //             name="donorName"
    //             type="text"
    //             align="middle"
    //             maxLength={15}
    //             className="block m-4 p-2 border border-gray-200 bg-xmrgray-darker placeholder-gray-200 w-2/3 mx-auto text-center rounded"
    //             placeholder="Your Name"
    //             ref={register({
    //               required: "You forgot to put in a name",
    //             })}
    //             onChange={(e) => {
    //               setDonor(e.target.value);
    //             }}
    //           />
    //           <p className="bottom-0 right-0 absolute text-gray-200 text-xs tracking-tight px-4">
    //             {donor ? donor.length + "/15" : null}
    //           </p>
    //         </div>
    //         <p className="text-xmrorange mb-3">
    //           {errors.donorName ? "Please enter a name" : null}
    //         </p>

    //         <MessageArea
    //           message={message}
    //           setMessage={setMessage}
    //           charLimit={charLimit}
    //         />
    //         <div className="w-3/5 mx-auto m-4 text-gray-200">
    //           {secondPrice ? (
    //             <div className="flex items-center justify-center">
    //               <p className="tracking-tight mr-3">Showtime: </p>
    //               <Counter count={seconds} setCount={setSeconds} />
    //               <p className="tracking-tight ml-3">seconds</p>
    //             </div>
    //           ) : null}

    //           <div className="my-3">
    //             <p className="tracking-tight text-xs">Minimum amount:</p>
    //             {total.toFixed(5)} XMR = {usdConvert} $
    //           </div>
    //         </div>
    //       </div>
    //       <div className="w-full flex justify-center">
    //         <Button
    //           onClick={() => {
    //             setShowEnterMessage(false);
    //             setShowPayment(true);
    //           }}
    //           type="submit"
    //         >
    //           Submit
    //         </Button>
    //       </div>
    //     </form>
    //   </div>
    // </div>
  );
}
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
