import React from "react";
import { userStore } from "../../lib/userStore";
import "./styles.css";
const UserInfo = () => {
  const { currentUser } = userStore();
  return (
    <div className="userInfo">
      <div className="user">
        <img src={currentUser?.avatar || "/avatar.png"} alt="" />
        <h2>{currentUser?.username}</h2>
      </div>
      <div className="icons">
        <img src="./mor e.png" />
        <img src="./video.png" />
        <img src="./edit.png" />
      </div>
    </div>
  );
};

export default UserInfo;
