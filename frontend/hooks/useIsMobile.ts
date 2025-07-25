"use client";
import { useState, useEffect } from "react";

/**
 * Custom hook to detect if the user is on a mobile device
 * @param breakpoint - The pixel width to consider as mobile (default: 1024px for lg breakpoint)
 * @returns boolean indicating if the current viewport is mobile
 */
export function useIsMobile(breakpoint: number = 1024): boolean {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    // Function to check if window width is below breakpoint
    const checkIsMobile = () => {
      if (typeof window !== "undefined") {
        setIsMobile(window.innerWidth < breakpoint);
      }
    };

    // Check on mount
    checkIsMobile();

    // Add event listener for window resize
    const handleResize = () => {
      checkIsMobile();
    };

    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);
    }

    // Cleanup event listener on unmount
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", handleResize);
      }
    };
  }, [breakpoint]);

  return isMobile;
}
