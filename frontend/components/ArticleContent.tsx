import styles from "../app/styles/page.module.css";

interface ArticleContentProps {
  content: string;
}

export default function ArticleContent({ content }: ArticleContentProps) {
  // const contentRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   if (!contentRef.current) return;

  //   // Wrap all tables with responsive containers
  //   const tables = contentRef.current.querySelectorAll("table");
  //   tables.forEach((table) => {
  //     if (!table.parentElement?.classList.contains("table-container")) {
  //       const wrapper = document.createElement("div");
  //       wrapper.className = "table-container";
  //       table.parentNode?.insertBefore(wrapper, table);
  //       wrapper.appendChild(table);
  //     }
  //   });

  //   // Add FAQ accordion functionality
  //   const faqQuestions = contentRef.current.querySelectorAll(".faq-ques");

  //   // Remove any existing event listeners to prevent duplicates
  //   faqQuestions.forEach((question) => {
  //     const newQuestion = question.cloneNode(true);
  //     question.parentNode?.replaceChild(newQuestion, question);
  //   });

  //   // Add fresh event listeners
  //   const newFaqQuestions = contentRef.current.querySelectorAll(".faq-ques");
  //   newFaqQuestions.forEach((question) => {
  //     const handleClick = () => {
  //       // Toggle active class
  //       question.classList.toggle("active");

  //       // Toggle answer visibility
  //       const answer = question.nextElementSibling as HTMLElement;
  //       if (answer && answer.classList.contains("faq-ans")) {
  //         if (answer.style.display === "none" || answer.style.display === "") {
  //           answer.style.display = "block";
  //           question.setAttribute("aria-expanded", "true");
  //         } else {
  //           answer.style.display = "none";
  //           question.setAttribute("aria-expanded", "false");
  //         }
  //       }
  //     };

  //     const handleKeyDown = (e: Event) => {
  //       const keyEvent = e as KeyboardEvent;
  //       if (keyEvent.key === "Enter" || keyEvent.key === " ") {
  //         keyEvent.preventDefault();
  //         handleClick();
  //       }
  //     };

  //     question.addEventListener("click", handleClick);
  //     question.addEventListener("keydown", handleKeyDown);

  //     // Add accessibility attributes
  //     question.setAttribute("role", "button");
  //     question.setAttribute("tabindex", "0");
  //     question.setAttribute("aria-expanded", "false");
  //   });

  //   // Initialize FAQ state - hide all answers except active ones
  //   const faqAnswers = contentRef.current.querySelectorAll(".faq-ans");
  //   faqAnswers.forEach((answer, index) => {
  //     const question = answer.previousElementSibling;
  //     if (question?.classList.contains("active")) {
  //       (answer as HTMLElement).style.display = "block";
  //       question.setAttribute("aria-expanded", "true");
  //     } else {
  //       (answer as HTMLElement).style.display = "none";
  //       question?.setAttribute("aria-expanded", "false");
  //     }
  //   });

  //   // Clean up function
  //   return () => {
  //     newFaqQuestions.forEach((question) => {
  //       const newQuestion = question.cloneNode(true);
  //       question.parentNode?.replaceChild(newQuestion, question);
  //     });
  //   };
  // }, [content]);

  return (
    <div
      className={`styledContent ${styles.styledContent} prose prose-lg max-w-none`}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
