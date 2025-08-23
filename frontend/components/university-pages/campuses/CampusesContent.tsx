"use client";

import React, { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { UniversityCard } from "@/components/common/UniversityCard";
import CampusContent from "@/components/CampusContent";

interface CampusesContentProps {
  info: any;
}

export default function CampusesContent({ info }: CampusesContentProps) {
  const [preference, setPreference] = useState("international");

  if (!info) {
    return <p>Nothing to show.</p>;
  }

  // Check if both content and colleges are not present
  const hasContent = info?.campus?.content;
  const hasColleges = info?.collegeList && info.collegeList.length > 0;

  if (!hasContent && !hasColleges) {
    return (
      <div className="flex items-center justify-center py-8">
        <p className="text-lg text-gray-500">No data available</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Campus Content */}
      {hasContent && <CampusContent content={info.campus.content} />}

      {/* Toggle */}
      {hasColleges && (
        <div className="flex justify-center">
          <Badge className="bg-gray-100 p-1">
            <div className="flex items-center space-x-2">
              <Label className="text-brand-primary" htmlFor="domestic">
                Domestic
              </Label>
              <Switch
                aria-label="toggle"
                id="preference-switch"
                checked={preference === "international"}
                className={
                  preference === "international"
                    ? "data-[state=checked]:bg-brand-secondary"
                    : "data-[state=unchecked]:bg-brand-primary"
                }
                onCheckedChange={(checked) =>
                  setPreference(checked ? "international" : "domestic")
                }
              />
              <Label className="text-brand-secondary" htmlFor="international">
                International
              </Label>
            </div>
          </Badge>
        </div>
      )}

      {/* University Cards */}
      {hasColleges &&
        info.collegeList.map((university: any, index: number) => (
          <UniversityCard
            key={university.id || index}
            university={university}
            feesPreference={preference}
          />
        ))}
    </div>
  );
}
