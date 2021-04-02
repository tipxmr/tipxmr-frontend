import { Manager, Socket } from "socket.io-client";
import {
  AnimationClientToServerEvents,
  AnimationServerToClientEvents,
  DonatorClientToServerEvents,
  DonatorServerToClientEvents,
  StreamerClientToServerEvents,
  StreamerServerToClientEvents,
  CommonClientToServerEvents,
  CommonServerToClientEvents,
  ServerToClientEvents,
  ClientToServerEvents,
} from "./events";

const manager: Manager<
  ClientToServerEvents,
  ServerToClientEvents
> = new Manager("ws://localhost:3000");

// const socket: Socket<
//   CommonClientToServerEvents,
//   CommonServerToClientEvents
// > = manager.socket("/");

const animation: Socket<
  AnimationClientToServerEvents,
  AnimationServerToClientEvents
> = manager.socket("/animation");

const donator: Socket<
  DonatorClientToServerEvents,
  DonatorServerToClientEvents
> = manager.socket("/donator");

const streamer: Socket<
  StreamerClientToServerEvents,
  StreamerServerToClientEvents
> = manager.socket("/streamer");

// socket.on("connection", () => {});

animation.on("connect", () => {});

donator.on("connect", () => {});

streamer.on("connect", () => {});
