'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ShieldCheck, Lock, Mail, ArrowRight, AlertCircle, Info } from 'lucide-react';
import { usePortfolio } from '@/context/PortfolioContext';
import { createClient, isSupabaseConfigured } from '@/lib/supabase/client';

export default function AdminLoginPage() {
  const router = useRouter();
  const { setIsAdmin } = usePortfolio();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const supabaseReady = isSupabaseConfigured();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!supabaseReady) {
      setError('Supabase belum dikonfigurasi. Hubungi administrator.');
      setIsLoading(false);
      return;
    }

    const supabase = createClient();

    try {
      const { data, error: authError } = await supabase!.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        setError(authError.message);
        setIsLoading(false);
        return;
      }

      if (data.session) {
        setIsAdmin(true);
        router.push('/admin');
        return;
      }
    } catch (err: any) {
      setError(err?.message || 'Authentication error.');
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center p-6 bg-grid-pattern relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#3682F6]/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-md w-full p-8 sm:p-10 rounded-3xl bg-[#2D2D2D] border border-white/10 shadow-2xl relative z-10">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-[#3682F6]/15 border border-[#3682F6]/40 flex items-center justify-center text-[#3682F6] mb-4 shadow-glow-sm">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Admin Authentication</h1>
          <p className="text-xs text-zinc-400 mt-1">
            Sign in to manage portfolio content, projects, bio, and settings.
          </p>
        </div>

        {/* Supabase not configured warning */}
        {!supabaseReady && (
          <div className="mb-6 p-3.5 rounded-xl bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-xs flex items-start gap-2">
            <Info className="w-4 h-4 shrink-0 mt-0.5" />
            <span>
              Supabase belum terhubung. Konfigurasi{' '}
              <code className="font-mono bg-yellow-500/10 px-1 rounded">NEXT_PUBLIC_SUPABASE_URL</code>{' '}
              dan{' '}
              <code className="font-mono bg-yellow-500/10 px-1 rounded">NEXT_PUBLIC_SUPABASE_ANON_KEY</code>{' '}
              di environment variables terlebih dahulu.
            </span>
          </div>
        )}

        {/* Error message */}
        {error && (
          <div className="mb-6 p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
              Admin Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                placeholder="admin@bernardusfirman.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={!supabaseReady}
                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#3682F6] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={!supabaseReady}
                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#3682F6] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading || !supabaseReady}
            className="w-full py-3.5 rounded-xl bg-[#3682F6] hover:bg-[#2563eb] text-white font-semibold text-sm transition-all shadow-glow-sm hover:shadow-glow-md flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
          >
            <span>{isLoading ? 'Verifying...' : 'Sign In as Admin'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-8 text-center">
          <Link
            href="/"
            className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors font-mono"
          >
            ← Return to Public Portfolio
          </Link>
        </div>
      </div>
    </div>
  );
}
