const monerojs = require("monero-javascript");
import sha256 from "crypto-js/sha256";
import Hex from "crypto-js/enc-hex";
import QRCode from "qrcode";

export async function createWallet(lang = "English") {
  console.log("Creating new wallet");
  let walletWasm = await monerojs.createWalletWasm({
    networkType: "stagenet",
    language: lang,
    password: "pass123",
    // serverUri: "http://192.168.0.119:38081",
    serverUri: "http://localhost:38081",
    serverUsername: "superuser",
    serverPassword: "abctesting123",
    rejectUnauthorized: false, // e.g. local development
  });
  return walletWasm;
}

export async function openWalletFromSeed(seed) {
  let walletWasm = await monerojs.createWalletWasm({
    networkType: "stagenet",
    mnemonic: seed,
    password: "pass123",
    // serverUri: "http://192.168.0.119:38081",
    serverUri: "http://localhost:38081",
    serverUsername: "superuser",
    serverPassword: "abctesting123",
    rejectUnauthorized: false, // e.g. local development
  });
  return walletWasm;
}

export async function getPrimaryAddress(walletWasm) {
  return await walletWasm.getPrimaryAddress();
}

export async function createSubaddress(walletWasm) {
  const subadress = await walletWasm.createSubaddress(0, "");
  return await subadress.state.address;
}

export async function getSubaddress(walletWasm, index) {
  const subadress = await walletWasm.getSubaddress(0, index);
  return await subadress.state.address;
}

export async function getMnemonic(walletWasm) {
  return await walletWasm.getMnemonic();
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

class MyWalletListener extends monerojs.MoneroWalletListener {
  constructor(
    setPercentageSynced,
    setCurrentBlockheight,
    getNewOutput,
    getCurrentDonorInfo
  ) {
    super();
    this.setPercentageSynced = setPercentageSynced;
    this.getNewOutput = getNewOutput;
    this.setCurrentBlockheight = setCurrentBlockheight;
    this.getCurrentDonorInfo = getCurrentDonorInfo;
  }
  onSyncProgress(height, startHeight, endHeight, percentDone, message) {
    console.log("Syncing Block " + height + " of " + endHeight);
    this.setPercentageSynced(
      Math.round(
        ((height - startHeight + 1) / (endHeight - startHeight)) * 1000
      ) / 10.0
    ); // Round to one decimal
  }
  onOutputReceived(output) {
    if (
      output.state.tx.state.inTxPool &&
      output.state.tx.state.isLocked &&
      output.state.tx.state.isIncoming
    ) {
      console.dir("monerojs: onOutputReceived", output);
      this.getNewOutput({
        subaddressIndex: output.getSubaddressIndex(),
        amount: output.getAmount(),
      });
    }
  }
  onNewBlock(height) {
    this.setCurrentBlockheight(height);
  }
}

class IncomingLockedTxListener extends monerojs.MoneroWalletListener {
  constructor(handleTx) {
    super();
    this.handleTx = handleTx;
  }

  onOutputReceived(output) {
    if (
      output.state.tx.state.inTxPool &&
      output.state.tx.state.isLocked &&
      output.state.tx.state.isIncoming
    ) {
      this.handleTx({
        subaddressIndex: output.getSubaddressIndex(),
        amount: output.getAmount(),
      });
    }
  }
}

export async function generateQrCode(subaddress) {
  return await QRCode.toDataURL(subaddress, { errorCorrectionLevel: "L" });
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
  MyWalletListener,
  generateQrCode,
  IncomingLockedTxListener,
};
