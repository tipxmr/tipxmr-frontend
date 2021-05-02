import { socketAnimation } from "./socket";

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
