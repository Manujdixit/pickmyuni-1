import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function UniversityComparisonCTA() {
  return (
    <section className="bg-brand-secondary mt-16">
      <div className="container mx-auto flex flex-col items-center justify-center py-12 lg:py-16">
        <h1 className="mb-6 text-3xl font-bold text-white md:text-4xl">
          Compare. Choose. Succeed
        </h1>
        <Link href="/university">
          <Button className="flex items-center">
            Start Your University Search Today!{" "}
            <Image
              src="/logo-button.svg"
              alt="Icon"
              width={40}
              height={40}
              className="ml-2"
            />
          </Button>
        </Link>
      </div>
    </section>
  );
}
