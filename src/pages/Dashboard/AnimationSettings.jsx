import { useForm } from "react-hook-form";
import {
  InputField,
  FileInput,
  NumberInput,
  CheckboxField,
  Button,
  DropdownField,
} from "../../components";
import { useRecoilValue } from "recoil";
import { dispatcherState, streamerState } from "../../store/atom";
import { Row, Col, Typography, Form, Input, InputNumber, Checkbox } from "antd"
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
              { pattern: "[a-zA-Z0-9]", message: "Provide a valid hexcode" },
              { max: 6, message: "Provide a valid hexcode" },
              { min: 6, message: "Please enter all 6 characters of the hexcode" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="secondPrice"
            label="Price per second of showtime"
            initialValue={streamerConfig.animationSettings.secondPrice}
            rules={[
              { type: "number", message: "Must be a number" },
              { min: 0, message: "Cannot be negative" },
            ]}
          >
            <InputNumber />
          </Form.Item>

          <Form.Item
            name="charPrice"
            label="Price per character"
            initialValue={streamerConfig.animationSettings.charPrice}
            rules={[
              { type: "number", message: "Must be a number" },
              { min: 0, message: "Cannot be negative" },
            ]}
          >
            <InputNumber />
          </Form.Item>

          <Form.Item
            name="charLimit"
            label="Maximum characters per message"
            initialValue={streamerConfig.animationSettings.charLimit}
            rules={[
              { type: "number", message: "Must be a number" },
              { min: 0, message: "Cannot be negative" },
            ]}
          >
            <InputNumber />
          </Form.Item>

          <Form.Item
            name="minAmount"
            label="Minimum amount for a tip"
            initialValue={streamerConfig.animationSettings.minAmount}
            rules={[
              { type: "number", message: "Must be a number" },
              { min: 0, message: "Cannot be negative" },
            ]}
          >
            <InputNumber />
          </Form.Item>

          <Form.Item
            name="goal"
            label="Set a funding goal"
            initialValue={streamerConfig.animationSettings.goal}
            rules={[
              { type: "number", message: "Must be a number" },
              { min: 0, message: "Cannot be negative" },
            ]}
          >
            <InputNumber />
          </Form.Item>

          <Form.Item
            name="gifsMinAmount"
            label="Set minimum amount to send a gif"
            initialValue={streamerConfig.animationSettings.gifsMinAmount}
            rules={[
              { type: "number", message: "Must be a number" },
              { min: 0, message: "Cannot be negative" },
            ]}
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



        </Form>
      </Col>
    </Row >
    // <div className="h-full text-gray-200">
    //   <div className="mx-auto">
    //     <div className="text-center text-xl underline mb-4">
    //       Change your Animation:
    //     </div>

    //     <form onSubmit={handleSubmit(onSubmit)}>
    //       <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
    //         {/* TODO Create a new component to pick the color */}

    //         <CheckboxField
    //           name="showGoal"
    //           label="Display donation goal in stream"
    //           defaultChecked={streamerConfig.animationSettings.showGoal}
    //           register={register}
    //         />
    //         <CheckboxField
    //           name="gifs"
    //           label="Allow users to send gifs"
    //           defaultChecked={streamerConfig.animationSettings.gifs}
    //           register={register}
    //         />
    //         {/* Not really possible */}
    //         {/* <CheckboxField */}
    //         {/*   name="fontShadow" */}
    //         {/*   label="Turn on text shadow" */}
    //         {/*   defaultChecked={streamerConfig.animationSettings.fontShadow} */}
    //         {/*   register={register} */}
    //         {/* /> */}
    //         <FileInput
    //           name="sound"
    //           label="Upload a custom MP3 for donations"
    //           currentFile={streamerConfig.animationSettings.sound}
    //           register={register({
    //             max: { value: 307200, message: "Maximum filesize is 300KB" },
    //           })}
    //           errors={errors}
    //         />
    //         <FileInput
    //           name="bgImg"
    //           label="Upload custom background image for donations"
    //           currentFile={streamerConfig.animationSettings.bgImg}
    //           register={register({
    //             max: { value: 307200, message: "Maximum filesize is 300KB" },
    //           })}
    //           errors={errors}
    //         />
    //         <DropdownField
    //           name="fontSize"
    //           options={fontSizeOptions}
    //           labelText="Select a font size"
    //           selected={streamerConfig.animationSettings.fontSize}
    //           register={register}
    //           errors={errors}
    //         />
    //       </div>
    //       <Button type="submit">Submit</Button>
    //     </form>
    //   </div>
    // </div>
  );
};

export default AnimationSettings;
