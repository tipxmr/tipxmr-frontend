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
    <div className="mt-10">
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
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (seed === defaultStateSeed) {
      setIsLoading(true);
      monerojs
        .createWallet("English")
        .then(monerojs.getMnemonic)
        .then(setSeed)
        .then(() => setIsLoading(false));
    }
  }, []);

  useEffect(() => {
    if (seed !== defaultStateSeed) {
      setIsLoading(true);
      monerojs
        .createWallet(language)
        .then(monerojs.getMnemonic)
        .then(setSeed)
        .then(() => setIsLoading(false));
    }
  }, [language]);

  async function onChange(event) {
    setLanguage(event.target.value);
  }

  return (
    <div>
      <div className="mt-10 flex justify-center">
        <div className="my-auto">
          <h2 className="text-center text-2xl">
            Create your personal wallet 👛
          </h2>
          <LanguageSelector
            languages={languages}
            onChange={onChange}
            align="middle"
          />
          <p>{language} seed:</p>
          <textarea
            className="mt-5"
            id="seed"
            name="seed"
            rows="4"
            cols="50"
            value={isLoading ? defaultStateSeed : seed}
            readOnly
            style={{ resize: "none" }}
          />
          <p className="mt-10">
            <em>
              <small>
                Keep this secret private and don't loose it. You will need it to
                log in and access your funds.
              </small>
            </em>
          </p>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-15">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateWallet;
