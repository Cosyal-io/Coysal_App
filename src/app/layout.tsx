'use client';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import Header from 'src/components/Header';
import './globals.css';
import { Toaster } from 's/components/ui/sonner'; // Import Toaster for notifications
import { ThemeProvider } from 'src/app/themes';
import { cn } from 's/lib/utils';
import Footer from 'src/components/Footer';
import { useRouter } from 'next/navigation';

import { useEffect } from 'react';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

// export const metadata: Metadata = {
//   title: "Coysal App",
//   description: "Platform for associating alternative impact for investors in developing communities",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();

  useEffect(() => {
    // Check if the current path is the root
    if (window.location.pathname === '/') {
      router.replace('/Client'); // Redirect to the mainpage
    }
  }, [router]);

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          geistSans.variable,
          geistMono.variable
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Toaster />
          <Header />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
