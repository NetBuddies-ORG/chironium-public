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
                    <Link href='/#products'>Produits</Link>
                    <Link href='/#features'>Fonctionnalités</Link>
                    <Link href='/#pricing'>Tarifs</Link>
                    <Link href='/#testimonials'>Témoignages</Link>
                </nav>
                <div className={Classes.headerActions}>
                    {/*<Button variant='ghost' size='icon' onClick={toggleTheme}>*/}
                    {/*    {theme === 'dark' ? <Sun /> : <Moon />}*/}
                    {/*</Button>*/}
                    <Link href='/login'>
                        <Button variant={'ghost'}>Connexion</Button>
                    </Link>
                </div>
            </div>
        </header>
    );
}
