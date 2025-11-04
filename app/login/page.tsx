'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Waves, ArrowRight, FacebookIcon, Sun, Moon } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/providers/ThemeProvider';
import Classes from './index.module.css';
import Header from '@/components/common/header/Header';

const AuthInput = ({ label, type, value, onChange, placeholder }: any) => (
    <div className={Classes.inputGroup}>
        <label className={Classes.inputLabel}>{label}</label>
        <input className={Classes.input} type={type} value={value} onChange={onChange} placeholder={placeholder} />
    </div>
);

const SocialButton = ({ icon: Icon, label, onClick }: any) => (
    <Button variant='outline' size='default' className={Classes.socialButton} onClick={onClick}>
        <Icon className={Classes.socialIcon} /> {label}
    </Button>
);

export default function LoginPage() {
    const [mode, setMode] = useState<'signin' | 'signup'>('signin');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const isSignin = mode === 'signin';
    const { theme, toggleTheme } = useTheme();

    const toggleMode = () => setMode(isSignin ? 'signup' : 'signin');

    const socialProviders = [
        { name: 'google', icon: Waves, label: 'Continuer avec Google' },
        { name: 'facebook', icon: FacebookIcon, label: 'Continuer avec Facebook' },
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert(
            isSignin
                ? `Connexion avec: ${email}`
                : `Inscription pour: ${email}${password === confirm ? '' : ' (mots de passe différents)'}`,
        );
    };

    return (
        <div className={Classes.container}>
            <div className={Classes['glow-top-left']}></div>
            <div className={Classes['glow-bottom-right']}></div>
            <div className={Classes['noise-overlay']}></div>

            {/* Header */}
            <Header />

            {/* Main */}
            <main className={Classes.main}>
                <div className={Classes.mainContent}>
                    <div className={Classes.titleContainer}>
                        <h1 className={Classes.title}>{isSignin ? 'Bienvenue' : 'Rejoignez Chironium'}</h1>
                        <p className={Classes.subtitle}>
                            {isSignin ? 'Accédez à votre espace Chironium' : 'Créez votre compte en quelques secondes'}
                        </p>
                    </div>

                    <>
                        <CardContent>
                            <form onSubmit={handleSubmit} className={Classes.formContent}>
                                <div>
                                    {socialProviders.map((provider) => (
                                        <SocialButton
                                            key={provider.name}
                                            icon={provider.icon}
                                            label={provider.label}
                                            onClick={() => alert(`TODO Social: ${provider.name}`)}
                                        />
                                    ))}
                                </div>

                                {/* Separator */}
                                <div className={Classes.separator}>ou</div>

                                <AnimatePresence mode='wait'>
                                    {isSignin ? (
                                        <motion.div
                                            key='signin'
                                            initial={{ opacity: 0, x: 50 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -50 }}
                                            transition={{ duration: 0.4, ease: 'easeOut' }}
                                        >
                                            <AuthInput
                                                label='Email'
                                                type='email'
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder='votre@email.com'
                                            />
                                            <AuthInput
                                                label='Mot de passe'
                                                type='password'
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                placeholder='••••••••'
                                            />
                                            <Button type='submit' className={Classes.submitButton}>
                                                Se connecter <ArrowRight className={Classes.submitIcon} />
                                            </Button>
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key='signup'
                                            initial={{ opacity: 0, x: -50 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 50 }}
                                            transition={{ duration: 0.4, ease: 'easeOut' }}
                                        >
                                            <AuthInput
                                                label='Email'
                                                type='email'
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder='votre@email.com'
                                            />
                                            <AuthInput
                                                label='Mot de passe'
                                                type='password'
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                placeholder='Votre mot de passe'
                                            />
                                            <AuthInput
                                                label='Confirmer le mot de passe'
                                                type='password'
                                                value={confirm}
                                                onChange={(e) => setConfirm(e.target.value)}
                                                placeholder='Confirmez le mot de passe'
                                            />
                                            <Button type='submit' className={Classes.submitButton}>
                                                Créer un compte
                                            </Button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </form>
                        </CardContent>

                        <CardFooter className={Classes.cardFooter}>
                            <Button variant='link' onClick={toggleMode}>
                                {isSignin ? `Vous n'avez pas de compte ? ` : 'Déjà un compte ? '}
                                <span className={Classes.footerAction}>
                                    {isSignin ? `Inscrivez-vous` : 'Connectez-vous'}
                                </span>
                            </Button>

                            {isSignin && (
                                <Button variant='link-secondary'>
                                    <a href='#'>Mot de passe oublié ?</a>
                                </Button>
                            )}
                        </CardFooter>
                    </>
                </div>
            </main>
        </div>
    );
}
