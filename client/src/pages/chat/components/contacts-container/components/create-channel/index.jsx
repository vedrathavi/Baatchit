import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { apiClient } from "@/lib/api-client";
import {
  CREATE_CHANNEL_ROUTE,
  GET_ALL_CONTACTS_ROUTES,
} from "@/utils/constants";

import { HOST } from "@/utils/constants";

import { useAppStore } from "@/store";
import { Button } from "@/components/ui/button";
import MultipleSelector from "@/components/ui/multipleselect";

const CreateChannel = () => {
  const { setSelectedChatType, setSelectedChatData, addChannel } =
    useAppStore();
  const [newChannelModal, setNewChannelModal] = useState(false);

  const [allContacts, setAllContacts] = useState([]);
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [channelName, setChannelName] = useState("");

  useEffect(() => {
    const getData = async () => {
      const response = await apiClient.get(GET_ALL_CONTACTS_ROUTES, {
        withCredentials: true,
      });

      setAllContacts(response.data.contacts);
    };
    getData();
  }, []);

  const createChannel = async () => {
    try {
      if (channelName.length >= 0 && selectedContacts.length >= 0) {
        const response = await apiClient.post(
          CREATE_CHANNEL_ROUTE,
          {
            name: channelName,
            members: selectedContacts.map((contact) => contact.value),
          },
          {
            withCredentials: true,
          }
        );

        if (response.status === 201) {
          setChannelName("");
          setSelectedContacts([]);
          setNewChannelModal(false);
          addChannel(response.data.channel);

          console.log("channel created:", channelName);
        }
      }
    } catch (e) {
      console.log({ e });
    }
  };

  return (
    <div>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <FaPlus
              className="text-neutral-400/90 text-sm hover:text-neutral-100 cursor-pointer duration-300 transition-all"
              onClick={() => setNewChannelModal(true)}
            />
          </TooltipTrigger>
          <TooltipContent className="bg-[#1c1b1e] border-none mb-2 p-3 text-white">
            Create New Channel
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <Dialog
        open={newChannelModal}
        onOpenChange={(isOpen) => {
          setNewChannelModal(isOpen);
        }}
      >
        <DialogContent className="bg-neutral-800/50 backdrop-blur-md border border-white/10 text-white  w-[90vw] max-w-[400px] max-h-[90vh] flex flex-col rounded-3xl justify-between ">
          <DialogHeader>
            <DialogTitle className="font-light">
              Please fillup the details
            </DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-2 h-full mb-4">
            <div>
              <Input
                placeholder="Channel Name"
                className="rounded-xl bg-neutral-700/20 outline-none border-none focus:border-none focus:outline-none px-4 py-6"
                onInput={(e) => setChannelName(e.target.value)}
              />
            </div>
            <p className="mt-2 ml-1 text-sm text-neutral-600">Members</p>
            <div>
              <MultipleSelector
                className="rounded-lg bg-neutral-900 border-none py-2 outline-none focus:outline-none focus:border-none"
                defaultOptions={allContacts}
                placeholder="Search Contacts"
                value={selectedContacts}
                onChange={setSelectedContacts}
                emptyIndicator={
                  <p className="text-center text-lg leading-10 text-neutral-600">
                    No results found
                  </p>
                }
              ></MultipleSelector>
            </div>
          </div>
          <div>
            <Button
              className="w-full bg-purple-800 hover:bg-purple-900 transition-all duration-300 rounded-full p-6"
              onClick={() => createChannel()}
            >
              Create Channel
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateChannel;
