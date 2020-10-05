import io from "socket.io-client";
const socketStreamer = io("ws://localhost:3000/streamer");

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

function onRecieveStreamerConfig(callback) {
  socketStreamer.on("recieveStreamerConfig", (requestedStreamerConfig) => {
    callback(requestedStreamerConfig);
  });
}

function emitGetStreamerConfig(hashedSeed) {
  socketStreamer.emit("getStreamerConfig", hashedSeed);
}

function emitUpdateStreamerConfig(streamerConfig) {
  socketStreamer.emit("updateConfig", streamerConfig);
}

function emitStreamerInfo(streamerConfig) {
  socketStreamer.emit("streamerInfo", streamerConfig);
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

function emitUpdateOnlineStatus(hashedSeed, newOnlineStatus) {
  socketStreamer.emit("updateOnlineStatus", { hashedSeed, newOnlineStatus });
}

export default {
  emitGetStreamerConfig,
  onRecieveStreamerConfig,
  emitUpdateStreamerConfig,
  emitUpdateOnlineStatus,
  emitStreamerInfo,
  emitPaymentRecieved,
  emitSubaddressToBackend,
  onCreateSubaddress,
};
