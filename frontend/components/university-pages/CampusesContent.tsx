import React from "react";
import { UniversityCard } from "../common/UniversityCard";

interface CampusesContentProps {
  data: any[];
}

export const CampusesContent: React.FC<CampusesContentProps> = ({ data }) => {
  if (!data || data.length === 0) {
    return <p>Nothing to show.</p>;
  }

  return (
    <div className="space-y-4">
      {data.map((university, index) => (
        <UniversityCard key={university.id || index} university={university} />
      ))}
    </div>
  );
};
