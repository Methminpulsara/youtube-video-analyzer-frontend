import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";



export const metadata: Metadata = {
   title: "YouTube AI Analyzer",
  description: "Analyze YouTube videos with AI — summary, topics, insights, dashboards",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body>
        <div className="bg-gradient-to-br from-gray-950 via-gray-900 to-black min-h-screen flex flex-col">
          <main className="container mx-auto flex-1">{children}</main>
          <footer className="text-center text-sm text-gray-500 py-6">
            © {new Date().getFullYear()} YouTube AI Analyzer
          </footer>
        </div>
      </body>
    </html>
  );
}
