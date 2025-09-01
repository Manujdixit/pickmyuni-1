import { tagSanatize } from "@/utils/tagsanatize";
import Image from "next/image";
import Link from "next/link";

export interface CollegeCardData {
  id: number;
  meta_desc?: string;
  bg_url?: string;
  college_name: string;
  logo_url?: string;
  slug: string;
  location: string;
}

interface CollegeCardProps {
  college: CollegeCardData;
  index: number;
}

export function CollegeCard({ college, index }: CollegeCardProps) {
  return (
    <Link
      className="w-full"
      href={`/university/${tagSanatize(college.slug)}-${college.id}/info`}
    >
      <div className="group w-full space-y-2">
        <div className="relative mb-2 h-48 w-full overflow-hidden">
          <Image
            src={
              college?.bg_url
                ? `https://pickmyuni-bucket.s3.ap-southeast-2.amazonaws.com/collegebanner/${college.bg_url}`
                : "/transfer.svg"
            }
            alt={college.college_name}
            fill
            className="rounded-t object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
        <div className="w-full space-y-4 p-4">
          <p className="text-brand-primary text-2xl font-semibold">
            {index + 1}. {college.college_name}
          </p>
          <span className="font-semibold text-gray-500">
            {college.location}
          </span>

          {college.meta_desc && (
            <div
              className="text-base font-normal [&_li]:mb-1 [&_ul]:list-disc [&_ul]:pl-6"
              dangerouslySetInnerHTML={{ __html: college.meta_desc || "" }}
            />
          )}
        </div>
      </div>
    </Link>
  );
}
