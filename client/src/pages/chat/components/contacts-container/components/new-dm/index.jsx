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

const NewDM = () => {
  const [openNewContactModal, setopenNewContactModal] = useState(false);
  const [searchedContacts, setSearchedContacts] = useState([]);

  const searchContacts = async (event) => {};
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
      <Dialog open={openNewContactModal} onOpenChange={setopenNewContactModal}>
        <DialogContent className="bg-neutral-800/50 border-none text-white w-[400px] h-[400px] flex flex-col rounded-3xl">
          <DialogHeader>
            <DialogTitle className="font-light">
              Please select a Contact
            </DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div>
            <Input
              placeholder="search contacts"
              className="rounded-xl bg-neutral-700/20 outline-none border-none focus:border-none focus:outline-none p-6"
              onChange={(e) => searchContacts(e.target.value)}
            ></Input>
          </div>
        
          {searchedContacts.length <= 0 && (
            <div className="text-gray-400 flex justify-center">Search new Friends.</div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default NewDM;
