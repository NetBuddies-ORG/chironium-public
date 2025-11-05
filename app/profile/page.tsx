'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/providers/AuthProvider';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import {
    AlertCircle,
    Calendar,
    Check,
    ChevronRight,
    CreditCard,
    Crown,
    Download,
    ExternalLink,
    FileText,
    Mail,
    Settings,
    TrendingUp,
    User,
    X,
    Zap,
} from 'lucide-react';
import { useTheme } from '@/providers/ThemeProvider';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

interface ProfileDashboardProps {
    userEmail: string;
    onNavigateToProjects: () => void;
    onLogout: () => void;
}

interface Subscription {
    plan: 'free' | 'neo' | 'pro';
    status: 'active' | 'canceled' | 'past_due';
    currentPeriodEnd: string;
    cancelAtPeriodEnd: boolean;
}

interface Invoice {
    id: string;
    date: string;
    amount: number;
    status: 'paid' | 'pending';
    invoiceUrl: string;
}

export default function ProfilePage() {
    const router = useRouter();
    const { user, initializing, signOut } = useAuth();

    useEffect(() => {
        if (!initializing && !user) {
            router.replace('/login');
        }
    }, [user, initializing, router]);

    if (initializing) return null;
    if (!user) return null;

    const { theme, toggleTheme } = useTheme();
    const [subscription, setSubscription] = useState<Subscription>({
        plan: 'free',
        status: 'active',
        currentPeriodEnd: '2025-12-05',
        cancelAtPeriodEnd: false,
    });

    const [showCancelDialog, setShowCancelDialog] = useState(false);

    // Mock user data
    const userData = {
        name: 'Jean Dupont',
        email: user.email,
        joinDate: '2024-01-15',
        projectsCount: 12,
        storageUsed: 2.4, // GB
        storageLimit: subscription.plan === 'free' ? 5 : subscription.plan === 'neo' ? 50 : Infinity,
    };

    // Mock invoices
    const invoices: Invoice[] = [
        { id: 'INV-2024-001', date: '2024-11-01', amount: 14.99, status: 'paid', invoiceUrl: '#' },
        { id: 'INV-2024-002', date: '2024-10-01', amount: 14.99, status: 'paid', invoiceUrl: '#' },
        { id: 'INV-2024-003', date: '2024-09-01', amount: 14.99, status: 'paid', invoiceUrl: '#' },
    ];

    const plans = [
        {
            id: 'free',
            name: 'Starter',
            price: 0,
            icon: Zap,
            color: 'from-gray-500 to-gray-600',
            features: [
                { text: '3 projets simultanés', included: true },
                { text: '5 GB de stockage', included: true },
                { text: 'Analyses basiques', included: true },
                { text: 'Export PDF', included: true },
                { text: 'Support communautaire', included: true },
                { text: 'Collaboration équipe', included: false },
                { text: 'API Access', included: false },
            ],
        },
        {
            id: 'neo',
            name: 'Neo',
            price: 14.99,
            icon: Crown,
            color: 'from-[#00C2FF] to-[#0096CC]',
            popular: true,
            features: [
                { text: '20 projets simultanés', included: true },
                { text: '50 GB de stockage', included: true },
                { text: 'Analyses avancées IA', included: true },
                { text: 'Export multi-formats', included: true },
                { text: 'Support par email', included: true },
                { text: 'Collaboration équipe', included: false },
                { text: 'API Access', included: false },
            ],
        },
        {
            id: 'pro',
            name: 'Pro',
            price: 29.99,
            icon: TrendingUp,
            color: 'from-[#FF9500] to-[#FF6B00]',
            features: [
                { text: 'Projets illimités', included: true },
                { text: 'Stockage cloud illimité', included: true },
                { text: 'Toutes fonctionnalités IA', included: true },
                { text: 'Export personnalisé', included: true },
                { text: 'Support prioritaire 24/7', included: true },
                { text: 'Collaboration équipe', included: true },
                { text: 'API Access', included: true },
            ],
        },
    ];

    const handleUpgrade = (planId: string) => {
        // Simulate Stripe Checkout
        console.log('Opening Stripe Checkout for plan:', planId);
        alert(
            `Redirection vers Stripe Checkout pour le plan ${planId.toUpperCase()}...\n\nEn production, cela ouvrira Stripe Checkout.`,
        );
        // In production: window.location.href = stripeCheckoutUrl
    };

    const handleManageBilling = () => {
        // Simulate Stripe Customer Portal
        console.log('Opening Stripe Customer Portal');
        alert(
            'Redirection vers le portail client Stripe...\n\nEn production, cela ouvrira le portail client Stripe où vous pourrez gérer vos moyens de paiement, télécharger vos factures, etc.',
        );
        // In production: window.location.href = stripeCustomerPortalUrl
    };

    const handleCancelSubscription = () => {
        setSubscription({ ...subscription, cancelAtPeriodEnd: true });
        setShowCancelDialog(false);
        alert('Votre abonnement sera annulé à la fin de la période de facturation.');
    };

    const handleReactivateSubscription = () => {
        setSubscription({ ...subscription, cancelAtPeriodEnd: false });
        alert('Votre abonnement a été réactivé !');
    };

    const currentPlan = plans.find((p) => p.id === subscription.plan);
    const storagePercentage = subscription.plan === 'pro' ? 0 : (userData.storageUsed / userData.storageLimit) * 100;

    return (
        <div className={'page-container'}>
            <main className='container mx-auto px-6 py-12 md:py-16'>
                <div className='max-w-7xl mx-auto space-y-10'>
                    {/* Header Section */}
                    <div>
                        <h1 className='text-4xl mb-3'>Mon Profil</h1>
                        <p className='text-muted-foreground text-lg'>Gérez vos informations et votre abonnement</p>
                    </div>

                    <div className='grid lg:grid-cols-3 gap-8'>
                        {/* Left Column - User Info & Stats */}
                        <div className='space-y-6'>
                            {/* User Info Card */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className='flex items-center gap-2'>
                                        <User className='w-5 h-5' />
                                        Informations
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className='space-y-4'>
                                    <div className='flex items-center gap-3'>
                                        <div className='w-16 h-16 bg-gradient-to-br from-[#00C2FF] to-[#0096CC] rounded-full flex items-center justify-center text-white text-2xl'>
                                            {userData.name
                                                .split(' ')
                                                .map((n) => n[0])
                                                .join('')}
                                        </div>
                                        <div>
                                            <div className='text-lg'>{userData.name}</div>
                                            <div className='text-sm text-muted-foreground flex items-center gap-1'>
                                                <Mail className='w-3 h-3' />
                                                {userData.email}
                                            </div>
                                        </div>
                                    </div>
                                    <Separator />
                                    <div className='space-y-2 text-sm'>
                                        <div className='flex items-center gap-2 text-muted-foreground'>
                                            <Calendar className='w-4 h-4' />
                                            Membre depuis le {new Date(userData.joinDate).toLocaleDateString('fr-FR')}
                                        </div>
                                        <div className='flex items-center gap-2 text-muted-foreground'>
                                            <FileText className='w-4 h-4' />
                                            {userData.projectsCount} projets créés
                                        </div>
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Button variant='outline' className='w-full'>
                                        <Settings className='w-4 h-4 mr-2' />
                                        Modifier le profil
                                    </Button>
                                </CardFooter>
                            </Card>

                            {/* Storage Card */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className='flex items-center justify-between'>
                                        <span>Stockage</span>
                                        <Badge variant='secondary'>
                                            {userData.storageUsed} /{' '}
                                            {subscription.plan === 'pro' ? '∞' : userData.storageLimit} GB
                                        </Badge>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className='space-y-3'>
                                    {subscription.plan !== 'pro' && (
                                        <>
                                            <Progress value={storagePercentage} className='h-2' />
                                            {storagePercentage > 80 && (
                                                <div className='flex items-start gap-2 text-xs text-orange-600 dark:text-orange-400'>
                                                    <AlertCircle className='w-4 h-4 flex-shrink-0' />
                                                    <span>Vous approchez de la limite de stockage</span>
                                                </div>
                                            )}
                                        </>
                                    )}
                                    {subscription.plan === 'pro' && (
                                        <div className='text-sm text-muted-foreground'>
                                            Stockage illimité avec le plan Pro
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </div>

                        {/* Right Column - Subscription */}
                        <div className='lg:col-span-2 space-y-8'>
                            {/* Current Subscription */}
                            <Card className='border-2 border-[#00C2FF]/20'>
                                <CardHeader>
                                    <div className='flex items-start justify-between'>
                                        <div>
                                            <CardTitle className='flex items-center gap-2 mb-2'>
                                                <CreditCard className='w-5 h-5' />
                                                Abonnement actuel
                                            </CardTitle>
                                            <CardDescription>
                                                {subscription.cancelAtPeriodEnd
                                                    ? `Annulé - Accès jusqu'au ${new Date(subscription.currentPeriodEnd).toLocaleDateString('fr-FR')}`
                                                    : `Prochaine facturation le ${new Date(subscription.currentPeriodEnd).toLocaleDateString('fr-FR')}`}
                                            </CardDescription>
                                        </div>
                                        {currentPlan && (
                                            <Badge
                                                className={`bg-gradient-to-r ${currentPlan.color} text-white border-0`}
                                            >
                                                {currentPlan.name}
                                            </Badge>
                                        )}
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    {currentPlan && (
                                        <div className='space-y-4'>
                                            <div className='flex items-baseline gap-2'>
                                                <span className='text-4xl'>{currentPlan.price}</span>
                                                <span className='text-muted-foreground'>€ / mois</span>
                                            </div>

                                            <div className='grid md:grid-cols-2 gap-2'>
                                                {currentPlan.features.map((feature, index) => (
                                                    <div key={index} className='flex items-start gap-2 text-sm'>
                                                        {feature.included ? (
                                                            <Check className='w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5' />
                                                        ) : (
                                                            <X className='w-4 h-4 text-gray-300 dark:text-gray-700 flex-shrink-0 mt-0.5' />
                                                        )}
                                                        <span
                                                            className={feature.included ? '' : 'text-muted-foreground'}
                                                        >
                                                            {feature.text}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>

                                            {subscription.cancelAtPeriodEnd ? (
                                                <div className='bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-900 rounded-lg p-4'>
                                                    <div className='flex items-start gap-3'>
                                                        <AlertCircle className='w-5 h-5 text-orange-600 dark:text-orange-400 flex-shrink-0' />
                                                        <div className='flex-1'>
                                                            <div className='text-sm text-orange-900 dark:text-orange-100 mb-2'>
                                                                Votre abonnement est programmé pour annulation
                                                            </div>
                                                            <Button
                                                                size='sm'
                                                                onClick={handleReactivateSubscription}
                                                                className='bg-orange-600 hover:bg-orange-700 text-white'
                                                            >
                                                                Réactiver l'abonnement
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className='flex gap-3'>
                                                    <Button
                                                        onClick={handleManageBilling}
                                                        className='flex-1 bg-[#00C2FF] hover:bg-[#00A8E6] text-white'
                                                    >
                                                        <CreditCard className='w-4 h-4 mr-2' />
                                                        Gérer la facturation
                                                    </Button>
                                                    {subscription.plan !== 'free' && (
                                                        <Button
                                                            variant='outline'
                                                            onClick={() => setShowCancelDialog(true)}
                                                            className='border-red-200 dark:border-red-900 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20'
                                                        >
                                                            Annuler
                                                        </Button>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </CardContent>
                            </Card>

                            {/* Upgrade Plans */}
                            {subscription.plan !== 'pro' && (
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Passer à un plan supérieur</CardTitle>
                                        <CardDescription>
                                            Débloquez plus de fonctionnalités et de stockage
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className='grid md:grid-cols-2 gap-4'>
                                            {plans
                                                .filter((plan) => {
                                                    const planOrder = { free: 0, neo: 1, pro: 2 };
                                                    return (
                                                        planOrder[plan.id as 'free' | 'neo' | 'pro'] >
                                                        planOrder[subscription.plan]
                                                    );
                                                })
                                                .map((plan) => {
                                                    const Icon = plan.icon;
                                                    return (
                                                        <Card
                                                            key={plan.id}
                                                            className={`border-2 ${plan.popular ? 'border-[#00C2FF]' : 'border-gray-200 dark:border-[#30363d]'}`}
                                                        >
                                                            <CardHeader>
                                                                <div
                                                                    className={`w-10 h-10 bg-gradient-to-br ${plan.color} rounded-lg flex items-center justify-center mb-3`}
                                                                >
                                                                    <Icon className='w-5 h-5 text-white' />
                                                                </div>
                                                                <CardTitle className='text-xl'>{plan.name}</CardTitle>
                                                                <div className='flex items-baseline gap-1'>
                                                                    <span className='text-3xl'>{plan.price}</span>
                                                                    <span className='text-muted-foreground'>
                                                                        € / mois
                                                                    </span>
                                                                </div>
                                                            </CardHeader>
                                                            <CardContent>
                                                                <div className='space-y-2 mb-4'>
                                                                    {plan.features.slice(0, 3).map((feature, index) => (
                                                                        <div
                                                                            key={index}
                                                                            className='flex items-center gap-2 text-sm'
                                                                        >
                                                                            <Check className='w-4 h-4 text-emerald-500 flex-shrink-0' />
                                                                            <span>{feature.text}</span>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                                <Button
                                                                    onClick={() => handleUpgrade(plan.id)}
                                                                    className={`w-full bg-gradient-to-r ${plan.color} text-white hover:opacity-90`}
                                                                >
                                                                    Passer à {plan.name}
                                                                    <ChevronRight className='w-4 h-4 ml-2' />
                                                                </Button>
                                                            </CardContent>
                                                        </Card>
                                                    );
                                                })}
                                        </div>
                                    </CardContent>
                                </Card>
                            )}

                            {/* Invoices */}
                            {subscription.plan !== 'free' && (
                                <Card>
                                    <CardHeader>
                                        <CardTitle className='flex items-center gap-2'>
                                            <FileText className='w-5 h-5' />
                                            Historique de facturation
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className='space-y-3'>
                                            {invoices.map((invoice) => (
                                                <div
                                                    key={invoice.id}
                                                    className='flex items-center justify-between p-3 rounded-lg border border-gray-200 dark:border-[#30363d] hover:bg-accent transition-colors'
                                                >
                                                    <div className='flex items-center gap-3'>
                                                        <div className='w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center'>
                                                            <FileText className='w-5 h-5 text-muted-foreground' />
                                                        </div>
                                                        <div>
                                                            <div className='text-sm'>{invoice.id}</div>
                                                            <div className='text-xs text-muted-foreground'>
                                                                {new Date(invoice.date).toLocaleDateString('fr-FR')}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='flex items-center gap-4'>
                                                        <div className='text-right'>
                                                            <div className='text-sm'>{invoice.amount.toFixed(2)} €</div>
                                                            <Badge
                                                                variant={
                                                                    invoice.status === 'paid' ? 'default' : 'secondary'
                                                                }
                                                                className='text-xs'
                                                            >
                                                                {invoice.status === 'paid' ? 'Payé' : 'En attente'}
                                                            </Badge>
                                                        </div>
                                                        <Button variant='ghost' size='sm'>
                                                            <Download className='w-4 h-4' />
                                                        </Button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                    <CardFooter>
                                        <Button variant='outline' className='w-full' onClick={handleManageBilling}>
                                            <ExternalLink className='w-4 h-4 mr-2' />
                                            Voir toutes les factures sur Stripe
                                        </Button>
                                    </CardFooter>
                                </Card>
                            )}
                        </div>
                    </div>
                </div>
            </main>
            {showCancelDialog && (
                <div className='fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4'>
                    <Card className='max-w-md w-full'>
                        <CardHeader>
                            <CardTitle>Annuler l'abonnement ?</CardTitle>
                            <CardDescription>
                                Vous perdrez l'accès aux fonctionnalités premium à la fin de votre période de
                                facturation.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className='space-y-3 text-sm'>
                                <div className='flex items-start gap-2'>
                                    <AlertCircle className='w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5' />
                                    <span>Vos projets et données seront conservés</span>
                                </div>
                                <div className='flex items-start gap-2'>
                                    <AlertCircle className='w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5' />
                                    <span>Vous pouvez réactiver à tout moment</span>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className='flex gap-3'>
                            <Button variant='outline' onClick={() => setShowCancelDialog(false)} className='flex-1'>
                                Conserver
                            </Button>
                            <Button
                                onClick={handleCancelSubscription}
                                className='flex-1 bg-red-600 hover:bg-red-700 text-white'
                            >
                                Confirmer l'annulation
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            )}
        </div>
    );
}
