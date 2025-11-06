import {Button} from "@/components/ui/button";
import {ArrowRight, CheckCircle2, Download} from "lucide-react";
import ImageWithFallback from "@/components/figma/ImageWithFallback";

export default function HeroSection(){
    return <section className='pb-24 px-6 relative overflow-hidden' style={{paddingTop: '4rem'}}>
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
                        <span>Version gratuite</span>
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
}