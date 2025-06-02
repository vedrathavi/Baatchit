import { apiClient } from "@/lib/api-client";

import { useAppStore } from "@/store";
import { GET_ALL_MESSAGES_ROUTE, HOST } from "@/utils/constants";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { IoMdArrowRoundDown } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { MdFolderZip } from "react-icons/md";
import { toast } from "sonner";

const MessageContainer = () => {
  const scrollRef = useRef();
  const {
    selectedChatType,
    selectedChatData,
    userInfo,
    selectedChatMessages,
    setSelectedChatMessages,
    setIsDownloading,
    setFileDownloadProgress,
  } = useAppStore();

  const [showImage, setShowImage] = useState(false);
  const [imageURL, setImageURL] = useState(null);

  const checkIfImage = (filePath) => {
    const imageRegex =
      /\.(jpg|jpeg|png|gif|bmp|tiff|tif|webp|svg|ico|heic|heif)$/i;
    return imageRegex.test(filePath);
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedChatMessages]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const response = await apiClient.post(
          GET_ALL_MESSAGES_ROUTE,
          {
            id: selectedChatData._id,
          },
          { withCredentials: true }
        );

        if (response.data.messages) {
          setSelectedChatMessages(response.data.messages);
        }
      } catch (e) {
        console.log(e);
      }
    };

    if (selectedChatData._id) {
      if (selectedChatType === "contact") {
        getMessages();
      }
    }
  }, [selectedChatData, selectedChatType, setSelectedChatMessages]);

  const downloadFile = async (url) => {
    setIsDownloading(true);
    setFileDownloadProgress(0);
    try {
      const response = await apiClient.get(`${HOST}/${url}`, {
        responseType: "blob",
        onDownloadProgress: (progressEvent) => {
          const { loaded, total } = progressEvent;
          const percentCompleted = Math.round((loaded * 100) / total);
          setFileDownloadProgress(percentCompleted);
        },
      });

      const urlBlob = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = urlBlob;
      link.setAttribute("download", url.split("/").pop());
      document.body.appendChild(link);
      link.click();
      link.remove();
      setIsDownloading(false);
      setFileDownloadProgress(0);
      window.URL.revokeObjectURL(urlBlob);
    } catch (e) {
      setIsDownloading(false);
      setFileDownloadProgress(0);
      toast.error("Failed to Download");
      console.log(e);
    }
  };

  const renderMessages = () => {
    let lastDate = null;
    return selectedChatMessages.map((message, index) => {
      const messageDate = moment(message.timestamp).format("YYYY-MM-DD");
      const showDate = messageDate !== lastDate;
      lastDate = messageDate;

      return (
        <div key={index}>
          {showDate && (
            <div className="text-center text-gray-500 my-2">
              {moment(message.timestamp).format("LL")}
            </div>
          )}
          {selectedChatType === "contact" && renderDMMessages(message)}
        </div>
      );
    });
  };

  const renderDMMessages = (message) => {
    const isMyMessage = String(message.sender) === String(userInfo.id);

    return (
      <div className={isMyMessage ? "text-right" : "text-left"}>
        {message.messageType === "text" && (
          <div
            className={`${
              isMyMessage
                ? "bg-neutral-300/10 text-neutral-100 border border-neutral-500/20 "
                : "bg-neutral-700/10 text-neutral-200 border border-neutral-600/20 "
            } border inline-block py-2 px-4 rounded-xl my-1 max-w-[50%] break-words`}
          >
            {message.content}
          </div>
        )}

        {message.messageType === "file" && (
          <div
            className={`${
              isMyMessage
                ? "bg-neutral-300/10 text-neutral-100 border border-neutral-500/20 "
                : "bg-neutral-700/10 text-neutral-100/90 border-neutral-100/20"
            } border inline-block py-2 px-2 rounded-xl my-1 max-w-[50%] break-words`}
          >
            {checkIfImage(message.fileUrl) ? (
              <div
                className="cursor-pointer"
                onClick={() => {
                  setShowImage(true);
                  setImageURL(message.fileUrl);
                }}
              >
                <img
                  src={`${HOST}/${message.fileUrl}`}
                  height={300}
                  width={300}
                />
              </div>
            ) : (
              <div className="flex items-center justify-center gap-4 p-2">
                <span className="text-xl bg-black/20 rounded-lg p-3">
                  <MdFolderZip />
                </span>
                <span>{message.fileUrl.split("/").pop()}</span>
                <span
                  className="text-lg bg-green-800/20 text-green-600 rounded-full p-3  cursor-pointer transition-all duration-300 hover:bg-green-800/50"
                  onClick={() => downloadFile(message.fileUrl)}
                >
                  <IoMdArrowRoundDown />
                </span>
              </div>
            )}
          </div>
        )}

        <div className="text-xs text-neutral-500">
          {moment(message.timestamp).format("LT")}
        </div>
      </div>
    );
  };

  return (
    <div className="flex-1 overflow-y-auto scrollbar-hidden p-4 px-8 md:w-[65vw] lg:w-[70vw] xl:w-[80vw] sm:w-full">
      {renderMessages()}
      <div ref={scrollRef}></div>
      {showImage && (
        <div className="fixed z-1000 top-0 left-0 h-[100vh] w-[100vw] flex items-center backdrop-blur-xs bg-black/80 flex-col">
          <div className="flex p-20">
            <img
              src={`${HOST}/${imageURL}`}
              className="h-[80vh] w-full bg-cover"
            />
          </div>
          <div className="flex items-center gap-5 fixed top-0 right-0 mt-5 mr-5 ">
            <span className="text-lg cursor-pointer select-none">
              {imageURL.split("/").pop()}
            </span>
            <button
              className="text-lg bg-neutral-800/20 text-neutral-600 rounded-full p-3  cursor-pointer transition-all duration-300 hover:bg-green-800/50 hover:text-green-600"
              onClick={() => downloadFile(imageURL)}
            >
              <IoMdArrowRoundDown />
            </button>
            <button
              className="text-lg bg-neutral-800/50 text-neutral-600 hover:text-red-600 rounded-full p-3  cursor-pointer transition-all duration-300 hover:bg-red-800/50"
              onClick={() => {
                setShowImage(false);
                setImageURL(null);
              }}
            >
              <IoClose />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageContainer;
