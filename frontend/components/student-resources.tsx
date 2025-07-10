"use client";

// import { useTopArticles } from "@/hooks/useTopArticles";
// import Image from "next/image";
// import Link from "next/link";
import React, { useEffect, useState } from "react";
// import { Article } from "@/types/search";
// import PopularArticles from "./PopularArticles";
import RecentArticles from "./RecentArticles";
// import { Button } from "./ui/button";
// import { notFound } from "next/navigation";

// function getLimitByScreenSize(width: number): number {
//   if (width < 640) return 70; // mobile
//   if (width < 1024) return 100; // tablet
//   return 600; // desktop
// }

// function stripHtmlAndTruncate(html: string, limit: number): string {
//   const tempDiv = document.createElement("div");
//   tempDiv.innerHTML = html;
//   const text = tempDiv.textContent || tempDiv.innerText || "";
//   return text.length > limit ? text.slice(0, limit) + "..." : text;
// }

function StudentResources() {
  // const { articles, loading, error } = useTopArticles();

  // const [charLimit, setCharLimit] = useState(100);

  // useEffect(() => {
  //   function handleResize() {
  //     setCharLimit(getLimitByScreenSize(window.innerWidth));
  //   }

  //   handleResize(); // initial
  //   window.addEventListener("resize", handleResize);
  //   return () => window.removeEventListener("resize", handleResize);
  // }, []);

  // if (loading) {
  //   return (
  //     <div>
  //       {/* Loading skeleton for 2 main articles */}
  //       {/* <section className="container mx-auto py-16">
  //         <div className="flex flex-col gap-8">
  //           {[1, 2].map((index) => (
  //             <div
  //               key={index}
  //               className={`flex flex-col md:flex-row ${
  //                 index % 2 !== 0 ? "" : "md:flex-row-reverse"
  //               } mb-6 overflow-hidden rounded-lg bg-white`}
  //             >
  //               <div className="h-64 w-full md:h-auto md:w-1/3">
  //                 <div className="h-full w-full animate-pulse rounded-xl bg-gray-200" />
  //               </div>

  //               <div className="w-full p-6 md:w-2/3">
  //                 <div className="mb-2 h-4 w-24 animate-pulse rounded bg-gray-200" />
  //                 <div className="mb-2 h-8 w-3/4 animate-pulse rounded bg-gray-200" />
  //                 <div className="mb-4 space-y-2">
  //                   <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
  //                   <div className="h-4 w-5/6 animate-pulse rounded bg-gray-200" />
  //                   <div className="h-4 w-4/5 animate-pulse rounded bg-gray-200" />
  //                 </div>
  //                 <div className="h-10 w-24 animate-pulse rounded bg-gray-200" />
  //               </div>
  //             </div>
  //           ))}
  //         </div>
  //       </section> */}

  //       {/* Loading skeleton for Popular Articles section */}
  //       {/* <section className="bg-orange-50">
  //         <div className="container mx-auto py-16">
  //           <div className="h-8 bg-gray-200 rounded animate-pulse w-64 mb-8" />
  //           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
  //             {[1, 2, 3, 4].map((index) => (
  //               <div key={index} className="bg-white rounded-lg p-4">
  //                 <div className="w-full h-48 bg-gray-200 animate-pulse rounded mb-4" />
  //                 <div className="h-4 bg-gray-200 rounded animate-pulse w-20 mb-2" />
  //                 <div className="h-6 bg-gray-200 rounded animate-pulse w-full mb-2" />
  //                 <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
  //               </div>
  //             ))}
  //           </div>
  //         </div>
  //       </section> */}

  //       {/* Loading skeleton for Recent Articles section */}
  //       <section className="container mx-auto flex flex-col justify-center py-24">
  //         <div className="mx-auto mb-8 h-8 w-64 animate-pulse rounded bg-gray-200" />
  //         <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
  //           {[1, 2, 3, 4, 5, 6].map((index) => (
  //             <div key={index} className="rounded-lg bg-white p-4 shadow-md">
  //               <div className="mb-4 h-48 w-full animate-pulse rounded bg-gray-200" />
  //               <div className="mb-2 h-4 w-20 animate-pulse rounded bg-gray-200" />
  //               <div className="mb-2 h-6 w-full animate-pulse rounded bg-gray-200" />
  //               <div className="space-y-2">
  //                 <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
  //                 <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200" />
  //               </div>
  //             </div>
  //           ))}
  //         </div>
  //       </section>
  //     </div>
  //   );
  // }

  // if (error) {
  //   return notFound();
  // }

  return (
    <div>
      {/* 2 blogs */}
      {/* <section className="container mx-auto py-16">
        <div className="flex flex-col gap-8">
          {articles?.slice(0, 2).map((article: Article, index: number) => (
            <div
              key={article.id}
              className={`flex flex-col md:flex-row ${
                index % 2 !== 0 ? "md:flex-row-reverse" : ""
              } mb-6 overflow-hidden rounded-lg bg-white shadow-md transition-shadow hover:shadow-lg md:shadow-none md:hover:shadow-none`}
            >
              <div className="h-64 w-full overflow-hidden rounded-xl md:h-auto md:w-1/3">
                <Image
                  src={article.image || "/transfer3.svg"} // Replace with real image path
                  alt={article.title}
                  width={600}
                  height={400}
                  className="h-full w-full object-cover transition-transform duration-500 ease-in-out hover:scale-110"
                />
              </div>

              <div className="w-full p-6 md:w-2/3">
                <div className="mb-2 flex items-center text-sm font-normal text-gray-500">
                  <span>
                    {new Date(article.createdAt)
                      .toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })
                      .toUpperCase()}
                  </span>
                </div>
                <Link
                  className="cursor-pointer"
                  href={`/student-resources/${article.id}`}
                >
                  <h3 className="text-brand-primary mb-2 text-4xl font-medium">
                    {article.title}
                  </h3>
                </Link>
                <p className="mb-4 text-lg font-normal text-gray-600">
                  {stripHtmlAndTruncate(article.content, charLimit)}
                </p>
                <Link href={`/student-resources/${article.id}`}>
                  <Button variant={"secondary"}>Read More</Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section> */}

      {/* <section className="bg-orange-50">
        <div className="container mx-auto py-16">
          <h2 className="text-brand-primary text-4xl font-semibold">
            Most Popular <span className="text-brand-secondary">Articles</span>
          </h2>
          <PopularArticles />
        </div>
      </section> */}

      {/* <section className="container mx-auto flex flex-col justify-center py-24">
        <h2 className="text-brand-primary mb-4 text-center text-4xl font-semibold">
          Most Recent <span className="text-brand-secondary">Articles</span>
        </h2> */}
      <RecentArticles />
      {/* </section> */}
    </div>
  );
}

export default StudentResources;
