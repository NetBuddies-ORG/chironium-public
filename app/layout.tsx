import type { ReactNode } from 'react';
import { Metadata } from 'next';
import '@/index.css';
import '@/styles/globals.css';

export const metadata: Metadata = {
    title: 'Chironium',
    description: 'bioacoustic app for bats',
};

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang='fr' suppressHydrationWarning={true}>
            <body>{children}</body>
        </html>
    );
}
