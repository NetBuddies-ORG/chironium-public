import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function SubscribeSection() {
    return (
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
                        className='border-white text-white hover:bg-white hover:text-[#00C2FF] px-8 h-12'
                    >
                        Voir la démo
                    </Button>
                </div>
            </div>
        </section>
    );
}
