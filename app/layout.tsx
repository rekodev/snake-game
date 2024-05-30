import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ReactNode } from 'react';
import Footer from './components/Footer';
import Header from './components/Header';
import './globals.css';
import Providers from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Snake Game',
  description: 'CS50 Final Project by rekodev',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <Providers>
          <Header />
          <main className='flex-1 max-w-screen-lg mx-auto w-full p-6'>
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
