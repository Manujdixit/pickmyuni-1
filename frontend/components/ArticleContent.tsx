import styles from "../app/styles/page.module.css";

interface ArticleContentProps {
  content: string;
}

export default function ArticleContent({ content }: ArticleContentProps) {
  return (
    <div
      className={`styledContent ${styles.styledContent} prose prose-lg max-w-none`}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
