import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Brochure | Admanics Digital Magazine",
  description: "A high-end minimal digital magazine for Admanics: Revenue Acceleration, Trust Security, and Brand Authority.",
  keywords: ["Admanics", "Marketing Agency", "Online Reputation Management", "Video Production", "Revenue Acceleration"],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://brochure.admanics.com",
    title: "Admanics | Your Vision, Our Capability",
    description: "Revenue Acceleration. Trust Security. Brand Authority.",
    siteName: "Admanics Brochure",
  },
  twitter: {
    card: "summary_large_image",
    title: "Admanics Brochure",
    description: "Revenue Acceleration. Trust Security. Brand Authority.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${montserrat.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        {/* JSON-LD Structured Data for Google SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              name: "Admanics",
              url: "https://admanics.com",
              description: "Revenue Acceleration, Trust Security, and Brand Authority.",
              sameAs: [
                "https://brochure.admanics.com"
              ]
            })
          }}
        />
        {children}
      </body>
    </html>
  );
}
