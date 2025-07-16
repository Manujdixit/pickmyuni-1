"use client";

import { Article } from "@/types/search";
import React from "react";
import Link from "next/link";
import { useTopArticles } from "@/hooks/useTopArticles";
import Image from "next/image";
import { Skeleton } from "./ui/skeleton";
import moment from "moment";

function SuggestedArticles() {
  const { articles, loading, error } = useTopArticles();

  if (loading) {
    return (
      <section className="pt-4">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid grid-cols-1 gap-2">
            {articles?.slice(0, 4).map((article: Article) => (
              <Skeleton
                key={article.id}
                className="mb-4 h-48 rounded-md bg-white"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return null;
  }

  return (
    <section className="pt-4">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid grid-cols-1 gap-2">
          {articles?.slice(0, 4).map((article: Article) => (
            <Link
              href={`/student-resources/${article.slug}-${article.id}`}
              key={article.id}
              className="group border-t-[1px] border-gray-300 pt-2 first:border-0 hover:bg-gray-50"
            >
              <div className="overflow-hidden rounded-md">
                <div className="flex flex-row items-center">
                  <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md">
                    <Image
                      fill
                      src={article.img1 || "/transfer3.svg"}
                      alt={article.title}
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-center p-2">
                    <span className="text-xs text-gray-500">
                      {moment(article.createdAt).format("DD MMM YYYY")}
                    </span>
                    <h3 className="text-brand-primary line-clamp-2 text-sm font-medium leading-tight">
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

export default SuggestedArticles;
