import { ThemeProvider } from '@/providers/ThemeProvider';
import LandingPage from '@/features/landing-page/LandingPage';

export default function Page() {
    return (
        <ThemeProvider>
            <LandingPage />
        </ThemeProvider>
    );
}
