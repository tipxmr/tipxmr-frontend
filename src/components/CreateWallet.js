import React, { useState } from "react";
import monerojs from "../libs/monero";
import PropTypes from "prop-types";

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
  const languageItems = Array.from(languages).map((language) => (
    <option key={language} value={language}>
      {language}
    </option>
  ));

  return (
    <div>
      <label htmlFor="languages">Choose a language:</label>
      <select
        id="languages"
        name="languages"
        onChange={(e) => {
          onChange(e.target.value);
          const seed = monerojs
            .CreateWallet(e.target.value)
            .then(monerojs.getMnemonic);
        }}
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
  const [language, setLanguage] = useState(languages[0]);
  // neue Funktion scheiben onChange, die lang übergeben bekommt und damit setLanguage und andere Funkt. aufrufen

  function onChange() {}

  return (
    <div>
      <LanguageSelector languages={languages} onChange={setLanguage} />
      <p>Selected: {language}</p>
    </div>
  );
}

export default CreateWallet;
