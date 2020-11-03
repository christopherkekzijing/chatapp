import React from "react";
import "../CSS/SidebarChannel.css";
import { useDispatch } from "react-redux";
import { setChannelInfo } from "../features/appSlice";
import { selectchannelName } from "../features/appSlice";
import { useSelector } from "react-redux";
import { setSlide } from "../features/userSlice";
import { useMediaQuery } from "react-responsive";

function SidebarChannel({ id, channel }) {
  const name = useSelector(selectchannelName);
  const dispatch = useDispatch();

  const isMobile = useMediaQuery({ query: "(max-width: 500px)" });

  const displayMsg = () => {
    dispatch(
      setChannelInfo({
        channelId: id,
        channelName: channel,
      }),
    );
  };

  const displayMsgMobile = () => {
    dispatch(setSlide());
    dispatch(
      setChannelInfo({
        channelId: id,
        channelName: channel,
      }),
    );
  };
  return (
    <div
      className={`sidebarChannel ${name === channel && "active"} `}
      onClick={isMobile ? displayMsgMobile : displayMsg}
    >
      <h4>
        <span className="sidebarChannel_hash">#</span>
        {channel}
      </h4>
    </div>
  );
}

export default SidebarChannel;
