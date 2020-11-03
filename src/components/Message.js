import React, { forwardRef } from "react";
import "../CSS/Message.css";
import { Avatar } from "@material-ui/core";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import moment from "moment";

const Message = ({ message, timestamp, user }) => {
  const authUser = useSelector(selectUser);

  return (
    <div
      className={`message ${
        authUser.email === user?.email && "message_sender"
      }`}
    >
      <Avatar className="message_photo" src={user?.photo} />
      <div className="message_info">
        <div className="message_message">
          <p
            className={authUser.email === user?.email ? "message_sender_p" : ""}
          >
            {message}
          </p>
        </div>

        <span
          className={`message_timestamp ${
            authUser.email === user?.email && "message_sender_timstamp"
          }`}
        >
          {moment(new Date(timestamp?.toDate())).format("MMMM DD, YYYY  h:m a")}
        </span>
      </div>
    </div>
  );
};

export default Message;
