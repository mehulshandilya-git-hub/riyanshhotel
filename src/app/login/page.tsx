'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { authService } from '@/services/authService';
import { HOTEL_INFO } from '@/types';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (authService.isLoggedIn()) {
      router.push('/account');
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    setLoading(true);
    const result = await authService.login(email, password);
    setLoading(false);

    if (result.success) {
      router.push('/account');
    } else {
      setError(result.error || 'Login failed. Please try again.');
    }
  };

  return (
    <>
      <Navbar />

      <section className="min-h-screen bg-[#0a0907] flex items-center justify-center py-16 px-6">
        <div className="w-full max-w-md">
          <div className="card p-8">
            <div className="text-center mb-8">
              <h1 className="font-display text-3xl font-semibold text-[#f2ecdf]">{HOTEL_INFO.name}</h1>
              <div className="rule-gold w-16 mx-auto mt-4" />
              <p className="text-mute mt-4 text-sm">Sign in to your account</p>
            </div>

            {error && (
              <div className="bg-[#2a100f] border border-[#4a211d] text-[#e07b6b] rounded-lg px-4 py-3 mb-6 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-sand mb-1.5">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-sand mb-1.5">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full !py-3 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>

            <div className="mt-6 text-center space-y-3">
              <Link href="/forgot-password" className="text-gold hover:underline text-sm">
                Forgot password?
              </Link>
              <p className="text-sm text-mute">
                Don&apos;t have an account?{' '}
                <Link href="/register" className="text-gold hover:underline font-medium">
                  Register
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}