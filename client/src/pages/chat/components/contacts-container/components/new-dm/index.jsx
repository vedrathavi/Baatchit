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

import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { apiClient } from "@/lib/api-client";
import { SEARCH_CONTACTS_ROUTES } from "@/utils/constants";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { HOST } from "@/utils/constants";
import { getColor } from "@/lib/utils";
import { useAppStore } from "@/store";


const NewDM = () => {
  const { setSelectedChatType, setSelectedChatData } = useAppStore();
  const [openNewContactModal, setopenNewContactModal] = useState(false);
  const [searchedContacts, setSearchedContacts] = useState([]);
  const [emptyLine, setEmptyLine] = useState("Search New Friends");
  const searchContacts = async (searchTerm) => {
    console.log("searching for:", searchTerm);

    try {
      if (searchTerm.length > 0) {
        const response = await apiClient.post(
          SEARCH_CONTACTS_ROUTES,
          { searchTerm },
          { withCredentials: true }
        );

        if (response.status === 200 && response.data.contacts) {
          setSearchedContacts(response.data.contacts);
          if (response.data.contacts.length === 0) {
            setEmptyLine("No User Found");
          }
        }
      } else {
        setEmptyLine("Search New Friends");
        setSearchedContacts([]);
      }
    } catch (error) {
      setEmptyLine("Failed to fetch. Check your connection.");
      console.log(error);
    }
  };

  const selectNewContact = (contact) => {
    setopenNewContactModal(false);
    setSearchedContacts([]);
    setSelectedChatData(contact);
    setSelectedChatType("contact");
  };

  return (
    <div>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <FaPlus
              className="text-neutral-400/90 text-sm hover:text-neutral-100 cursor-pointer duration-300 transition-all"
              onClick={() => setopenNewContactModal(true)}
            />
          </TooltipTrigger>
          <TooltipContent className="bg-[#1c1b1e] border-none mb-2 p-3 text-white">
            <p>Select New Contact</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <Dialog
        open={openNewContactModal}
        onOpenChange={(isOpen) => {
          setopenNewContactModal(isOpen);
          setSearchedContacts([]);
          setEmptyLine("Search New Friends");
        }}
      >
        <DialogContent className="bg-neutral-800/50 backdrop-blur-md border border-white/10 text-white  w-[90vw] max-w-[400px] h-[90vh] max-h-[400px] flex flex-col rounded-3xl">
          <DialogHeader>
            <DialogTitle className="font-light">
              Please select a Contact
            </DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div>
            <Input
              placeholder="search contacts"
              className="rounded-xl bg-neutral-700/20 outline-none border-none focus:border-none focus:outline-none px-4 py-3"
              onInput={(e) => searchContacts(e.target.value)}
            ></Input>
          </div>
          {searchedContacts.length > 0 && (
            <ScrollArea className="h-[250px]">
              <div className="flex flex-col gap-5">
                {searchedContacts.map((contact) => (
                  <div
                    key={contact._id}
                    className="flex gap-3 items-center cursor-pointer"
                    onClick={() => selectNewContact(contact)}
                  >
                    <div className="w-full h-12 relative flex gap-4 items-center ">
                      <Avatar className="h-12 w-12 rounded-full overflow-hidden">
                        {contact.image ? (
                          <AvatarImage
                            src={`${HOST}/${contact.image}`}
                            alt="profile"
                            className="object-cover w-full h-full bg-black"
                          />
                        ) : (
                          <div
                            className={`uppercase h-full w-full text-lg border-[1px] flex items-center justify-center rounded-full 
                  ${getColor(contact.color)}`}
                          >
                            {contact.firstName
                              ? contact.firstName.split("").shift()
                              : contact.email.split("").shift()}
                          </div>
                        )}
                      </Avatar>
                      <div className="flex flex-col w-full">
                        <span className="w-full truncate">
                          {" "}
                          {contact.firstName && contact.lastName
                            ? `${contact.firstName} ${contact.lastName}`
                            : `${contact.email}`}
                        </span>
                        <span className="text-xs text-neutral-400">
                          {contact.email}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          )}
          {searchedContacts.length <= 0 && (
            <div className="text-gray-400 flex h-full items-center justify-center">
              {emptyLine}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default NewDM;
