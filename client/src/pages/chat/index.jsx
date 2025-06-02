import { useAppStore } from "@/store";
import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useEffect } from "react";
import ContactsContainer from "./components/contacts-container";
import EmptyChatContainer from "./components/empty-chat-container";
import ChatContainer from "./components/chat-container";

const Chat = () => {
  const {
    userInfo,
    selectedChatType,
    isUploading,
    isDownloading,
    fileUploadProgress,
    fileDownloadProgress,
  } = useAppStore();
  const navigate = useNavigate();
  useEffect(() => {
    if (!userInfo.profileSetup) {
      toast("Please Setup Profile to continue.");
      navigate("/profile");
    }
  }, [userInfo, navigate]);

  return (
    <div className="flex w-[100vw] h-[100vh] overflow-hidden">
      {isUploading && (
        <div className="h-[100vh] w-[100vw] fixed z-10 bg-black/80 flex flex-col gap-5 backdrop-blur-lg justify-center items-center">
          <h5 className="text-3xl animate-pulse">File uploading in progress</h5>
          {fileUploadProgress}%
        </div>
      )}
      {isDownloading && (
        <div className="h-[100vh] w-[100vw] fixed z-10 bg-black/80 flex flex-col gap-5 backdrop-blur-lg justify-center items-center">
          <h5 className="text-3xl animate-pulse">
            File downloading in progress
          </h5>
          {fileDownloadProgress}%
        </div>
      )}

      <ContactsContainer />
      {selectedChatType === undefined ? (
        <EmptyChatContainer />
      ) : (
        <ChatContainer />
      )}
    </div>
  );
};

export default Chat;
