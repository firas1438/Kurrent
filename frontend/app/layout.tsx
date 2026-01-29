import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster";

// fonts
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"], });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"], });

// metadata
export const metadata: Metadata = {
  title: "Kurrent",
  description: "A cloud-native task tracking platform.",
};

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`} >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange >
          <Toaster />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
