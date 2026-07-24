import type { Metadata } from 'next';
import { Space_Grotesk, Inter, JetBrains_Mono } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import { QueryProvider } from '@/providers/QueryProvider';
import { WebSocketProvider } from '@/providers/WebSocketProvider';
import './globals.css';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "AI GUARDIAN OS | World's First Agentic AI Operating System",
  description: 'Enterprise Fully Agentic AI Operating System for Autonomous Intelligent Mobility.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-[#050505] text-white antialiased selection:bg-[#FFB800] selection:text-black">
        <QueryProvider>
          <WebSocketProvider>
            {children}
            <Toaster
              position="bottom-right"
              toastOptions={{
                style: {
                  background: '#111111',
                  color: '#FFFFFF',
                  border: '1px solid rgba(255, 184, 0, 0.3)',
                  borderRadius: '8px',
                  fontFamily: 'var(--font-inter)',
                },
              }}
            />
          </WebSocketProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
