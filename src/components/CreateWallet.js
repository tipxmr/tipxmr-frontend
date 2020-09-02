import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
    case "Protuguese":
      return "🇵🇹";
    case "Dutch":
      return "🇳🇱";
    default:
      return "🇬🇧";
  }
}

function LanguageSelector({ languages, onChange }) {
  // Build list of language items, alphabetically sorted
  const languageItems = Array.from(languages.sort()).map((language) => {
    return (
      <option key={language} value={language}>
        {convertFlag(language) + " " + language}
      </option>
    );
  });

  return (
    <div>
      <label
        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
        htmlFor="languages"
      >
        Choose a language:
      </label>
      <select
        id="languages"
        name="languages"
        defaultValue="English"
        onChange={onChange}
        className="ml-4 p-2 block appearance-none w-full bg-gray-200 border border-orange-400 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
      >
        {languageItems}
      </select>
    </div>
  );
}
// Defining property types
LanguageSelector.propTypes = {
  languages: PropTypes.array,
  onChange: PropTypes.func,
};

function CreateWallet() {
  // states
  const [language, setLanguage] = useState("English");
  const [seed, setSeed] = useState(defaultStateSeed);
  const [isLoading, setIsLoading] = useState(false);

  // this useEffect gets triggered, when render() is executed
  useEffect(() => {
    // but our code gets only executed, when there is still the default value of the uninitialized seed
    // TODO: Refactor these into one
    if (seed === defaultStateSeed) {
      setIsLoading(true);
      monerojs
        .createWallet("English")
        .then(monerojs.getMnemonic)
        .then(setSeed)
        .then(() => setIsLoading(false));
    }
  }, []);

  // this useEffect gets triggered, when the state lanugage changes
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

  // function for the LanguageSelector function, which sets the language state from the selected event target of the LanguageSelector
  async function onChange(event) {
    setLanguage(event.target.value);
  }

  return (
    <div className="w-1/2 mx-auto mt-10">
      <div className="my-auto text-center">
        <h2 className="text-center text-2xl">
          Create your XMR wallet{" "}
          <span role="img" aria-label="wallet">
            👛
          </span>
        </h2>
        <div className="mx-auto w-1/2 md:w-1/4 mt-10">
          <LanguageSelector
            languages={languages}
            onChange={onChange}
            align="middle"
          />
        </div>
        {/* TODO: we might be able to simply cut this p tag */}
        {/* <p className="mt-4">{language} seed:</p> */}
        <textarea
          className="mt-10 text-xmrgray-darker text-justify border-4 border-dashed border-xmrorange-lighter p-5"
          id="seed"
          name="seed"
          rows="4"
          cols="50"
          value={isLoading ? defaultStateSeed : seed}
          readOnly
          style={{ resize: "none" }}
        />
        <div className="w-3/4 mx-auto mt-10 mb-5">
          <span role="img" aria-label="lightbulp" className="block text-4xl">
            💡
          </span>
          <em>
            <small className="text-justify">
              Keep this secret private and don&apos;t loose it. You will need it
              to log in and access your funds. This wallet was generated on your
              machine. At no point in time was this secret exposed to
              tipxmr.live
            </small>
          </em>
        </div>
        <Link to="/openwallet">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-15">
            Login
          </button>
        </Link>
      </div>
    </div>
  );
}

export default CreateWallet;
