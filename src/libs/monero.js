const monerojs = require("monero-javascript");
import sha256 from "crypto-js/sha256";
import Hex from "crypto-js/enc-hex";

let walletRpc = new monerojs.MoneroRpcConnection({
  //uri: "http://stagenet.community.xmr.to:38081",
  uri: "http://localhost:38081",
  username: "superuser",
  password: "abctesting123",
  rejectUnauthorized: false, // e.g. local development
});

export async function createWallet(lang = "English") {
  console.log("Creating new wallet");
  let walletWasm = await monerojs.createWalletWasm({
    networkType: "stagenet",
    language: lang,
    password: "penis",
    server: walletRpc,
  });
  return walletWasm;
}

export async function openWalletFromSeed(seed) {
  let walletWasm = await monerojs.createWalletWasm({
    networkType: "stagenet",
    mnemonic: seed,
    password: "penis",
    server: walletRpc,
  });
  return walletWasm;
}

export async function getPrimaryAddress(walletWasm) {
  return await walletWasm.getPrimaryAddress();
}

export async function createSubaddress(walletWasm) {
  return await walletWasm.createSubaddress(0, "");
}

export async function getMnemonic(walletWasm) {
  return await walletWasm.getMnemonic();
}

export function getMnemonicHash(seed) {
  return Hex.stringify(sha256(seed));
}

export async function sync(wallet, MoneroWalletListener, startHeight) {
  wallet.sync(MoneroWalletListener, startHeight);
}

class MyWalletListener extends monerojs.MoneroWalletListener {
  constructor(fn) {
    super();
    this.fn = fn;
  }
  onSyncProgress(height, startHeight, endHeight, percentDone, message) {
    this.fn(percentDone);
  }
}

export default {
  createWallet,
  openWalletFromSeed,
  getPrimaryAddress,
  createSubaddress,
  getMnemonic,
  getMnemonicHash,
  sync,
  MyWalletListener,
};
