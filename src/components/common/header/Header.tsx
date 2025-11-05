'use client';

import Link from 'next/link';
import { Waves, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/providers/ThemeProvider';
import Classes from './index.module.css';

export default function Header() {
    const { theme, toggleTheme } = useTheme();

    return (
        <header className={Classes.header}>
            <div className={Classes.headerContent}>
                <Link href='/'>
                    <div className={Classes.logoContainer}>
                        <div className={Classes.logoIcon}>
                            <Waves className={Classes.logoSvg} />
                        </div>
                        <span className={Classes.logoText}>Chironium</span>
                    </div>
                </Link>
                <nav className={Classes.nav}>
                    <a href='#products'>Produits</a>
                    <a href='#features'>Fonctionnalités</a>
                    <a href='#pricing'>Tarifs</a>
                    <a href='#testimonials'>Témoignages</a>
                </nav>
                <div className={Classes.headerActions}>
                    <Button variant='ghost' size='icon' onClick={toggleTheme}>
                        {theme === 'dark' ? <Sun /> : <Moon />}
                    </Button>
                    <Link href='/login'>
                        <Button>Connexion</Button>
                    </Link>
                </div>
            </div>
        </header>
    );
}
