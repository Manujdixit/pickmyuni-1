import React from "react";
import { decode } from "he";
import styles from "@/app/styles/page.module.css";

interface ScholarshipsContentProps {
  info: Array<{ content?: string }>;
}

const ScholarshipsContent: React.FC<ScholarshipsContentProps> = ({ info }) => {
  return (
    <div className="space-y-6">
      {info.map((item: any, index: number) => (
        <div key={index} className="">
          {item?.content && (
            <div
              className={`styledContent ${styles.styledContent} prose prose-lg max-w-none`}
              dangerouslySetInnerHTML={{
                __html: decode(item.content),
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default ScholarshipsContent;
