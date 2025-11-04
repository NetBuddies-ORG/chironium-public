import type { ReactNode } from 'react';
import { Metadata } from 'next';
import '@/index.css';
import '@/styles/globals.css';
import { ThemeProvider } from '@/providers/ThemeProvider';

export const metadata: Metadata = {
    title: 'Chironium',
    description: 'bioacoustic app for bats',
};

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang='fr' suppressHydrationWarning={true}>
            <ThemeProvider>
                <body>{children}</body>
            </ThemeProvider>
        </html>
    );
}
