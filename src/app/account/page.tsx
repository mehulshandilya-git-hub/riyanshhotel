'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { authService } from '@/services/authService';
import { User, HOTEL_INFO } from '@/types';
import { formatDate } from '@/lib/utils';

export default function AccountPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (!currentUser) {
      router.push('/login');
      return;
    }
    setUser(currentUser);
    setLoading(false);
  }, [router]);

  const handleLogout = async () => {
    await authService.logout();
    router.push('/');
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <section className="min-h-screen bg-[#0a0907] flex items-center justify-center">
          <p className="text-mute">Loading...</p>
        </section>
        <Footer />
      </>
    );
  }

  if (!user) return null;

  return (
    <>
      <Navbar />

      <section className="min-h-screen bg-[#0a0907] py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <p className="eyebrow mb-4">{HOTEL_INFO.name}</p>
            <h1 className="font-display text-3xl md:text-4xl font-semibold text-[#f2ecdf]">My Account</h1>
            <div className="rule-gold w-16 mx-auto mt-5" />
          </div>

          <div className="card p-8 mb-6">
            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-line">
              <div className="w-16 h-16 bg-gradient-to-br from-[#dcbd85] to-[#c9a96e] text-[#120f0a] rounded-full flex items-center justify-center text-2xl font-bold">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h2 className="font-display text-xl font-semibold text-cream">{user.name}</h2>
                <p className="text-mute text-sm">{user.email}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-3 border-b border-line">
                <span className="text-sm text-mute">Full Name</span>
                <span className="text-sm font-medium text-cream">{user.name}</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-3 border-b border-line">
                <span className="text-sm text-mute">Email Address</span>
                <span className="text-sm font-medium text-cream">{user.email}</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-3 border-b border-line">
                <span className="text-sm text-mute">Phone Number</span>
                <span className="text-sm font-medium text-cream">{user.phone}</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-3">
                <span className="text-sm text-mute">Member Since</span>
                <span className="text-sm font-medium text-cream">{formatDate(user.createdAt)}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <Link
              href="/my-bookings"
              className="card p-6 hover:border-[#c9a96e]/40 group transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#211b13] to-[#17140f] text-[#c9a96e] rounded-xl flex items-center justify-center border border-[#312b1e] group-hover:scale-105 transition-transform">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-display text-lg text-cream">My Bookings</h3>
                  <p className="text-mute text-sm">View and manage your reservations</p>
                </div>
              </div>
            </Link>

            <Link
              href="/book"
              className="card p-6 hover:border-[#c9a96e]/40 group transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#dcbd85] to-[#c9a96e] text-[#120f0a] rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-display text-lg text-cream">New Booking</h3>
                  <p className="text-mute text-sm">Book a room for your stay</p>
                </div>
              </div>
            </Link>
          </div>

          <div className="card p-6 text-center">
            <button
              onClick={handleLogout}
              className="bg-[#2a100f] text-[#e07b6b] border border-[#4a211d] px-6 py-3 rounded-lg font-semibold hover:bg-[#3a1612] transition-colors text-sm"
            >
              Sign Out
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}