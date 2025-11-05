// app/api/newsletter/route.ts (Next.js 13+)
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

export async function POST(request: Request) {
    try {
        const { email, phone } = await request.json();
        if (phone) return NextResponse.json({ error: 'Bot détecté' }, { status: 400 });
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return NextResponse.json({ error: 'Email invalide' }, { status: 400 });
        }

        const { error } = await supabase.from('newsletter_subscribers').upsert({ email }, { onConflict: 'email' });

        if (error) throw error;

        return NextResponse.json({ message: 'Inscription réussie' });
    } catch (err) {
        return NextResponse.json({ error: err.message || 'Erreur serveur' }, { status: 500 });
    }
}
