import React from "react";

export const ChatContext = React.createContext();

export const ChatProvider = (props) => {
  const [isLogged, setIsLogged] = React.useState();
  const [room, setRoom] = React.useState("");
  const [userName, setUserName] = React.useState("");
  const [socket, setSocket] = React.useState();

  React.useEffect(() => {
    if (window.sessionStorage.getItem("logged")) {
      setIsLogged(true);
    }
    if (window.sessionStorage.getItem("userName")) {
      setUserName(window.sessionStorage.getItem("userName"));
    }
    if (window.sessionStorage.getItem("room")) {
      setRoom(window.sessionStorage.getItem("room"));
    }
  }, []);

  const signIn = (room, uName) => {
    setIsLogged(true);
    window.sessionStorage.setItem("logged", true);
    window.sessionStorage.setItem("userName", uName);
    window.sessionStorage.setItem("room", room);
    setRoom(room);
    setUserName(uName);
    console.log(uName + " " + room);
  };

  const signOut = () => {
    setIsLogged(false);
    window.sessionStorage.setItem("logged", false);
    window.sessionStorage.setItem("userName", undefined);
    window.sessionStorage.setItem("room", undefined);
  };

  const updateSocket = (s) => {
    setSocket(s);
  };

  const contextValue = {
    isLogged,
    room,
    userName,
    socket,
    updateSocket,
    signIn,
    signOut,
  };
  return (
    <ChatContext.Provider value={contextValue}>
      {props.children}
    </ChatContext.Provider>
  );
};
