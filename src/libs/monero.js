import { DEFAULT_ID } from "monero-javascript/src/main/js/daemon/MoneroDaemonRpc";

const monerojs = require("monero-javascript");

export async function createWallet(lang = "English") {
  let walletWasm = await monerojs.createWalletWasm({
    networkType: "stagenet",
    language: lang,
    password: "penis",
    serverUri: "http://stagenet.community.xmr.to:38081",
  });
  return walletWasm;
}

export async function newSubaddress(walletWasm) {
  return await walletWasm.createSubaddress(0, "");
}

export async function getMnemonic(walletWasm) {
  return await walletWasm.getMnemonic();
}

export default { createWallet, newSubaddress, getMnemonic };
