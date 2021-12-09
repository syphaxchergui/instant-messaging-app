import React from "react";
import Paper from "@mui/material/Paper";
import "../App.css";

const MessageSys = ({ m }) => {
  const me = "Me";
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        //backgroundColor: "#1976d2",
        paddingLeft: "10px",
        paddingRight: "10px",
        margin: "0px 0px 2px 0px",
      }}>
      <p
        className='message'
        style={{ color: "#777", fontSize: "12px", fontStyle: "italic" }}>
        {m}
      </p>
    </div>
  );
};

export default MessageSys;
