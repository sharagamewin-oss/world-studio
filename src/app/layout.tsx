
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "WORLD STUDIO — Create Your Universe",
    template: "%s | WORLD STUDIO",
  },
  description:
    "Create, develop, organize and share your own fictional universes. Your imagination has no limits.",
  applicationName: "WORLD STUDIO",
  keywords: [
    "Worldbuilding",
    "Storytelling",
    "Fantasy",
    "Character Creation",
    "Creative Studio",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
