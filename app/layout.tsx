import type { ReactNode } from 'react';
import { Metadata } from 'next';
import '@/index.css';
import '@/styles/globals.css';
import { ThemeProvider } from '@/providers/ThemeProvider';
import { AuthProvider } from '@/providers/AuthProvider';
import Header from '@/components/common/header/Header';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/next';

export const metadata: Metadata = {
    title: 'Chironium',
    description: 'bioacoustic app for bats',
};

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang='fr' suppressHydrationWarning={true}>
            <SpeedInsights />
            <Analytics />
            <ThemeProvider>
                <AuthProvider>
                    <body>
                        {/* Background & noise */}
                        <div className={'glow-top-left'}></div>
                        <div className={'glow-bottom-right'}></div>
                        <div className={'noise-overlay'}></div>

                        {/* Header global */}
                        <Header />

                        {/* Main content */}
                        <main className={'main'}>{children}</main>
                    </body>
                </AuthProvider>
            </ThemeProvider>
        </html>
    );
}
