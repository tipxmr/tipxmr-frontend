import { useForm } from "react-hook-form";
import {
  InputField,
  FileInput,
  NumberInput,
  CheckboxField,
  DropdownField,
} from "../../components";
import { useRecoilValue } from "recoil";
import { dispatcherState, streamerState } from "../../store/atom";
import { Row, Button, Col, Typography, Form, Input, InputNumber, Checkbox } from "antd"
import "../../styles/index.less"

const { Title } = Typography

const AnimationSettings = () => {
  const streamerConfig = useRecoilValue(streamerState);
  const dispatcher = useRecoilValue(dispatcherState);
  // useForm hook
  const { handleSubmit, register, errors } = useForm();

  const fontSizeOptions = ["small", "medium", "large", "extra large"];

  const onSubmit = (data) => {
    console.log("data", data);
    const newAnimationSettings = {
      secondPrice: parseFloat(data.secondPrice),
      fontColor: data.fontColor,
      fontSize: data.fontSize,
      fontShadow: data.fontShadow,
      minAmount: parseFloat(data.minAmount),
      gifs: data.gifs,
      gifsMinAmount: parseFloat(data.gifsMinAmount),
      showGoal: data.showGoal,
      goal: parseFloat(data.goal),
      goalProgress: parseFloat(streamerConfig.animationSettings.goalProgress),
      goalReached: streamerConfig.animationSettings.goalReached,
      charLimit: parseInt(data.charLimit),
      charPrice: parseFloat(data.charPrice),
      sound: data.sound,
      bgImg: data.bgImg,
    };
    dispatcher.updateAnimationSettings(newAnimationSettings);
    console.log("Update successful", newAnimationSettings);
  };

  const formLayout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  }

  const positiveNumberRule = [{ type: "number", message: "Must be a positive number", min: 0 }]

  return (
    <Row
      justify="center"
      align="middle"
      gutter={[12, 12]}
      className="text-center">
      <Col span={20}>
        <Title level={2}>Customize your TipXMR animation:</Title>
        <Form {...formLayout} size="large">
          <Form.Item
            name="fontColor"
            label="Hexcode for font color"
            initialValue={streamerConfig.animationSettings.fontColor}
            rules={[
              { type: "string" },
              { pattern: "[a-zA-Z0-9]", message: "Provide a valid hexcode" },
              { max: 7, message: "Provide a valid hexcode" },
              { min: 6, message: "Please enter all 6 characters of the hexcode" },
            ]}
          >
            <Input />
          </Form.Item>
          <Title level={4}>(All numbers in XMR)</Title>
          <Form.Item
            name="secondPrice"
            label="Price per second of showtime"
            initialValue={streamerConfig.animationSettings.secondPrice}
            rules={positiveNumberRule}
          >
            <InputNumber />
          </Form.Item>

          <Form.Item
            name="charPrice"
            label="Price per character"
            initialValue={streamerConfig.animationSettings.charPrice}
            rules={positiveNumberRule}
          >
            <InputNumber />
          </Form.Item>

          <Form.Item
            name="charLimit"
            label="Maximum characters per message"
            initialValue={streamerConfig.animationSettings.charLimit}
            rules={positiveNumberRule}
          >
            <InputNumber />
          </Form.Item>

          <Form.Item
            name="minAmount"
            label="Minimum amount for a tip"
            initialValue={streamerConfig.animationSettings.minAmount}
            rules={positiveNumberRule}
          >
            <InputNumber />
          </Form.Item>

          <Form.Item
            name="goal"
            label="Set a funding goal"
            initialValue={streamerConfig.animationSettings.goal}
            rules={positiveNumberRule}
          >
            <InputNumber />
          </Form.Item>

          <Form.Item
            name="gifsMinAmount"
            label="Set minimum amount to send a gif"
            initialValue={streamerConfig.animationSettings.gifsMinAmount}
            rules={positiveNumberRule}
          >
            <InputNumber />
          </Form.Item>

          <Form.Item
            name="showGoal"
            label="Show funding goal in stream"
            initialValue={streamerConfig.animationSettings.showGoal}
          >
            <Checkbox />
          </Form.Item>

          {/* Save Button */}
          <Button type="primary" htmlType="submit">
            Save changes
          </Button>

        </Form>
      </Col>
    </Row >
  );
};

export default AnimationSettings;
