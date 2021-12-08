import React from "react";
import Paper from "@mui/material/Paper";
import "../App.css";

const Message = ({ author, date, m, isMe }) => {
  const me = 'Me'
  return (
    <Paper
      sx={{
        p: "2px 4px",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        marginTop: 2,
        backgroundColor: isMe ? "#1976d2" : "#090909",
        color: "#fff",
        paddingLeft: "10px",
        paddingRight: "10px",
        margin: "0px 0px 10px 0px",
      }}>
      <p className='message-author'>{isMe ? me : author}</p>
      <p className='message-time'>{date}</p>
      <p className='message'>{m}</p>
    </Paper>
  );
};

export default Message;
