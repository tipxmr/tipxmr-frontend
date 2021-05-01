import io from "socket.io-client";
const socketAnimation = io(`${process.env.REACT_APP_SOCKET_URL}/animation`);

// ===============================================================
// Animation Functions
// ===============================================================

export function emitGetAnimationConfig(userName) {
  socketAnimation.emit("getAnimationConfig", userName);
}

export function onGetAnimationConfig(callback) {
  socketAnimation.on("getAnimationConfig", (animation) => {
    callback(animation);
  });
}
