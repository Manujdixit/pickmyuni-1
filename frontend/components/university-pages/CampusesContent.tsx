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

  return (
    <div className="space-y-4">
      {/* Toggle */}
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

      {/* Campus Content */}
      {info?.campus?.content && <CampusContent content={info.campus.content} />}

      {/* University Cards */}
      {info?.collegeList?.map((university: any, index: number) => (
        <UniversityCard
          key={university.id || index}
          university={university}
          feesPreference={preference}
        />
      ))}
    </div>
  );
}
