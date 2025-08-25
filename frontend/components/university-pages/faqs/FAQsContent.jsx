import React from "react";
import { JSDOM } from "jsdom";
import FAQAccordion from "./FAQAccordion";

const FAQsContent = ({ info, universityName }) => {
  if (!info || info.length === 0) {
    return (
      <div className="rounded-lg bg-gray-50 p-4 text-gray-500">
        No FAQ information found for this university
      </div>
    );
  }

  // Extract content from the first item
  const faqData = info[0];
  const content = faqData.content || "";

  // Parse the HTML content to extract FAQ pairs and clean HTML
  const processContent = (htmlContent) => {
    const dom = new JSDOM(htmlContent);
    const doc = dom.window.document;

    // Find all faq-item divs
    const faqItems = doc.querySelectorAll(".faq-item");
    const faqs = [];

    faqItems.forEach((item, index) => {
      const question = item.querySelector("h4")?.textContent?.trim();
      const answer = item.querySelector("p")?.textContent?.trim();

      if (question && answer) {
        faqs.push({
          question,
          answer,
          id: index,
        });
      }
    });

    // Remove FAQ items from the document for clean HTML rendering
    faqItems.forEach((item) => item.remove());

    // Get the cleaned HTML without FAQ items
    const cleanedHTML = doc.body.innerHTML;

    return {
      faqs,
      cleanedHTML,
    };
  };

  const { faqs, cleanedHTML } = processContent(content);

  // Generate FAQ Schema for SEO
  const generateFAQSchema = (faqs) => {
    if (!faqs || faqs.length === 0) return null;

    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    };

    return (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    );
  };

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      {/* FAQ Schema for SEO */}
      {faqs && faqs.length > 0 && generateFAQSchema(faqs)}
      {/* Full HTML Content Section */}
      {cleanedHTML && (
        <div
          className="styledContent"
          dangerouslySetInnerHTML={{ __html: cleanedHTML }}
        />
      )}

      {/* FAQ Accordion Section */}
      <FAQAccordion faqs={faqs} />
    </div>
  );
};

export default FAQsContent;
