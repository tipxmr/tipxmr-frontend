import io from "socket.io-client";
const socket = io("ws://localhost:3000");

// ===============================================================
// Streamer Functions
// ===============================================================

// socket.on functions
export function getSubaddress(callback) {
  socket.on("getSubaddress", (data) => {
    callback(data);
  });
}

// socket.emit functions
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

// socket.on functions
export function onPaymentRecieved(callback) {
  socket.on("paymentRecieved", (newDonation) => {
    callback(newDonation);
  });
}

export default {
  emitStreamerInfo,
  emitPaymentRecieved,
  emitReturnSubaddress,
};
