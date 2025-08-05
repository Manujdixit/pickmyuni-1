"use client";
import React, { useState } from "react";
import { needsReadMore } from "@/utils/checkReadMore";
import styles from "@/app/styles/page.module.css";

interface CampusContentProps {
  content?: string;
}

const CampusContent: React.FC<CampusContentProps> = ({ content }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const showReadMore = needsReadMore(content);

  if (!content) return null;

  return (
    <>
      <div
        className={`styledContent ${styles.styledContent} prose prose-lg max-w-none ${!isExpanded && showReadMore ? "line-clamp-5" : ""}`}
        dangerouslySetInnerHTML={{ __html: content }}
      />
      {showReadMore && !isExpanded && (
        <button
          className="mt-2 text-sm text-blue-600 underline"
          onClick={() => setIsExpanded(true)}
        >
          Read More
        </button>
      )}
      {showReadMore && isExpanded && (
        <button
          className="mt-2 text-sm text-blue-600 underline"
          onClick={() => setIsExpanded(false)}
        >
          Show Less
        </button>
      )}
    </>
  );
};

export default CampusContent;
