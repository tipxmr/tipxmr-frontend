import React from "react";

function Disclaimer() {
  return (
    <div className="w-3/4 my-3 mx-auto text-gray-200">
      <div className="mx-auto my-8">
        <h2 className="text-2xl text-center my-3">Introduction & Disclaimer</h2>
        <p className="text-sm text-center">
          Monero (XMR) is a cryptocurrency, in many ways similiar to Bitcoin.
          However, the main difference to Bitcoin is that{" "}
          <em>every transaction in Monero is private</em>. <br />
          This means that the sender, reciever and the amount of ever
          transaction are hidden with cryptographic techniques. While it is
          fascinating to some to learn about how Monero works, it is not
          required to be able to use it. Just like most drivers don't understand
          the internals of the combustion engine.
        </p>
        <div className="border-4 border-xmrorange my-8 p-5 shadow-xl rounded text-center text-xmrorange-darker">
          <p className="text-2xl text-center">Important:</p>
          <p className="text-lg ">
            At no point in time tipxmr.live has access to your Monero. We cannot
            spend it and we cannot guarantee it's safety. While the Monero
            protocol is very secure itself,{" "}
            <span className="underline">your safety is your responsiblity</span>
            .
          </p>
        </div>
        <div className="my-2">
          <h3 className="text-xl text-center underline my-3">
            Tips for your safety:
          </h3>
          <ul className="list-decimal">
            <li className="mb-3">
              Never EVER lose your seed phrase and keep it secret. These are the
              keys to your wallet, whoever has access can spend your money.
              Write the 25 words down on a{" "}
              <a
                href="https://www.monero.how/monero-paper-wallet-offline-cold-storage"
                target="_blank"
                className="underline text-xmrorange"
              >
                piece of paper
              </a>{" "}
              and store it securely.
            </li>
            <li className="mb-3">
              Make sure that your computer is not infected with malware. A
              keylogger for example could read your seed when signing on.
            </li>
            <li className="mb-3">
              Only use wallet software that is endorsed by the&nbsp;
              <a
                href="https.//getmonero.org/downloads"
                className="underline text-xmrorange"
                target="_blank"
              >
                Monero Project
              </a>
              , namely:
              <ul className="list-disc w-5/6 mx-auto mt-3 text-sm">
                <li>
                  <a
                    href="https.//getmonero.org/downloads"
                    className="underline text-xmrorange text-base"
                    target="_blank"
                  >
                    MyMonero
                  </a>{" "}
                  (iOS/Desktop/Browser)
                </li>
                <li>
                  <a
                    href="https.//getmonero.org/downloads"
                    className="underline text-xmrorange text-base"
                    target="_blank"
                  >
                    CakeWallet
                  </a>{" "}
                  (iOS/Android)
                </li>
                <li>
                  <a
                    href="https.//getmonero.org/downloads"
                    className="underline text-xmrorange text-base"
                    target="_blank"
                  >
                    Monerujo
                  </a>{" "}
                  (Android)
                </li>
              </ul>
            </li>
            <li className="mb-3">
              When logging into tipxmr.live with your seed make sure that the
              Website has a SSL-Certificate.
            </li>
            <li>Learn more about Monero!</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Disclaimer;
