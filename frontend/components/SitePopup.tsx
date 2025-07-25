"use client";

import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { BotMessageSquare } from "lucide-react";
import ContactWrapper from "./form/contact-wrapper";

export const SitePop = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hasSeenPopup = Cookies.get("pickmyuni_popup_shown");

    if (!hasSeenPopup) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        Cookies.set("pickmyuni_popup_shown", "true", { expires: 7 }); // 7 days
      }, 5000); // Show after 5 seconds

      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleClick = () => {
    setIsOpen(true);
  };

  return (
    <>
      <button
        className="bg-brand-secondary cursor-pointer rounded-full p-3 transition-colors hover:bg-orange-600"
        aria-label="chat with ai"
        onClick={handleClick}
      >
        <BotMessageSquare className="text-white" />
      </button>
      {isOpen && <ContactWrapper open={isOpen} onOpenChange={handleClose} />}
    </>
  );
};
