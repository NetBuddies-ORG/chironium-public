'use client';

import { useEffect, useState } from 'react';
import type { SVGProps } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/providers/AuthProvider';
import { useRouter } from 'next/navigation';
import Classes from './index.module.css';

// Inline brand icons
const Google = (props: SVGProps<SVGSVGElement>) => (
    <svg viewBox='0 0 24 24' aria-hidden='true' focusable='false' {...props}>
        <path
            fill='#EA4335'
            d='M12 10.2v3.92h5.46c-.24 1.25-.98 2.31-2.08 3.02l3.36 2.61c1.96-1.81 3.09-4.48 3.09-7.65 0-.74-.07-1.45-.2-2.12H12z'
        />
        <path fill='#34A853' d='M6.65 14.32a5.85 5.85 0 0 1 0-4.64L3.16 6.84a9.93 9.93 0 0 0 0 10.32l3.49-2.84z' />
        <path
            fill='#4285F4'
            d='M12 4.8c1.62 0 3.08.56 4.23 1.66l3.16-3.16A10.43 10.43 0 0 0 12 1C7.74 1 4.1 3.44 2.32 6.84l3.49 2.84C6.76 7.45 9.15 4.8 12 4.8z'
        />
        <path
            fill='#FBBC05'
            d='M12 22c2.75 0 5.06-.9 6.77-2.44l-3.36-2.61c-.93.63-2.12 1-3.41 1-2.85 0-5.24-2.65-6.19-4.88L2.32 17.16C4.1 20.56 7.74 22 12 22z'
        />
    </svg>
);

const Microsoft = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox='0 0 24 24' aria-hidden='true' focusable='false' {...props}>
        <rect x='2' y='2' width='9' height='9' fill='#F25022' />
        <rect x='13' y='2' width='9' height='9' fill='#7FBA00' />
        <rect x='2' y='13' width='9' height='9' fill='#00A4EF' />
        <rect x='13' y='13' width='9' height='9' fill='#FFB900' />
    </svg>
);

const AuthInput = ({ label, type, value, onChange, placeholder }) => (
    <div className={Classes.inputGroup}>
        <label className={Classes.inputLabel}>{label}</label>
        <input className={Classes.input} type={type} value={value} onChange={onChange} placeholder={placeholder} />
    </div>
);

const SocialButton = ({ icon: Icon, label, onClick }) => (
    <Button variant='outline' size='default' className={Classes.socialButton} onClick={onClick}>
        <Icon className={Classes.socialIcon} /> {label}
    </Button>
);

export default function LoginPage() {
    const router = useRouter();
    const { user, initializing, signInWithPassword, signUpWithPassword, signInWithOAuth } = useAuth();

    const [mode, setMode] = useState<'signin' | 'signup'>('signin');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [submitting, setSubmitting] = useState(false);

    const isSignin = mode === 'signin';

    useEffect(() => {
        if (!initializing && user) {
            router.replace('/profile');
        }
    }, [user, initializing, router]);

    const toggleMode = () => setMode(isSignin ? 'signup' : 'signin');

    const socialProviders = [{ name: 'google', icon: Google, label: 'Continuer avec Google' }];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSubmitting(true);
        try {
            if (isSignin) {
                const { error } = await signInWithPassword({ email, password });
                if (error) return setError(error);
            } else {
                if (password !== confirm) {
                    return setError('Les mots de passe ne correspondent pas.');
                }
                const { error } = await signUpWithPassword({ email, password });
                if (error) return setError(error);
            }
            // If success, redirect to profile
            router.replace('/profile');
        } finally {
            setSubmitting(false);
        }
    };

    return (
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
                                    onClick={async () => {
                                        setError(null);
                                        const { error } = await signInWithOAuth(provider.name as 'google' | 'azure');
                                        if (error) setError(error);
                                    }}
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
                                    {error && <div className={Classes.error}>{error}</div>}
                                    <Button type='submit' className={Classes.submitButton} disabled={submitting}>
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
                                    {error && <div className={Classes.error}>{error}</div>}
                                    <Button type='submit' className={Classes.submitButton} disabled={submitting}>
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
                        <span className={Classes.footerAction}>{isSignin ? `Inscrivez-vous` : 'Connectez-vous'}</span>
                    </Button>

                    {isSignin && (
                        <Button variant='link-secondary'>
                            <a href='#'>Mot de passe oublié ?</a>
                        </Button>
                    )}
                </CardFooter>
            </>
        </div>
    );
}
