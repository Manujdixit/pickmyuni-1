import { Card, CardContent } from "@/components/ui/card";

export default function IntakeApplicationSteps() {
  const steps = [
    {
      number: 1,
      title: "Research and Select a Course",
      description:
        "Explore universities and programs that align with your career goals. Consider factors such as location, tuition fees, scholarships, and job opportunities.",
      position: "right",
    },
    {
      number: 2,
      title: "Check Eligibility and Requirements",
      description:
        "Ensure you meet academic, language, and financial requirements before applying. Contact university admission offices for detailed program-specific criteria.",
      position: "left",
    },
    {
      number: 3,
      title: "Submit Applications",
      description:
        "Apply to preferred universities before the respective deadlines. Many universities accept applications online through their portals or via registered education agents.",
      position: "right",
    },
    {
      number: 4,
      title: "Receive Offer Letter",
      description:
        "Once accepted, you will receive a Confirmation of Enrollment (CoE). Carefully review the conditions in your offer letter and accept it by paying the required deposit.",
      position: "left",
    },
    {
      number: 5,
      title: "Apply for a Student Visa",
      description:
        "Submit your visa application along with necessary documents such as CoE, proof of funds, health insurance (OSHC), and English proficiency scores.",
      position: "right",
    },
    {
      number: 6,
      title: "Prepare for Your Journey",
      description:
        "Arrange accommodation, travel, and health insurance before departure. Attend pre-departure sessions to get insights about Australian student life.",
      position: "left",
    },
  ];

  return (
    <div className="pt-10">
      {/* Steps Container */}
      <div className="relative">
        {/* Connecting Line - Hidden on mobile */}
        <div className="absolute bottom-0 left-1/2 top-0 z-10 hidden -translate-x-1/2 transform border-l-8 border-dotted border-orange-200 lg:block"></div>

        {/* Mobile Connecting Line - Hidden on desktop */}
        <div className="absolute bottom-0 left-1/2 top-0 z-0 -translate-x-1/2 transform border-l-4 border-dotted border-orange-200 lg:hidden"></div>

        <div className="space-y-8 sm:space-y-12 lg:space-y-16">
          {steps.map((step) => (
            <div
              key={step.number}
              className="relative flex flex-col items-center justify-center lg:flex-row"
            >
              {/* Desktop Layout */}
              <div className="hidden w-full items-center lg:flex">
                {step.position === "left" ? (
                  <>
                    {/* Content on left */}
                    <div className="relative w-5/12 pr-8">
                      <Card className="relative ml-auto max-w-md rounded-l-md rounded-r-lg shadow-lg transition-shadow duration-300 hover:shadow-xl">
                        <CardContent className="p-5 text-left">
                          <h3 className="text-h2 leading-tight text-gray-900">
                            {step.title}
                            <br />
                            <span className="font-light text-gray-900">
                              {step.description}
                            </span>
                          </h3>
                        </CardContent>
                        <div className="absolute -right-3 top-4 h-0 w-0 border-b-[6px] border-l-[12px] border-t-[6px] border-b-transparent border-l-white border-t-transparent"></div>
                      </Card>
                    </div>

                    {/* Circle in center */}
                    <div className="flex w-2/12 justify-center">
                      <div className="bg-brand-primary relative z-10 flex h-16 w-16 items-center justify-center rounded-full shadow-lg">
                        <span className="text-2xl font-bold text-white">
                          {step.number}
                        </span>
                      </div>
                    </div>

                    {/* Empty space on right */}
                    <div className="w-5/12"></div>
                  </>
                ) : (
                  <>
                    {/* Empty space on left */}
                    <div className="w-5/12"></div>

                    {/* Circle in center */}
                    <div className="flex w-2/12 justify-center">
                      <div className="bg-brand-primary relative z-10 flex h-16 w-16 items-center justify-center rounded-full shadow-lg">
                        <span className="text-2xl font-bold text-white">
                          {step.number}
                        </span>
                      </div>
                    </div>

                    {/* Content on right */}
                    <div className="w-5/12 pl-8">
                      <Card className="relative mr-auto max-w-md rounded-l-lg rounded-r-md shadow-lg transition-shadow duration-300 hover:shadow-xl">
                        <CardContent className="p-5 text-left">
                          <h3 className="text-h2 leading-tight text-gray-900">
                            {step.title}
                            <br />
                            <span className="font-light text-gray-900">
                              {step.description}
                            </span>
                          </h3>
                        </CardContent>
                        <div className="absolute -left-3 top-4 h-0 w-0 border-b-[6px] border-r-[12px] border-t-[6px] border-b-transparent border-r-white border-t-transparent"></div>
                      </Card>
                    </div>
                  </>
                )}
              </div>

              {/* Mobile/Tablet Layout */}

              <div className="mx-auto flex max-w-md flex-col items-center text-center lg:hidden">
                <div className="bg-brand-primary mb-4 flex h-14 w-14 items-center justify-center rounded-full shadow-lg sm:h-16 sm:w-16">
                  <span className="text-xl font-bold text-white sm:text-2xl">
                    {step.number}
                  </span>
                </div>
                <Card className="w-full rounded-lg shadow-lg transition-shadow duration-300 hover:shadow-xl">
                  <CardContent className="p-4 sm:p-6">
                    <h3 className="mb-2 text-base font-semibold leading-tight text-gray-800 sm:text-lg">
                      {step.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-gray-600 sm:text-base">
                      {step.description}
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
