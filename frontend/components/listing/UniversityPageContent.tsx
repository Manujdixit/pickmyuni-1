import React from "react";
import styles from "@/app/styles/page.module.css";

interface UniversityPageContentProps {
  content?: string;
  showReadMore: boolean;
  isContentExpanded: boolean;
  setIsContentExpanded: (expanded: boolean) => void;
}

export const UniversityPageContent: React.FC<UniversityPageContentProps> = ({
  content,
  showReadMore,
  isContentExpanded,
  setIsContentExpanded,
}) => {
  if (!content) return null;

  return (
    <div className="mb-6">
      <div
        className={`styledContent ${styles.styledContent} prose max-w-none leading-relaxed text-gray-700 transition-all duration-300 ${
          showReadMore && !isContentExpanded ? "line-clamp-4" : ""
        }`}
        dangerouslySetInnerHTML={{ __html: content }}
      />
      {showReadMore && (
        <button
          onClick={() => setIsContentExpanded(!isContentExpanded)}
          className="mt-2 text-sm font-medium text-blue-600 transition-colors hover:text-blue-800"
        >
          {isContentExpanded ? "Read Less" : "Read More"}
        </button>
      )}
    </div>
  );
};
