"use client";

import React from "react";
import ContactWrapper from "./form/contact-wrapper";

function GetInTouch() {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="">
      <button
        onClick={() => setOpen(true)}
        className="text-brand-secondary hover:bg-brand-secondary mt-8 rounded-lg border-2 border-orange-500 bg-white px-8 py-3 font-semibold transition-colors hover:text-white"
      >
        Get in touch with us today and make your university transfer journey
        smooth and successful!
      </button>
      <ContactWrapper open={open} onOpenChange={setOpen} />
    </div>
  );
}

export default GetInTouch;
