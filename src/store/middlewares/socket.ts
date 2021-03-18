import { Middleware } from "redux";
import { io, Socket } from "socket.io-client";

const socketMiddleware: Middleware = (store) => {
  let socket: Socket | undefined;

  if (!socket) {
    socket = io("http://localhost:8080");
  }

  return (next) => (action) => {
    // if (action.type === login.type) {
    //     socket?.close();

    console.log({ socket });

    // if (!socket) {
    //   socket = io("http://localhost:8080");
    // }

    console.log({ socket });

    if (socket) {
      socket.on("connect", () => {
        console.log("Connected to server");
        console.log("ping");
        socket?.emit("ping");
      });

      //     socket.on('receive', (message: string) => {
      //         store.dispatch(receive(message));
      //     });

      socket.on("pong", () => {
        console.log("pong");
      });
    }

    // }

    // if (action.type === logout.type) {
    //     socket?.close();
    // }

    // if (action.type === send.type) {
    //     socket?.emit("send", "Hello from Client");
    // }

    return next(action);
  };
};

export default socketMiddleware;
