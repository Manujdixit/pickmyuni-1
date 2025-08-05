import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const universityComparisonData = [
  {
    feature: "Tuition Fees",
    public: "More affordable",
    private: "Generally higher",
  },
  {
    feature: "Government Funding",
    public: "Yes",
    private: "No",
  },
  {
    feature: "Global Recognition",
    public: "High",
    private: "Varies",
  },
  {
    feature: "Research Opportunities",
    public: "Extensive",
    private: "Limited",
  },
  {
    feature: "Scholarships",
    public: "Widely available",
    private: "Limited",
  },
  {
    feature: "Course Variety",
    public: "Wide range of options",
    private: "Limited in some cases",
  },
  {
    feature: "Campus Size & Facilities",
    public: "Larger campuses with advanced facilities",
    private: "Smaller campuses with fewer facilities",
  },
  {
    feature: "Internship & Job Prospects",
    public: "Strong industry connections and work placements",
    private: "Limited opportunities",
  },
];

export default function UniversityComparisonTable() {
  return (
    <Table className="mt-8 w-full border-collapse">
      <TableHeader>
        <TableRow>
          <TableHead className="border-2 border-white bg-blue-900 px-6 py-3 text-lg text-white">
            Feature
          </TableHead>
          <TableHead className="border-2 border-white bg-orange-500 px-6 py-3 text-center text-lg text-white">
            Public Universities
          </TableHead>
          <TableHead className="border-2 border-white bg-blue-900 px-6 py-3 text-center text-lg text-white">
            Private Universities
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {universityComparisonData.map((row, idx) => (
          <TableRow key={row.feature}>
            <TableCell
              className={`border-2 border-white font-medium ${idx % 2 == 0 ? "bg-gray-50" : ""}`}
            >
              {row.feature}
            </TableCell>
            <TableCell
              className={`border-2 border-white text-center ${idx % 2 == 0 ? "bg-orange-50" : "bg-orange-100/50"}`}
            >
              {row.public}
            </TableCell>
            <TableCell
              className={`border-2 border-white text-center ${idx % 2 == 0 ? "bg-gray-50" : ""}`}
            >
              {row.private}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
