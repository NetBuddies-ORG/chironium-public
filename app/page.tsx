'use client';

import { useState } from 'react';
import ImageWithFallback from '@/components/figma/ImageWithFallback';
import {
    Waves,
    Database,
    BarChart3,
    MapPin,
    Zap,
    FileAudio,
    CheckCircle2,
    ArrowRight,
    Download,
    TrendingUp,
    Layers,
    FileText,
    Quote,
    Star,
    Check,
    X,
    Sparkles,
    Mail,
    Shield,
    Clock,
    Users,
    Infinity,
    Building2,
    Share2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { supabaseClient } from '@/lib/supabase/client';
import Link from 'next/link';

export default function Page() {
    const [newsletterEmail, setNewsletterEmail] = useState('');
    const [newsletterLoading, setNewsletterLoading] = useState(false);
    const [newsletterMessage, setNewsletterMessage] = useState<string | null>(null);
    const [newsletterError, setNewsletterError] = useState<string | null>(null);
    const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

    const handleNewsletterSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setNewsletterMessage(null);
        setNewsletterError(null);

        const email = newsletterEmail.trim().toLowerCase();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setNewsletterError('Veuillez saisir une adresse e-mail valide.');
            return;
        }

        setNewsletterLoading(true);

        try {
            const response = await fetch('/api/newsletter', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (!response.ok) {
                setNewsletterError(data.error || 'Erreur inconnue');
            } else {
                setNewsletterMessage('Merci, votre inscription est bien prise en compte !');
                setNewsletterEmail('');
            }
        } catch (err) {
            setNewsletterError('Une erreur est survenue. Merci de réessayer.');
        } finally {
            setNewsletterLoading(false);
        }
    };

    const products = [
        {
            name: 'Chironium Studio',
            icon: Waves,
            description: "Analysez vos enregistrements d'ultrasons",
            details:
                "Application desktop professionnelle pour la visualisation spectrogramme, l'analyse FFT et la validation taxonomique des chiroptères.",
            color: 'from-[#00C2FF] to-[#0096CC]',
            badge: 'Disponible',
        },
        {
            name: 'Chironium Atlas',
            icon: Share2,
            description: 'Partagez et explorez les données collaboratives',
            details:
                'Plateforme de partage de données acoustiques vérifiées par la communauté. Cartographie collaborative et base de données contributive.',
            color: 'from-[#FF9500] to-[#FF7700]',
            badge: 'Bientôt',
        },
    ];

    const features = [
        {
            icon: Database,
            title: 'Gestion Multi-Projets',
            description:
                'Organisez vos données par zones géographiques avec un suivi temporel des collectes hebdomadaires et mensuelles.',
        },
        {
            icon: Waves,
            title: 'Spectrogramme Interactif',
            description:
                'Visualisez vos enregistrements avec des spectrogrammes haute résolution et une timeline précise au millimètre.',
        },
        {
            icon: BarChart3,
            title: 'Analyse Acoustique FFT',
            description:
                'Mesures automatiques des paramètres acoustiques avec transformée de Fourier et graphiques en temps réel.',
        },
        {
            icon: MapPin,
            title: 'Géolocalisation GPS',
            description:
                'Cartographiez vos points de collecte et visualisez la distribution spatiale de vos observations.',
        },
        {
            icon: CheckCircle2,
            title: 'Validation Taxonomique',
            description:
                'Identifiez et validez les espèces de chiroptères avec statistiques de confiance et export CSV.',
        },
        {
            icon: Zap,
            title: 'Performance Optimale',
            description: 'Interface fluide inspirée de DaVinci Resolve pour un workflow professionnel sans compromis.',
        },
    ];

    const workflow = [
        {
            step: '01',
            title: 'Import & Organisation',
            description:
                'Importez vos fichiers audio et organisez-les par projet, zone géographique et période de collecte.',
            icon: FileAudio,
        },
        {
            step: '02',
            title: 'Dérushage Visuel',
            description:
                "Explorez vos enregistrements avec le spectrogramme interactif et sélectionnez les zones d'intérêt.",
            icon: Waves,
        },
        {
            step: '03',
            title: 'Analyse Détaillée',
            description: 'Mesurez automatiquement les paramètres acoustiques et visualisez les graphiques FFT.',
            icon: BarChart3,
        },
        {
            step: '04',
            title: 'Interprétation & Export',
            description: 'Validez les taxons identifiés et exportez vos résultats au format CSV pour vos rapports.',
            icon: FileText,
        },
    ];

    const testimonials = [
        {
            name: 'Dr. Sophie Laurent',
            role: 'Écologue, CNRS',
            avatar: 'SL',
            image: 'https://images.unsplash.com/photo-1758685734503-58a8accc24e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjByZXNlYXJjaGVyJTIwc2NpZW50aXN0fGVufDF8fHx8MTc2MjAyMjI5N3ww&ixlib=rb-4.1.0&q=80&w=1080',
            content:
                "Chironium Studio a révolutionné notre workflow d'analyse. Ce qui prenait des heures ne prend maintenant que quelques minutes. L'interface est intuitive et les résultats sont précis.",
            rating: 5,
        },
        {
            name: 'Marc Dubois',
            role: 'Naturaliste indépendant',
            avatar: 'MD',
            image: 'https://images.unsplash.com/photo-1639486649969-61296ce0a5ce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY29sb2dpc3QlMjBuYXR1cmUlMjBzdHVkeXxlbnwxfHx8fDE3NjIwMjIyOTd8MA&ixlib=rb-4.1.0&q=80&w=1080',
            content:
                "En tant que consultant, j'ai besoin d'outils fiables et professionnels. Chironium répond parfaitement à mes besoins avec ses exports CSV et sa gestion multi-projets.",
            rating: 5,
        },
        {
            name: 'Alice Moreau',
            role: "Chargée d'études, LPO",
            avatar: 'AM',
            image: 'https://images.unsplash.com/photo-1593594926126-d0ed6fb8a638?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXQlMjBjb25zZXJ2YXRpb24lMjB3aWxkbGlmZXxlbnwxfHx8fDE3NjIwMjIyOTd8MA&ixlib=rb-4.1.0&q=80&w=1080',
            content:
                "La possibilité de géolocaliser nos points de collecte directement dans l'application est un vrai plus. Nos rapports sont maintenant beaucoup plus complets.",
            rating: 5,
        },
    ];

    const pricingPlans = [
        {
            name: 'Gratuit',
            price: { monthly: 0, yearly: 0 },
            description: 'Découvrez Chironium avec la version web',
            badge: null,
            features: [
                { text: 'Version web uniquement', included: true },
                { text: '1 projet actif', included: true },
                { text: 'Spectrogramme basique', included: true },
                { text: 'Export CSV limité', included: true },
                { text: 'Support communautaire', included: true },
                { text: 'Application desktop', included: false },
                { text: 'Projets illimités', included: false },
                { text: 'Support prioritaire', included: false },
            ],
            cta: 'Commencer gratuitement',
            popular: false,
        },
        {
            name: 'Neo',
            price: { monthly: 9.99, yearly: 99 },
            description: 'Pour les naturalistes professionnels',
            badge: 'Populaire',
            features: [
                { text: 'Application desktop complète', included: true },
                { text: 'Projets illimités', included: true },
                { text: 'Spectrogramme HD', included: true },
                { text: 'Analyse FFT avancée', included: true },
                { text: 'Export CSV illimité', included: true },
                { text: 'Géolocalisation GPS', included: true },
                { text: 'Support par email', included: true },
                { text: 'Mises à jour prioritaires', included: false },
            ],
            cta: 'Essayer Neo',
            popular: true,
        },
        {
            name: 'Pro',
            price: { monthly: 29.99, yearly: 299 },
            description: "Pour les équipes et bureaux d'études",
            badge: 'Avancé',
            features: [
                { text: 'Tout de Neo, plus:', included: true },
                { text: 'Collaboration en équipe', included: true },
                { text: 'API et intégrations', included: true },
                { text: 'Stockage cloud illimité', included: true },
                { text: 'Support prioritaire 24/7', included: true },
                { text: 'Formation personnalisée', included: true },
                { text: 'Rapports personnalisés', included: true },
                { text: 'SLA garanti', included: true },
            ],
            cta: 'Essayer Pro',
            popular: false,
        },
    ];

    return (
        <div className={'page-container'}>
            {/* Hero Section */}
            <section className='pb-24 px-6 relative overflow-hidden'>
                {/* Gradient blobs */}
                <div className='absolute top-0 left-1/4 w-96 h-96 bg-[#00C2FF]/10 dark:bg-[#00C2FF]/5 rounded-full blur-3xl'></div>
                <div className='absolute bottom-0 right-1/4 w-96 h-96 bg-[#FF9500]/10 dark:bg-[#FF9500]/5 rounded-full blur-3xl'></div>

                <div className='container mx-auto max-w-7xl relative'>
                    <div className='max-w-4xl mx-auto text-center'>
                        <h1 className='text-6xl lg:text-7xl mb-6 text-gray-900 dark:text-white leading-[1.1] tracking-tight'>
                            {"Analyse d'ultrasons de chiroptères"}
                        </h1>

                        <p className='text-xl text-gray-600 dark:text-gray-400 mb-10 leading-relaxed max-w-3xl mx-auto'>
                            {
                                "Suite d'outils professionnels pour les naturalistes et écologues. Analysez, partagez et collaborez autour de vos données acoustiques avec une interface moderne inspirée des meilleurs outils du marché."
                            }
                        </p>

                        <div className='flex flex-wrap gap-4 justify-center mb-12'>
                            <Button
                                size='lg'
                                className='bg-[#00C2FF] hover:bg-[#00A8E6] text-white shadow-xl shadow-[#00C2FF]/20 px-8 h-12'
                            >
                                Commencer gratuitement
                                <ArrowRight className='w-4 h-4 ml-2' />
                            </Button>
                            <Button
                                size='lg'
                                variant='outline'
                                className='border-gray-300 dark:border-[#30363d] px-8 h-12'
                            >
                                <Download className='w-4 h-4 mr-2' />
                                Télécharger
                            </Button>
                        </div>

                        <div className='flex items-center justify-center gap-8 text-sm text-gray-500 dark:text-gray-500'>
                            <div className='flex items-center gap-2'>
                                <CheckCircle2 className='w-4 h-4 text-emerald-500' />
                                <span>Open Source</span>
                            </div>
                            <div className='flex items-center gap-2'>
                                <CheckCircle2 className='w-4 h-4 text-emerald-500' />
                                <span>Multi-plateforme</span>
                            </div>
                            <div className='flex items-center gap-2'>
                                <CheckCircle2 className='w-4 h-4 text-emerald-500' />
                                <span>Sans publicité</span>
                            </div>
                        </div>
                    </div>

                    {/* Hero Image */}
                    <div className='mt-20 max-w-5xl mx-auto'>
                        <div className='relative group'>
                            <div className='absolute -inset-1 bg-gradient-to-r from-[#00C2FF] to-[#FF9500] rounded-2xl blur-2xl opacity-20 group-hover:opacity-30 transition-opacity'></div>
                            <div className='relative bg-gray-100 dark:bg-[#161B22] rounded-xl p-3 shadow-2xl border border-gray-200/50 dark:border-[#30363d]/50'>
                                <div className='flex items-center gap-2 mb-3 px-3'>
                                    <div className='w-3 h-3 bg-red-500 rounded-full'></div>
                                    <div className='w-3 h-3 bg-yellow-500 rounded-full'></div>
                                    <div className='w-3 h-3 bg-green-500 rounded-full'></div>
                                    <div className='ml-auto text-xs text-gray-500 dark:text-gray-500'>
                                        Chironium Studio
                                    </div>
                                </div>
                                <ImageWithFallback
                                    src='https://images.unsplash.com/photo-1759661966728-4a02e3c6ed91?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwYW5hbHlzaXMlMjBkYXNoYm9hcmR8ZW58MXx8fHwxNzYyMDIxMzE5fDA&ixlib=rb-4.1.0&q=80&w=1080'
                                    alt='Chironium Dashboard'
                                    className='w-full rounded-lg'
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Social Proof */}
            {/*<section className='py-12 px-6 border-y border-gray-200 dark:border-[#30363d] bg-gray-50/50 dark:bg-[#161B22]/30'>*/}
            {/*    <div className='container mx-auto max-w-7xl'>*/}
            {/*        <p className='text-center text-sm text-gray-500 dark:text-gray-500 mb-6'>*/}
            {/*            Utilisé par des organisations de confiance*/}
            {/*        </p>*/}
            {/*        <div className='flex flex-wrap items-center justify-center gap-12 opacity-60'>*/}
            {/*            <div className='text-gray-400 dark:text-gray-600'>CNRS</div>*/}
            {/*            <div className='text-gray-400 dark:text-gray-600'>LPO</div>*/}
            {/*            <div className='text-gray-400 dark:text-gray-600'>INRAE</div>*/}
            {/*            <div className='text-gray-400 dark:text-gray-600'>{"Museum d'Histoire Naturelle"}</div>*/}
            {/*            <div className='text-gray-400 dark:text-gray-600'>ONF</div>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</section>*/}

            {/* Products Section */}
            <section
                id='products'
                style={{
                    borderTop: '1px solid #4A5565FF',
                }}
                className='py-24 px-6 bg-white dark:bg-[#0D1117]'
            >
                <div className='container mx-auto max-w-7xl'>
                    <div className='text-center mb-16'>
                        <h2 className='text-5xl mb-4 text-gray-900 dark:text-white'>Deux produits complémentaires</h2>
                        <p className='text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto'>
                            {"De l'analyse individuelle au partage collaboratif de données"}
                        </p>
                    </div>
                    <div className='grid md:grid-cols-2 gap-8 max-w-5xl mx-auto'>
                        {products.map((product, index) => {
                            const Icon = product.icon;
                            return (
                                <Card
                                    key={index}
                                    className='border-gray-200 dark:border-[#30363d] hover:shadow-xl transition-all'
                                >
                                    <CardHeader>
                                        <div
                                            className={`w-14 h-14 bg-gradient-to-br ${product.color} rounded-xl flex items-center justify-center mb-4 shadow-lg`}
                                        >
                                            <Icon className='w-7 h-7 text-white' />
                                        </div>
                                        <div className='flex items-center justify-between mb-2'>
                                            <CardTitle className='text-2xl'>{product.name}</CardTitle>
                                            <Badge
                                                variant={product.badge === 'Disponible' ? 'default' : 'secondary'}
                                                className={
                                                    product.badge === 'Disponible'
                                                        ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border-0'
                                                        : ''
                                                }
                                            >
                                                {product.badge}
                                            </Badge>
                                        </div>
                                        <CardDescription className='text-lg'>{product.description}</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <p className='text-muted-foreground leading-relaxed'>{product.details}</p>
                                    </CardContent>
                                    <CardFooter>
                                        <Button
                                            className={`w-full bg-gradient-to-r ${product.color} text-white hover:opacity-90`}
                                            disabled={product.badge === 'Bientôt'}
                                        >
                                            {product.badge === 'Disponible' ? 'Découvrir' : 'Bientôt disponible'}
                                            {product.badge === 'Disponible' && <ArrowRight className='w-4 h-4 ml-2' />}
                                        </Button>
                                    </CardFooter>
                                </Card>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id='features' className='py-24 px-6 bg-gray-50 dark:bg-[#161B22]/30'>
                <div className='container mx-auto max-w-7xl'>
                    <div className='text-center mb-16'>
                        <h2 className='text-5xl mb-4 text-gray-900 dark:text-white'>Tout ce dont vous avez besoin</h2>
                        <p className='text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto'>
                            {"Chironium Studio offre une suite complète d'outils pour l'analyse acoustique"}
                        </p>
                    </div>
                    <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
                        {features.map((feature, index) => {
                            const Icon = feature.icon;
                            return (
                                <Card key={index} className='group transition-all hover:shadow-lg'>
                                    <CardHeader>
                                        <div className='w-11 h-11 bg-[#00C2FF]/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#00C2FF] transition-colors'>
                                            <Icon className='w-5 h-5 text-[#00C2FF] group-hover:text-white transition-colors' />
                                        </div>
                                        <CardTitle>{feature.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className='text-muted-foreground leading-relaxed'>{feature.description}</p>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Workflow Section */}
            <section id='workflow' className='py-24 px-6 bg-white dark:bg-[#0D1117]'>
                <div className='container mx-auto max-w-7xl'>
                    <div className='text-center mb-16'>
                        <h2 className='text-5xl mb-4 text-gray-900 dark:text-white'>
                            {"De l'import à l'export en 4 étapes"}
                        </h2>
                        <p className='text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto'>
                            Un processus optimisé pour maximiser votre efficacité
                        </p>
                    </div>
                    <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6'>
                        {workflow.map((step, index) => {
                            const Icon = step.icon;
                            return (
                                <div key={index} className='relative flex-1'>
                                    <Card
                                        className='relative hover:shadow-lg transition-shadow'
                                        style={{ height: '100%' }}
                                    >
                                        <CardHeader>
                                            <div className='w-11 h-11 bg-gradient-to-br from-[#00C2FF] to-[#0096CC] rounded-lg flex items-center justify-center mb-4 shadow-lg shadow-[#00C2FF]/20'>
                                                <Icon className='w-5 h-5 text-white' />
                                            </div>
                                            <CardTitle className='text-lg'>{step.title}</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <p className='text-sm text-muted-foreground leading-relaxed'>
                                                {step.description}
                                            </p>
                                        </CardContent>
                                    </Card>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section id='pricing' className='py-24 px-6 bg-white dark:bg-[#0D1117]'>
                <div className='container mx-auto max-w-7xl'>
                    <div className='text-center mb-12'>
                        <h2 className='text-5xl mb-4 text-gray-900 dark:text-white'>Choisissez votre plan</h2>
                        <p className='text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8'>
                            Des tarifs transparents adaptés à tous les besoins
                        </p>

                        {/* Billing Toggle */}
                        <div className='inline-flex items-center gap-3 p-1 bg-gray-100 dark:bg-[#161B22] border border-gray-200 dark:border-[#30363d] rounded-lg'>
                            <button
                                onClick={() => setBillingCycle('monthly')}
                                className={`px-6 py-2 rounded-md text-sm transition-all ${
                                    billingCycle === 'monthly'
                                        ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900'
                                        : 'text-gray-600 dark:text-gray-400'
                                }`}
                            >
                                Mensuel
                            </button>
                            <button
                                onClick={() => setBillingCycle('yearly')}
                                className={`px-6 py-2 rounded-md text-sm transition-all flex items-center gap-2 ${
                                    billingCycle === 'yearly'
                                        ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900'
                                        : 'text-gray-600 dark:text-gray-400'
                                }`}
                            >
                                Annuel
                                <Badge
                                    variant='secondary'
                                    className='bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border-0'
                                >
                                    -17%
                                </Badge>
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
                                        : 'border-gray-200 dark:border-[#30363d]'
                                }`}
                            >
                                {plan.badge && (
                                    <div className='absolute -top-3 left-1/2 -translate-x-1/2'>
                                        <Badge className='bg-[#00C2FF] text-white border-0 shadow-lg'>
                                            {plan.badge}
                                        </Badge>
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
                                <CardContent>
                                    <ul className='space-y-3 mb-6'>
                                        {plan.features.map((feature, fIndex) => (
                                            <li key={fIndex} className='flex items-start gap-3'>
                                                {feature.included ? (
                                                    <Check className='w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5' />
                                                ) : (
                                                    <X className='w-5 h-5 text-gray-300 dark:text-gray-700 flex-shrink-0 mt-0.5' />
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
                                                : 'bg-gray-900 dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-100 text-white dark:text-gray-900'
                                        }`}
                                    >
                                        {plan.cta}
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>

                    {/* Enterprise Section */}
                    <Card className='border-gray-200 dark:border-[#30363d] bg-gradient-to-br from-gray-50 to-white dark:from-[#21262d] dark:to-[#161B22]'>
                        <CardHeader>
                            <div className='flex items-start justify-between'>
                                <div>
                                    <div className='flex items-center gap-3 mb-2'>
                                        <Building2 className='w-6 h-6 text-[#00C2FF]' />
                                        <CardTitle className='text-2xl'>Entreprise</CardTitle>
                                    </div>
                                    <CardDescription>
                                        Solutions sur mesure pour les grandes organisations et institutions de recherche
                                    </CardDescription>
                                </div>
                                <Button variant='outline' className='border-gray-300 dark:border-[#30363d]'>
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

            {/* Testimonials Section */}
            <section id='testimonials' className='py-24 px-6 bg-gray-50 dark:bg-[#161B22]/30'>
                <div className='container mx-auto max-w-7xl'>
                    <div className='text-center mb-16'>
                        <h2 className='text-5xl mb-4 text-gray-900 dark:text-white'>Ce que disent nos utilisateurs</h2>
                        <p className='text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto'>
                            Des professionnels qui font confiance à Chironium au quotidien
                        </p>
                    </div>
                    <div className='grid md:grid-cols-3 gap-8'>
                        {testimonials.map((testimonial, index) => (
                            <Card key={index} className='border-gray-200 dark:border-[#30363d] relative'>
                                <CardHeader>
                                    <Quote className='w-8 h-8 text-[#00C2FF]/20 mb-4' />
                                    <div className='flex gap-1 mb-4'>
                                        {[...Array(testimonial.rating)].map((_, i) => (
                                            <Star key={i} className='w-4 h-4 fill-[#FF9500] text-[#FF9500]' />
                                        ))}
                                    </div>
                                    <p className='text-card-foreground leading-relaxed italic'>
                                        {`"${testimonial.content}"`}
                                    </p>
                                </CardHeader>
                                <CardFooter>
                                    <div className='flex items-center gap-3'>
                                        <Avatar>
                                            <AvatarFallback className='bg-[#00C2FF] text-white'>
                                                {testimonial.avatar}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <div className='text-sm text-card-foreground'>{testimonial.name}</div>
                                            <div className='text-xs text-muted-foreground'>{testimonial.role}</div>
                                        </div>
                                    </div>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Newsletter CTA */}
            <section className='py-24 px-6 bg-gray-50 dark:bg-[#161B22]/30 relative overflow-hidden'>
                <div className='absolute inset-0 bg-gradient-to-br from-[#00C2FF]/5 to-[#FF9500]/5 dark:from-[#00C2FF]/10 dark:to-[#FF9500]/10'></div>
                <div className='container mx-auto max-w-4xl relative'>
                    <Card className='border-gray-200 dark:border-[#30363d] shadow-2xl'>
                        <CardHeader className='text-center pb-8'>
                            <div className='w-16 h-16 bg-gradient-to-br from-[#00C2FF] to-[#0096CC] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-[#00C2FF]/20'>
                                <Mail className='w-8 h-8 text-white' />
                            </div>
                            <CardTitle className='text-3xl mb-4'>Restez informé des nouveautés</CardTitle>
                            <CardDescription className='text-lg'>
                                {
                                    "Recevez en avant-première nos mises à jour, tutoriels exclusifs et conseils d'experts pour optimiser vos analyses acoustiques."
                                }
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleNewsletterSubmit} className='flex flex-col sm:flex-row gap-3'>
                                <input
                                    type='email'
                                    value={newsletterEmail}
                                    onChange={(e) => setNewsletterEmail(e.target.value)}
                                    placeholder='votre@email.com'
                                    className='flex-1 px-4 py-3 bg-gray-50 dark:bg-[#0D1117] border border-gray-200 dark:border-[#30363d] rounded-lg focus:border-[#00C2FF] focus:ring-2 focus:ring-[#00C2FF]/20 outline-none transition-all text-gray-900 dark:text-[#e6edf3] placeholder:text-gray-500 dark:placeholder:text-gray-500'
                                    required
                                    suppressHydrationWarning
                                    autoComplete='off'
                                />
                                <input type='text' name='phone' style={{ display: 'none' }} autoComplete='off' />
                                <Button
                                    type='submit'
                                    size='lg'
                                    disabled={newsletterLoading}
                                    className='bg-[#00C2FF] hover:bg-[#00A8E6] text-white shadow-lg shadow-[#00C2FF]/20 disabled:opacity-70'
                                >
                                    {newsletterLoading ? 'Inscription…' : "S'inscrire gratuitement"}
                                    <ArrowRight className='w-4 h-4 ml-2' />
                                </Button>
                            </form>
                            <p className='text-xs text-muted-foreground text-center mt-4'>
                                {'Pas de spam. Désinscription en un clic. Vos données sont protégées.'}
                            </p>
                            {newsletterMessage && (
                                <p className='text-sm text-emerald-600 text-center mt-2'>{newsletterMessage}</p>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </section>

            {/* Final CTA */}
            <section className='py-24 px-6 bg-gradient-to-br from-[#00C2FF] to-[#0096CC] relative overflow-hidden'>
                <div
                    className='absolute inset-0 opacity-10'
                    style={{
                        backgroundImage:
                            "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
                    }}
                ></div>
                <div className='container mx-auto max-w-4xl text-center relative'>
                    <h2 className='text-5xl mb-6 text-white'>Prêt à révolutionner vos analyses ?</h2>
                    <p className='text-xl text-cyan-100 mb-10 max-w-2xl mx-auto'>
                        Rejoignez les centaines de naturalistes et écologues qui font confiance à Chironium pour leurs
                        études acoustiques
                    </p>
                    <div className='flex flex-wrap gap-4 justify-center'>
                        <Button size='lg' className='bg-white hover:bg-gray-100 text-[#00C2FF] shadow-xl px-8 h-12'>
                            Commencer gratuitement
                            <ArrowRight className='w-4 h-4 ml-2' />
                        </Button>
                        <Button
                            size='lg'
                            variant='outline'
                            className='border-2 border-white text-white hover:bg-white hover:text-[#00C2FF] px-8 h-12'
                        >
                            Voir la démo
                        </Button>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className='py-16 px-6 bg-gray-50 dark:bg-[#161B22] border-t border-gray-200 dark:border-[#30363d]'>
                <div className='container mx-auto max-w-7xl'>
                    <div className='grid md:grid-cols-5 gap-12 mb-12'>
                        <div className='md:col-span-2'>
                            <div className='flex items-center gap-3 mb-4'>
                                <div className='w-9 h-9 bg-gradient-to-br from-[#00C2FF] to-[#0096CC] rounded-lg flex items-center justify-center'>
                                    <Waves className='w-5 h-5 text-white' strokeWidth={2.5} />
                                </div>
                                <span className='text-xl text-gray-900 dark:text-white'>Chironium</span>
                            </div>
                            <p className='text-gray-600 dark:text-gray-400 mb-6 leading-relaxed'>
                                {
                                    "Suite professionnelle de référence pour l'acoustique des chiroptères. Développée par des écologues, pour des écologues."
                                }
                            </p>
                            <div className='flex gap-3'>
                                <a
                                    href='#'
                                    className='w-9 h-9 bg-gray-200 dark:bg-[#30363d] hover:bg-gray-300 dark:hover:bg-[#484f58] rounded-lg flex items-center justify-center transition-colors'
                                >
                                    <svg
                                        className='w-4 h-4 text-gray-600 dark:text-gray-400'
                                        fill='currentColor'
                                        viewBox='0 0 24 24'
                                    >
                                        <path d='M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z' />
                                    </svg>
                                </a>
                                <a
                                    href='#'
                                    className='w-9 h-9 bg-gray-200 dark:bg-[#30363d] hover:bg-gray-300 dark:hover:bg-[#484f58] rounded-lg flex items-center justify-center transition-colors'
                                >
                                    <svg
                                        className='w-4 h-4 text-gray-600 dark:text-gray-400'
                                        fill='currentColor'
                                        viewBox='0 0 24 24'
                                    >
                                        <path d='M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z' />
                                    </svg>
                                </a>
                            </div>
                        </div>

                        <div>
                            <h4 className='text-sm text-gray-900 dark:text-white mb-4'>Produits</h4>
                            <ul className='space-y-3 text-sm'>
                                <li>
                                    <Link
                                        href='/#products'
                                        className='text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors'
                                    >
                                        Chironium Studio
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href='/#products'
                                        className='text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors'
                                    >
                                        Chironium Atlas
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href='/#pricing'
                                        className='text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors'
                                    >
                                        Tarifs
                                    </Link>
                                </li>
                                <li>
                                    <a
                                        href='#'
                                        className='text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors'
                                    >
                                        Télécharger
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h4 className='text-sm text-gray-900 dark:text-white mb-4'>Ressources</h4>
                            <ul className='space-y-3 text-sm'>
                                <li>
                                    <a
                                        href='#'
                                        className='text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors'
                                    >
                                        Documentation
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href='#'
                                        className='text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors'
                                    >
                                        Tutoriels
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href='#'
                                        className='text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors'
                                    >
                                        Support
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href='#'
                                        className='text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors'
                                    >
                                        Blog
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h4 className='text-sm text-gray-900 dark:text-white mb-4'>Légal</h4>
                            <ul className='space-y-3 text-sm'>
                                <li>
                                    <a
                                        href='#'
                                        className='text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors'
                                    >
                                        Confidentialité
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href='#'
                                        className='text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors'
                                    >
                                        CGU
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href='#'
                                        className='text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors'
                                    >
                                        Mentions légales
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href='#'
                                        className='text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors'
                                    >
                                        Licence
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <Separator className='mb-8 bg-gray-200 dark:bg-[#30363d]' />

                    <div className='flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500 dark:text-gray-500'>
                        <p>© 2025 Chironium. Tous droits réservés. Made with ❤️ for bat conservation.</p>
                        <div className='flex items-center gap-2'>
                            <Badge
                                variant='outline'
                                className='border-emerald-500/30 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400'
                            >
                                <CheckCircle2 className='w-3 h-3 mr-1' />
                                Open Source
                            </Badge>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
