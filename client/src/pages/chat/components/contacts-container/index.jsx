import React from "react";

const ContactsContainer = () => {
  return (
    <div className="relative w-full md:w-[35vw] lg:w-[30vw] xl:w-[20vw] bg-neutral-800/70 border-r-2 border-neutral-400/20 ">
      <div className="pt-3 text-3xl font-bold pl-3">
        BAAT<span className="text-purple-600">CHIT</span>
      </div>
      <div className="my-5">
        <div className="flex items-center justify-between pr-10">
          <Title text="Direct Messages"></Title>
        </div>
      </div>
      <div className="my-5">
        <div className="flex items-center justify-between pr-10">
          <Title text="Channels"></Title>
        </div>
      </div>
    </div>
  );
};

export default ContactsContainer;

const Title = ({ text }) => {
  return (
    <h6 className="uppercase tracking-widest text-neutral-400/90 pl-10 font-light text-sm">
      {text}
    </h6>
  );
};
