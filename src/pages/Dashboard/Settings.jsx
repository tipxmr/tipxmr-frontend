//@ts-nocheck
import { useState, useEffect } from "react"
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import {
  InputField,
  FileInput,
  Button,
  NumberInput,
  StatBox,
  DropdownField,
} from "../../components";
import { useRecoilValue } from "recoil";
import { dispatcherState, streamerState } from "../../store/atom";
import { Form, Select, Input, InputNumber, Tag, Statistic, Row, Col, Card, Typography } from "antd"
import "../../styles/index.less"

const { Title } = Typography
const { Option } = Select

const categoryOptions = ["Politics", "Gaming", "XXX", "Music"];
const platformOptions = ["twitch", "youtube", "chaturbate"];
const languageOptions = [
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

const Settings = () => {
  const streamerConfig = useRecoilValue(streamerState);
  const dispatcher = useRecoilValue(dispatcherState);
  const [date, setDate] = useState("")

  console.log("streamerConfig", streamerConfig);

  // useForm hook
  const { handleSubmit, register, errors } = useForm();

  // TODO Needs to be fixed and replaced with the actual animation URL
  const animationUrl =
    "https://tipxmr.live/" + streamerConfig.displayName + "/animation";

  const onSubmit = (data) => {
    const newStreamerConfig = {
      isPremium: streamerConfig.isPremium,
      displayName: data.displayName,
      creationDate: streamerConfig.creationDate,
      stream: {
        url: data.url,
        platform: data.platform,
        language: data.language,
        description: data.description,
        category: data.category,
      },
      restoreHeight: parseInt(data.restoreHeight),
      profilePicture: data.profilePicture,
    };
    dispatcher.updateStreamer(newStreamerConfig);
  };

  useEffect(() => {
    // convert the date object into a formatted date string
    let creationDate = formatDate(streamerConfig)
    setDate(creationDate)
  }, [streamerConfig])

  const formatDate = (streamerConfig) => {
    const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    let date = new Date(streamerConfig.creationDate)
    let formattedDate = date.getDate() + "-" + months[date.getMonth()] + "-" + date.getFullYear()
    return formattedDate
  }
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 5 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 12 },
    },
  };

  return (
    <Row
      justify="center"
      align="middle"
      gutter={[12, 12]}
      className="text-center"
    >

      <Col span={8}>
        <Card>
          <Statistic
            title="Your display name"
            value={streamerConfig.displayName}
          />
        </Card>
      </Col>
      <Col span={8}>
        <Card>
          <Statistic
            title="Account Tier"
            value={streamerConfig.isPremium ? "Premium" : "Basic"}
          />
        </Card>
      </Col>
      <Col span={8}>
        <Card>
          <Statistic
            title="Member since" // Maybe better include a date when the next payment is due
            value={date}
          />
        </Card>
      </Col>
      <Col span={24}>
        <Title level={2}>Change your settings:</Title>
        <Form {...formItemLayout} size="large">
          <Form.Item name="displayName" label="Change display name" rules={[{ required: true, message: "Please enter a display name" }, { pattern: "^[a-zA-Z0-9]$", message: "Characters not allowed" }]} ><Input placeholder={streamerConfig.displayName} /></Form.Item>
        </Form>
      </Col>

    </Row>
    // <div className="flex-grow text-gray-200">
    //   <div className="mx-auto">
    //     <div className="my-6">
    //     <form onSubmit={handleSubmit(onSubmit)}>
    //       <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
    //         <InputField
    //           name="displayName"
    //           labelName="Change your display name"
    //           placeholderName={streamerConfig.displayName}
    //           register={register({
    //             required: { value: true, message: "Cannot be empty" },
    //             maxLength: { value: 15, message: "Maximum of 15 characters" },
    //             minLength: { value: 3, message: "Minimum of 3 characters" },
    //           })}
    //           errors={errors}
    //         />
    //         <InputField
    //           name="url"
    //           labelName="Set URL to your stream"
    //           placeholderName={streamerConfig.stream.url}
    //           register={register({
    //             required: { value: true, message: "Cannot be empty" },
    //           })}
    //           errors={errors}
    //         />
    //         <InputField
    //           name="description"
    //           labelName="Give your stream a description"
    //           placeholderName={streamerConfig.stream.description}
    //           register={register({
    //             maxLength: { value: 50, message: "Maximum of 50 characters" },
    //           })}
    //           errors={errors}
    //         />
    //         <NumberInput
    //           name="restoreHeight"
    //           labelName="Restore Height for Wallet"
    //           placeholderName={streamerConfig.restoreHeight}
    //           numType="integer"
    //           register={register({
    //             min: { value: 0, message: "Cannot be negative" },
    //           })}
    //           errors={errors}
    //         />
    //         {/* TODO Option to automatically set new restore height? */}
    //         <FileInput
    //           name="profilePicture"
    //           labelName="Change your profile picture"
    //           accept=".jpg, .jpeg, .png"
    //           maxFilesize={300 * 1024}
    //           currentFile={streamerConfig.profilePicture}
    //           register={register({
    //             max: { value: 307200, message: "Maximum filesize is 300KB" },
    //           })}
    //           errors={errors}
    //         />
    //         <DropdownField
    //           name="language"
    //           options={languageOptions}
    //           labelText="Select a language for your stream"
    //           selected={streamerConfig.stream.language}
    //           register={register}
    //           errors={errors}
    //         />
    //         <DropdownField
    //           name="platform"
    //           options={platformOptions}
    //           labelText="What platform are you streaming on?"
    //           selected={streamerConfig.stream.platform}
    //           errors={errors}
    //           register={register}
    //         />
    //         <DropdownField
    //           name="category"
    //           options={categoryOptions}
    //           labelText="What category describes your stream best?"
    //           selected={streamerConfig.stream.category}
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

Settings.propTypes = {
  streamerConfig: PropTypes.object,
  setStreamerConfig: PropTypes.func,
};

export default Settings;
