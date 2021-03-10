import React from "react";
import PropTypes from "prop-types";
import { Row, Col, Select } from "antd";
import { convertFlag } from "../pages/Login/Login";

function LanguageSelector({ languages, language, onChange }) {
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
