import io from "socket.io-client";
import { BASE_URL, RENDER_URL } from "./constant";

export const createSocketConnection = () => {
  if (location.hostname === "localhost") {
    return io(BASE_URL);
  } else {
    // return io("/", { path: "/api/socket.io" }, {withCredentials: true});
    return io("/", {path: "https://devtinder-m5n9.onrender.com/"}, {transports:['websocket'], withCredentials: true});
  }
};