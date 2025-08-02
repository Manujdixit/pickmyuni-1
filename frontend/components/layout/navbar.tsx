"use client";
import NavigationHeader from "@/components/navigation/NavigationHeader";
import SearchBar from "@/components/navigation/SearchBar";
import useScrollDirection from "@/hooks/useScrollDirection";

export default function Navbar() {
  const scrollDirection = useScrollDirection();

  return (
    <header className="sticky top-0 z-50">
      <div className="relative">
        {/* Navigation Header - stays fixed at top */}
        <div className="relative z-50 bg-white">
          <NavigationHeader />
        </div>

        {/* Search Bar - appears below header */}
        <div
          className={`relative z-40 transition-transform duration-100 ease-in-out ${
            scrollDirection === "down" ? "-translate-y-full" : "translate-y-0"
          }`}
        >
          <SearchBar />
        </div>
      </div>
    </header>
  );
}
