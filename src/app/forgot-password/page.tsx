'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { authService } from '@/services/authService';
import { HOTEL_INFO } from '@/types';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!email) {
      setError('Please enter your email address.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    setLoading(true);
    const result = await authService.resetPassword(email);
    setLoading(false);

    if (result.success) {
      setSuccess(true);
    } else {
      setError(result.error || 'Something went wrong. Please try again.');
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
              <p className="text-gray-500 mt-3 text-sm">Reset your password</p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 mb-6 text-sm">
                {error}
              </div>
            )}

            {success ? (
              <div className="bg-green-50 border border-green-200 text-green-700 rounded-lg px-4 py-3 mb-6 text-sm">
                If an account exists with this email, you will receive a reset link.
              </div>
            ) : (
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

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#1a2744] text-white py-3 rounded-lg font-semibold hover:bg-[#243558] transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                >
                  {loading ? 'Sending...' : 'Send Reset Link'}
                </button>
              </form>
            )}

            <div className="mt-6 text-center">
              <Link href="/login" className="text-[#c9a96e] hover:underline text-sm font-medium">
                Back to Login
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
