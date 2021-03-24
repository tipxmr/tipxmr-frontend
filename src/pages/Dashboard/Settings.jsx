//@ts-nocheck
import { useState, useEffect } from "react"
import { useForm } from "react-hook-form";
import {
  InputField,
  FileInput,
  NumberInput,
  StatBox,
  DropdownField,
  LanguageSelector
} from "../../components";
import { useRecoilValue } from "recoil";
import { dispatcherState, streamerState } from "../../store/atom";
import { Upload, message, Button, Form, Select, Input, InputNumber, Tag, Statistic, Row, Col, Card, Typography, Dropdown, Menu } from "antd"
import { PlusOutlined, LoadingOutlined, DownOutlined } from "@ant-design/icons"
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

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

const beforeUpload = (file) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
}

const Avatar = () => {
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (info) => {
    if (info.file.status === 'uploading') {
      setIsLoading(true);
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl =>
        setIsLoading(false),
      );
    }
  };

  const { loading, imageUrl } = isLoading;
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  return (
    <Upload
      name="avatar"
      listType="picture-card"
      className="avatar-uploader"
      showUploadList={false}
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      beforeUpload={beforeUpload}
      onChange={handleChange}
    >
      {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
    </Upload>
  );
}

const Settings = () => {
  const [language, setLanguage] = useState("English")
  const streamerConfig = useRecoilValue(streamerState);
  const dispatcher = useRecoilValue(dispatcherState);
  const [date, setDate] = useState("")

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
          <Form.Item
            name="profilePicture"
            label="Upload a profile picture"
          ><Avatar />
          </Form.Item>
          <Form.Item
            name="language"
            label="Language of your stream"
            rules={[
              { required: true, message: "Please select a language for your stream" }
            ]} >
            {/* <LanguageMenu /> */}
            <LanguageSelector
              language={streamerConfig.stream.language}
              onChange={setLanguage}
              align="middle"
            />

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
