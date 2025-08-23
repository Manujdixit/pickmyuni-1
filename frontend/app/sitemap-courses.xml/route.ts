import { NextResponse } from "next/server";
import { generateCourseUrls } from "../sitemap.utils";

// Helper function to escape XML entities
function escapeXml(unsafe: string): string {
  const amp = String.fromCharCode(38) + "amp;";
  const lt = String.fromCharCode(38) + "lt;";
  const gt = String.fromCharCode(38) + "gt;";
  const quot = String.fromCharCode(38) + "quot;";
  const apos = String.fromCharCode(38) + "#39;";

  return unsafe
    .replace(/&/g, amp)
    .replace(/</g, lt)
    .replace(/>/g, gt)
    .replace(/"/g, quot)
    .replace(/'/g, apos)
    .replace(/\r\n/g, " ")
    .replace(/\r/g, " ")
    .replace(/\n/g, " ")
    .replace(/\t/g, " ")
    .trim();
}

export async function GET() {
  try {
    const urls = await generateCourseUrls();

    // Build XML with proper escaping
    const xmlContent = urls
      .map((u) => {
        const escapedUrl = escapeXml(u.url);
        const escapedLastmod = u.lastModified.toISOString();
        const escapedChangefreq = escapeXml(u.changeFrequency);
        const escapedPriority = u.priority.toString();

        return `  <url>
    <loc>${escapedUrl}</loc>
    <lastmod>${escapedLastmod}</lastmod>
    <changefreq>${escapedChangefreq}</changefreq>
    <priority>${escapedPriority}</priority>
  </url>`;
      })
      .join("\n");

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${xmlContent}
</urlset>`;

    return new NextResponse(xml, {
      headers: { "Content-Type": "application/xml; charset=utf-8" },
    });
  } catch (error) {
    console.error("Error generating sitemap-courses.xml:", error);
    // Return an empty sitemap instead of failing
    const emptyXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
</urlset>`;
    return new NextResponse(emptyXml, {
      headers: { "Content-Type": "application/xml; charset=utf-8" },
    });
  }
}
