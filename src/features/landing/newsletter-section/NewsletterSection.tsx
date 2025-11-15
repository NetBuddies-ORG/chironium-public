import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export default function NewsletterSection() {
    const [newsletterLoading, setNewsletterLoading] = useState(false);
    const [newsletterMessage, setNewsletterMessage] = useState<string | null>(null);
    const [newsletterError, setNewsletterError] = useState<string | null>(null);
    const [newsletterEmail, setNewsletterEmail] = useState('');

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

    return (
        <section className='py-24 px-6 dark:bg-gray-50 bg-[#161B22]/30 relative overflow-hidden'>
            <div className='absolute inset-0 bg-gradient-to-br dark:from-[#00C2FF]/5 dark:to-[#FF9500]/5 from-[#00C2FF]/10 to-[#FF9500]/10'></div>
            <div className='container mx-auto max-w-4xl relative'>
                <Card className='dark:border-gray-200 border-[#30363d] shadow-2xl'>
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
                                className='flex-1 px-4 py-3 dark:bg-gray-50 bg-[#0D1117] border dark:border-gray-200 border-[#30363d] rounded-lg focus:border-[#00C2FF] focus:ring-2 focus:ring-[#00C2FF]/20 outline-none transition-all dark:text-gray-900 text-[#e6edf3] dark:placeholder:text-gray-500 placeholder:text-gray-500'
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
    );
}
