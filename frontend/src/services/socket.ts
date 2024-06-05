import io from "socket.io-client";

const socket = io(process.env.API_Url as string, {
  withCredentials: false,
  transports: ["websocket"],
});

export { socket };