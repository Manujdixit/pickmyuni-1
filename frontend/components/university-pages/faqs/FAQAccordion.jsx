"use client";

import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/radix-accordion";

const FAQAccordion = ({ faqs }) => {
  if (!faqs || faqs.length === 0) {
    return null;
  }

  return (
    <div>
      {faqs.map((faq, index) => (
        <div key={index} className="faq-item">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value={`item-${index}`}>
              <AccordionTrigger className="text-left">
                <h4 className="pr-4 text-lg font-semibold text-[#2C5680]">
                  {faq.question}
                </h4>
              </AccordionTrigger>
              <AccordionContent>
                <div className="content-item leading-relaxed text-[#242628]">
                  {faq.answer}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      ))}
    </div>
  );
};

export default FAQAccordion;
