import { Col, Row, Select } from "antd";
import PropTypes from "prop-types";

const { Option } = Select;

const convertFlag = (language) => {
  switch (language) {
    case "German":
      return "🇩🇪";
    case "French":
      return "🇲🇫";
    case "Esperanto":
      return "🏴‍☠️";
    case "Spanish":
      return "🇪🇦";
    case "Russian":
      return "🇷🇺";
    case "Italian":
      return "🇮🇹";
    case "Japanese":
      return "🇯🇵";
    case "Portuguese":
      return "🇵🇹";
    case "Dutch":
      return "🇳🇱";
    default:
      return "🇬🇧";
  }
};

const LanguageSelector = ({ language, onChange }) => {
  const languages = [
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

  // Build list of language items, alphabetically sorted
  const languageItems = languages.map((language) => {
    return (
      <Option key={language} value={language}>
        {convertFlag(language) + " " + language}
      </Option>
    );
  });

  return (
    <Select
      id="languages"
      name="languages"
      defaultValue={language}
      onChange={onChange}
      style={{ width: "200px" }}
    >
      {languageItems}
    </Select>
  );
};

LanguageSelector.propTypes = {
  language: PropTypes.string,
  languages: PropTypes.array,
  onChange: PropTypes.func,
};

export default LanguageSelector;
