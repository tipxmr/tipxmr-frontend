import io from "socket.io-client";
const socket = io("ws://localhost:3000");

// ===============================================================
// Streamer Functions
// ===============================================================

// socket.on
export function getSubaddress(callback) {
  socket.on("getSubaddress", (data) => {
    callback(data);
  });
}

// emit functions
export function emitStreamerInfo(streamerName, hashedSeed) {
  socket.emit("streamerInfo", {
    streamerName,
    hashedSeed,
  });
}

export function emitPaymentRecieved(newDonation) {
  socket.emit("paymentRecieved", newDonation);
}

export function emitReturnSubaddress(newDonorInfo) {
  socket.emit("returnSubaddress", newDonorInfo);
}

// ===============================================================
// Donator Functions
// ===============================================================

export default {
  emitStreamerInfo,
  emitPaymentRecieved,
  emitReturnSubaddress,
};
