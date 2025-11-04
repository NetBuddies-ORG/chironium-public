import type { ReactNode } from 'react';
import { Metadata } from 'next';
import '@/index.css';
import '@/styles/globals.css';
import { ThemeProvider } from '@/providers/ThemeProvider';
import Header from '@/components/common/header/Header';
import Classes from './index.module.css';

export const metadata: Metadata = {
    title: 'Chironium',
    description: 'bioacoustic app for bats',
};

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang='fr' suppressHydrationWarning={true}>
            <ThemeProvider>
                <body className={Classes.container}>
                    {/* Background & noise */}
                    <div className={Classes['glow-top-left']}></div>
                    <div className={Classes['glow-bottom-right']}></div>
                    <div className={Classes['noise-overlay']}></div>

                    {/* Header global */}
                    <Header />

                    {/* Main content */}
                    <main className={Classes.main}>{children}</main>
                </body>
            </ThemeProvider>
        </html>
    );
}
