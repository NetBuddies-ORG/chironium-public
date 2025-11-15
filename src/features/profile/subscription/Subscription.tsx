import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, Check, CreditCard, Crown, TrendingUp, X, Zap } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface Subscription {
    plan: 'free' | 'neo' | 'pro';
    status: 'active' | 'canceled' | 'past_due';
    currentPeriodEnd: string;
    cancelAtPeriodEnd: boolean;
}

export default function Subscription() {
    const [showCancelDialog, setShowCancelDialog] = useState(false);
    const [subscription, setSubscription] = useState<Subscription>({
        plan: 'neo',
        status: 'active',
        currentPeriodEnd: '2025-12-05',
        cancelAtPeriodEnd: false,
    });

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

    const currentPlan = plans.find((p) => p.id === subscription.plan);

    return (
        <>
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
                            <Badge className={`bg-gradient-to-r ${currentPlan.color} text-white border-0`}>
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
                                        <span className={feature.included ? '' : 'text-muted-foreground'}>
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
                            <Card key={plan.id} className={isCurrentPlan ? 'border-[#00C2FF] border-2' : ''}>
                                <CardHeader>
                                    <div className='flex items-center justify-between mb-2'>
                                        <div
                                            className={`w-10 h-10 rounded-lg bg-gradient-to-br ${plan.color} flex items-center justify-center`}
                                        >
                                            <Icon className='w-5 h-5 text-white' />
                                        </div>
                                        {plan.popular && <Badge className='bg-[#00C2FF] text-white'>Populaire</Badge>}
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
                                                <span className={feature.included ? '' : 'text-muted-foreground'}>
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
        </>
    );
}
