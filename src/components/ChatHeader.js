import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "../CSS/ChatHeader.css";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import { useDispatch } from "react-redux";
import { setSlide, selectSlide, selectUser } from "../features/userSlice";
import {
  setChannelInfo,
  selectchannelId,
  selectchannelName,
} from "../features/appSlice";
import db from "../features/firebase";

function ChatHeader({ channelName, access }) {
  const user = useSelector(selectUser);
  const slideCondition = useSelector(selectSlide);
  const channelId = useSelector(selectchannelId);
  const [back, setBack] = useState(false);
  const [owner, setOwner] = useState("");
  const [memberData, setMemberData] = useState([]);
  const name = useSelector(selectchannelName);
  const dispatch = useDispatch();

  const backFuntion = () => {
    dispatch(setSlide());
    dispatch(
      setChannelInfo({
        channelId: null,
        channelName: null,
      }),
    );
  };

  useEffect(() => {
    const ref = db.collection("channels");
    ref.get().then((member) => {
      const item = member.docs.map((doc) => doc.data());
      const sorteditem = item.filter((d) => d.channelName === name);
      setOwner(sorteditem[0]?.owner);
      setMemberData(sorteditem[0]?.member);
    });
  }, [name]);

  const handleAddMember = () => {
    const newMemberEmail = prompt("Enter new member email");
    const allMember = [...memberData, newMemberEmail];
    if (memberData.includes(newMemberEmail) && newMemberEmail !== "") {
      alert("User already in the group");
    } else if (newMemberEmail === "") {
      alert("You didn't input anything!");
    } else {
      if (channelId && newMemberEmail) {
        db.collection("channels")
          .doc(channelId)
          .set({ member: allMember }, { merge: true });
      } else {
        alert("Add user action cancel");
      }
    }

    setMemberData(allMember);
  };

  return (
    <div className="chatHeader">
      <div className="chatHeader_left">
        <h3>
          <span className="chatHeader_hash">#</span>
          {channelName}
        </h3>
      </div>
      <div className="chatHeader_right">
        {owner === user?.email && (
          <PersonAddIcon
            onClick={handleAddMember}
            className="chatHeader_addMemberIcon"
          />
        )}
        {slideCondition && (
          <ArrowBackIcon className="pointer" onClick={backFuntion} />
        )}
      </div>
    </div>
  );
}

export default ChatHeader;
