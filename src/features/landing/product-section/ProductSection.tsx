import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Share2, Waves, Radio } from 'lucide-react';

export default function ProductSection() {
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
        // {
        //     name: 'Chironium Live',
        //     icon: Radio,
        //     description: 'Détections en direct, où que vous soyez',
        //     details:
        //         "Visualisez l'activité acoustique minute par minute et transformez vos relevés en insights. Partagez vos captures directement sur Studio. Disponible sur desktop et mobile",
        //     color: 'from-[#FF9500] to-[#0096CC]',
        //     badge: 'Bientôt',
        // },
    ];

    return (
        <section id='products' className='py-24 px-6 dark:bg-white bg-[#0D1117]'>
            <div className='container mx-auto max-w-7xl'>
                <div className='text-center mb-16'>
                    <h2 className='text-5xl mb-4 dark:text-gray-900'>Deux produits complémentaires</h2>
                    <p className='text-xl dark:text-gray-600 text-gray-400 max-w-2xl mx-auto'>
                        {"De l'analyse individuelle au partage collaboratif de données"}
                    </p>
                </div>
                <div className='grid md:grid-cols-2 gap-8 max-w-5xl mx-auto'>
                    {products.map((product, index) => {
                        const Icon = product.icon;
                        return (
                            <Card
                                key={index}
                                className='dark:border-gray-200 border-[#30363d] hover:shadow-xl transition-all'
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
    );
}
