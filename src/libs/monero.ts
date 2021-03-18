import sha256 from "crypto-js/sha256";
import Hex from "crypto-js/enc-hex";
import QRCode from "qrcode";
const monerojs = require("monero-javascript");

export async function createWallet(lang = "English") {
  console.log("Creating new wallet");
  let walletFull = await monerojs.createWalletFull({
    networkType: "stagenet",
    language: lang,
    password: "pass123",
    serverUri: "http://localhost:38081",
    serverUsername: "superuser",
    serverPassword: "abctesting123",
    rejectUnauthorized: false, // e.g. local development
  });
  return walletFull;
}

export async function openWalletFromSeed(seed) {
  let walletFull = await monerojs.createWalletFull({
    networkType: "stagenet",
    mnemonic: seed,
    password: "pass123",
    serverUri: "http://localhost:38081",
    serverUsername: "superuser",
    serverPassword: "abctesting123",
    rejectUnauthorized: false, // e.g. local development
  });
  console.log(walletFull);
  return walletFull;
}

export async function getPrimaryAddress(walletFull) {
  return await walletFull.getPrimaryAddress();
}

export async function createSubaddress(walletFull) {
  const subadress = await walletFull.createSubaddress(0, "");
  return await subadress.state.address;
}

export async function getSubaddress(walletFull, index) {
  const subadress = await walletFull.getSubaddress(0, index);
  return await subadress.state.address;
}

export async function getMnemonic(walletFull) {
  return await walletFull.getMnemonic();
}

export function getMnemonicHash(seed) {
  return Hex.stringify(sha256(seed));
}

export async function startSyncing(wallet, listeners, syncHeight) {
  await wallet.setSyncHeight(syncHeight); // start sync at block x

  listeners.forEach((listener) => {
    wallet.addListener(listener);
  });

  // await wallet.addListener(moneroWalletListener);
  await wallet.startSyncing();
}

export async function stopSyncing(wallet) {
  await wallet.stopSyncing();

  wallet.getListeners().forEach((listener) => {
    wallet.removeListener(listener);
  });

  // await wallet.removeListener(wallet.getListeners()[0]);
}

export async function getTxs(walletFull) {
  const query = {
    // isConfirmed: true,
  };
  return await walletFull.getTxs(query);
}

export async function generateQrCode(subaddress) {
  return await QRCode.toDataURL(subaddress, { errorCorrectionLevel: "L" });
}

export function isValidMnemoicLength(seed) {
  const words = seed.split(" ").filter((word) => word.length);
  return words.length === 25;
}

export function isValidAddress(address) {
  // as long as monero-javascript doesn't provide a good validation, tipxmr uses own version
  // return monerojs.MoneroUtils.isValidAddress(address);
  if (typeof address === "string") {
    if (address.length === 95) {
      if (monerojs.GenUtils.isBase58(address)) {
        console.log("Address valid");
        return true;
      } else {
        console.error("Address not in base58 format");
      }
    } else {
      console.error("Address not 95 characters");
    }
  } else {
    console.error("Address not a string");
  }
  return false;
}

async function createTx(wallet, address, amount) {
  try {
    return await wallet.createTx({
      accountIndex: 0,
      address,
      // eslint-disable-line
      amount: BigInt(Math.round(amount * Math.pow(10, 12))),
      relay: true, // relay the transaction to the network
      priority: monerojs.MoneroTxPriority.UNIMPORTANT,
    });
  } catch (error) {
    console.error("Error with createTx", error);
    return new Error(error);
  }
}

export default {
  createWallet,
  openWalletFromSeed,
  getPrimaryAddress,
  createSubaddress,
  getSubaddress,
  getMnemonic,
  getMnemonicHash,
  startSyncing,
  stopSyncing,
  getTxs,
  generateQrCode,
  isValidMnemoicLength,
  isValidAddress,
  createTx,
};
