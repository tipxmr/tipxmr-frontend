//@ts-nocheck
import { useState, useEffect } from "react"
import { useForm } from "react-hook-form";
import {
  InputField,
  FileInput,
  NumberInput,
  StatBox,
  DropdownField,
} from "../../components";
import { useRecoilValue } from "recoil";
import { dispatcherState, streamerState } from "../../store/atom";
import { Button, Form, Select, Input, InputNumber, Tag, Statistic, Row, Col, Card, Typography } from "antd"
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
      sm: { span: 12 },
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
          <Form.Item
            name="displayName"
            label="Change display name"
            rules={[
              { required: true, message: "Please enter a display name" },
              { pattern: "^[a-zA-Z0-9]$", message: "Characters not allowed" },
              { max: 15, message: "Maximum length is 15 characters" },
              { min: 4, message: "Minimum length is 4 characters" }]} >
            <Input placeholder={streamerConfig.displayName} />
          </Form.Item>
          <Form.Item
            name="streamUrl"
            label="URL to your stream"
            rules={[
              { required: true, message: "Please enter provide the URL to your stream" },
              { type: "url", message: "Please enter a valid URL" }
            ]} ><Input placeholder={streamerConfig.stream.url} />
          </Form.Item>
          <Form.Item
            name="description"
            label="Tell viewers what your stream is about"
            rules={[
              { max: 250, message: "Maximum length is 250 characters." }
            ]} ><Input placeholder={streamerConfig.stream.description} />
          </Form.Item>
          <Form.Item
            name="restoreHeight"
            label="Select restore height for your Monero wallet"
            rules={[
              { type: "number", message: "Restore height must be a number" },
            ]} ><Input placeholder={streamerConfig.restoreHeight} />
          </Form.Item>
          {/* Save Button */}
          <Button type="primary" htmlType="submit">Save changes</Button>
        </Form>
      </Col>

    </Row>
    // <div className="flex-grow text-gray-200">
    //   <div className="mx-auto">
    //     <div className="my-6">
    //     <form onSubmit={handleSubmit(onSubmit)}>
    //       <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
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


export default Settings;
