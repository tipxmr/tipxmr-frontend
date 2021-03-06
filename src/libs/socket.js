import { Manager } from "socket.io-client";

const manager = new Manager(process.env.REACT_APP_SOCKET_URL, {
  path: process.env.REACT_APP_SOCKET_PATH
});

export const socketAnimation = manager.socket("/animation");
export const socketDonator = manager.socket("/donator");
export const socketStreamer = manager.socket("/streamer");