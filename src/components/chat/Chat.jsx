import React, { useState, useRef, useEffect } from "react";
import EmojiPicker from "emoji-picker-react";
import "./chat.css";
import {
  arrayUnion,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { db } from "../lib/firebase";
import { chatStore } from "../lib/chatStore";
import { userStore } from "../lib/userStore";
import upload from "../lib/upload";
const Chat = () => {
  const endRef = useRef(null);
  const [chat, setChat] = useState();
  const [open, setOpen] = useState(false);
  const [text, setText] = useState(null);
  const [img, setImg] = useState({
    file: null,
    url: "",
  });

  const { currentUser } = userStore();
  const { chatId, user, isReceiverBlocked, isCurrentUserBlocked } = chatStore();

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    const onSub = onSnapshot(doc(db, "chats", chatId), (res) => {
      setChat(res.data());
    });
    return () => {
      onSub();
    };
  }, [chatId]);
  const handleEmoji = (e) => {
    setText((prev) => prev + e.emoji);
    setOpen(falser);
  };

  const handleImg = (e) => {
    if (e.target.files[0]) {
      setImg({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  const handleSend = async () => {
    if (text === "") return;

    let imgUrl = null;
    try {
      if (img.file) {
        imgUrl = await upload(img.file);
      }
      await updateDoc(doc(db, "chats", chatId), {
        messages: arrayUnion({
          senderId: currentUser.id,
          text,
          createdAt: new Date(),
          ...(imgUrl && { img: imgUrl }),
        }),
      });

      const userIds = [currentUser.id, user.id];

      userIds.forEach(async (id) => {
        const userChatsRef = doc(db, "userchats", id);
        const userChatsSnap = await getDoc(userChatsRef);
        if (userChatsSnap.exists()) {
          const userChatsData = userChatsSnap.data();
          const chatIndex = userChatsData.chats.findIndex(
            (c) => c.chatId === chatId
          );
          userChatsData.chats[chatIndex].lastMessage = text;
          userChatsData.chats[chatIndex].isSeen = id === currentUser.id;
          userChatsData.chats[chatIndex].updatedAt = Date.now();

          await updateDoc(userChatsRef, {
            chats: userChatsData.chats,
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
    setImg({
      file: null,
      url: "",
    });
    setText("");
  };

  return (
    <div className="chat">
      <div className="top">
        <div className="user">
          <img
            src={
            
                 user?.avatar || "/avatar.png"
            }
            alt=""
          />
          <div className="texts">
            <span>{user?.username}</span>
            <p>Lorem ipsum dolor sit.</p>
          </div>
        </div>
        <div className="icons">
          <img src="/phone.png" alt="" />
          <img src="/video.png" alt="" />
          <img src="/info.png" alt="" />
        </div>
      </div>
      <div className="center">
        {chat?.messages?.map((item) => (
          <div
            className={
              item?.senderId === currentUser?.id ? "message own" : "message"
            }
            key={item?.createdAt}
          >
            {item?.img && <img src={item.img} alt="" />}
            <div className="texts">
              <p>{item?.text}</p>
              {/* <span>{item?.createdAt}</span> */}
            </div>
          </div>
        ))}
        {img.url && (
          <div className="message own">
            <div className="texts">
              <img src={img.url} alt="" />
            </div>
          </div>
        )}
        <div ref={endRef}></div>
      </div>
      <div className="bottom">
        <div className="icons">
          <label htmlFor="file">
            <img src="/img.png" alt="" />
          </label>
          <input
            type="file"
            id="file"
            style={{ display: "none" }}
            onChange={handleImg}
          />
          <img src="/camera.png" alt="" />
          <img src="/mic.png" alt="" />
        </div>
        <input
          type="text"
          value={text}
          placeholder={
            isCurrentUserBlocked || isReceiverBlocked
              ? "You cannot send a message"
              : "Type a message..."
          }
          onChange={(e) => setText(e.target.value)}
          disabled={isCurrentUserBlocked || isReceiverBlocked}
        />
        <div className="emoji">
          <img src="/emoji.png" alt="" onClick={() => setOpen(!open)} />
          <div className="picker">
            <EmojiPicker open={open} onEmojiClick={handleEmoji} />
          </div>
        </div>
        <button
          className="sendButton"
          onClick={handleSend}
          disabled={isCurrentUserBlocked || isReceiverBlocked}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
