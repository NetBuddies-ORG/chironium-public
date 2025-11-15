'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import {
    AlertCircle,
    Calendar,
    Check,
    CreditCard,
    Crown,
    FileText,
    Mail,
    Settings,
    TrendingUp,
    User,
    X,
    Zap,
    Bell,
    Shield,
    Download,
    Activity,
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import Account from '@/features/profile/account/Account';

interface Invoice {
    id: string;
    date: string;
    amount: number;
    status: 'paid' | 'pending';
    invoiceUrl: string;
}

export default function ProfilePage() {
    const user = { email: 'jean.dupont@example.com' };

    const [notifications, setNotifications] = useState({
        email: true,
        projectUpdates: true,
        newsletter: false,
        marketing: false,
    });

    const recentActivity = [
        { action: 'Projet créé', project: 'Analyse Q4 2024', date: '2024-11-01' },
        { action: 'Export PDF', project: 'Rapport Marketing', date: '2024-10-28' },
        { action: 'Collaboration', project: 'Dashboard Analytics', date: '2024-10-25' },
        { action: 'Mise à jour', project: 'Budget 2025', date: '2024-10-20' },
    ];

    const invoices: Invoice[] = [
        { id: 'INV-001', date: '2024-11-01', amount: 14.99, status: 'paid', invoiceUrl: '#' },
        { id: 'INV-002', date: '2024-10-01', amount: 14.99, status: 'paid', invoiceUrl: '#' },
        { id: 'INV-003', date: '2024-09-01', amount: 14.99, status: 'paid', invoiceUrl: '#' },
    ];

    const handleNotificationChange = (key: string) => {
        setNotifications({ ...notifications, [key]: !notifications[key] });
    };

    return (
        <div className='pt-16'>
            <main className='container mx-auto px-6 py-12 md:py-16'>
                <div className='max-w-7xl mx-auto space-y-10'>
                    <div>
                        <h1 className='text-4xl mb-3'>Mon Profil</h1>
                        <p className='text-muted-foreground text-lg'>Gérez vos informations et votre abonnement</p>
                    </div>

                    <Tabs defaultValue='account' className='w-full'>
                        <div className='border-b mb-8'>
                            <TabsList className='h-auto p-0 bg-transparent w-full justify-start gap-1'>
                                <TabsTrigger
                                    value='account'
                                    className='gap-2 rounded-none border-b-2 border-transparent data-[state=active]:border-[#00C2FF] data-[state=active]:bg-transparent data-[state=active]:shadow-none px-6 py-3'
                                >
                                    <User className='w-4 h-4' />
                                    <span className='hidden sm:inline font-medium'>Compte</span>
                                </TabsTrigger>
                                <TabsTrigger
                                    value='subscription'
                                    className='gap-2 rounded-none border-b-2 border-transparent data-[state=active]:border-[#00C2FF] data-[state=active]:bg-transparent data-[state=active]:shadow-none px-6 py-3'
                                >
                                    <CreditCard className='w-4 h-4' />
                                    <span className='hidden sm:inline font-medium'>Abonnement</span>
                                </TabsTrigger>
                                <TabsTrigger
                                    value='billing'
                                    className='gap-2 rounded-none border-b-2 border-transparent data-[state=active]:border-[#00C2FF] data-[state=active]:bg-transparent data-[state=active]:shadow-none px-6 py-3'
                                >
                                    <FileText className='w-4 h-4' />
                                    <span className='hidden sm:inline font-medium'>Facturation</span>
                                </TabsTrigger>
                                <TabsTrigger
                                    value='notifications'
                                    className='gap-2 rounded-none border-b-2 border-transparent data-[state=active]:border-[#00C2FF] data-[state=active]:bg-transparent data-[state=active]:shadow-none px-6 py-3'
                                >
                                    <Bell className='w-4 h-4' />
                                    <span className='hidden sm:inline font-medium'>Notifications</span>
                                </TabsTrigger>
                                <TabsTrigger
                                    value='activity'
                                    className='gap-2 rounded-none border-b-2 border-transparent data-[state=active]:border-[#00C2FF] data-[state=active]:bg-transparent data-[state=active]:shadow-none px-6 py-3'
                                >
                                    <Activity className='w-4 h-4' />
                                    <span className='hidden sm:inline font-medium'>Activité</span>
                                </TabsTrigger>
                            </TabsList>
                        </div>

                        <TabsContent value='account' className='space-y-8'>
                            <Account />
                        </TabsContent>

                        <TabsContent value='subscription' className='space-y-8'></TabsContent>

                        <TabsContent value='billing' className='space-y-8'>
                            <Card className='overflow-hidden'>
                                <CardHeader className='pb-6'>
                                    <CardTitle className='flex items-center gap-3 text-xl'>
                                        <div className='w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500/10 to-blue-600/10 flex items-center justify-center'>
                                            <FileText className='w-5 h-5 text-blue-600' />
                                        </div>
                                        Historique de facturation
                                    </CardTitle>
                                    <CardDescription className='mt-2'>
                                        Consultez et téléchargez vos factures
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className='pb-6'>
                                    <div className='space-y-3'>
                                        {invoices.map((invoice) => (
                                            <div
                                                key={invoice.id}
                                                className='flex items-center justify-between p-4 border rounded-lg hover:bg-accent transition-colors'
                                            >
                                                <div className='flex-1'>
                                                    <div className='font-medium'>{invoice.id}</div>
                                                    <div className='text-sm text-muted-foreground'>
                                                        {new Date(invoice.date).toLocaleDateString('fr-FR')}
                                                    </div>
                                                </div>
                                                <div className='flex items-center gap-4'>
                                                    <div className='text-right'>
                                                        <div className='font-semibold'>
                                                            {invoice.amount.toFixed(2)} €
                                                        </div>
                                                        <Badge
                                                            variant={
                                                                invoice.status === 'paid' ? 'default' : 'secondary'
                                                            }
                                                        >
                                                            {invoice.status === 'paid' ? 'Payé' : 'En attente'}
                                                        </Badge>
                                                    </div>
                                                    <Button variant='ghost' size='icon'>
                                                        <Download className='w-4 h-4' />
                                                    </Button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className='overflow-hidden'>
                                <CardHeader className='pb-6'>
                                    <CardTitle className='flex items-center gap-3 text-xl'>
                                        <div className='w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500/10 to-indigo-600/10 flex items-center justify-center'>
                                            <CreditCard className='w-5 h-5 text-indigo-600' />
                                        </div>
                                        Méthode de paiement
                                    </CardTitle>
                                    <CardDescription className='mt-2'>
                                        Gérez vos informations de paiement
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className='pb-6'>
                                    <div className='flex items-center justify-between p-4 border rounded-lg'>
                                        <div className='flex items-center gap-3'>
                                            <div className='w-12 h-8 bg-gradient-to-br from-blue-500 to-blue-700 rounded flex items-center justify-center'>
                                                <CreditCard className='w-5 h-5 text-white' />
                                            </div>
                                            <div>
                                                <div className='font-medium'>•••• •••• •••• 4242</div>
                                                <div className='text-sm text-muted-foreground'>Expire 12/2025</div>
                                            </div>
                                        </div>
                                        <Button variant='outline'>Modifier</Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value='notifications' className='space-y-8'>
                            <Card className='overflow-hidden'>
                                <CardHeader className='pb-6'>
                                    <CardTitle className='flex items-center gap-3 text-xl'>
                                        <div className='w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500/10 to-amber-600/10 flex items-center justify-center'>
                                            <Bell className='w-5 h-5 text-amber-600' />
                                        </div>
                                        Préférences de notification
                                    </CardTitle>
                                    <CardDescription className='mt-2'>
                                        Gérez comment vous souhaitez être informé
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className='space-y-6 pb-6'>
                                    <div className='flex items-center justify-between'>
                                        <div className='space-y-0.5'>
                                            <Label htmlFor='email-notif'>Notifications par email</Label>
                                            <div className='text-sm text-muted-foreground'>
                                                Recevoir des emails pour les mises à jour importantes
                                            </div>
                                        </div>
                                        <Switch
                                            id='email-notif'
                                            checked={notifications.email}
                                            onCheckedChange={() => handleNotificationChange('email')}
                                        />
                                    </div>
                                    <Separator />
                                    <div className='flex items-center justify-between'>
                                        <div className='space-y-0.5'>
                                            <Label htmlFor='project-notif'>Mises à jour de projets</Label>
                                            <div className='text-sm text-muted-foreground'>
                                                Notifications pour vos projets et collaborations
                                            </div>
                                        </div>
                                        <Switch
                                            id='project-notif'
                                            checked={notifications.projectUpdates}
                                            onCheckedChange={() => handleNotificationChange('projectUpdates')}
                                        />
                                    </div>
                                    <Separator />
                                    <div className='flex items-center justify-between'>
                                        <div className='space-y-0.5'>
                                            <Label htmlFor='newsletter'>Newsletter</Label>
                                            <div className='text-sm text-muted-foreground'>
                                                Conseils, actualités et nouvelles fonctionnalités
                                            </div>
                                        </div>
                                        <Switch
                                            id='newsletter'
                                            checked={notifications.newsletter}
                                            onCheckedChange={() => handleNotificationChange('newsletter')}
                                        />
                                    </div>
                                    <Separator />
                                    <div className='flex items-center justify-between'>
                                        <div className='space-y-0.5'>
                                            <Label htmlFor='marketing'>Communications marketing</Label>
                                            <div className='text-sm text-muted-foreground'>
                                                Offres spéciales et promotions
                                            </div>
                                        </div>
                                        <Switch
                                            id='marketing'
                                            checked={notifications.marketing}
                                            onCheckedChange={() => handleNotificationChange('marketing')}
                                        />
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value='activity' className='space-y-8'>
                            <Card className='overflow-hidden'>
                                <CardHeader className='pb-6'>
                                    <CardTitle className='flex items-center gap-3 text-xl'>
                                        <div className='w-10 h-10 rounded-lg bg-gradient-to-br from-green-500/10 to-green-600/10 flex items-center justify-center'>
                                            <Activity className='w-5 h-5 text-green-600' />
                                        </div>
                                        Activité récente
                                    </CardTitle>
                                    <CardDescription className='mt-2'>
                                        Historique de vos actions sur la plateforme
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className='pb-6'>
                                    <div className='space-y-4'>
                                        {recentActivity.map((activity, index) => (
                                            <div
                                                key={index}
                                                className='flex items-start gap-4 pb-4 border-b last:border-0'
                                            >
                                                <div className='w-2 h-2 bg-[#00C2FF] rounded-full mt-2'></div>
                                                <div className='flex-1'>
                                                    <div className='flex items-start justify-between'>
                                                        <div>
                                                            <div className='font-medium'>{activity.action}</div>
                                                            <div className='text-sm text-muted-foreground'>
                                                                {activity.project}
                                                            </div>
                                                        </div>
                                                        <div className='text-sm text-muted-foreground'>
                                                            {new Date(activity.date).toLocaleDateString('fr-FR')}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Button variant='outline' className='w-full'>
                                        {"Voir toute l'activité"}
                                    </Button>
                                </CardFooter>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>
            </main>
        </div>
    );
}
