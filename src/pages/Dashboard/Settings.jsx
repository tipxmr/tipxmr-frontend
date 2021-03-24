//@ts-nocheck
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  message,
  Row,
  Select,
  Statistic,
  Typography,
  Upload,
} from "antd";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";
import { LanguageSelector } from "../../components";
import { dispatcherState, streamerState } from "../../store/atom";
import "../../styles/index.less";

const { Title } = Typography;
const { Option } = Select;

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};

const beforeUpload = (file) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};

const UploadButton = ({ isLoading }) => {
  return (
    <div>
      {isLoading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  )
}

const Avatar = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setIsLoading(true);
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (imageUrl) => setIsLoading(false));
    }
  };

  const { loading, imageUrl } = isLoading;

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
      {imageUrl ? (
        <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
      ) : (
          <UploadButton isLoading={isLoading} />
        )}
    </Upload>
  );
};

const Settings = () => {
  const [language, setLanguage] = useState("English");
  const streamerConfig = useRecoilValue(streamerState);
  const dispatcher = useRecoilValue(dispatcherState);
  const [date, setDate] = useState("");

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
    let creationDate = formatDate(streamerConfig);
    setDate(creationDate);
  }, [streamerConfig]);

  const formatDate = (streamerConfig) => {
    const months = [
      "JAN",
      "FEB",
      "MAR",
      "APR",
      "MAY",
      "JUN",
      "JUL",
      "AUG",
      "SEP",
      "OCT",
      "NOV",
      "DEC",
    ];
    let date = new Date(streamerConfig.creationDate);
    let formattedDate =
      date.getDate() + "-" + months[date.getMonth()] + "-" + date.getFullYear();
    return formattedDate;
  };
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
            initialValue={streamerConfig.displayName}
            rules={[
              { required: true, message: "Please enter a display name" },
              { pattern: "[a-zA-Z0-9]", message: "Characters not allowed" },
              { max: 15, message: "Maximum length is 15 characters" },
              { min: 4, message: "Minimum length is 4 characters" },
            ]}
          >
            <Input placeholder={streamerConfig.displayName} />
          </Form.Item>

          <Form.Item
            name="streamUrl"
            label="URL to your stream"
            initialValue={streamerConfig.stream.url}
            rules={[
              {
                required: true,
                message: "Please enter provide the URL to your stream",
              },
              { type: "url", message: "Please enter a valid URL" },
            ]}
          >
            <Input placeholder={streamerConfig.stream.url} />
          </Form.Item>

          <Form.Item
            name="description"
            label="Tell viewers what your stream is about"
            initialValue={streamerConfig.stream.description}
            rules={[{ max: 250, message: "Maximum length is 250 characters." }]}
          >
            <Input placeholder={streamerConfig.stream.description} />
          </Form.Item>

          <Form.Item
            name="restoreHeight"
            label="Select restore height for your Monero wallet"
            initialValue={streamerConfig.restoreHeight}
            rules={[
              { type: "number", message: "Restore height must be a number" },
            ]}
          >
            <Input placeholder={streamerConfig.restoreHeight} />
          </Form.Item>

          <Form.Item name="language" label="Language of your stream">
            <LanguageSelector
              language={streamerConfig.stream.language}
              onChange={setLanguage}
              align="middle"
            />
          </Form.Item>

          <Form.Item name="platform" label="Streaming platform">
            <Select defaultValue="other">
              <Option value="twitch">Twitch</Option>
              <Option value="youtube">YouTube</Option>
              <Option value="other">Other</Option>
            </Select>
          </Form.Item>

          <Form.Item name="category" label="Category for your stream">
            <Select defaultValue="politics">
              <Option value="politics">Politics</Option>
              <Option value="gaming">Gaming</Option>
              <Option value="xxx">XXX</Option>
              <Option value="music">Music</Option>
            </Select>
          </Form.Item>

          <Form.Item name="profilePicture" label="Upload a profile picture">
            <Avatar />
          </Form.Item>

          {/* Save Button */}
          <Button type="primary" htmlType="submit">
            Save changes
          </Button>
        </Form>
      </Col>
    </Row>
  );
};

export default Settings;
