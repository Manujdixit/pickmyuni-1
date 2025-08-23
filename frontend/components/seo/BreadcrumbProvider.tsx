"use client";

import React, { createContext, useContext, useMemo } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { generateBreadcrumbData, BreadcrumbItem } from "@/lib/breadcrumbs";
import BreadcrumbSchema from "./BreadcrumbSchema";

interface BreadcrumbContextType {
  breadcrumbs: BreadcrumbItem[];
  pathname: string;
  params: Record<string, string>;
}

const BreadcrumbContext = createContext<BreadcrumbContextType | null>(null);

interface BreadcrumbProviderProps {
  children: React.ReactNode;
  customBreadcrumbs?: BreadcrumbItem[];
}

/**
 * BreadcrumbProvider automatically generates breadcrumb schema for SEO
 * and provides breadcrumb context to child components
 */
export default function BreadcrumbProvider({
  children,
  customBreadcrumbs,
}: BreadcrumbProviderProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Extract dynamic route parameters
  const params = useMemo(() => {
    const params: Record<string, string> = {};

    // Handle university pages: /university/[universitySlug]
    if (pathname.startsWith("/university/")) {
      const universitySlug = pathname.split("/")[2]; // Extract from /university/[slug]
      if (universitySlug) {
        params.universitySlug = universitySlug;
      }
    }

    // Handle filter pages: /[filterSlug]
    if (pathname.startsWith("/") && !pathname.startsWith("/university/")) {
      const segments = pathname.split("/").filter(Boolean);
      if (
        segments.length === 1 &&
        segments[0] !== "about-us" &&
        segments[0] !== "contact-us"
      ) {
        params.filterSlug = segments[0];
      }
    }

    return params;
  }, [pathname]);

  // Generate breadcrumbs - use custom ones if provided, otherwise auto-generate
  const breadcrumbs = useMemo(() => {
    if (customBreadcrumbs) {
      return customBreadcrumbs;
    }
    return generateBreadcrumbData(pathname, params);
  }, [pathname, params, customBreadcrumbs]);

  const contextValue = useMemo(
    () => ({
      breadcrumbs,
      pathname,
      params,
    }),
    [breadcrumbs, pathname, params],
  );

  return (
    <BreadcrumbContext.Provider value={contextValue}>
      {/* Automatically inject breadcrumb schema for SEO */}
      <BreadcrumbSchema items={breadcrumbs} />
      {children}
    </BreadcrumbContext.Provider>
  );
}

/**
 * Hook to access breadcrumb context
 */
export function useBreadcrumbs() {
  const context = useContext(BreadcrumbContext);
  if (!context) {
    throw new Error("useBreadcrumbs must be used within a BreadcrumbProvider");
  }
  return context;
}

/**
 * Hook to get current breadcrumbs
 */
export function useCurrentBreadcrumbs() {
  const context = useContext(BreadcrumbContext);
  return context?.breadcrumbs || [];
}
