import type { Metadata } from "next";
import { Poppins, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";

// fonts
const poppins = Poppins({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"], variable: "--font-poppins", });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", });

// metadata
export const metadata: Metadata = {
  title: "Kurrent",
  description: "A cloud-native task tracking platform.",
};

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange >
          <Toaster />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
