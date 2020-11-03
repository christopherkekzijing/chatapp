import React, { useState, useEffect } from "react";
import "../CSS/Sidebar.css";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import SignalCellularAltIcon from "@material-ui/icons/SignalCellularAlt";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import AddIcon from "@material-ui/icons/Add";
import SidebarChannel from "../components/SidebarChannel";
import { Avatar } from "@material-ui/core";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import db, { auth } from "../features/firebase";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

function Sidebar() {
  const user = useSelector(selectUser);
  const [channels, setChannels] = useState([]);

  useEffect(() => {
    db.collection("channels").onSnapshot((snapshot) =>
      setChannels(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          channel: doc.data(),
          owner: doc.data().owner,
        })),
      ),
    );
  }, []);

  const handleAddChannel = () => {
    const channelName = prompt("enter channel name");
    if (channelName) {
      db.collection("channels").add({
        channelName,
        owner: user.email,
        member: [user.email],
      });
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar_top">
        <h3>ChatApp</h3>
        <ExpandMoreIcon />
      </div>
      <div className="sidebar_channels">
        <div className="sidebar_channelsHeader">
          <div className="sidebar_header">
            <ExpandMoreIcon />
            <h4>Your Channels</h4>
          </div>
          <AddIcon onClick={handleAddChannel} className="sidebar_addChannel" />
        </div>
        <div className="sidebar_channelsList">
          {channels
            .filter(({ channel }) => channel?.member?.includes(user?.email))
            .map(({ channel, id }) => (
              <SidebarChannel
                key={id}
                id={id}
                channel={channel.channelName}
                owner={channel.owner}
              />
            ))}
        </div>
      </div>

      <div className="sidebar_voice">
        <SignalCellularAltIcon className="sidebar_voiceIcon" fontSize="Large" />
        <div className="sidebar_voiceInfo">
          <h3>Connected</h3>
          <p>Live</p>
        </div>
        <div className="sidebar_voiceIcons">
          <InfoOutlinedIcon />
        </div>
      </div>
      <div className="sidebar_profile">
        <Avatar src={user.photo} />
        <div className="sidebar_profileInfo">
          <h3>{user.displayName}</h3>
          <p>{user.uid.substring(0, 5)}</p>
        </div>
        <div className="sidebar_profileIcons">
          <ExitToAppIcon
            className="sidebar_signout_button"
            onClick={() => auth.signOut()}
          />
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
