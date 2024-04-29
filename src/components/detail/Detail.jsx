import React from "react";
import "./detail.css";
import { auth, db } from "../lib/firebase";
import { chatStore } from "../lib/chatStore";
import { userStore } from "../lib/userStore";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";

const Detail = () => {
  const { chatId, user, isCurrentuserblocked, isReceiverBlocked, changeBlock } =
    chatStore();
  const { currentUser } = userStore();

  const handleBlock = async () => {
    if (!user) return;

    const userDocRef = doc(db, "users", currentUser.id);

    try {
      await updateDoc(userDocRef, {
        blocked: isReceiverBlocked ? arrayRemove(user.id) : arrayUnion(user.id),
      });
      changeBlock();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="detail">
      <div className="user">
        <img src={user?.avatar || "/avatar.png"} alt="" />
        <h2>{user?.username}</h2>
        <p>Lorem ipsum dolor sit.</p>
      </div>
      <div className="info">
        <div className="option">
          <div className="title">
            <span>Chat settings</span>
            <img src="/arrowUp.png" alt="" />
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Privacy & help</span>
            <img src="/arrowUp.png" alt="" />
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Shared photos</span>
            <img src="/arrowDown.png" alt="" />
          </div>
          <div className="photos">
            <div className="photoItem">
              <div className="photoDetail">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcjb37k7YjRZZzndIiwtRVUw7YBDXCAVZtfQ&s"
                  alt=""
                />
                <span>photo_2024_2.png</span>
              </div>
              <img src="/download.png" className="icon" alt="" />
            </div>
            <div className="photoItem">
              <div className="photoDetail">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcjb37k7YjRZZzndIiwtRVUw7YBDXCAVZtfQ&s"
                  alt=""
                />
                <span>photo_2024_2.png</span>
              </div>
              <img src="/download.png" className="icon" alt="" />
            </div>
            <div className="photoItem">
              <div className="photoDetail">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcjb37k7YjRZZzndIiwtRVUw7YBDXCAVZtfQ&s"
                  alt=""
                />
                <span>photo_2024_2.png</span>
              </div>
              <img src="/download.png" className="icon" alt="" />
            </div>
            <div className="photoItem">
              <div className="photoDetail">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcjb37k7YjRZZzndIiwtRVUw7YBDXCAVZtfQ&s"
                  alt=""
                />
                <span>photo_2024_2.png</span>
              </div>
              <img src="/download.png" className="icon" alt="" />
            </div>
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Shared Files</span>
            <img src="/arrowUp.png" alt="" />
          </div>
        </div>
        <button onClick={handleBlock}>
          {isCurrentuserblocked
            ? "You are Blocked!"
            : isReceiverBlocked
            ? "User blocked"
            : "Block User"}
        </button>
        <button className="logout" onClick={() => auth.signOut()}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Detail;
