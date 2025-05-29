import { RiCloseFill } from "react-icons/ri";
import React from "react";
import { useAppStore } from "@/store";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { HOST } from "@/utils/constants";
import { getColor } from "@/lib/utils";
const ChatHeader = () => {
  const { closeChat, selectedChatData, selectedChatType } = useAppStore();

  return (
    <div className=" border-b-2  border-neutral-400/20 flex items-center justify-between px-6 py-3">
      <div className="flex gap-5 items-center w-full justify-between">
        <div className="flex gap-3 items-center justify-center ">
          <div className="w-full h-12 relative flex gap-4 items-center ">
            <Avatar className="h-12 w-12 rounded-full overflow-hidden">
              {selectedChatData.image ? (
                <AvatarImage
                  src={`${HOST}/${selectedChatData.image}`}
                  alt="profile"
                  className="object-cover w-full h-full bg-black"
                />
              ) : (
                <div
                  className={`uppercase h-full w-full text-lg border-[1px] flex items-center justify-center rounded-full 
                  ${getColor(selectedChatData.color)}`}
                >
                  {selectedChatData.firstName
                    ? selectedChatData.firstName.split("").shift()
                    : selectedChatData.email.split("").shift()}
                </div>
              )}
            </Avatar>
            <div className="flex flex-col w-full">
              <span className="w-full truncate">
                {" "}
                {selectedChatType === "contact"
                  ? selectedChatData.firstName && selectedChatData.lastName
                    ? `${selectedChatData.firstName} ${selectedChatData.lastName}`
                    : `${selectedChatData.email}`
                  : ""}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center gap-5">
          <button className="text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all">
            <RiCloseFill className="text-3xl " onClick={closeChat} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
