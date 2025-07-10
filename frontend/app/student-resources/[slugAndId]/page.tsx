import Image from "next/image";
import { notFound, redirect } from "next/navigation";
import SocialShare from "@/components/SocialShare";
import ArticleContent from "@/components/ArticleContent";
import { Article } from "@/types/search";
import { Metadata } from "next";
import SuggestedArticles from "@/components/SuggestedArticles";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import moment from "moment";

async function getArticle(id: number): Promise<Article | null> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/articles/${id}`,
    );

    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error(`Failed to fetch article: ${response.status}`);
    }

    const data = await response.json();
    return data.data.article;
  } catch (error) {
    console.error("Error fetching article:", error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slugAndId: string }>;
}): Promise<Metadata> {
  const { slugAndId } = await params;

  // Split into slug and id
  const parts = slugAndId.split("-");
  const id = parts.pop();

  if (!id || isNaN(Number(id))) {
    return {
      title: "Article Not Found | PickMyUni",
      description:
        "The requested article could not be found. Explore our other student resources and guides for studying in Australia.",
    };
  }

  const article = await getArticle(Number(id));

  if (!article) {
    return {
      title: "Article Not Found | PickMyUni",
      description:
        "The requested article could not be found. Explore our other student resources and guides for studying in Australia.",
    };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://pickmyuni.com";
  const articleUrl = `${siteUrl}/student-resources/${article.slug}-${article.id}`;

  return {
    title: `${article.title} | PickMyUni`,
    description:
      article.meta_desc ||
      `${article.title} - Expert advice and guidance for international students studying in Australia.`,
    keywords: [
      "student resources Australia",
      "study abroad tips",
      "international student guide",
      "Australian university advice",
      "student life Australia",
      "education blog",
      article.title.toLowerCase(),
    ],
    openGraph: {
      title: article.title,
      description: article.meta_desc || article.title,
      url: articleUrl,
      siteName: "PickMyUni",
      type: "article",
      publishedTime: article.createdAt,
      images: article.image
        ? [
            {
              url: article.image,
              width: 1200,
              height: 630,
              alt: article.title,
            },
          ]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.meta_desc || article.title,
      images: article.image ? [article.image] : [],
    },
    alternates: {
      canonical: articleUrl,
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slugAndId: string }>;
}) {
  const { slugAndId } = await params;

  // Split into slug and id
  const parts = slugAndId.split("-");
  const id = parts.pop(); // last part is ID
  const slug = parts.join("-"); // rest is slug

  if (!id || isNaN(Number(id))) {
    notFound();
  }

  const article = await getArticle(Number(id));

  if (!article) {
    notFound();
  }

  // If the slug is incorrect, redirect to correct URL
  if (article.slug && slug !== article.slug) {
    redirect(`/student-resources/${article.slug}-${article.id}`);
  }

  // Generate the current page URL for social sharing
  const currentUrl = `${
    process.env.NEXT_PUBLIC_SITE_URL || "https://pickmyuni.com"
  }/student-resources/${article.slug}-${article.id}`;

  return (
    <div className="bg-white font-sans">
      {/* Hero Section */}
      <section className="relative h-[336px] w-full text-white">
        <Image
          src="/transfer.svg"
          alt="University campus background"
          fill
          className="object-cover"
          priority
          sizes="100vw"
          quality={85}
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="container mx-auto pb-8 text-center">
            {/* Date Badge */}
            {article?.createdAt && (
              <div className="mb-4 inline-block bg-orange-500 px-4 py-2 text-sm font-medium uppercase text-white">
                {moment(article?.createdAt).format("MMMM Do, YYYY")}
              </div>
            )}

            {/* Title */}
            <h1 className="mx-auto max-w-4xl text-3xl font-bold leading-tight text-white md:text-4xl lg:text-5xl">
              {article?.title}
            </h1>
          </div>
        </div>
      </section>
      <section className="container mx-auto flex flex-col gap-8 py-8 md:py-12 lg:flex-row lg:py-16">
        <div className="lg:w-3/4">
          <ArticleContent content={article.content} />
          <SocialShare
            title={article?.title || "Test Article"}
            url={currentUrl}
          />
        </div>
        <div className="flex h-fit min-h-[200px] w-full min-w-[220px] flex-col space-y-8 lg:w-1/4">
          <div className="bg-brand-primary flex flex-1 flex-col items-center justify-center rounded-md p-2">
            <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-white sm:h-20 sm:w-20">
              <Image
                src={"/favicon.ico"}
                alt={"Vercel Logo"}
                width={80}
                height={80}
                className="rounded-lg object-cover"
              />
            </div>
            <span className="mt-2 text-xl text-white">Fixed Sidebar</span>
            <span className="text-lg text-white">Fixed Sidebar</span>
          </div>

          <div className="rounded-md bg-[#FAF4F0] p-4">
            <span className="text-brand-primary text-xl font-semibold">
              RELATED BLOGS
            </span>
            <SuggestedArticles />
          </div>

          <div className="rounded-md bg-blue-50 p-4">
            <span className="text-brand-primary text-xl font-semibold">
              NEWSLETTER
            </span>
            <p className="my-1 text-sm leading-tight">
              Signup our newsletter services for daily news and updates
            </p>
            <div className="space-y-2">
              <Input
                placeholder="Your Name"
                className="border-gray-400 bg-white"
              />
              <Input
                placeholder="Email Address"
                className="border-gray-400 bg-white"
              />
              <Button variant={"secondary"} className="w-full">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
