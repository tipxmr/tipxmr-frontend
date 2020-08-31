const monerojs = require("monero-javascript");

export async function createWallet() {
  let walletWasm = await monerojs.createWalletWasm({
    networkType: "stagenet",
    serverUri: "http://stagenet.community.xmr.to:38081",
    mnemonic:
      "reef dilute hold vats usher apart atom muppet vegan relic enlist spout layout identity obtains urgent lymph jaunt koala agile anybody wagtail roster sickness wagtail",
    password: "penis",
    restoreHeight: 650434,
  });
  return walletWasm;
}

export async function newSubaddress(walletWasm) {
  return await walletWasm.createSubaddress(0, "test");
}
