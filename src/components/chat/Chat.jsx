import React, { useState } from "react";
import EmojiPicker from "emoji-picker-react";
import "./chat.css";
const Chat = () => {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState(null);
  const handleEmoji = (e) => {
    setText((prev) => prev + e.emoji);
    setOpen(falser);
  };
  return (
    <div className="chat">
      <div className="top">
        <div className="user">
          <img src="/avatar.png" alt="" />
          <div className="texts">
            <span>John Doe</span>
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
        <div className="message">
          <img src="/avatar.png" alt="" />
          <div className="texts">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel
              explicabo necessitatibus deserunt excepturi dignissimos saepe
              culpa quia praesentium tempora! Quos eaque, tenetur dicta
              accusantium molestias facere voluptatem assumenda corporis
              facilis?
            </p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="message own">
          <div className="texts">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel
              explicabo necessitatibus deserunt excepturi dignissimos saepe
              culpa quia praesentium tempora! Quos eaque, tenetur dicta
              accusantium molestias facere voluptatem assumenda corporis
              facilis?
            </p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="message">
          <img src="/avatar.png" alt="" />
          <div className="texts">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel
              explicabo necessitatibus deserunt excepturi dignissimos saepe
              culpa quia praesentium tempora! Quos eaque, tenetur dicta
              accusantium molestias facere voluptatem assumenda corporis
              facilis?
            </p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="message own">
          <div className="texts">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel
              explicabo necessitatibus deserunt excepturi dignissimos saepe
              culpa quia praesentium tempora! Quos eaque, tenetur dicta
              accusantium molestias facere voluptatem assumenda corporis
              facilis?
            </p>
            <span>1 min ago</span>
          </div>
        </div>
      </div>
      <div className="bottom">
        <div className="icons">
          <img src="/img.png" alt="" />
          <img src="/camera.png" alt="" />
          <img src="/mic.png" alt="" />
        </div>
        <input
          type="text"
          value={text}
          placeholder="Type a message..."
          onChange={(e) => setText(e.target.value)}
        />
        <div className="emoji">
          <img src="/emoji.png" alt="" onClick={() => setOpen(!open)} />
          <div className="picker">
            <EmojiPicker open={open} onEmojiClick={handleEmoji} />
          </div>
        </div>
        <button className="sendButton">Send</button>
      </div>
    </div>
  );
};

export default Chat;
