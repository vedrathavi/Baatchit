import { animationDefaultOptions } from "@/lib/utils";
import { useAppStore } from "@/store";
import React from "react";
import Lottie from "react-lottie";

const EmptyChatContainer = () => {
  const { userInfo } = useAppStore();

  return (
    <div className="flex-1 md:bg-neutral-900/60 md:flex flex-col justify-center items-center w-full hidden duration-1000 transition-all">
      <Lottie
        isClickToPauseDisabled={true}
        height={200}
        width={200}
        options={animationDefaultOptions}
      />
      <div className="flex flex-col gap-5 item-center mt-10 lg:text-4xl text-3xl transition-all duration-300 text-center">
        <h3 className="font-semibold">
          Hi! {""}
          <span className="text-purple-700">
            {userInfo?.firstName || "Buddy"}
          </span>
        </h3>
      </div>
    </div>
  );
};

export default EmptyChatContainer;
