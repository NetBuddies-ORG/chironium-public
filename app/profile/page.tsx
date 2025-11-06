'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import {
    AlertCircle,
    Calendar,
    Check,
    CreditCard,
    Crown,
    FileText,
    Mail,
    Settings,
    TrendingUp,
    User,
    X,
    Zap,
    Bell,
    Shield,
    Download,
    Activity,
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import Account from '@/features/profile/account/Account';

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
    const user = { email: 'jean.dupont@example.com' };

    const [subscription, setSubscription] = useState<Subscription>({
        plan: 'neo',
        status: 'active',
        currentPeriodEnd: '2025-12-05',
        cancelAtPeriodEnd: false,
    });

    const [showCancelDialog, setShowCancelDialog] = useState(false);
    const [notifications, setNotifications] = useState({
        email: true,
        projectUpdates: true,
        newsletter: false,
        marketing: false,
    });

    const userData = {
        name: 'Jean Dupont',
        email: user.email,
        joinDate: '2024-01-15',
        projectsCount: 12,
        storageUsed: 0.234,
        storageLimit: subscription.plan === 'free' ? 5 : subscription.plan === 'neo' ? 1 : Infinity,
    };

    const recentActivity = [
        { action: 'Projet créé', project: 'Analyse Q4 2024', date: '2024-11-01' },
        { action: 'Export PDF', project: 'Rapport Marketing', date: '2024-10-28' },
        { action: 'Collaboration', project: 'Dashboard Analytics', date: '2024-10-25' },
        { action: 'Mise à jour', project: 'Budget 2025', date: '2024-10-20' },
    ];

    const invoices: Invoice[] = [
        { id: 'INV-001', date: '2024-11-01', amount: 14.99, status: 'paid', invoiceUrl: '#' },
        { id: 'INV-002', date: '2024-10-01', amount: 14.99, status: 'paid', invoiceUrl: '#' },
        { id: 'INV-003', date: '2024-09-01', amount: 14.99, status: 'paid', invoiceUrl: '#' },
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

    const handleManageBilling = () => {
        console.log('Opening Stripe Customer Portal');
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

    const handleNotificationChange = (key: string) => {
        setNotifications({ ...notifications, [key]: !notifications[key] });
    };

    const currentPlan = plans.find((p) => p.id === subscription.plan);

    return (
        <div className='pt-16'>
            <main className='container mx-auto px-6 py-12 md:py-16'>
                <div className='max-w-7xl mx-auto space-y-10'>
                    <div>
                        <h1 className='text-4xl mb-3'>Mon Profil</h1>
                        <p className='text-muted-foreground text-lg'>Gérez vos informations et votre abonnement</p>
                    </div>

                    <Tabs defaultValue='account' className='w-full'>
                        <div className='border-b mb-8'>
                            <TabsList className='h-auto p-0 bg-transparent w-full justify-start gap-1'>
                                <TabsTrigger
                                    value='account'
                                    className='gap-2 rounded-none border-b-2 border-transparent data-[state=active]:border-[#00C2FF] data-[state=active]:bg-transparent data-[state=active]:shadow-none px-6 py-3'
                                >
                                    <User className='w-4 h-4' />
                                    <span className='hidden sm:inline font-medium'>Compte</span>
                                </TabsTrigger>
                                <TabsTrigger
                                    value='subscription'
                                    className='gap-2 rounded-none border-b-2 border-transparent data-[state=active]:border-[#00C2FF] data-[state=active]:bg-transparent data-[state=active]:shadow-none px-6 py-3'
                                >
                                    <CreditCard className='w-4 h-4' />
                                    <span className='hidden sm:inline font-medium'>Abonnement</span>
                                </TabsTrigger>
                                <TabsTrigger
                                    value='billing'
                                    className='gap-2 rounded-none border-b-2 border-transparent data-[state=active]:border-[#00C2FF] data-[state=active]:bg-transparent data-[state=active]:shadow-none px-6 py-3'
                                >
                                    <FileText className='w-4 h-4' />
                                    <span className='hidden sm:inline font-medium'>Facturation</span>
                                </TabsTrigger>
                                <TabsTrigger
                                    value='notifications'
                                    className='gap-2 rounded-none border-b-2 border-transparent data-[state=active]:border-[#00C2FF] data-[state=active]:bg-transparent data-[state=active]:shadow-none px-6 py-3'
                                >
                                    <Bell className='w-4 h-4' />
                                    <span className='hidden sm:inline font-medium'>Notifications</span>
                                </TabsTrigger>
                                <TabsTrigger
                                    value='activity'
                                    className='gap-2 rounded-none border-b-2 border-transparent data-[state=active]:border-[#00C2FF] data-[state=active]:bg-transparent data-[state=active]:shadow-none px-6 py-3'
                                >
                                    <Activity className='w-4 h-4' />
                                    <span className='hidden sm:inline font-medium'>Activité</span>
                                </TabsTrigger>
                            </TabsList>
                        </div>

                        <TabsContent value='account' className='space-y-8'>
                            <Account />
                        </TabsContent>

                        <TabsContent value='subscription' className='space-y-8'>
                            <Card className='overflow-hidden'>
                                <CardHeader className='pb-6'>
                                    <div className='flex items-start justify-between'>
                                        <div>
                                            <CardTitle className='flex items-center gap-3 mb-3 text-xl'>
                                                <div className='w-10 h-10 rounded-lg bg-gradient-to-br from-[#00C2FF]/10 to-[#0096CC]/10 flex items-center justify-center'>
                                                    <CreditCard className='w-5 h-5 text-[#00C2FF]' />
                                                </div>
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
                                <CardContent className='pb-6'>
                                    {currentPlan && (
                                        <div className='space-y-4'>
                                            <div className='flex items-baseline gap-2'>
                                                <span className='text-4xl font-bold'>{currentPlan.price}</span>
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
                                                                {"Réactiver l'abonnement"}
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

                            <div>
                                <h3 className='text-2xl font-semibold mb-6 flex items-center gap-3'>
                                    <div className='w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500/10 to-purple-600/10 flex items-center justify-center'>
                                        <Crown className='w-4 h-4 text-purple-600' />
                                    </div>
                                    Changer de forfait
                                </h3>
                                <div className='grid md:grid-cols-3 gap-6'>
                                    {plans.map((plan) => {
                                        const Icon = plan.icon;
                                        const isCurrentPlan = plan.id === subscription.plan;
                                        return (
                                            <Card
                                                key={plan.id}
                                                className={isCurrentPlan ? 'border-[#00C2FF] border-2' : ''}
                                            >
                                                <CardHeader>
                                                    <div className='flex items-center justify-between mb-2'>
                                                        <div
                                                            className={`w-10 h-10 rounded-lg bg-gradient-to-br ${plan.color} flex items-center justify-center`}
                                                        >
                                                            <Icon className='w-5 h-5 text-white' />
                                                        </div>
                                                        {plan.popular && (
                                                            <Badge className='bg-[#00C2FF] text-white'>Populaire</Badge>
                                                        )}
                                                        {isCurrentPlan && <Badge variant='secondary'>Actuel</Badge>}
                                                    </div>
                                                    <CardTitle>{plan.name}</CardTitle>
                                                    <div className='flex items-baseline gap-1'>
                                                        <span className='text-3xl font-bold'>{plan.price}</span>
                                                        <span className='text-muted-foreground'>€/mois</span>
                                                    </div>
                                                </CardHeader>
                                                <CardContent>
                                                    <div className='space-y-2'>
                                                        {plan.features.slice(0, 5).map((feature, idx) => (
                                                            <div key={idx} className='flex items-start gap-2 text-sm'>
                                                                {feature.included ? (
                                                                    <Check className='w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5' />
                                                                ) : (
                                                                    <X className='w-4 h-4 text-gray-300 flex-shrink-0 mt-0.5' />
                                                                )}
                                                                <span
                                                                    className={
                                                                        feature.included ? '' : 'text-muted-foreground'
                                                                    }
                                                                >
                                                                    {feature.text}
                                                                </span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </CardContent>
                                                <CardFooter>
                                                    <Button
                                                        className='w-full'
                                                        variant={isCurrentPlan ? 'outline' : 'default'}
                                                        disabled={isCurrentPlan}
                                                    >
                                                        {isCurrentPlan ? 'Plan actuel' : 'Choisir ce plan'}
                                                    </Button>
                                                </CardFooter>
                                            </Card>
                                        );
                                    })}
                                </div>
                            </div>
                        </TabsContent>

                        <TabsContent value='billing' className='space-y-8'>
                            <Card className='overflow-hidden'>
                                <CardHeader className='pb-6'>
                                    <CardTitle className='flex items-center gap-3 text-xl'>
                                        <div className='w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500/10 to-blue-600/10 flex items-center justify-center'>
                                            <FileText className='w-5 h-5 text-blue-600' />
                                        </div>
                                        Historique de facturation
                                    </CardTitle>
                                    <CardDescription className='mt-2'>
                                        Consultez et téléchargez vos factures
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className='pb-6'>
                                    <div className='space-y-3'>
                                        {invoices.map((invoice) => (
                                            <div
                                                key={invoice.id}
                                                className='flex items-center justify-between p-4 border rounded-lg hover:bg-accent transition-colors'
                                            >
                                                <div className='flex-1'>
                                                    <div className='font-medium'>{invoice.id}</div>
                                                    <div className='text-sm text-muted-foreground'>
                                                        {new Date(invoice.date).toLocaleDateString('fr-FR')}
                                                    </div>
                                                </div>
                                                <div className='flex items-center gap-4'>
                                                    <div className='text-right'>
                                                        <div className='font-semibold'>
                                                            {invoice.amount.toFixed(2)} €
                                                        </div>
                                                        <Badge
                                                            variant={
                                                                invoice.status === 'paid' ? 'default' : 'secondary'
                                                            }
                                                        >
                                                            {invoice.status === 'paid' ? 'Payé' : 'En attente'}
                                                        </Badge>
                                                    </div>
                                                    <Button variant='ghost' size='icon'>
                                                        <Download className='w-4 h-4' />
                                                    </Button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className='overflow-hidden'>
                                <CardHeader className='pb-6'>
                                    <CardTitle className='flex items-center gap-3 text-xl'>
                                        <div className='w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500/10 to-indigo-600/10 flex items-center justify-center'>
                                            <CreditCard className='w-5 h-5 text-indigo-600' />
                                        </div>
                                        Méthode de paiement
                                    </CardTitle>
                                    <CardDescription className='mt-2'>
                                        Gérez vos informations de paiement
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className='pb-6'>
                                    <div className='flex items-center justify-between p-4 border rounded-lg'>
                                        <div className='flex items-center gap-3'>
                                            <div className='w-12 h-8 bg-gradient-to-br from-blue-500 to-blue-700 rounded flex items-center justify-center'>
                                                <CreditCard className='w-5 h-5 text-white' />
                                            </div>
                                            <div>
                                                <div className='font-medium'>•••• •••• •••• 4242</div>
                                                <div className='text-sm text-muted-foreground'>Expire 12/2025</div>
                                            </div>
                                        </div>
                                        <Button variant='outline'>Modifier</Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value='notifications' className='space-y-8'>
                            <Card className='overflow-hidden'>
                                <CardHeader className='pb-6'>
                                    <CardTitle className='flex items-center gap-3 text-xl'>
                                        <div className='w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500/10 to-amber-600/10 flex items-center justify-center'>
                                            <Bell className='w-5 h-5 text-amber-600' />
                                        </div>
                                        Préférences de notification
                                    </CardTitle>
                                    <CardDescription className='mt-2'>
                                        Gérez comment vous souhaitez être informé
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className='space-y-6 pb-6'>
                                    <div className='flex items-center justify-between'>
                                        <div className='space-y-0.5'>
                                            <Label htmlFor='email-notif'>Notifications par email</Label>
                                            <div className='text-sm text-muted-foreground'>
                                                Recevoir des emails pour les mises à jour importantes
                                            </div>
                                        </div>
                                        <Switch
                                            id='email-notif'
                                            checked={notifications.email}
                                            onCheckedChange={() => handleNotificationChange('email')}
                                        />
                                    </div>
                                    <Separator />
                                    <div className='flex items-center justify-between'>
                                        <div className='space-y-0.5'>
                                            <Label htmlFor='project-notif'>Mises à jour de projets</Label>
                                            <div className='text-sm text-muted-foreground'>
                                                Notifications pour vos projets et collaborations
                                            </div>
                                        </div>
                                        <Switch
                                            id='project-notif'
                                            checked={notifications.projectUpdates}
                                            onCheckedChange={() => handleNotificationChange('projectUpdates')}
                                        />
                                    </div>
                                    <Separator />
                                    <div className='flex items-center justify-between'>
                                        <div className='space-y-0.5'>
                                            <Label htmlFor='newsletter'>Newsletter</Label>
                                            <div className='text-sm text-muted-foreground'>
                                                Conseils, actualités et nouvelles fonctionnalités
                                            </div>
                                        </div>
                                        <Switch
                                            id='newsletter'
                                            checked={notifications.newsletter}
                                            onCheckedChange={() => handleNotificationChange('newsletter')}
                                        />
                                    </div>
                                    <Separator />
                                    <div className='flex items-center justify-between'>
                                        <div className='space-y-0.5'>
                                            <Label htmlFor='marketing'>Communications marketing</Label>
                                            <div className='text-sm text-muted-foreground'>
                                                Offres spéciales et promotions
                                            </div>
                                        </div>
                                        <Switch
                                            id='marketing'
                                            checked={notifications.marketing}
                                            onCheckedChange={() => handleNotificationChange('marketing')}
                                        />
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value='activity' className='space-y-8'>
                            <Card className='overflow-hidden'>
                                <CardHeader className='pb-6'>
                                    <CardTitle className='flex items-center gap-3 text-xl'>
                                        <div className='w-10 h-10 rounded-lg bg-gradient-to-br from-green-500/10 to-green-600/10 flex items-center justify-center'>
                                            <Activity className='w-5 h-5 text-green-600' />
                                        </div>
                                        Activité récente
                                    </CardTitle>
                                    <CardDescription className='mt-2'>
                                        Historique de vos actions sur la plateforme
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className='pb-6'>
                                    <div className='space-y-4'>
                                        {recentActivity.map((activity, index) => (
                                            <div
                                                key={index}
                                                className='flex items-start gap-4 pb-4 border-b last:border-0'
                                            >
                                                <div className='w-2 h-2 bg-[#00C2FF] rounded-full mt-2'></div>
                                                <div className='flex-1'>
                                                    <div className='flex items-start justify-between'>
                                                        <div>
                                                            <div className='font-medium'>{activity.action}</div>
                                                            <div className='text-sm text-muted-foreground'>
                                                                {activity.project}
                                                            </div>
                                                        </div>
                                                        <div className='text-sm text-muted-foreground'>
                                                            {new Date(activity.date).toLocaleDateString('fr-FR')}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Button variant='outline' className='w-full'>
                                        {"Voir toute l'activité"}
                                    </Button>
                                </CardFooter>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>
            </main>

            {showCancelDialog && (
                <div className='fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4'>
                    <Card className='max-w-md w-full'>
                        <CardHeader>
                            <CardTitle>{"Annuler l'abonnement ?"}</CardTitle>
                            <CardDescription>
                                {
                                    "Vous perdrez l'accès aux fonctionnalités premium à la fin de votre période de facturation."
                                }
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
                                {"Confirmer l'annulation"}
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            )}
        </div>
    );
}
