import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { openGraphImage, siteDescription, siteName, siteUrl } from "../src/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: "Belajar Cloud Computing & DevOps dari Nol",
    template: "%s | Ebook Cloud Computing",
  },
  description: siteDescription,
  applicationName: siteName,
  authors: [{ name: "Alvinza Erza Farandhika" }],
  creator: "Alvinza Erza Farandhika",
  publisher: siteName,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "/",
    siteName,
    title: "Belajar Cloud Computing & DevOps dari Nol",
    description: siteDescription,
    images: [
      {
        url: openGraphImage,
        width: 1200,
        height: 630,
        alt: "Ebook gratis belajar Cloud Computing, Linux, AWS, dan DevOps",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Belajar Cloud Computing & DevOps dari Nol",
    description: siteDescription,
    images: [openGraphImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/icon.png",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="h-dvh overflow-hidden">{children}</body>
    </html>
  );
}
