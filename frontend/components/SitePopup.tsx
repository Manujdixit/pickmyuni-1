"use client";

import React, { useEffect, useState, useRef } from "react";
import Cookies from "js-cookie";
import { BotMessageSquare } from "lucide-react";
import ContactWrapper from "./form/contact-wrapper";
import { useIsMobile } from "@/hooks/useIsMobile";

const POPUP_TIMEOUT_MS = 25000; // Show after 25 seconds

export const SitePop = () => {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    const hasSeenPopup = Cookies.get("pickmyuni_popup_shown");

    if (!hasSeenPopup) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        Cookies.set("pickmyuni_popup_shown", "true", { expires: 7 }); // 7 days
      }, POPUP_TIMEOUT_MS);

      return () => clearTimeout(timer);
    }
  }, []);

  // Close popup when clicking outside
  useEffect(() => {
    if (!isOpen || isMobile) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        const popupElement = document.querySelector(".custom-popup");
        if (popupElement && !popupElement.contains(event.target as Node)) {
          setIsOpen(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, isMobile]);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleClick = () => {
    setIsOpen(true);
  };

  // For mobile devices, use the modal approach
  if (isMobile) {
    return (
      <div className="relative">
        <button
          ref={buttonRef}
          className="bg-brand-secondary cursor-pointer rounded-full p-3 transition-colors hover:bg-orange-600"
          aria-label="chat with ai"
          onClick={handleClick}
        >
          <BotMessageSquare className="text-white" />
        </button>
        {isOpen && (
          <ContactWrapper
            open={isOpen}
            onOpenChange={handleClose}
            isMobile={isMobile}
            buttonRef={buttonRef}
          />
        )}
      </div>
    );
  }

  // For larger screens, use custom positioned popup
  return (
    <div className="relative">
      <button
        ref={buttonRef}
        className="bg-brand-secondary cursor-pointer rounded-full p-3 transition-colors hover:bg-orange-600"
        aria-label="chat with ai"
        onClick={handleClick}
      >
        <BotMessageSquare className="text-white" />
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-[100] bg-black/20"
            onClick={handleClose}
          />

          {/* Custom popup */}
          <div className="custom-popup absolute bottom-full right-0 z-[101] mb-4 min-h-[350px] w-[360px] max-w-[calc(100vw-2rem)] rounded-lg border bg-background p-6 shadow-lg">
            {/* Arrow pointing to button */}
            <div className="absolute -bottom-2 right-4 h-4 w-4 rotate-45 transform border-b border-r border-gray-200 bg-background"></div>

            <ContactWrapper
              open={isOpen}
              onOpenChange={handleClose}
              isMobile={isMobile}
              buttonRef={buttonRef}
              isTooltip={true}
            />
          </div>
        </>
      )}
    </div>
  );
};
