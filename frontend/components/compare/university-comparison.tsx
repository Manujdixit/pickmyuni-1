import UniversityComparisonHero from "./UniversityComparisonHero";
import UniversityComparisonHeader from "./UniversityComparisonHeader";
import UniversityBenefits from "./UniversityBenefits";
import UniversityComparisonCTA from "./UniversityComparisonCTA";
import dynamic from "next/dynamic";

const UniversityComparisonForm = dynamic(
  () => import("./UniversityComparisonForm"),
);

export default function ComaprisonComponent() {
  return (
    <div className="min-h-screen bg-[#F6F6F7]">
      <UniversityComparisonHero />
      <div className="container mx-auto py-12 lg:py-16">
        <UniversityComparisonHeader />
        <UniversityComparisonForm />
        <hr className="mb-16 mt-8 border-gray-200" />
        <UniversityBenefits />
      </div>
      <UniversityComparisonCTA />
    </div>
  );
}
