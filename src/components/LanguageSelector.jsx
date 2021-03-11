import { Col, Row, Select } from "antd";
import PropTypes from "prop-types";
import convertFlag from "./convertFlag";


const { Option } = Select

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
// Defining property types
LanguageSelector.propTypes = {
    language: PropTypes.string,
    languages: PropTypes.array,
    onChange: PropTypes.func,
};

export default LanguageSelector
