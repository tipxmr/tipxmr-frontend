import { Middleware } from "redux";
import { io, Socket } from "socket.io-client";
// import { DonatorClientToServerEvents, DonatorServerToClientEvents } from "../../libs/socket/events";

import { actions, requestStreamer, requestSubaddress, requestOnlineStreamers } from "../slices/donor";

const socketMiddleware: Middleware = (store) => {
  // let socket: Socket<DonatorClientToServerEvents, DonatorServerToClientEvents> | undefined;
  let socket: Socket | undefined;

  if (!socket) {
    socket = io("http://localhost:3000/donator");
  }

  return (next) => (action) => {
    if (socket) {
      // socket.on("connect", () => {
      //   console.log("Connected to server");
      //   // console.log("ping");
      //   // socket?.emit("ping");
      // });

      socket.on("recieveStreamer", (streamer) => {
        store.dispatch(actions.setStreamer(streamer));
      });
    
      socket.on("subaddressToDonator", (data) => {
        store.dispatch(actions.setSubaddress(data.subaddress));
      });
    
      socket.on("paymentConfirmation", (confirmation) => {
        store.dispatch(actions.setPayment({ confirmation }));
      });
    
      socket.on("emitOnlineStreamers", (onlineStreamers: any[]) => {
        store.dispatch(actions.setOnlineStreamers(onlineStreamers));
      });

      if (action.type === requestStreamer.type) {
        console.log(action);
        const { userName } = action.payload;
        socket?.emit("getStreamer", userName);
      }

      if (action.type === requestSubaddress.type) {
        const {
          donor,
          message,
          userName,
          displayName,
          _id,
        } = action.payload;

        socket?.emit("getSubaddress", {
          donor,
          message,
          userName,
          displayName,
          _id,
        });
      }

      if (action.type === requestOnlineStreamers.type) {
        socket?.emit("getOnlineStreamers");
      }
    }

    return next(action);
  };
};

export default socketMiddleware;
