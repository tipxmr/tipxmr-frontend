import React, { useState, useEffect } from "react";
import monerojs from "../libs/monero";
import PropTypes from "prop-types";

const defaultStateSeed = "Generating Seed. Please wait...";
const languages = [
  "English",
  "German",
  "French",
  "Esperanto",
  "Spanish",
  "Russian",
  "Italian",
  "Japanese",
  "Dutch",
  "Portuguese",
];

function LanguageSelector({ languages, onChange }) {
  const languageItems = Array.from(languages.sort()).map((language) => {
    return (
      <option key={language} value={language}>
        {language}
      </option>
    );
  });

  return (
    <div>
      <label htmlFor="languages">Choose a language:</label>
      <select
        id="languages"
        name="languages"
        defaultValue="English"
        onChange={onChange}
      >
        {languageItems}
      </select>
    </div>
  );
}
LanguageSelector.propTypes = {
  languages: PropTypes.array,
  onChange: PropTypes.func,
};

function CreateWallet() {
  const [language, setLanguage] = useState("English");
  const [seed, setSeed] = useState(defaultStateSeed);

  /*   useEffect(() => {
    if (seed === defaultStateSeed) {
      monerojs.createWallet("English").then(monerojs.getMnemonic).then(setSeed);
    }
  }); */

  useEffect(() => {
    setSeed(defaultStateSeed);
    monerojs.createWallet(language).then(monerojs.getMnemonic).then(setSeed);
  }, [language]);

  async function onChange(event) {
    setLanguage(event.target.value);
  }

  return (
    <div>
      <LanguageSelector languages={languages} onChange={onChange} />
      <p>{language} seed:</p>
      <textarea
        id="seed"
        name="seed"
        rows="4"
        cols="50"
        value={seed}
        readOnly
      />
    </div>
  );
}

export default CreateWallet;
