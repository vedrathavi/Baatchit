import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { GrAttachment } from "react-icons/gr";
import { FiSend } from "react-icons/fi";
import { RiEmojiStickerLine } from "react-icons/ri";
import EmojiPicker from "emoji-picker-react";
const MessageBar = () => {
  const emojiRef = useRef();
  const [message, setMessage] = useState("");
  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);
  useEffect(() => {
    function handleClickOutside(event) {
      if (emojiRef.current && !emojiRef.current.contains(event.target)) {
        setEmojiPickerOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const handleAddEmoji = (emoji) => {
    setMessage((msg) => msg + emoji.emoji);
  };

  const handleSendMessage = async () => {};

  return (
    <div className="h-[10vh] bg-neutral-900 flex justify-center items-center px-8 gap-3 lg:w-full sm:w-[80vw] mb-6">
      <div className="flex-1 flex bg-neutral-800 rounded-xl items-center gap-5 pr-5">
        <input
          type="text"
          className="flex-1 p-5 bg-transparent rounded-md focus:border-none focus:outline-none"
          placeholder="Type a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all">
          <GrAttachment className="text-2xl" />
        </button>
        <div className="relative" ref={emojiRef}>
          <button
            className="text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all"
            onClick={() => setEmojiPickerOpen((prev) => !prev)}
          >
            <RiEmojiStickerLine className="text-2xl" />
          </button>
          <div className="absolute bottom-16 right-0">
            <EmojiPicker
              theme="dark"
              open={emojiPickerOpen}
              onEmojiClick={handleAddEmoji}
              autoFocusSearch={false}
            />
          </div>
        </div>
      </div>
      <button
        className="bg-purple-800  focus:bg-purple-900 p-4.5 flex items-center justify-center hover:bg-purple-900 rounded-xl focus:border-none focus:outline-none focus:text-white duration-300 transition-all"
        onClick={handleSendMessage}
      >
        <FiSend className="text-2xl" />
      </button>
    </div>
  );
};

export default MessageBar;
