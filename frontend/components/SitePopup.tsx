"use client";

import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { BotMessageSquare } from "lucide-react";
import ContactWrapper from "./modal/contact-wrapper";

export const SitePop = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hasSeenPopup = Cookies.get("newsletter_popup_shown");

    if (!hasSeenPopup) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        Cookies.set("newsletter_popup_shown", "true", { expires: 7 }); // 7 days
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
      <a
        className="bg-brand-secondary p-3 rounded-full hover:bg-orange-600 transition-colors cursor-pointer"
        aria-label="chat with ai"
        onClick={handleClick}
      >
        <BotMessageSquare className="text-white" />
      </a>
      {isOpen && <ContactWrapper open={isOpen} onOpenChange={handleClose} />}
    </>
  );
};
