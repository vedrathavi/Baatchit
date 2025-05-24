import { useAppStore } from "@/store";
import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useEffect } from "react";

const Chat = () => {
  const { userInfo } = useAppStore();
  const navigate = useNavigate();
  useEffect(() => {
    if (!userInfo) {
      toast("Please Setup Profile to continue.");
      navigate("/profile");
    }
  }, [userInfo, navigate]);

  return <div></div>;
};

export default Chat;
