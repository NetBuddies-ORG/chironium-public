import { Card, CardFooter, CardHeader } from '@/components/ui/card';
import { Quote, Star } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

export default function TestimonialsSection() {
    const testimonials = [
        {
            name: 'Sophie L.',
            role: 'Écologue de terrain',
            avatar: 'SL',
            image: null,
            content:
                "Chironium a simplifié nos analyses de terrain : la visualisation des spectres est rapide et permet d'identifier les sons pertinents en un clin d’œil. Gain de temps réel pour préparer nos rapports.",
            rating: 5,
        },
        {
            name: 'Émilie R.',
            role: 'Consultante environnementale',
            avatar: 'ER',
            image: null,
            content:
                "Interface intuitive, exports propres — parfait pour préparer des livrables clients. Le support a été réactif quand j'ai eu besoin d'aide pour importer des sessions.",
            rating: 4,
        },
        {
            name: 'Alex F.',
            role: 'Coordinateur de projet terrain',
            avatar: 'AF',
            image: null,
            content:
                "La possibilité d'agréger plusieurs sessions et d'exporter proprement accélère la préparation des tableaux de bord. Recommande pour les petites équipes.",
            rating: 5,
        },
    ];

    return (
        <section id='testimonials' className='py-24 px-6 dark:bg-gray-50 bg-[#161B22]/30'>
            <div className='container mx-auto max-w-7xl'>
                <div className='text-center mb-16'>
                    <h2 className='text-5xl mb-4 dark:text-gray-900'>Ce que disent nos utilisateurs</h2>
                    <p className='text-xl dark:text-gray-600 text-gray-400 max-w-2xl mx-auto'>
                        Des professionnels qui font confiance à Chironium au quotidien
                    </p>
                </div>
                <div className='grid md:grid-cols-3 gap-8'>
                    {testimonials.map((testimonial, index) => (
                        <Card key={index} className='dark:border-gray-200 border-[#30363d] relative'>
                            <CardHeader className='flex-1'>
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
    );
}
