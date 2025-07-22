import type { Metadata } from "next";
import { Roboto, Anton, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { Toaster } from "@/components/ui/sonner";
import { OrganizationSchema } from "@/components/seo";
import Script from "next/script";
import { PhoneCall } from "lucide-react";
import dynamic from "next/dynamic";

const SitePop = dynamic(() =>
  import("@/components/SitePopup").then((mod) => mod.SitePop),
);

const anton = Anton({
  weight: "400",
  variable: "--font-anton",
  subsets: ["latin"],
  display: "swap",
});

const roboto = Roboto({
  weight: ["400"],
  variable: "--font-roboto",
  subsets: ["latin"],
});

const plus_jakarta = Plus_Jakarta_Sans({
  weight: ["500"],
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default:
      "PickMyUni | Find, Compare & Switch to the Right Australian University",
    template: "%s | PickMyUni",
  },
  description:
    "Find and compare the best universities in Australia. Explore courses, rankings, scholarships, and more with PickMyUni.",
  keywords: [
    "universities in Australia",
    "study in Australia",
    "Australian universities",
    "university comparison",
    "courses in Australia",
    "PickMyUni",
    "scholarships Australia",
    "student resources",
    "PR pathway universities",
    "international students Australia",
  ],
  openGraph: {
    title: "PickMyUni",
    description:
      "Find and compare the best universities in Australia. Explore courses, rankings, scholarships, and more with PickMyUni.",
    url: "https://pickmyuni.com",
    siteName: "PickMyUni",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "PickMyUni - Search for better universities in Australia",
      },
    ],
    locale: "en_AU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PickMyUni",
    description:
      "Find and compare the best universities in Australia. Explore courses, rankings, scholarships, and more with PickMyUni.",
    images: ["/opengraph-image.png"],
    site: "@pickmyuni",
  },
  metadataBase: new URL("https://pickmyuni.com"),
  verification: {
    google: "_134iCeEhMsA_BfemTw79UdPXJBPisBshFgSGCqVZfA",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <OrganizationSchema />
      </head>
      <body
        className={`${roboto.variable} ${anton.variable} ${plus_jakarta.variable} flex min-h-screen flex-col font-sans antialiased`}
      >
        <Navbar />
        <div className="fixed bottom-4 right-4 z-20 flex flex-col items-end gap-2">
          {/* <div className="bg-white text-xs text-black p-2 rounded-md">
            Get connected with us
          </div> */}
          <div className="flex flex-col gap-2">
            <SitePop />
            <a
              href="tel:+61433502082"
              className="rounded-full bg-blue-500 p-3 transition-colors hover:bg-blue-600"
              aria-label="call"
            >
              <PhoneCall className="text-white" />
            </a>
            <a
              href="https://wa.me/+61433502082"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-green-500 p-3 transition-colors hover:bg-green-600"
              aria-label="whatsapp"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="white"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </a>
          </div>
        </div>
        <main className="flex-grow">{children}</main>
        <Toaster />
        <Footer />
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-25ZL17BREH"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-25ZL17BREH');
        `}
        </Script>
      </body>
    </html>
  );
}
