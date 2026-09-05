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

      <section className="min-h-screen bg-gray-50 flex items-center justify-center py-16 px-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-[#1a2744]">{HOTEL_INFO.name}</h1>
              <div className="w-12 h-1 bg-[#c9a96e] mx-auto mt-3 rounded" />
              <p className="text-gray-500 mt-3 text-sm">Sign in to your account</p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 mb-6 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#c9a96e] focus:border-transparent outline-none transition-all text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#c9a96e] focus:border-transparent outline-none transition-all text-sm"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#1a2744] text-white py-3 rounded-lg font-semibold hover:bg-[#243558] transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>

            <div className="mt-6 text-center space-y-3">
              <Link href="/forgot-password" className="text-[#c9a96e] hover:underline text-sm">
                Forgot password?
              </Link>
              <p className="text-sm text-gray-500">
                Don&apos;t have an account?{' '}
                <Link href="/register" className="text-[#c9a96e] hover:underline font-medium">
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
