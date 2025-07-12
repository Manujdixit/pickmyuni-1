"use client";

import React from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonialsData = [
  {
    _id: "1",
    name: "Kevin Desai",
    role: "Bachelor of Nursing at a regional university in Queensland",
    testimonial: `I was worried about the high tuition fees at my original university and didn’t know what to do, especially since I really wanted to continue studying the same course. That’s when I came across PickMyUni, and they’ve honestly been a huge help.
    They guided me through affordable university options that offered the same course with no compromise on quality.What stood out the most was how patient and supportive their team was throughout the process.They explained everything clearly and helped me make the switch smoothly without affecting my visa or study plans.
    Thanks to PickMyUni, I’m now studying at a university I can afford while still getting the quality education I wanted. I’d definitely recommend them to any student looking for better study options in Australia.`,
    hasVideo: false,
    profileImage: "/api/placeholder/60/60",
    videoUrl: "",
  },
  {
    _id: "2",
    name: "Sai P",
    role: "Master of Information Technology in Victoria",
    testimonial: `I’m really glad I found PickMyUni when I was struggling to continue my studies in Australia due to financial reasons. I wanted to stay in the same course but needed a more affordable option without compromising on the quality of education. The team at PickMyUni truly delivered – they helped me explore universities that offered the same course at a much more budget-friendly fee and ensured the academic standards were still high.
    Their support was honest, responsive, and personal. They didn’t just send me a list – they walked me through the options, answered all my questions, and made sure I felt confident in my decision. Thanks to PickMyUni, I’m now continuing my studies stress-free at a great university that fits my budget and academic goals.
    Highly recommend them to anyone looking for affordable and reliable course transfer help in Australia!`,
    hasVideo: false,
    profileImage: "/api/placeholder/60/60",
    videoUrl: "",
  },
  {
    _id: "3",
    name: "Saniya Ahmed",
    role: "Certificate IV in Aged Care, transferring to Diploma of Community Services",
    testimonial: `As an international student, I was overwhelmed by the number of universities, courses, and visa requirements. PickMyUni guided me every step of the way — from shortlisting the right course based on my PR goals and budget to handling the application and transfer process smoothly.
    What really stood out was how supportive and responsive their team was. They took time to understand my situation, explained everything clearly, and even helped me explore scholarship options. It didn’t feel like I was just another student — their service felt genuinely personalised.
    Thanks to PickMyUni, I’m now studying a course I enjoy at a university that fits my future goals perfectly. Highly recommend their services if you’re unsure where to begin or want honest, reliable support throughout your study journey in Australia!`,
    hasVideo: false,
    profileImage: "/api/placeholder/60/60",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    _id: "4",
    name: "Love Brar",
    role: "International student",
    testimonial: `Being an international student, I was really confused about how to choose the right university and course in Australia. That’s when I found PickMyUni, and honestly, they’ve been a game-changer. From the very first consultation, they were professional, supportive, and genuinely interested in helping me figure things out.
    They helped me explore universities that matched both my career plans and budget, and also assisted with course transfers and visa-related queries. Their guidance felt personal, not just like ticking boxes.
    What I really loved was how patient and responsive they were, no matter how many questions I asked. They even pointed me toward scholarship options I hadn’t considered before. Thanks to them, I’ve ended up in a course I really enjoy, at a university that feels right for me.
    If you’re unsure about where to begin or feeling stuck, I’d definitely recommend PickMyUni. Their support goes a long way.`,
    hasVideo: false,
    profileImage: "/api/placeholder/60/60",
  },
  {
    _id: "5",
    name: "Ashik Nath",
    role: "International student",
    testimonial: `Choosing the right university in Australia was overwhelming with so many choices and high costs. PickMyUni made it easy to compare affordable IT courses and helped me pick one that matched my budget and PR goals. Their team was helpful, quick to respond, and professional. Thanks to them, I’m now studying in Melbourne and feeling confident about my future.`,
    hasVideo: false,
  },
  {
    _id: "6",
    name: "Hari Prasad Reddy",
    role: "International student",
    testimonial: `Amazing experience! The platform helped me find my dream university. The guidance and resources were top-notch. Highly recommend PickMyUni to anyone looking for expert advice on university selection. Thanks for making my decision-making process so much easier! 😊👍.`,
    hasVideo: false,
  },
  {
    _id: "7",
    name: "Shailja Parmar",
    role: "International student",
    testimonial: `As an international student, choosing the right university in Australia was overwhelming—until I found PickMyUni. Their team made the whole process so much easier and less stressful. From helping me shortlist universities that matched my goals and budget, to guiding me through course transfers and visa requirements, they were super supportive every step of the way.
    What really stood out was how responsive and patient they were with all my questions (and I had a lot). They also helped me apply for scholarships I didn’t even know I was eligible for. Thanks to PickMyUni, I’m now happily studying in a course I love, at a university that fits me perfectly.
    If you’re confused about where to start or worried about switching courses, I 100% recommend them. They genuinely care and know what they’re doing!`,
    hasVideo: false,
  },
];

export default function TestimonialsSection() {
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(true);

  const checkScrollPosition = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  React.useEffect(() => {
    checkScrollPosition();
    const handleResize = () => checkScrollPosition();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -200, behavior: "smooth" });
      setTimeout(checkScrollPosition, 300);
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 200, behavior: "smooth" });
      setTimeout(checkScrollPosition, 300);
    }
  };

  return (
    <section className="bg-brand-primary flex flex-col py-28">
      <div className="container mx-auto mb-12 flex items-center justify-between">
        <h2 className="text-4xl font-semibold leading-tight text-white sm:text-[42px]">
          What Students <span className="text-brand-secondary">Say!</span>
        </h2>
        <div className="flex space-x-2">
          <button
            onClick={scrollLeft}
            disabled={!canScrollLeft}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 text-white transition-all hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={scrollRight}
            disabled={!canScrollRight}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 text-white transition-all hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Next testimonial"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
      <div className="w-full overflow-hidden">
        <div
          ref={scrollRef}
          onScroll={checkScrollPosition}
          className="scrollbar-hide container mx-auto flex flex-row gap-x-4 overflow-x-auto scroll-smooth"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {testimonialsData.map((testimonial, index) => (
            <div key={testimonial._id} className="flex flex-shrink-0 flex-col">
              {/* Testimonial speech bubble */}
              <div className="relative mb-6 max-w-[320px] rounded-2xl bg-white p-6 shadow-lg sm:max-w-[400px]">
                {testimonial.hasVideo ? (
                  <div className="size-full">
                    <iframe
                      style={{ maxWidth: "200px" }}
                      src={testimonial.videoUrl}
                      title="YouTube video player"
                      frameBorder="0"
                      allowFullScreen
                    ></iframe>
                  </div>
                ) : (
                  <div className="">
                    <Quote className="mb-1 h-8 font-serif text-5xl leading-none text-gray-400 opacity-50" />
                    <div className="max-h-60 overflow-y-scroll">
                      <p className="leading-relaxed text-black">
                        {testimonial.testimonial}
                      </p>
                    </div>
                  </div>
                )}
                {/* Speech bubble tail */}
                <div className="absolute -bottom-1 right-2">
                  {/* triangle */}
                  <div className="h-4 w-4 rotate-45 bg-white" />
                </div>
              </div>

              {/* Profile section */}
              <div className="flex max-w-[320px] items-center space-x-4">
                <div>
                  <p className="mb-1 text-base font-semibold text-white">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-white/80">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
