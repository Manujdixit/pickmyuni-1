import React from "react";
import styles from "@/app/styles/page.module.css";

interface DefaultContentProps {
  data: any[];
}

export const DefaultContent: React.FC<DefaultContentProps> = ({ data }) => {
  return (
    <div className="space-y-6">
      {data.map((item, index) => (
        <div key={index} className="">
          {item?.content && (
            <div
              className={`styledContent ${styles.styledContent} prose prose-lg max-w-none`}
              dangerouslySetInnerHTML={{
                __html: item.content,
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
};
