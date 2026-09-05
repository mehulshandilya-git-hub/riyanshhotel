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
        <section className="min-h-screen bg-gray-50 flex items-center justify-center">
          <p className="text-gray-500">Loading...</p>
        </section>
        <Footer />
      </>
    );
  }

  if (!user) return null;

  return (
    <>
      <Navbar />

      <section className="min-h-screen bg-gray-50 py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-[#1a2744]">{HOTEL_INFO.name}</h1>
            <div className="w-12 h-1 bg-[#c9a96e] mx-auto mt-3 rounded" />
            <p className="text-gray-500 mt-3 text-sm">My Account</p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100">
              <div className="w-16 h-16 bg-[#1a2744] text-[#c9a96e] rounded-full flex items-center justify-center text-2xl font-bold">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h2 className="text-xl font-bold text-[#1a2744]">{user.name}</h2>
                <p className="text-gray-500 text-sm">{user.email}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-3 border-b border-gray-50">
                <span className="text-sm text-gray-500">Full Name</span>
                <span className="text-sm font-medium text-[#1a2744]">{user.name}</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-3 border-b border-gray-50">
                <span className="text-sm text-gray-500">Email Address</span>
                <span className="text-sm font-medium text-[#1a2744]">{user.email}</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-3 border-b border-gray-50">
                <span className="text-sm text-gray-500">Phone Number</span>
                <span className="text-sm font-medium text-[#1a2744]">{user.phone}</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-3">
                <span className="text-sm text-gray-500">Member Since</span>
                <span className="text-sm font-medium text-[#1a2744]">{formatDate(user.createdAt)}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <Link
              href="/my-bookings"
              className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-shadow group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#1a2744] text-[#c9a96e] rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-[#1a2744]">My Bookings</h3>
                  <p className="text-gray-500 text-sm">View and manage your reservations</p>
                </div>
              </div>
            </Link>

            <Link
              href="/book"
              className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-shadow group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#c9a96e] text-white rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-[#1a2744]">New Booking</h3>
                  <p className="text-gray-500 text-sm">Book a room for your stay</p>
                </div>
              </div>
            </Link>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-6 text-center">
            <button
              onClick={handleLogout}
              className="bg-red-50 text-red-600 px-6 py-3 rounded-lg font-semibold hover:bg-red-100 transition-colors text-sm"
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
