import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, Check, Clock, Infinity, Shield, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export default function PricingSection() {
    const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
    const pricingPlans = [
        {
            name: 'Gratuit',
            price: { monthly: 0.0, yearly: 0.0 },
            description: 'Idéal pour découvrir Chironium et analyser un premier projet en version web.',
            badge: null,
            features: [
                { text: 'Accès web uniquement', included: true },
                { text: '1 projet actif', included: true },
                { text: 'Export CSV partiel', included: true },
                { text: 'Application desktop', included: false },
                { text: 'Analyse FFT avancée', included: false },
            ],
            cta: 'Commencer gratuitement',
            popular: false,
        },
        {
            name: 'Neo',
            price: { monthly: 6.99, yearly: 69.99 },
            description: 'Pour les naturalistes indépendants qui veulent le contrôle total de leurs données.',
            badge: 'Populaire',
            features: [
                { text: 'Application desktop', included: true },
                { text: '3 projets actifs', included: true },
                { text: 'Spectrogramme avancé', included: true },
                { text: 'Export CSV illimité', included: true },
                { text: 'Analyse FFT avancée', included: false },
                { text: 'Reconnaissance IA', included: false },
                { text: 'Géolocalisation GPS avancée', included: false },
            ],
            cta: 'Essayer Neo',
            popular: true,
        },
        {
            name: 'Pro',
            price: { monthly: 29.99, yearly: 299.99 },
            description: "Pour les bureaux d'études et équipes de recherche exigeantes.",
            badge: 'Avancé',
            features: [
                { text: 'Analyse FFT avancée', included: true },
                { text: 'Reconnaissance IA', included: true },
                { text: 'Géolocalisation GPS avancée', included: true },
                { text: 'Collaboration en équipe', included: true },
                { text: 'API et intégrations', included: true },
                { text: 'Stockage cloud illimité', included: true },
                { text: 'Support 24/7 prioritaire', included: true },
            ],
            cta: 'Contacter l’équipe',
            popular: false,
        },
    ];

    return (
        <section id='pricing' className='py-24 px-6 dark:bg-white bg-[#0D1117]'>
            <div className='container mx-auto max-w-7xl'>
                <div className='text-center mb-12'>
                    <h2 className='text-5xl mb-4 dark:text-gray-900'>Choisissez votre plan</h2>
                    <p className='text-xl dark:text-gray-600 text-gray-400 max-w-2xl mx-auto mb-8'>
                        Des tarifs transparents adaptés à tous les besoins
                    </p>

                    {/* Billing Toggle */}
                    <div className='inline-flex items-center gap-3 p-1 dark:bg-gray-100 bg-[#161B22] border dark:border-gray-200 border-[#30363d] rounded-lg'>
                        <button
                            onClick={() => setBillingCycle('monthly')}
                            className={`cursor-pointer px-6 py-2 rounded-md text-sm transition-all ${
                                billingCycle === 'monthly'
                                    ? 'dark:bg-gray-900 bg-white dark:text-white text-gray-900'
                                    : 'dark:text-gray-600 text-gray-400'
                            }`}
                        >
                            Mensuel
                        </button>
                        <button
                            onClick={() => setBillingCycle('yearly')}
                            className={`cursor-pointer px-6 py-2 rounded-md text-sm transition-all flex items-center gap-2 ${
                                billingCycle === 'yearly'
                                    ? 'dark:bg-gray-900 bg-white dark:text-white text-gray-900'
                                    : 'dark:text-gray-600 text-gray-400'
                            }`}
                        >
                            Annuel
                        </button>
                    </div>
                </div>

                <div className='grid md:grid-cols-3 gap-8 mb-12'>
                    {pricingPlans.map((plan, index) => (
                        <Card
                            key={index}
                            className={`relative border-2 ${
                                plan.popular
                                    ? 'border-[#00C2FF] shadow-xl shadow-[#00C2FF]/10'
                                    : 'dark:border-gray-200 border-[#30363d]'
                            }`}
                        >
                            {plan.badge && (
                                <div className='absolute -top-3 left-1/2 -translate-x-1/2'>
                                    <Badge className='bg-[#00C2FF] text-white border-0 shadow-lg'>{plan.badge}</Badge>
                                </div>
                            )}
                            <CardHeader className='pb-8'>
                                <CardTitle className='text-2xl'>{plan.name}</CardTitle>
                                <CardDescription>{plan.description}</CardDescription>
                                <div className='mt-6'>
                                    <div className='flex items-baseline gap-1'>
                                        <span className='text-5xl text-card-foreground'>
                                            {billingCycle === 'monthly' ? plan.price.monthly : plan.price.yearly}
                                        </span>
                                        <span className='text-muted-foreground'>€</span>
                                    </div>
                                    <div className='text-sm text-muted-foreground mt-1'>
                                        {billingCycle === 'monthly' ? 'par mois' : 'par an'}
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className={'flex-1'}>
                                <ul className='space-y-3 mb-6'>
                                    {plan.features.map((feature, fIndex) => (
                                        <li key={fIndex} className='flex items-start gap-3'>
                                            {feature.included ? (
                                                <Check className='w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5' />
                                            ) : (
                                                <X className='w-5 h-5 dark:text-gray-300 text-gray-700 flex-shrink-0 mt-0.5' />
                                            )}
                                            <span
                                                className={`text-sm ${
                                                    feature.included
                                                        ? 'text-card-foreground'
                                                        : 'text-muted-foreground opacity-50'
                                                }`}
                                            >
                                                {feature.text}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                            <CardFooter>
                                <Button
                                    className={`w-full ${
                                        plan.popular
                                            ? 'bg-[#00C2FF] hover:bg-[#00A8E6] text-white shadow-lg shadow-[#00C2FF]/20'
                                            : 'dark:bg-gray-900 bg-white dark:hover:bg-gray-800 hover:bg-gray-100 dark:text-white text-gray-900'
                                    }`}
                                >
                                    {plan.cta}
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>

                {/* Enterprise Section */}
                <Card className='border-gray-200  bg-white'>
                    <CardHeader>
                        <div className='flex items-start justify-between relative'>
                            <div>
                                <div className='flex items-center gap-3 mb-2'>
                                    <Building2 className='w-6 h-6 text-[#00C2FF]' />
                                    <CardTitle className='text-2xl'>Entreprise</CardTitle>
                                </div>
                                <CardDescription>
                                    Solutions sur mesure pour les grandes organisations et institutions de recherche
                                </CardDescription>
                            </div>
                            <Button
                                variant='ghost'
                                className='bg-[#00C2FF] hover:bg-[#00A8E6] text-white shadow-xl shadow-[#00C2FF]/20 px-8 h-12 absolute right-0 top-0'
                            >
                                Nous contacter
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className='grid md:grid-cols-3 gap-6'>
                            <div className='flex items-start gap-3'>
                                <Shield className='w-5 h-5 text-[#00C2FF] flex-shrink-0 mt-1' />
                                <div>
                                    <div className='text-sm text-card-foreground mb-1'>SSO et sécurité avancée</div>
                                    <div className='text-xs text-muted-foreground'>Intégration LDAP/SAML</div>
                                </div>
                            </div>
                            <div className='flex items-start gap-3'>
                                <Infinity className='w-5 h-5 text-[#00C2FF] flex-shrink-0 mt-1' />
                                <div>
                                    <div className='text-sm text-card-foreground mb-1'>Licences illimitées</div>
                                    <div className='text-xs text-muted-foreground'>Pour toute votre équipe</div>
                                </div>
                            </div>
                            <div className='flex items-start gap-3'>
                                <Clock className='w-5 h-5 text-[#00C2FF] flex-shrink-0 mt-1' />
                                <div>
                                    <div className='text-sm text-card-foreground mb-1'>Support dédié 24/7</div>
                                    <div className='text-xs text-muted-foreground'>Avec SLA garanti</div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </section>
    );
}
