"use client";
import Link from "next/link";
import { ArticlesLoadingSkeleton } from "@/components/skeleton/article-skeleton";
import { useTopArticles } from "@/hooks/useTopArticles";
import { Button } from "../ui/button";
import Image from "next/image";
import moment from "moment";
import { capitalFirst } from "@/utils/capitalFirst";

interface Article {
  id: number;
  _id?: string;
  title: string;
  meta_desc: string;
  description?: string;
  author?: string;
  published_date?: string;
  createdAt?: string;
  slug?: string;
  image?: string;
  silos?: string;
}

const arr = [
  "https://pickmyuni-bucket.s3.ap-southeast-2.amazonaws.com/static/pr_path1.webp",
  "https://pickmyuni-bucket.s3.ap-southeast-2.amazonaws.com/static/pr_path2.webp",
  "https://pickmyuni-bucket.s3.ap-southeast-2.amazonaws.com/static/pr_path3.webp",
];

export const randomImage = () => {
  return arr[Math.floor(Math.random() * arr.length)];
};

export default function ArticlesSection() {
  const { articles, loading, error } = useTopArticles();

  if (loading) {
    return <ArticlesLoadingSkeleton />;
  }

  if (error) {
    return;
  }

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        <h2 className="mb-12 text-center text-4xl font-semibold leading-tight">
          <span className="text-brand-primary">Recent</span>{" "}
          <span className="text-brand-secondary">Articles</span>
        </h2>

        <div className="grid gap-8 md:grid-cols-3">
          {articles?.slice(0, 3).map((article: Article) => (
            <div
              key={article.id}
              className="overflow-hidden rounded-lg bg-[#F6F6F7] shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="relative h-64">
                <Image
                  src={article.image || randomImage()}
                  alt={article.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <div className="mb-2 flex items-center text-xs text-gray-500">
                  <span>{capitalFirst(article?.silos) || "GENERAL"}</span>
                  <span className="mx-2">•</span>
                  <span>{moment(article.createdAt).format("MMM D, YYYY")}</span>
                </div>
                <h3 className="text-brand-primary mb-2 text-lg font-bold">
                  {article.title}
                </h3>
                <p className="mb-4 text-sm text-gray-600">
                  {article.description}
                </p>
                <Link
                  href={`/student-resources/${article.slug}-${article.id}`}
                  className="text-brand-secondary text-sm font-medium hover:underline"
                >
                  Read More
                </Link>
              </div>
            </div>
          ))}
        </div>

        {articles?.length > 3 && (
          <div className="mt-8 flex justify-center">
            <Link href="/student-resources">
              <Button>View All Articles</Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
