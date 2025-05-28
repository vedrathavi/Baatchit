import React from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useAppStore } from "@/store";
import { getColor } from "@/lib/utils";
import { HOST } from "@/utils/constants";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { LOGOUT_ROUTE } from "@/utils/constants";
import { FiEdit2, FiLogOut } from "react-icons/fi";

import { useNavigate } from "react-router-dom";
import { apiClient } from "@/lib/api-client";

const ProfileInfo = () => {
  const { userInfo, setUserInfo } = useAppStore();
  const { image, firstName, email, color, lastName } = userInfo;
  const navigate = useNavigate();

  const logOut = async () => {
    try {
      const response = await apiClient.post(
        LOGOUT_ROUTE,
        {},
        { withCredentials: true }
      );

      if (response.status === 200) {
        navigate("/auth");
        setUserInfo(null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="absolute bottom-0 h-16 flex items-center justify-between px-6 w-full bg-neutral-700/20">
      <div className="flex gap-3 items-center justify-center">
        <div className="w-12 h-12 relative">
          <Avatar className="h-12 w-12 rounded-full overflow-hidden">
            {image ? (
              <AvatarImage
                src={`${HOST}/${image}`}
                alt="profile"
                className="object-cover w-full h-full bg-black"
              />
            ) : (
              <div
                className={`uppercase h-full w-full text-lg border-[1px] flex items-center justify-center rounded-full 
                  ${getColor(color)}`}
              >
                {firstName
                  ? firstName.split("").shift()
                  : email.split("").shift()}
              </div>
            )}
          </Avatar>
        </div>
        <div>{firstName && lastName ? `${firstName} ${lastName}` : "User"}</div>
      </div>
      <div className="flex gap-5">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <FiEdit2
                className=" font-medium text-xl"
                onClick={() => navigate("/profile")}
              />
            </TooltipTrigger>
            <TooltipContent className="bg-[#1c1b1e] border-none ">
              Edit Profile
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <FiLogOut
                className=" font-medium text-xl text-red-500"
                onClick={logOut}
              />
            </TooltipTrigger>
            <TooltipContent className="bg-red-200 text-red-600 border-none ">
              Log Out
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default ProfileInfo;
