import { socketStreamer } from "./socket";

// ===============================================================
// Streamer Functions
// ===============================================================

// socket.on functions
function onCreateSubaddress(callback) {
  socketStreamer.on("createSubaddress", (data) => {
    console.log("I have to create a subbaddress now");
    callback(data);
  });
}

async function login(_id, userName = null, callback) {
  socketStreamer.emit("login", { _id, userName }, (response) => {
    callback(response);
  });
}

function emitUpdateStreamerConfig(streamerConfig) {
  socketStreamer.emit("updateConfig", streamerConfig);
}

function emitPaymentRecieved(newDonation) {
  /*newDonation = {
            subaddress: subaddress,
            amount: output.amount,
            donor: donationsInfo.donor,
            message: donationsInfo.message,
            userName: donationsInfo.userName,
            displayName: donationsInfo.displayName,
          }; */
  socketStreamer.emit("paymentRecieved", newDonation);
}

function emitSubaddressToBackend(newDonorInfo) {
  socketStreamer.emit("subaddressToBackend", newDonorInfo);
}

function emitUpdateOnlineStatus(_id, newOnlineStatus) {
  socketStreamer.emit("updateOnlineStatus", { _id, newOnlineStatus });
}

// testing things out, cheers, alex
function emitGetAnimationConfig(streamerName) {
  socketStreamer.emit("getAnimationConfig", streamerName);
}

export default {
  emitUpdateStreamerConfig,
  emitUpdateOnlineStatus,
  login,
  emitPaymentRecieved,
  emitSubaddressToBackend,
  onCreateSubaddress,
};
