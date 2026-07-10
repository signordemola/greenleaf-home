import { Inter, Fraunces } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { LenisProvider } from "@/components/providers/lenis-provider";

import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces" });

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        inter.variable,
        fraunces.variable,
        "font-sans",
      )}
    >
      <body className="min-h-full flex flex-col">
        <LenisProvider>
          <Suspense fallback={null}>{children}</Suspense>
        </LenisProvider>
      </body>
    </html>
  );
};

export default RootLayout;
