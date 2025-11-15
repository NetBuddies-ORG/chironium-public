import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, FileAudio, FileText, Waves } from 'lucide-react';

export default function WorkflowSection() {
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

    return (
        <section id='workflow' className='py-24 px-6 dark:bg-white bg-[#0D1117]'>
            <div className='container mx-auto max-w-7xl'>
                <div className='text-center mb-16'>
                    <h2 className='text-5xl mb-4 dark:text-gray-900 '>{"De l'import à l'export en 4 étapes"}</h2>
                    <p className='text-xl dark:text-gray-600 text-gray-400 max-w-2xl mx-auto'>
                        Un processus optimisé pour maximiser votre efficacité
                    </p>
                </div>
                <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6'>
                    {workflow.map((step, index) => {
                        const Icon = step.icon;
                        return (
                            <div key={index} className='relative flex-1'>
                                <Card className='relative hover:shadow-lg transition-shadow' style={{ height: '100%' }}>
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
    );
}
