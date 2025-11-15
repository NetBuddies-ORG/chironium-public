import { CheckCircle2, Waves } from 'lucide-react';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

export default function Footer() {
    return (
        <footer className='py-16 px-6 dark:bg-gray-50 bg-[#161B22] border-t dark:border-gray-200 border-[#30363d]'>
            <div className='container mx-auto max-w-7xl'>
                <div className='grid md:grid-cols-5 gap-12 mb-12'>
                    <div className='md:col-span-2'>
                        <div className='flex items-center gap-3 mb-4'>
                            <div className='w-9 h-9 bg-gradient-to-br from-[#00C2FF] to-[#0096CC] rounded-lg flex items-center justify-center'>
                                <Waves className='w-5 h-5 text-white' strokeWidth={2.5} />
                            </div>
                            <span className='text-xl dark:text-gray-900'>Chironium</span>
                        </div>
                        <p className='dark:text-gray-600 text-gray-400 mb-6 leading-relaxed'>
                            {
                                "Suite professionnelle de référence pour l'acoustique des chiroptères. Développée par des écologues, pour des écologues."
                            }
                        </p>
                        <div className='flex gap-3'>
                            <a
                                href='#'
                                className='w-9 h-9 dark:bg-gray-200 dbg-[#30363d] dark:hover:bg-gray-300 hover:bg-[#484f58] rounded-lg flex items-center justify-center transition-colors'
                            >
                                <svg
                                    className='w-4 h-4 dark:text-gray-600 text-gray-400'
                                    fill='currentColor'
                                    viewBox='0 0 24 24'
                                >
                                    <path d='M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z' />
                                </svg>
                            </a>
                            <a
                                href='#'
                                className='w-9 h-9 dark:bg-gray-200 bg-[#30363d] dark:hover:bg-gray-300 hover:bg-[#484f58] rounded-lg flex items-center justify-center transition-colors'
                            >
                                <svg
                                    className='w-4 h-4 dark:text-gray-600 text-gray-400'
                                    fill='currentColor'
                                    viewBox='0 0 24 24'
                                >
                                    <path d='M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z' />
                                </svg>
                            </a>
                        </div>
                    </div>

                    <div>
                        <h4 className='text-sm dark:text-gray-900 mb-4'>Produits</h4>
                        <ul className='space-y-3 text-sm'>
                            <li>
                                <Link
                                    href='/#products'
                                    className='dark:text-gray-600 text-gray-400 dark:hover:text-gray-900 hover:text-white transition-colors'
                                >
                                    Chironium Studio
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href='/#products'
                                    className='dark:text-gray-600 text-gray-400 dark:hover:text-gray-900 hover:text-white transition-colors'
                                >
                                    Chironium Atlas
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href='/#pricing'
                                    className='dark:text-gray-600 text-gray-400 dark:hover:text-gray-900 hover:text-white transition-colors'
                                >
                                    Tarifs
                                </Link>
                            </li>
                            <li>
                                <a
                                    href='#'
                                    className='dark:text-gray-600 text-gray-400 dark:hover:text-gray-900 hover:text-white transition-colors'
                                >
                                    Télécharger
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className='text-sm dark:text-gray-900 mb-4'>Ressources</h4>
                        <ul className='space-y-3 text-sm'>
                            <li>
                                <a
                                    href='#'
                                    className='dark:text-gray-600 text-gray-400 dark:hover:text-gray-900 hover:text-white transition-colors'
                                >
                                    Documentation
                                </a>
                            </li>
                            <li>
                                <a
                                    href='#'
                                    className='dark:text-gray-600 text-gray-400 dark:hover:text-gray-900 hover:text-white transition-colors'
                                >
                                    Tutoriels
                                </a>
                            </li>
                            <li>
                                <a
                                    href='#'
                                    className='dark:text-gray-600 text-gray-400 dark:hover:text-gray-900 hover:text-white transition-colors'
                                >
                                    Support
                                </a>
                            </li>
                            <li>
                                <a
                                    href='#'
                                    className='dark:text-gray-600 text-gray-400 dark:hover:text-gray-900 hover:text-white transition-colors'
                                >
                                    Blog
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className='text-sm dark:text-gray-900 mb-4'>Légal</h4>
                        <ul className='space-y-3 text-sm'>
                            <li>
                                <a
                                    href='#'
                                    className='dark:text-gray-600 text-gray-400 dark:hover:text-gray-900 hover:text-white transition-colors'
                                >
                                    Confidentialité
                                </a>
                            </li>
                            <li>
                                <a
                                    href='#'
                                    className='dark:text-gray-600 text-gray-400 dark:hover:text-gray-900 hover:text-white transition-colors'
                                >
                                    CGU
                                </a>
                            </li>
                            <li>
                                <a
                                    href='#'
                                    className='dark:text-gray-600 text-gray-400 dark:hover:text-gray-900 hover:text-white transition-colors'
                                >
                                    Mentions légales
                                </a>
                            </li>
                            <li>
                                <a
                                    href='#'
                                    className='dark:text-gray-600 text-gray-400 dark:hover:text-gray-900 hover:text-white transition-colors'
                                >
                                    Licence
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <Separator className='mb-8 dark:bg-gray-200 bg-[#30363d]' />

                <div className='flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500'>
                    <p>
                        © 2025 Chironium. Tous droits réservés. Made with ❤️ for bat conservation by{' '}
                        <Link
                            target='_blank'
                            href={
                                'https://www.google.com/url?sa=t&source=web&rct=j&opi=89978449&url=https://be.linkedin.com/in/alexian-moins&ved=2ahUKEwixsOqz_POQAxX09rsIHcO0Hf0QFnoECBYQAQ&usg=AOvVaw1jDJ14e8x5MNlvDDKXbYs-'
                            }
                        >
                            Alexian Moins
                        </Link>
                        .
                    </p>
                    <div className='flex items-center gap-2'>
                        <Badge
                            variant='outline'
                            className='dark:border-emerald-500/30 dark:bg-emerald-50 bg-emerald-900/20 text-emerald-700 text-emerald-400'
                        >
                            <CheckCircle2 className='w-3 h-3 mr-1' />

                            {/*Open Source*/}
                        </Badge>
                    </div>
                </div>
            </div>
        </footer>
    );
}
