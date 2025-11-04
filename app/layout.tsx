import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Voice to Sign Language",
  description: "Convert voice to text and text to sign language animations",
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
