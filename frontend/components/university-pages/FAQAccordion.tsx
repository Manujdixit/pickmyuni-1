"use client";

import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@radix-ui/react-accordion";
import { ChevronUp } from "lucide-react";
import { decode } from "he";
import styles from "@/app/styles/page.module.css";

// Helper function to clean HTML entities and tags
const cleanHtmlContent = (content: string): string => {
  // Use 'he' library to decode all HTML entities
  const decodedContent = decode(content);

  // Remove HTML tags and normalize whitespace
  return decodedContent
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .trim();
};

// Helper function to parse FAQ content on server side (without DOM)
const parseFAQContentServer = (
  htmlContent: string,
): Array<{ question: string; answer: string }> => {
  const faqItems: Array<{ question: string; answer: string }> = [];

  // Parse accordion structures first
  const accordionRegex =
    /<div class="accordion">[\s\S]*?<h4[^>]*>\s*(.*?)\s*<\/h4>[\s\S]*?<div class="accordion-content">[\s\S]*?<p[^>]*>(.*?)<\/p>[\s\S]*?<\/div>[\s\S]*?<\/div>/g;
  let match;

  while ((match = accordionRegex.exec(htmlContent)) !== null) {
    const question = cleanHtmlContent(match[1]);
    const answer = decode(match[2]).trim(); // Keep HTML in answer but decode entities
    if (question && answer && question !== answer) {
      faqItems.push({
        question,
        answer,
      });
    }
  }

  // Parse list items with questions and answers (various formats)
  const listItemRegex = /<li[^>]*>\s*(.*?)\s*<\/li>/g;

  while ((match = listItemRegex.exec(htmlContent)) !== null) {
    const liContent = match[1];

    // Check for br tag separation
    if (liContent.includes("<br")) {
      const parts = liContent.split(/<br\s*\/?>/);
      if (parts.length >= 2) {
        const question = cleanHtmlContent(parts[0]).replace(/^\d+\.\s*/, "");
        const answer = decode(parts.slice(1).join(" ")).trim(); // Keep HTML in answer but decode entities
        if (
          question &&
          answer &&
          question !== answer &&
          question.length > 5 &&
          answer.length > 5
        ) {
          faqItems.push({
            question,
            answer,
          });
        }
      }
    }
    // Check for question ending with ? and followed by content
    else if (liContent.includes("?")) {
      const questionMatch = liContent.match(/^(.*?\?)\s*(.*)/);
      if (questionMatch) {
        const question = cleanHtmlContent(questionMatch[1]).replace(
          /^\d+\.\s*/,
          "",
        );
        const answer = decode(questionMatch[2]).trim(); // Keep HTML in answer but decode entities
        if (
          question &&
          answer &&
          question !== answer &&
          question.length > 5 &&
          answer.length > 5
        ) {
          faqItems.push({
            question,
            answer,
          });
        }
      }
    }
  }

  // Parse h3, h4, h5, h6 followed by p tags
  const headingRegex = /<h[3-6][^>]*>(.*?)<\/h[3-6]>\s*<p[^>]*>(.*?)<\/p>/g;

  while ((match = headingRegex.exec(htmlContent)) !== null) {
    const question = cleanHtmlContent(match[1]);
    const answer = decode(match[2]).trim(); // Keep HTML in answer but decode entities
    if (
      question &&
      answer &&
      question !== answer &&
      question.length > 5 &&
      answer.length > 5
    ) {
      faqItems.push({
        question,
        answer,
      });
    }
  }

  // Parse strong/bold questions followed by content
  const strongRegex = /<strong[^>]*>(.*?\?[^<]*)<\/strong>\s*([^<]+)/g;

  while ((match = strongRegex.exec(htmlContent)) !== null) {
    const question = cleanHtmlContent(match[1]);
    const answer = decode(match[2]).trim(); // Keep HTML in answer but decode entities
    if (
      question &&
      answer &&
      question !== answer &&
      question.length > 5 &&
      answer.length > 5
    ) {
      faqItems.push({
        question,
        answer,
      });
    }
  }

  // If no structured FAQs found, try to extract any question-like content
  if (faqItems.length === 0) {
    const questionRegex = /([^.!?]*\?[^<]*)/g;
    const questions = htmlContent.match(questionRegex);
    if (questions) {
      questions.forEach((q, index) => {
        const cleanQuestion = cleanHtmlContent(q);
        if (cleanQuestion.length > 10) {
          faqItems.push({
            question: cleanQuestion,
            answer:
              "Please refer to the university's official website for detailed information.",
          });
        }
      });
    }
  }

  return faqItems;
};

// FAQ Accordion Component
const FAQAccordion = ({ content }: { content: string }) => {
  const faqItems = parseFAQContentServer(content);

  // Filter out duplicate questions and ensure quality
  const uniqueFaqItems = faqItems
    .filter((item, index, self) => {
      return (
        index ===
        self.findIndex(
          (t) => t.question.toLowerCase() === item.question.toLowerCase(),
        )
      );
    })
    .filter((item) => {
      // Filter out low-quality items
      return (
        item.question.length > 10 &&
        item.answer.length > 10 &&
        item.question !== item.answer &&
        !item.question.includes("&nbsp;") &&
        !item.answer.includes("&nbsp;")
      );
    });

  // Extract title/heading from content if exists
  const titleMatch =
    content.match(/<h[1-6][^>]*class[^>]*sub-title[^>]*>(.*?)<\/h[1-6]>/i) ||
    content.match(/<h[1-6][^>]*>(.*?FAQs.*?)<\/h[1-6]>/i);
  const title = titleMatch ? cleanHtmlContent(titleMatch[1]) : null;

  // If no valid FAQ items found, render original content
  if (uniqueFaqItems.length === 0) {
    return (
      <div
        className={`styledContent ${styles.styledContent} prose prose-lg max-w-none`}
        dangerouslySetInnerHTML={{
          __html: decode(content),
        }}
      />
    );
  }

  return (
    <div className="space-y-4">
      {/* Render title if found */}
      {title && <h2 className="sub-title">{title}</h2>}

      <Accordion type="single" collapsible className="w-full space-y-2">
        {uniqueFaqItems.map((faq, index) => (
          <AccordionItem
            key={index}
            value={`faq-${index}`}
            className="accordion overflow-hidden rounded-lg bg-white shadow-sm"
          >
            <AccordionTrigger className="accordion-header flex w-full cursor-pointer items-center justify-between px-4 py-5 transition-colors hover:bg-gray-50 [&[data-state=open]>.accordion-icon]:rotate-180">
              <h4 className="text-brand-primary mr-4 flex-1 text-left text-lg font-medium leading-tight">
                {faq.question}
              </h4>
              <span className="accordion-icon text-brand-primary text-2xl font-light transition-transform duration-300">
                <ChevronUp />
              </span>
            </AccordionTrigger>
            <AccordionContent className="accordion-content border-t border-gray-200 bg-white">
              <div className="p-4">
                <div
                  className="m-0 leading-relaxed text-gray-700"
                  dangerouslySetInnerHTML={{ __html: decode(faq.answer) }}
                />
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default FAQAccordion;
