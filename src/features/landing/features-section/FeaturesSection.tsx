import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, CheckCircle2, Database, MapPin, Waves, Zap } from 'lucide-react';

export default function FeaturesSection() {
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

    return (
        <section id='features' className='py-24 px-6 dark:bg-gray-50 bg-[#161B22]/30'>
            <div className='container mx-auto max-w-7xl'>
                <div className='text-center mb-16'>
                    <h2 className='text-5xl mb-4 dark:text-gray-900'>Tout ce dont vous avez besoin</h2>
                    <p className='text-xl dark:text-gray-600 text-gray-400 max-w-2xl mx-auto'>
                        {"Chironium Studio offre une suite complète d'outils pour l'analyse acoustique"}
                    </p>
                </div>
                <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
                    {features.map((feature, index) => {
                        const Icon = feature.icon;
                        return (
                            <Card key={index} className='group transition-all hover:shadow-lg cursor-pointer'>
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
    );
}
