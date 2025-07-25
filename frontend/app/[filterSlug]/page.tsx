import dynamic from "next/dynamic";
import { notFound } from "next/navigation";

const UniversityPage = dynamic(
  () => import("@/components/listing/Universitypage"),
);

interface PageProps {
  params: Promise<{ filterSlug: string }>;
}

const page = async ({ params }: PageProps) => {
  const { filterSlug } = await params;

  if (
    filterSlug.startsWith("top-universities-in-australia") ||
    filterSlug.startsWith("universities")
  ) {
    return <UniversityPage />;
  } else {
    notFound();
  }
};

export default page;
