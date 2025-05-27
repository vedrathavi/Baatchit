import React from "react";
import { useState } from "react";
import { GrAttachment } from "react-icons/gr";
import { FiSend } from "react-icons/fi";
import { RiEmojiStickerLine } from "react-icons/ri";
const MessageBar = () => {
  const [message, setMessage] = useState("");

  return (
    <div className="h-[10vh] bg-neutral-900 flex justify-center items-center px-8 gap-6 mb-6">
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
        <div className="relative">
          <button className="text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all">
            <RiEmojiStickerLine className="text-2xl" />
          </button>
          <div className="absolute bottom-16 right-0"></div>
        </div>
      </div>
      <button className="bg-purple-800  focus:bg-purple-900 p-4.5 flex items-center justify-center hover:bg-purple-900 rounded-xl focus:border-none focus:outline-none focus:text-white duration-300 transition-all">
        <FiSend className="text-2xl" />
      </button>
    </div>
  );
};

export default MessageBar;
