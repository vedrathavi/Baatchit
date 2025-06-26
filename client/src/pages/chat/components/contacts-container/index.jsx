import React, { useEffect } from "react";
import ProfileInfo from "./components/profile-info/";
import NewDM from "./components/new-dm";
import { apiClient } from "@/lib/api-client";
import {
  GET_DM_CONTACTS_ROUTES,
  GET_USER_CHANNELS_ROUTE,
  GEMINI_BOT_ID,
} from "@/utils/constants";
import { useAppStore } from "@/store";
import ContactList from "@/components/contact-list";
import CreateChannel from "./components/create-channel";

const ContactsContainer = () => {
  const {
    directMessagesContacts,
    setDirectMessagesContacts,
    channels,
    ai,
    setAi,
    setChannels,
  } = useAppStore();
  useEffect(() => {
    const getContacts = async () => {
      const response = await apiClient.get(GET_DM_CONTACTS_ROUTES, {
        withCredentials: true,
      });
      if (response.data.contacts) {
        setDirectMessagesContacts(response.data.contacts);
      }
      if (response.data.aiBot) {
        setAi(response.data.aiBot);
      }
    };
    const getChannels = async () => {
      const response = await apiClient.get(GET_USER_CHANNELS_ROUTE, {
        withCredentials: true,
      });
      if (response.data.channels) {
        setChannels(response.data.channels);
      }
    };

    getChannels();
    getContacts();
  }, [setChannels, setDirectMessagesContacts, setAi]);

  return (
    <div className="relative w-full md:w-[30vw] lg:w-[30vw] xl:w-[20vw] bg-neutral-800/70 border-r-2 border-neutral-400/20 ">
      <div className="pt-3 text-3xl font-bold pl-3">
        BAAT<span className="text-purple-600">CHIT</span>
      </div>
      <div className="my-5">
        <div className="flex items-center justify-between pr-6">
          <Title text="Chat with AI"></Title>
        </div>
        <div className="max-h-[20vh] overflow-y-auto scrollbar-hidden">
          <ContactList contacts={ai ? [ai] : []} isAI={true} />
        </div>
      </div>
      <div className="my-3">
        <div className="flex items-center justify-between pr-6">
          <Title text="Direct Messages"></Title>
          <NewDM />
        </div>
        <div className="max-h-[40vh] overflow-y-auto scrollbar-hidden">
          <ContactList contacts={directMessagesContacts.filter(
            c => c && c._id && String(c._id) !== String(GEMINI_BOT_ID) && (c.firstName || c.email)
          )} />
        </div>
      </div>
      <div className="my-3">
        <div className="flex items-center justify-between pr-6">
          <Title text="Channels"></Title>
          <CreateChannel />
        </div>
        <div className="max-h-[30vh] overflow-y-auto scrollbar-hidden">
          <ContactList contacts={channels} isChannel={true} />
        </div>
      </div>

      <ProfileInfo />
    </div>
  );
};

export default ContactsContainer;

const Title = ({ text }) => {
  return (
    <h6 className="uppercase tracking-widest text-neutral-400/90 pl-6 font-light text-sm">
      {text}
    </h6>
  );
};
