import React, { useState, useEffect } from "react";
import "../CSS/Chat.css";
import ChatHeader from "./ChatHeader";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import SendIcon from "@material-ui/icons/Send";
import Message from "../components/Message";
import { useSelector } from "react-redux";
import { selectUser, selectSlide } from "../features/userSlice";
import {
  selectchannelId,
  selectchannelName,
  selectchannelOwner,
} from "../features/appSlice";
import db from "../features/firebase";
import firebase from "firebase";
import { v4 } from "uuid";

function Chat() {
  const user = useSelector(selectUser);
  const slideCondition = useSelector(selectSlide);
  const channelId = useSelector(selectchannelId);
  const channelName = useSelector(selectchannelName);
  const owner = useSelector(selectchannelOwner);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (channelId) {
      db.collection("channels")
        .doc(channelId)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data())),
        );
    }
  }, [channelId]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (input !== "") {
      db.collection("channels").doc(channelId).collection("messages").add({
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        uid: v4(),
        user: user,
        message: input,
      });
    }

    setInput("");
  };
  console.log(owner);
  return (
    <div className={`chat ${slideCondition ? "slideIn" : "slideOut"}`}>
      <ChatHeader
        channelName={channelName}
        access={owner === user.email ? true : false}
      />

      <div className="chat_messages">
        {messages.map((message) => (
          <Message
            key={message.id}
            id={message.id}
            message={message.message}
            user={message.user}
            timestamp={message.timestamp}
          />
        ))}
      </div>

      <div className="chat_input">
        <AddCircleIcon fontSize="large" />
        <form>
          <input
            placeholder={`Message ${channelName}`}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={!channelId}
          />
          <div className="chat_inputIcons">
            <button
              className="check_inputButton"
              type="submit"
              onClick={sendMessage}
            >
              <SendIcon fontSize="" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Chat;
