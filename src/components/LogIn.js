import React from "react";
import "../App.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { ChatContext } from "../context/ChatProvider";

const LogIn = () => {
  const { signIn, socket } = React.useContext(ChatContext);
  const [roomId, setRoomId] = React.useState("");
  const [name, setName] = React.useState("");

  const connectToRoom = () => {
    socket.emit("join_room", { roomId, name });
  };

  return (
    <div className='logIn'>
      <h2 className='title'>Welcome !</h2>
      <Box
        mt={1}
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}>
        <TextField
          onChange={(e) => setName(e.target.value)}
          id='input-with-sx'
          label='Nickname'
          variant='standard'
        />
        <TextField
          onChange={(e) => setRoomId(e.target.value)}
          id='input-with-sx'
          label='Room'
          variant='standard'
          margin='normal'
        />
      </Box>

      <Box mt={4}>
        <Button
          variant='contained'
          onClick={() => {
            if (roomId !== "" && name !== "") {
              signIn(roomId, name);
              connectToRoom();
            }
          }}>
          Enter Chat
        </Button>
      </Box>
    </div>
  );
};

export default LogIn;
