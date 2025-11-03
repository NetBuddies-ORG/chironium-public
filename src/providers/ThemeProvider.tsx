'use client';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within ThemeProvider');
    }
    return context;
}

function getInitialTheme(): Theme {
    // Check localStorage first
    try {
        const saved = localStorage.getItem('chironium-theme');
        if (saved === 'light' || saved === 'dark') {
            return saved as Theme;
        }
    } catch (e) {
        // Ignore on SSR or restricted environments
        // console.error('Failed to load theme from localStorage:', e);
        return 'light';
    }

    if (typeof window !== 'undefined' && window.matchMedia) {
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        }
    }

    return 'light';
}

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [theme, setTheme] = useState<Theme>(() => {
        const initial = getInitialTheme();
        // Apply immediately to prevent flash
        if (typeof document !== 'undefined') {
            const root = document.documentElement;
            root.classList.remove('light', 'dark');
            root.classList.add(initial);
            root.setAttribute('data-theme', initial);
        }
        return initial;
    });

    useEffect(() => {
        // Apply theme to document
        const root = document.documentElement;
        root.classList.remove('light', 'dark');
        root.classList.add(theme);
        root.setAttribute('data-theme', theme);

        // Save to localStorage
        try {
            localStorage.setItem('chironium-theme', theme);
        } catch (e) {
            // Ignore storage errors silently
        }
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
    };

    return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
}
