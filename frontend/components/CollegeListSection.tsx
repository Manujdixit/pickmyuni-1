import { CollegeCard, CollegeCardData } from "./CollegeCard";

interface CollegeListSectionProps {
  colleges: CollegeCardData[];
  loading: boolean;
  error: string | null;
  title: string;
  description: string;
  level?: string;
}

export function CollegeListSection({
  colleges,
  loading,
  error,
  title,
  description,
  level,
}: CollegeListSectionProps) {
  if (loading) {
    return (
      <section className="flex flex-col justify-center">
        <h2 className="text-brand-primary mb-4 text-center text-4xl font-semibold">
          {title}
        </h2>
        <p className="mb-2 text-center">{description}</p>
        <div className="mt-8 grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
          {Array.from({ length: 9 }).map((_, idx) => (
            <div
              key={idx}
              className="flex h-full animate-pulse flex-col items-center bg-[#F6F6F7] shadow hover:shadow-md"
            >
              <div className="space-y-2">
                <div className="relative mb-2 h-48 w-full rounded bg-gray-300"></div>
                <div className="p-4">
                  <div className="mb-2 h-6 rounded bg-gray-300"></div>
                  <div className="mb-1 h-4 rounded bg-gray-300"></div>
                  <div className="mb-1 h-4 rounded bg-gray-300"></div>
                  <div className="h-4 rounded bg-gray-300"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="flex flex-col justify-center">
        <h2 className="text-brand-primary mb-4 text-center text-4xl font-semibold">
          {title}
        </h2>
        <p className="mb-2 text-center">{description}</p>
        <div className="mt-8 text-center">
          <p className="text-red-600">Failed to load colleges: {error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-brand-primary hover:bg-brand-primary/90 mt-4 rounded px-4 py-2 text-white"
          >
            Try Again
          </button>
        </div>
      </section>
    );
  }

  if (colleges.length === 0) {
    return (
      <section className="flex flex-col justify-center">
        <h2 className="text-brand-primary mb-4 text-center text-4xl font-semibold">
          {title}
        </h2>
        <p className="mb-2 text-center">{description}</p>
        <div className="mt-8 text-center">
          <p className="text-gray-600">
            No colleges found for this {level ? `level ${level}` : "criteria"}.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="flex flex-col justify-center">
      <h2 className="text-brand-primary mb-4 text-center text-4xl font-semibold">
        {title}
      </h2>
      <p className="mb-2 text-center">{description}</p>
      <div className="mt-8 grid gap-4 md:grid-cols-2 md:gap-8 md:gap-y-10 lg:grid-cols-3">
        {colleges.map((college, idx) => (
          <div
            key={college.id}
            className="flex h-full flex-col items-center bg-[#F6F6F7] shadow hover:shadow-md"
          >
            <CollegeCard college={college} index={idx} />
          </div>
        ))}
      </div>
    </section>
  );
}
