import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@radix-ui/react-separator';
import { AlertCircle, Calendar, FileText, Mail, Settings, Shield, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useState } from 'react';
import { useAuth } from '@/providers/AuthProvider';

interface Subscription {
    plan: 'free' | 'neo' | 'pro';
    status: 'active' | 'canceled' | 'past_due';
    currentPeriodEnd: string;
    cancelAtPeriodEnd: boolean;
}

export default function Account() {
    const { user } = useAuth();

    const [subscription, setSubscription] = useState<Subscription>({
        plan: 'neo',
        status: 'active',
        currentPeriodEnd: '2025-12-05',
        cancelAtPeriodEnd: false,
    });

    const userData = {
        name: 'Jean Dupont',
        email: user?.email,
        joinDate: user?.created_at,
        projectsCount: 12,
        storageUsed: 0.234,
        storageLimit: subscription.plan === 'free' ? 5 : subscription.plan === 'neo' ? 1 : Infinity,
    };

    const storagePercentage = subscription.plan === 'pro' ? 0 : (userData.storageUsed / userData.storageLimit) * 100;

    const signOut = () => {
        console.log('Sign out');
    };

    return (
        <>
            <Card className='overflow-hidden'>
                <CardHeader className='pb-6'>
                    <CardTitle className='flex items-center gap-3 text-xl'>
                        <div className='w-10 h-10 rounded-lg bg-gradient-to-br from-[#00C2FF]/10 to-[#0096CC]/10 flex items-center justify-center'>
                            <User className='w-5 h-5 text-[#00C2FF]' />
                        </div>
                        Informations personnelles
                    </CardTitle>
                    <CardDescription className='mt-2'>
                        Gérez vos informations de profil et vos paramètres de compte
                    </CardDescription>
                </CardHeader>
                <CardContent className='space-y-6 pb-6'>
                    <div className='flex items-center gap-4 p-4 bg-gradient-to-r from-[#00C2FF]/5 to-[#0096CC]/5 rounded-xl border border-[#00C2FF]/10'>
                        <div className='w-20 h-20 bg-gradient-to-br from-[#00C2FF] to-[#0096CC] rounded-2xl flex items-center justify-center text-white text-2xl font-semibold shadow-lg shadow-[#00C2FF]/20'>
                            {userData.name
                                .split(' ')
                                .map((n) => n[0])
                                .join('')}
                        </div>
                        <div>
                            <div className='text-lg font-medium'>{userData.name}</div>
                            <div className='text-sm text-muted-foreground flex items-center gap-1'>
                                <Mail className='w-3 h-3' />
                                {userData.email}
                            </div>
                        </div>
                    </div>
                    <Separator />
                    <div className='space-y-2 text-sm'>
                        <div className='flex items-center gap-2 text-muted-foreground'>
                            <Calendar className='w-4 h-4' />
                            Membre depuis le {new Date(userData.joinDate).toLocaleDateString('fr-FR')}
                        </div>
                        <div className='flex items-center gap-2 text-muted-foreground'>
                            <FileText className='w-4 h-4' />
                            {userData.projectsCount} projets créés
                        </div>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button variant='outline' className='w-full'>
                        <Settings className='w-4 h-4 mr-2' />
                        Modifier le profil
                    </Button>
                </CardFooter>
            </Card>

            <Card className='overflow-hidden'>
                <CardHeader className='pb-6'>
                    <CardTitle className='flex items-center justify-between'>
                        <div className='flex items-center gap-3'>
                            <div className='w-10 h-10 rounded-lg bg-gradient-to-br from-[#00C2FF]/10 to-[#0096CC]/10 flex items-center justify-center'>
                                <FileText className='w-5 h-5 text-[#00C2FF]' />
                            </div>
                            <span className='text-xl'>Stockage</span>
                        </div>
                        <Badge variant='secondary'>
                            {userData.storageUsed} / {subscription.plan === 'pro' ? '∞' : userData.storageLimit} GB
                        </Badge>
                    </CardTitle>
                    <CardDescription className='mt-2'>{"Gérez l'espace de stockage de vos projets"}</CardDescription>
                </CardHeader>
                <CardContent className='space-y-6 pb-6'>
                    {subscription.plan !== 'pro' && (
                        <>
                            <Progress value={storagePercentage} className='h-2' />
                            {storagePercentage > 80 && (
                                <div className='flex items-start gap-2 text-xs text-orange-600 dark:text-orange-400'>
                                    <AlertCircle className='w-4 h-4 flex-shrink-0' />
                                    <span>Vous approchez de la limite de stockage</span>
                                </div>
                            )}
                        </>
                    )}
                    {subscription.plan === 'pro' && (
                        <div className='text-sm text-muted-foreground'>Stockage illimité avec le plan Pro</div>
                    )}
                </CardContent>
            </Card>

            <Card className='overflow-hidden'>
                <CardHeader className='pb-6'>
                    <CardTitle className='flex items-center gap-3 text-xl'>
                        <div className='w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500/10 to-emerald-600/10 flex items-center justify-center'>
                            <Shield className='w-5 h-5 text-emerald-600' />
                        </div>
                        Sécurité
                    </CardTitle>
                    <CardDescription className='mt-2'>Paramètres de sécurité et de confidentialité</CardDescription>
                </CardHeader>
                <CardContent className='space-y-4 pb-6'>
                    <Button variant='outline' className='w-full justify-start'>
                        Changer le mot de passe
                    </Button>
                    <Button variant='outline' className='w-full justify-start'>
                        {"Activer l'authentification à deux facteurs"}
                    </Button>
                    <Separator />
                    <Button variant='destructive' className='w-full' onClick={signOut}>
                        Déconnexion
                    </Button>
                </CardContent>
            </Card>
        </>
    );
}
