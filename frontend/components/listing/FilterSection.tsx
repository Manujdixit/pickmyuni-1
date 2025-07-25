import { Search, X } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useEffect, useState } from "react";

const FilterSection = ({
  filters,
  setFilters,
  isOpen,
  setIsOpen,
  availableFilters,
  currentFilters,
  onFilterChange,
  onSearch,
  onClearIndividualFilter,
  onFeeRangeChange,
  onClearAllFilters,
  hasActiveFilters,
}: any) => {
  const [searchTerm, setSearchTerm] = useState(filters.search || "");
  const [selectedStateName, setSelectedStateName] = useState<string>("");
  const [selectedCourseName, setSelectedCourseName] = useState<string>("");
  const [selectedStreamName, setSelectedStreamName] = useState<string>("");
  const [minFees, setMinFees] = useState<string>("");
  const [maxFees, setMaxFees] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string>("");
  const [selectedLevel, setSelectedLevel] = useState<string>("");

  // Sync local state with applied filters
  useEffect(() => {
    if (currentFilters) {
      setSearchTerm(currentFilters.searchquery || "");
      setSelectedStateName(currentFilters.statename || "");
      setSelectedCourseName(currentFilters.coursename || "");
      setSelectedStreamName(currentFilters.streamname || "");
      setSelectedType(currentFilters.type || "");
      setSelectedLevel(currentFilters.level || "");
      setMinFees(
        currentFilters.min_fees ? currentFilters.min_fees.toString() : "",
      );
      setMaxFees(
        currentFilters.max_fees ? currentFilters.max_fees.toString() : "",
      );
    }
  }, [currentFilters]);

  const clearAllFilters = () => {
    // If parent component provides a clear all filters handler, use it
    if (onClearAllFilters) {
      onClearAllFilters();
      return;
    }

    // Fallback to local state updates
    setFilters({
      course: "All Courses",
      location: "All Locations",
      feesRange: "All Fees",
      exams: "All Exams",
      search: "",
      type: "All Types",
      level: "All Levels",
    });
    setSearchTerm("");
    setSelectedStateName("");
    setSelectedCourseName("");
    setSelectedStreamName("");
    setMinFees("");
    setMaxFees("");
    setSelectedType("");
    setSelectedLevel("");

    // Clear API filters
    if (onFilterChange) {
      onFilterChange("state", "");
      onFilterChange("course", "");
      onFilterChange("stream", "");
      onFilterChange("type", "");
      onFilterChange("level", "");
    }

    if (onFeeRangeChange) {
      onFeeRangeChange(undefined, undefined);
    } else if (onFilterChange) {
      onFilterChange("min_fees", "");
      onFilterChange("max_fees", "");
    }
  };

  const handleSearch = () => {
    if (onSearch) {
      onSearch(searchTerm);
    }
    setFilters({ ...filters, search: searchTerm });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleStateChange = (stateName: string) => {
    const name = stateName === "all" ? "" : stateName;
    setSelectedStateName(name);
    if (onFilterChange) {
      onFilterChange("state", name);
    }
  };

  const handleCourseChange = (courseName: string) => {
    const name = courseName === "all" ? "" : courseName;
    setSelectedCourseName(name);
    if (onFilterChange) {
      onFilterChange("course", name);
    }
  };

  const handleFeesChange = () => {
    const minValue = minFees ? parseInt(minFees) : undefined;
    const maxValue = maxFees ? parseInt(maxFees) : undefined;

    if (onFeeRangeChange) {
      onFeeRangeChange(minValue, maxValue);
    } else if (onFilterChange) {
      if (minValue) onFilterChange("min_fees", minValue);
      if (maxValue) onFilterChange("max_fees", maxValue);
    }
  };

  const handleStreamChange = (streamName: string) => {
    const name = streamName === "all" ? "" : streamName;
    setSelectedStreamName(name);
    if (onFilterChange) {
      onFilterChange("stream", name);
    }
  };

  const handleTypeChange = (typeName: string) => {
    const name = typeName === "all" ? "" : typeName;
    setSelectedType(name);
    if (onFilterChange) {
      onFilterChange("type", name);
    }
  };

  const handleLevelChange = (levelName: string) => {
    const name = levelName === "all" ? "" : levelName;
    setSelectedLevel(name);
    if (onFilterChange) {
      onFilterChange("level", name);
    }
  };
  return (
    <div className="space-y-6 rounded-lg bg-orange-50 p-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-gray-900">Filters</h3>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="text-xs text-red-600 hover:text-red-700"
          >
            Clear All
          </Button>
        )}
      </div>

      {/* Active Filters */}
      {hasActiveFilters && (
        <div className="border-y border-gray-200 py-4">
          <h4 className="mb-2 text-sm font-medium text-gray-700">
            Active Filters:
          </h4>
          <div className="flex flex-wrap gap-2">
            {currentFilters?.searchquery && (
              <Badge
                variant="secondary"
                onClick={() => {
                  if (onClearIndividualFilter) {
                    onClearIndividualFilter("search");
                  } else {
                    setSearchTerm("");
                    if (onSearch) onSearch("");
                  }
                }}
                className="cursor-pointer text-xs"
              >
                Search: {currentFilters.searchquery}
                <X className="ml-1 h-3 w-3" />
              </Badge>
            )}
            {currentFilters?.statename && availableFilters?.state && (
              <Badge
                variant="secondary"
                onClick={() => {
                  if (onClearIndividualFilter) {
                    onClearIndividualFilter("state");
                  } else {
                    handleStateChange("all");
                  }
                }}
                className="cursor-pointer text-xs"
              >
                State:{" "}
                {availableFilters.state.find(
                  (s: any) => s.slug === currentFilters.statename,
                )?.name || currentFilters.statename}
                <X className="ml-1 h-3 w-3" />
              </Badge>
            )}
            {currentFilters?.streamname && availableFilters?.stream && (
              <Badge
                variant="secondary"
                onClick={() => {
                  if (onClearIndividualFilter) {
                    onClearIndividualFilter("stream");
                  } else {
                    handleStreamChange("all");
                  }
                }}
                className="cursor-pointer text-xs"
              >
                Stream:{" "}
                {availableFilters.stream.find(
                  (s: any) => s.slug === currentFilters.streamname,
                )?.name || currentFilters.streamname}
                <X className="ml-1 h-3 w-3" />
              </Badge>
            )}
            {currentFilters?.coursename && availableFilters?.courses && (
              <Badge
                variant="secondary"
                onClick={() => {
                  if (onClearIndividualFilter) {
                    onClearIndividualFilter("course");
                  } else {
                    handleCourseChange("all");
                  }
                }}
                className="cursor-pointer text-xs"
              >
                Course:{" "}
                {availableFilters.courses.find(
                  (c: any) => c.slug === currentFilters.coursename,
                )?.course_name || currentFilters.coursename}
                <X className="ml-1 h-3 w-3" />
              </Badge>
            )}
            {currentFilters?.type && availableFilters?.type && (
              <Badge
                variant="secondary"
                onClick={() => {
                  if (onClearIndividualFilter) {
                    onClearIndividualFilter("type");
                  } else {
                    handleTypeChange("all");
                  }
                }}
                className="cursor-pointer text-xs"
              >
                Type:{" "}
                {currentFilters.type.charAt(0).toUpperCase() +
                  currentFilters.type.slice(1)}
                <X className="ml-1 h-3 w-3" />
              </Badge>
            )}
            {currentFilters?.level && availableFilters?.level && (
              <Badge
                variant="secondary"
                onClick={() => {
                  if (onClearIndividualFilter) {
                    onClearIndividualFilter("level");
                  } else {
                    handleLevelChange("all");
                  }
                }}
                className="cursor-pointer text-xs"
              >
                Level:{" "}
                {currentFilters.level.charAt(0).toUpperCase() +
                  currentFilters.level.slice(1)}
                <X className="ml-1 h-3 w-3" />
              </Badge>
            )}
            {(currentFilters?.min_fees || currentFilters?.max_fees) && (
              <Badge
                variant="secondary"
                onClick={() => {
                  if (onClearIndividualFilter) {
                    onClearIndividualFilter("fees");
                  } else {
                    setMinFees("");
                    setMaxFees("");
                    if (onFilterChange) {
                      onFilterChange("min_fees", "");
                      onFilterChange("max_fees", "");
                    }
                  }
                }}
                className="cursor-pointer text-xs"
              >
                Fees: {currentFilters.min_fees || "0"} -{" "}
                {currentFilters.max_fees || "∞"}
                <X className="ml-1 h-3 w-3" />
              </Badge>
            )}
          </div>
        </div>
      )}

      {/* Search */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">
          Search Universities
        </label>
        <div className="flex gap-2">
          <Input
            placeholder="Search by name or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1"
          />
          <Button onClick={handleSearch} size="sm" className="px-3">
            <Search className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* State Filter */}
      {availableFilters?.state && availableFilters.state.length > 0 && (
        <div className="w-full space-y-2">
          <label className="text-sm font-medium text-gray-700">
            State/Province
          </label>
          <Select
            value={selectedStateName || "all"}
            onValueChange={handleStateChange}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select State" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All States</SelectItem>
              {availableFilters.state.map((state: any) => (
                <SelectItem key={state.id} value={state.slug}>
                  {state.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Stream Filter */}
      {availableFilters?.stream && availableFilters.stream.length > 0 && (
        <div className="w-full space-y-2">
          <label className="text-sm font-medium text-gray-700">Stream</label>
          <Select
            value={selectedStreamName || "all"}
            onValueChange={handleStreamChange}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Stream" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Streams</SelectItem>
              {availableFilters.stream.map((stream: any) => (
                <SelectItem key={stream.id} value={stream.slug}>
                  {stream.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Course Filter */}
      {availableFilters?.courses && availableFilters.courses.length > 0 && (
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Course</label>
          <Select
            value={selectedCourseName || "all"}
            onValueChange={handleCourseChange}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Course" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Courses</SelectItem>
              {availableFilters.courses.map((course: any) => (
                <SelectItem key={course.id} value={course.slug}>
                  {course.course_name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Type Filter */}
      {availableFilters?.type && availableFilters.type.length > 0 && (
        <div className="w-full space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Ownership Type
          </label>
          <Select
            value={selectedType || "all"}
            onValueChange={handleTypeChange}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              {availableFilters.type.map((type: string) => (
                <SelectItem key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Level Filter */}
      {availableFilters?.level && availableFilters.level.length > 0 && (
        <div className="w-full space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Level of University
          </label>
          <Select
            value={selectedLevel || "all"}
            onValueChange={handleLevelChange}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Levels</SelectItem>
              {availableFilters.level.map((level: string) => (
                <SelectItem key={level} value={level}>
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Fees Range Filter */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">
          Fees Range (AUD)
        </label>
        <div className="flex gap-2">
          <Input
            placeholder="Min"
            type="number"
            value={minFees}
            onChange={(e) => setMinFees(e.target.value)}
            onBlur={handleFeesChange}
          />
          <Input
            placeholder="Max"
            type="number"
            value={maxFees}
            onChange={(e) => setMaxFees(e.target.value)}
            onBlur={handleFeesChange}
          />
        </div>
      </div>
    </div>
  );
};

export default FilterSection;
