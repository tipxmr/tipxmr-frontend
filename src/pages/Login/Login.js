import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { useWallet, openFromSeed } from "~/context/wallet";
import { isValidMnemoicLength, getMnemonicHash } from "~/libs/monero";
import { useRecoilValue } from "recoil";
import { streamerState, dispatcherState } from "../../store/atom";
import { isNil } from "ramda";
import socket_streamer from "~/libs/socket_streamer";
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
    <div className="text-center mt-4">
      <span
        className="uppercase tracking-tight font-bold mb-2"
        htmlFor="languages"
      >
        Seed language:
      </span>
      <select
        id="languages"
        name="languages"
        value={language}
        onChange={onChange}
        className="ml-4 p-2 appearance-none bg-xmrgray-darker border border-xmrorange py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:border-gray-500"
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

function PickUserName({ onChange, isLoading, userNameError }) {
  return (
    <div className="text-center mt-10">
      <h2 className="text-2xl">Pick your username</h2>
      <input
        className="text-xmrgray-darker p-2 rounded focus:border-none"
        onChange={onChange}
        disabled={isLoading}
      ></input>
      <p className="text-xmrorange mt-2">{userNameError}</p>
      <p className="tracking-tight text-xs text-xmrgray-light mt-2">
        This name cannot be changed once chosen
      </p>
    </div>
  );
}

const defaultLanguage = languages[1];

function Login() {
  // states
  const [language, setLanguage] = useState(defaultLanguage);
  const [seed, setSeed] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatcher = useRecoilValue(dispatcherState);
  const streamer = useRecoilValue(streamerState);
  const [wallet, dispatch] = useWallet();
  const { isPending, isResolved } = wallet.status;
  const isWalletOpen = !isNil(wallet.wallet) && isNil(wallet.error);
  const [creationMode, setCreationMode] = useState(false);
  const [userName, setUserName] = useState(null);
  const [userNameNotSet, setUserNameNotSet] = useState(false);
  const [userNameError, setUserNameError] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    if (isChecked && !isLoading) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [isLoading, isChecked]);

  // this useEffect gets triggered, when the state lanugage changes
  useEffect(() => {
    if (creationMode) {
      createWallet(language);
    }
  }, [language]);

  useEffect(() => {
    // if 25 words are reached
    if (isValidMnemoicLength(seed) && !isWalletOpen && !isPending) {
      console.log("25 words reached");
      login();
      dispatch(openFromSeed(seed));
    }
  }, [dispatcher, isWalletOpen, isPending, dispatch, seed]);

  // Das streamer.restoreHeight, weil er erst weiterleiten soll,
  // wenn die Streamer Config vom Backend gesendet wurde
  if (
    isWalletOpen &&
    isResolved &&
    streamer.userName &&
    streamer.userName !== "" &&
    !userNameNotSet
  ) {
    console.log("Redirected");
    return <Redirect to="/dashboard" />;
  }

  function login() {
    const hashedSeed = getMnemonicHash(seed);
    // Login procedure
    socket_streamer.login(hashedSeed, userName, (response) => {
      console.log("CB response:", response);
      if (response.type === "success") {
        setUserNameNotSet(false);
        dispatcher.updateStreamer(response.data);
      } else {
        // 2 cases: userName taken or no userName set
        // no userName set
        if (response.error === "noUserName") {
          setUserNameNotSet(true);
          setUserNameError("No Username was set.");
          console.error("No Username was set.");
        } else if (response.error === "userNameTaken") {
          setUserNameNotSet(true);
          setUserNameError("Username is already taken.");
          console.error("Username is already taken.");
        }
      }
    });
  }

  function createWallet(lang) {
    setIsLoading(true);
    monerojs
      .createWallet(lang)
      .then(monerojs.getMnemonic)
      .then(setSeed)
      .then(() => setIsLoading(false));
  }

  function handleCreateWallet() {
    setCreationMode(true);
    createWallet(language);
  }

  // function for the LanguageSelector function, which sets the language state from the selected event target of the LanguageSelector
  function handleLanguageChange(event) {
    setLanguage(event.target.value);
  }

  function handleUserNameChange(event) {
    setUserName(event.target.value);
  }

  function handleSeedChanged(event) {
    setSeed(event.target.value);
  }

  // TODO Verify username input (lenght.., form errors)
  return (
    <div className="flex flex-row flex-1">
      <div className="flex-8">
        <h2 className="text-2xl text-center">
          Your Seed{" "}
          <span role="img" aria-label="wallet">
            👛
          </span>
        </h2>
        <div>
          {creationMode ? (
            <LanguageSelector
              language={language}
              languages={languages}
              onChange={handleLanguageChange}
              align="middle"
            />
          ) : null}
          <Button
            buttonWidth="w-auto"
            disabled={isLoading}
            loading={isLoading}
            onClick={handleCreateWallet}
          >
            Create New Wallet
          </Button>
        </div>
        <div className="flex justify-center mt-3 space-x-4">
          <textarea
            className="select-all outline-none text-gray-200 text-justify border-4 border-dashed border-xmrorange-lighter p-5 bg-xmrgray-darker rounded"
            id="seed"
            name="seed"
            rows="4"
            cols="50"
            placeholder="Open your wallet by entering your 25 seed words..."
            value={isLoading ? defaultStateSeed : seed}
            style={{ resize: "none" }}
            onChange={handleSeedChanged}
          />
          {isPending ? <Loading text="Loading your wallet" /> : null}
        </div>

        {creationMode || userNameNotSet ? (
          <PickUserName
            onChange={handleUserNameChange}
            isLoading={isLoading}
            userNameError={userNameError}
          />
        ) : null}
      </div>
      <div className="flex-3 self-center border-4 border-red-600 p-6 text-lg space-y-4 rounded">
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
        <ul className="list-decimal leading-tight space-y-5 px-6">
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
          <Button
            buttonWidth="w-auto"
            disabled={isDisabled}
            loading={isLoading}
            onClick={login}
          >
            Create Account
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Login;
