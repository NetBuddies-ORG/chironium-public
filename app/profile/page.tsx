'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/providers/AuthProvider';
import { Button } from '@/components/ui/button';

export default function ProfilePage() {
    const router = useRouter();
    const { user, initializing, signOut } = useAuth();

    useEffect(() => {
        if (!initializing && !user) {
            router.replace('/login');
        }
    }, [user, initializing, router]);

    if (initializing) return null;
    if (!user) return null;

    const handleSignOut = async () => {
        await signOut();
        router.replace('/login');
    };

    return (
        <div>
            <h1>Profil</h1>
            <p>Connecté en tant que: {user.email}</p>
            <Button onClick={handleSignOut}>Se déconnecter</Button>
        </div>
    );
}
