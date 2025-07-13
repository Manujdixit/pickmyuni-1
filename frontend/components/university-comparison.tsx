import UniversityComparisonHero from "./university/UniversityComparisonHero";
import UniversityComparisonHeader from "./university/UniversityComparisonHeader";
import UniversityComparisonForm from "./university/UniversityComparisonForm";
import UniversityBenefits from "./university/UniversityBenefits";
import UniversityComparisonCTA from "./university/UniversityComparisonCTA";

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
