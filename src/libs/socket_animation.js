import io from "socket.io-client";
const socketAnimation = io("ws://tipxmr-backend:3000/animation");

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
