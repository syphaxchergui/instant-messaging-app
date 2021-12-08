import React from "react";
import "./App.css";
import LogIn from "./components/LogIn";
import { ChatContext, ChatProvider } from "./context/ChatProvider";
import io from "socket.io-client";
import ChatRoom from "./components/ChatRoom";

let socket;
const CONNECTION_PORT = "localhost:3001/";

function App() {
  const { isLogged, updateSocket, room, userName } =
    React.useContext(ChatContext);

  React.useEffect(() => {
    socket = io(CONNECTION_PORT);
    updateSocket(socket);
  }, []);

  return <div className='App'>{!isLogged ? <LogIn /> : <ChatRoom />}</div>;
}

export default () => {
  return (
    <ChatProvider>
      <App />
    </ChatProvider>
  );
};
