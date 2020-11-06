import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import monerojs from "~/libs/monero";
import Loading from "~/components/Loading";
import { Button } from "~/components";

const defaultStateSeed = "";
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

function LanguageSelector({ languages, language, onChange }) {
  // Build list of language items, alphabetically sorted
  const languageItems = languages.map((language) => {
    return (
      <option className="bg-xmrgray-darker" key={language} value={language}>
        {convertFlag(language) + " " + language}
      </option>
    );
  });

  return (
    <div className="max-w-md">
      <label
        className="block uppercase tracking-wide text-xs font-bold mb-2"
        htmlFor="languages"
      >
        Choose a language:
      </label>
      <select
        id="languages"
        name="languages"
        value={language}
        onChange={onChange}
        className="ml-4 p-2 block appearance-none w-full bg-xmrgray-darker border border-orange-400 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:border-gray-500"
      >
        {languageItems}
      </select>
    </div>
  );
}
// Defining property types
LanguageSelector.propTypes = {
  language: PropTypes.string,
  languages: PropTypes.array,
  onChange: PropTypes.func,
};

const defaultLanguage = languages[1];

function CreateWallet() {
  // states
  const [language, setLanguage] = useState(defaultLanguage);
  const [seed, setSeed] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function createWallet(lang) {
    setIsLoading(true);
    monerojs
      .createWallet(lang)
      .then(monerojs.getMnemonic)
      .then(setSeed)
      .then(() => setIsLoading(false));
  }

  useEffect(() => {
    createWallet(defaultLanguage);
  }, []);

  // this useEffect gets triggered, when the state lanugage changes
  useEffect(() => {
    createWallet(language);
  }, [language]);

  // function for the LanguageSelector function, which sets the language state from the selected event target of the LanguageSelector
  function onChange(event) {
    setLanguage(event.target.value);
  }

  // TODO create confirmation box
  const [isChecked, setIsChecked] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    if (isChecked && !isLoading) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [isLoading, isChecked]);
  return (
    <div className="flex flex-row flex-1">
      <div className="flex-1">
        <h2 className="text-2xl">
          Create your XMR wallet{" "}
          <span role="img" aria-label="wallet">
            👛
          </span>
        </h2>
        <div>
          <LanguageSelector
            language={language}
            languages={languages}
            onChange={onChange}
            align="middle"
          />
        </div>
        <textarea
          className="mt-10 select-all outline-none text-gray-200 text-justify border-4 border-dashed border-xmrorange-lighter p-5 bg-xmrgray-darker rounded"
          id="seed"
          name="seed"
          rows="4"
          cols="50"
          value={isLoading ? defaultStateSeed : seed}
          readOnly
          style={{ resize: "none" }}
        />

        <h2 className="text-2xl">Pick your username</h2>
        <p className="tracking-tight text-sm">
          This name cannot be changed once chosen
        </p>
        <input className="text-xmrgray-darker p-2 m-4 rounded"></input>
      </div>
      <div className="flex-1 self-center border-4 border-red-600 p-6 text-lg space-y-4 rounded">
        <div className="text-center">
          <span role="img" aria-label="lightbulp" className="text-4xl">
            💡
          </span>
          <span className="text-center underline text-4xl">Important</span>
          <span role="img" aria-label="warning" className="text-4xl">
            {" "}
            ⚠️
          </span>
        </div>
        <p className="text-center text-xl">
          Your seedphrase is the ultimate backup for your Monero wallet.
        </p>
        <ul className="list-disc leading-tight space-y-3 px-6">
          <li>Write it down on a piece of paper and store it securely.</li>
          <li>
            Keep your seed secret - whoever knows your seed can spend the coins.
          </li>
          <li>
            The seed is universal, you can also use it with other wallet
            applications like CakeWallet or Monerujo.
          </li>
        </ul>
        <div className="">
          <div className="flex mt-6">
            <input
              type="checkbox"
              onClick={() => setIsChecked(!isChecked)}
              className="m-3 self-center checked:border-none"
            />
            <p className="tracking-tight text-sm self-center">
              I have secured my seed and understand that I am responsible for my
              own security
            </p>
          </div>
          <Link to="/login/open">
            <Button
              buttonWidth="w-auto"
              disabled={isDisabled}
              loading={isLoading}
            >
              Create Account
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CreateWallet;
