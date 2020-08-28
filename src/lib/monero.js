const monerojs = require("monero-javascript");

main();
async function main() {
  let walletWasm = await monerojs.createWalletWasm({
    password: "supersecretpassword123",
    networkType: "stagenet",
  });

  console.log("Seed:", await walletWasm.getMnemonic());
}
