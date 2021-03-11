import { Col, Row, Select } from "antd";
import PropTypes from "prop-types";


const { Option } = Select

function convertFlag(language) {
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
}

const LanguageSelector = ({ languages, language, onChange }) => {
    // Build list of language items, alphabetically sorted
    const languageItems = languages.map((language) => {
        return (
            <Option key={language} value={language}>
                {convertFlag(language) + " " + language}
            </Option>
        );
    });

    return (
        <Row justify="center" align="middle">
            <Col>
                <span
                    htmlFor="languages"
                >
                    Seed language:
      </span>
                <Select
                    id="languages"
                    name="languages"
                    defaultValue={language}
                    onChange={onChange}
                    style={{ width: "200px" }}
                >
                    {languageItems}
                </Select>

            </Col>
        </Row>
    );
}

LanguageSelector.propTypes = {
    language: PropTypes.string,
    languages: PropTypes.array,
    onChange: PropTypes.func,
};

export default LanguageSelector
