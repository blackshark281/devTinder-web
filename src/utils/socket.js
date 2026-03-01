import io from "socket.io-client";
import { BASE_URL } from "./constant";

export const createSocketConnection = () => {
  // if (location.hostname === "localhost") {
  //   return io(BASE_URL);
  // } else {
    return io("https://devtinder-m5n9.onrender.com", { path: "/api/socket.io", transports: ["websocket"] });
  // }
};