import type { Metadata } from "next";
import { Inter } from 'next/font/google'
import "./globals.css";
import { BackgroundGradients } from "@/components/ui/background-gradients";
import { AOSProvider } from "@/components/ui/aos-provider";
import { cn, heliosfont } from "@/lib/utils";



export const metadata: Metadata = {
  title: "Varnion - Technology for everyone",
  description: "Expand your business's digital transformation with Varnion's next-generation internet connection and application solutions.",
};

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
})


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/assets/varnion-icon.png" />
      </head>
      <body
        className={cn("font-helios antialiased nebula-bg", heliosfont.variable, inter.variable)}
      >
        <BackgroundGradients>
          <AOSProvider>
            {children}
          </AOSProvider>
        </BackgroundGradients>
      </body>
    </html>
  );
}
