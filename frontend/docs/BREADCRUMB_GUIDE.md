# Breadcrumb Setup Guide

## Overview

This project uses an automated breadcrumb schema system that generates SEO-compliant structured data for all pages. The system automatically handles both static and dynamic routes.

## Current Setup

- **BreadcrumbProvider**: Automatically wraps all pages and generates breadcrumbs
- **generateBreadcrumbData()**: Maps routes to human-readable names
- **BreadcrumbSchema**: Renders JSON-LD for search engines

## Adding New Static Pages

1. **Create Page File**: Add your page component at `app/new-page/page.tsx`
2. **Update Breadcrumb Mapping**: In `frontend/lib/breadcrumbs.ts`, add to `routeNames`:
   ```typescript
   const routeNames: Record<string, string> = {
     // ... existing entries
     "new-page": "New Page Title",
   };
   ```
3. **Done**: Breadcrumbs will auto-generate

## Adding New Dynamic Pages

1. **Create Dynamic Route**: Add page at `app/new-dynamic/[param]/page.tsx`
2. **Update Parameter Extraction**: In `frontend/components/seo/BreadcrumbProvider.tsx`, add:
   ```typescript
   // Inside params useMemo, add:
   if (pathname.startsWith("/new-dynamic/")) {
     const paramValue = pathname.split("/")[2];
     if (paramValue) {
       params.param = paramValue;
     }
   }
   ```
3. **Optional Display Formatting**: In `frontend/lib/breadcrumbs.ts`, customize display:
   ```typescript
   // For paramKey === "param", add:
   displayName = paramValue
     .split("-")
     .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
     .join(" ");
   ```

## Notes

- **Test Breadcrumbs**: Verify schema at each new route
- **Custom Breadcrumbs**: Use `customBreadcrumbs` prop on `BreadcrumbProvider` for special cases
- **Existing Patterns**: Follow `/university/[slug]` and `/[filterSlug]` examples

The system handles SEO automatically - no manual schema updates needed!
