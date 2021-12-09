import React from "react";
import "../App.css";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";
import Box from "@mui/material/Box";
import { ChatContext } from "../context/ChatProvider";
import Chip from "@mui/material/Chip";
import Message from "./Message";
import MessageSys from "./MessageSys";

const ChatRoom = () => {
  const { signOut, room, userName, socket, isLogged } =
    React.useContext(ChatContext);
  const [message, setMessage] = React.useState("");
  const [messageList, setMessageList] = React.useState([]);

  React.useEffect(() => {
    socket.on("recieve_msg", (data) => {
      console.log(data);
      setMessageList([
        ...messageList,
        {
          author: data.userName,
          date: new Date().toLocaleDateString(),
          message: data.message,
        },
      ]);
    });
    socket.on("user_joined_room", (data) => {
      console.log(data);
      setMessageList([
        ...messageList,
        {
          author: "sys",
          date: new Date().toLocaleDateString(),
          message: "User "+ data.name + " joined room @" + data.roomId,
        },
      ]);
    });
  });

  const sendMsg = () => {
    socket.emit("send_msg", { message, room, userName });
    setMessageList([
      ...messageList,
      {
        author: userName,
        date: new Date().toLocaleDateString(),
        message: message,
      },
    ]);
    setMessage("");
  };

  return (
    <div className='chatContainer'>
      <div className='connexion-info'>
        <p className='title'>Hi {userName} !</p>
        <Chip
          size='small'
          color='info'
          label={"Chat room @" + room}
          onDelete={signOut}
        />
      </div>
      <Box
        sx={{
          width: "95%",
          display: "flex",
          flexDirection: "column-reverse",
          alignItem: "center",
          justifyContent: "flex-start",
          overflowY: "auto",
          margin: 1,
          marginBottom: "70px",
        }}>
        {messageList.map((m) => {
          if (m.author === "sys") return <MessageSys m={m.message} />;
          else
            return (
              <Message
                author={m.author}
                date={m.date}
                m={m.message}
                isMe={m.author === userName ? true : false}
              />
            );
        })}
      </Box>

      <Paper
        component='form'
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          width: "95%",
          marginTop: 2,
          position: "absolute",
          bottom: 15,
        }}>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder='Enter your message...'
          inputProps={{ "aria-label": "enter your message" }}
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        />
        <IconButton onClick={sendMsg} sx={{ p: "10px" }} aria-label='send'>
          <SendIcon />
        </IconButton>
      </Paper>
    </div>
  );
};

export default ChatRoom;
