import { Article } from "@/types/search";
import React from "react";
import Link from "next/link";
import { useTopArticles } from "@/hooks/useTopArticles";
import moment from "moment";

function PopularArticles() {
  const { articles, loading, error } = useTopArticles();

  if (loading) {
    return (
      <section className="py-8">
        <div className="container mx-auto">
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="overflow-hidden rounded-xl border border-gray-100 bg-white">
                  <div className="flex">
                    <div className="h-32 w-40 flex-shrink-0 bg-gray-200"></div>
                    <div className="flex flex-1 flex-col justify-center space-y-2 p-4">
                      <div className="h-3 w-1/3 rounded bg-gray-200"></div>
                      <div className="h-4 w-5/6 rounded bg-gray-200"></div>
                      <div className="h-4 w-3/4 rounded bg-gray-200"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center text-red-500">Error: {error}</div>
        </div>
      </section>
    );
  }

  return (
    <section className="pt-8">
      <div className="max-w-[1400px]">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {articles?.slice(0, 4).map((article: Article) => (
            <Link
              href={`/student-resources/${article.slug}-${article.id}`}
              key={article.id}
              className="group"
            >
              <div className="mb-6 overflow-hidden shadow-sm transition-shadow hover:shadow-lg md:shadow-none md:hover:shadow-none">
                <div className="flex">
                  <div className="relative h-32 w-40 flex-shrink-0 overflow-hidden rounded-xl">
                    <img
                      src={article.img1 || "/transfer3.svg"}
                      alt={article.title}
                      className="h-full w-full object-cover transition-all duration-300 group-hover:scale-110"
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-center px-4">
                    <div className="mb-2 text-xs font-medium uppercase tracking-wide text-gray-400">
                      {moment(article.createdAt).format("MMMM Do, YYYY")}
                    </div>
                    <h3 className="text-brand-primary line-clamp-3 text-2xl font-medium leading-tight transition-colors">
                      {article.title}
                    </h3>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PopularArticles;
