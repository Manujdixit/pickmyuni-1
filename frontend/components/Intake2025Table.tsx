import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const intakes = [
  {
    intakeType: "Primary",
    intakeName: "February intake Australia",
    availability: "All Programs",
    applicationSession: "Large number of applications",
    scholarships: "Multiple types of financial aid and scholarships",
    deadline: "February or Early March – Late May or Early June",
  },
  {
    intakeType: "Primary",
    intakeName: "July intake in Australia",
    availability: "Majority of Programs",
    applicationSession: "Lesser than February",
    scholarships: "Fewer financial aid and scholarships",
    deadline: "Late July or Early August – November",
  },
  {
    intakeType: "Primary",
    intakeName: "November intake in Australia",
    availability: "Minor, least popular with some selected programs",
    applicationSession: "Very Limited",
    scholarships: "Less than July Intakes",
    deadline: "Late November - January",
  },
  {
    intakeType: "Secondary",
    intakeName: "Semester 1 Intake",
    availability: "All Programs",
    applicationSession: "Primary Intake Season",
    scholarships: "Multiple types of financial aid and scholarships",
    deadline: "February or Early March – Late May or Early June",
  },
  {
    intakeType: "Secondary",
    intakeName: "Semester 2 Intake",
    availability: "Majority of Programs",
    applicationSession: "Secondary Intake Season",
    scholarships: "Fewer financial aid and scholarships",
    deadline: "Late July or Early August – November",
  },
  {
    intakeType: "Secondary",
    intakeName: "Semester 3 Intake",
    availability: "Limited universities are available less popular",
    applicationSession: "Secondary Intake Season",
    scholarships: "Fewer financial aid and scholarships",
    deadline: "Late November - January",
  },
];

export function Intake2025Table() {
  return (
    <div className="container">
      <h2 className="mb-4 text-center text-4xl font-semibold text-white sm:text-start">
        How many Intakes are there in Australia​?
      </h2>
      <Table>
        <TableHeader>
          <TableRow className="text-white">
            <TableHead className="bg-brand-primary border-x-2 border-[#FF882E] text-h3">
              Intake Type
            </TableHead>
            <TableHead className="bg-brand-primary border-x-2 border-[#FF882E] text-h3">
              Intake Name
            </TableHead>
            <TableHead className="bg-brand-primary border-x-2 border-[#FF882E] text-h3">
              Availability of Program
            </TableHead>
            <TableHead className="bg-brand-primary border-x-2 border-[#FF882E] text-h3">
              Application Session
            </TableHead>
            <TableHead className="bg-brand-primary border-x-2 border-[#FF882E] text-h3">
              Scholarships and Financial Aid
            </TableHead>
            <TableHead className="bg-brand-primary border-x-2 border-[#FF882E] text-h3">
              Application Deadline
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {intakes.map((row, index) => (
            <TableRow
              className={`text-h4 leading-tight ${
                index % 2 === 0 ? "bg-[#F9F9F9]" : "bg-[#F0F0F0]"
              }`}
              key={index}
            >
              <TableCell className="border-x-2 border-[#FF882E]">
                {row.intakeType}
              </TableCell>
              <TableCell className="border-x-2 border-[#FF882E]">
                {row.intakeName}
              </TableCell>
              <TableCell className="border-x-2 border-[#FF882E]">
                {row.availability}
              </TableCell>
              <TableCell className="border-x-2 border-[#FF882E]">
                {row.applicationSession}
              </TableCell>
              <TableCell className="border-x-2 border-[#FF882E]">
                {row.scholarships}
              </TableCell>
              <TableCell className="border-x-2 border-[#FF882E]">
                {row.deadline}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
