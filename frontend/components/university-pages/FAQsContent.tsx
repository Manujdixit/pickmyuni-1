import React from "react";
import { decode } from "he";
import FAQAccordion from "./FAQAccordion";

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

// Generate FAQ JSON-LD structured data
const generateFAQJsonLd = (
  faqItems: Array<{ question: string; answer: string }>,
  universityName: string,
) => {
  if (!faqItems || faqItems.length === 0) {
    return null;
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    name: `${universityName} Frequently Asked Questions`,
    description: `Find answers to common questions about ${universityName}`,
    mainEntity: faqItems.map((faq, index) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: cleanHtmlContent(faq.answer),
      },
    })),
  };

  return faqSchema;
};

interface FAQsContentProps {
  info: Array<{ content?: string }>;
  universityName: string;
}

const FAQsContent: React.FC<FAQsContentProps> = ({ info, universityName }) => {
  // Generate JSON-LD for all FAQ items server-side
  const allFaqItems: Array<{ question: string; answer: string }> = [];

  info.forEach((item) => {
    if (item?.content) {
      const faqItems = parseFAQContentServer(item.content);
      const uniqueFaqItems = faqItems
        .filter((faqItem, index, self) => {
          return (
            index ===
            self.findIndex(
              (t) =>
                t.question.toLowerCase() === faqItem.question.toLowerCase(),
            )
          );
        })
        .filter((faqItem) => {
          return (
            faqItem.question.length > 10 &&
            faqItem.answer.length > 10 &&
            faqItem.question !== faqItem.answer &&
            !faqItem.question.includes("&nbsp;") &&
            !faqItem.answer.includes("&nbsp;")
          );
        });

      allFaqItems.push(...uniqueFaqItems);
    }
  });

  const jsonLd =
    allFaqItems.length > 0
      ? JSON.stringify(generateFAQJsonLd(allFaqItems, universityName))
      : null;

  return (
    <>
      {/* Render JSON-LD script */}
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd }}
        />
      )}

      {/* Render FAQ content */}
      <div className="space-y-6">
        {info.map((item: any, index: number) => (
          <div key={index} className="">
            {item?.content && <FAQAccordion content={item.content} />}
          </div>
        ))}
      </div>
    </>
  );
};

export default FAQsContent;
