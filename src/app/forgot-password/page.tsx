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

      <section className="min-h-screen bg-[#0a0907] flex items-center justify-center py-16 px-6">
        <div className="w-full max-w-md">
          <div className="card p-8">
            <div className="text-center mb-8">
              <h1 className="font-display text-3xl font-semibold text-[#f2ecdf]">{HOTEL_INFO.name}</h1>
              <div className="rule-gold w-16 mx-auto mt-4" />
              <p className="text-mute mt-4 text-sm">Reset your password</p>
            </div>

            {error && (
              <div className="bg-[#2a100f] border border-[#4a211d] text-[#e07b6b] rounded-lg px-4 py-3 mb-6 text-sm">
                {error}
              </div>
            )}

            {success ? (
              <div className="bg-[#12240f] border border-[#2a4a22] text-[#7fd873] rounded-lg px-4 py-3 mb-6 text-sm">
                If an account exists with this email, you will receive a reset link.
              </div>
            ) : (
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

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full !py-3 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Sending...' : 'Send Reset Link'}
                </button>
              </form>
            )}

            <div className="mt-6 text-center">
              <Link href="/login" className="text-gold hover:underline text-sm font-medium">
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