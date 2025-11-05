'use client';

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { Session, User } from '@supabase/supabase-js';
import { supabaseClient } from '@/lib/supabase/client';

type AuthContextValue = {
    user: User | null;
    session: Session | null;
    initializing: boolean;
    signInWithPassword: (params: { email: string; password: string }) => Promise<{ error?: string }>;
    signUpWithPassword: (params: { email: string; password: string }) => Promise<{ error?: string }>;
    signInWithOAuth: (provider: 'google' | 'azure') => Promise<{ error?: string }>;
    signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [session, setSession] = useState<Session | null>(null);
    const [initializing, setInitializing] = useState(true);

    // Load initial session
    useEffect(() => {
        let isMounted = true;

        supabaseClient.auth.getSession().then(({ data }) => {
            if (!isMounted) return;
            setSession(data.session ?? null);
            setUser(data.session?.user ?? null);
            setInitializing(false);
        });

        const { data: sub } = supabaseClient.auth.onAuthStateChange((_event, newSession) => {
            setSession(newSession);
            setUser(newSession?.user ?? null);
        });

        return () => {
            isMounted = false;
            sub.subscription.unsubscribe();
        };
    }, []);

    const signInWithPassword = useCallback(async ({ email, password }: { email: string; password: string }) => {
        const { error } = await supabaseClient.auth.signInWithPassword({ email, password });
        if (error) return { error: error.message };
        return {};
    }, []);

    const signUpWithPassword = useCallback(async ({ email, password }: { email: string; password: string }) => {
        const { error } = await supabaseClient.auth.signUp({ email, password });
        if (error) return { error: error.message };
        return {};
    }, []);

    const signOut = useCallback(async () => {
        await supabaseClient.auth.signOut();
    }, []);

    const signInWithOAuth = useCallback(async (provider: 'google' | 'azure') => {
        const redirectTo = typeof window !== 'undefined' ? `${window.location.origin}/profile` : undefined;
        const { error } = await supabaseClient.auth.signInWithOAuth({ provider, options: { redirectTo } });
        if (error) return { error: error.message };
        return {};
    }, []);

    const value = useMemo<AuthContextValue>(
        () => ({ user, session, initializing, signInWithPassword, signUpWithPassword, signInWithOAuth, signOut }),
        [user, session, initializing, signInWithPassword, signUpWithPassword, signInWithOAuth, signOut],
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used within AuthProvider');
    return ctx;
}
