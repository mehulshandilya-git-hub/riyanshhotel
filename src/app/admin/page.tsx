'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { bookingService } from '@/services/bookingService'
import { Booking } from '@/types'
import { formatPrice, formatDate } from '@/lib/utils'

interface DashboardStats {
  total: number
  todayCheckIns: number
  todayCheckOuts: number
  pending: number
  confirmed: number
  occupied: number
}

export default function AdminDashboard() {
  const router = useRouter()
  const [stats, setStats] = useState<DashboardStats>({
    total: 0,
    todayCheckIns: 0,
    todayCheckOuts: 0,
    pending: 0,
    confirmed: 0,
    occupied: 0
  })
  const [recentBookings, setRecentBookings] = useState<Booking[]>([])

  useEffect(() => {
    const adminUser = localStorage.getItem('hr_admin_user')
    if (!adminUser) {
      router.push('/admin/login')
      return
    }

    loadDashboardData()
  }, [router])

  const loadDashboardData = async () => {
    try {
      const bookingStats = await bookingService.getBookingStats()
      setStats({
        total: bookingStats.total,
        todayCheckIns: bookingStats.todayCheckIns,
        todayCheckOuts: bookingStats.todayCheckOuts,
        pending: bookingStats.pending,
        confirmed: bookingStats.confirmed,
        occupied: bookingStats.occupied
      })

      const allBookings = await bookingService.getAllBookings()
      const recent = allBookings
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 5)
      setRecentBookings(recent)
    } catch (error) {
      console.error('Failed to load dashboard data:', error)
    }
  }

  const statCards = [
    { label: 'Total Bookings', value: stats.total, dot: 'bg-gold' },
    { label: "Today's Check-ins", value: stats.todayCheckIns, dot: 'bg-[#7fd873]' },
    { label: "Today's Check-outs", value: stats.todayCheckOuts, dot: 'bg-[#e8c07b]' },
    { label: 'Pending Bookings', value: stats.pending, dot: 'bg-[#e8cd97]' },
    { label: 'Confirmed Bookings', value: stats.confirmed, dot: 'bg-[#7cc3e0]' },
    { label: 'Occupied Rooms', value: stats.occupied, dot: 'bg-[#e07b6b]' }
  ]

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      pending: 'bg-[#241d0d] text-[#e8cd97] border border-[#4a3a1c]',
      confirmed: 'bg-[#0e2029] text-[#7cc3e0] border border-[#1e3d4d]',
      checked_in: 'bg-[#12240f] text-[#7fd873] border border-[#2a4a22]',
      checked_out: 'bg-[#17140f] text-[#c6bda7] border border-[#2a251d]',
      cancelled: 'bg-[#2a100f] text-[#e07b6b] border border-[#4a211d]',
      rejected: 'bg-[#2a100f] text-[#e07b6b] border border-[#4a211d]'
    }
    return styles[status] || 'bg-[#17140f] text-[#c6bda7] border border-[#2a251d]'
  }

  return (
    <div className="min-h-screen bg-[#0a0907]">
      <nav className="bg-gradient-to-r from-[#14120e] to-[#0d0b08] border-b border-[#221d14] px-6 py-4 text-white">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="font-display text-xl font-semibold text-gold">Admin Dashboard</h1>
          <div className="flex items-center gap-4">
            <Link href="/admin/bookings" className="text-sm text-sand hover:text-gold transition-colors">Bookings</Link>
            <Link href="/admin/rooms" className="text-sm text-sand hover:text-gold transition-colors">Rooms</Link>
            <button
              onClick={() => {
                localStorage.removeItem('hr_admin_user')
                router.push('/admin/login')
              }}
              className="text-sm bg-[#4a211d] hover:bg-[#5a2b25] text-[#e07b6b] px-3 py-1.5 rounded-md transition-colors border border-[#6b2f27]"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {statCards.map((card) => (
            <div key={card.label} className="card p-6">
              <div className="flex items-center gap-2 mb-2">
                <span className={`w-2 h-2 rounded-full ${card.dot}`} />
                <p className="text-sm text-mute">{card.label}</p>
              </div>
              <p className="text-3xl font-bold text-cream">{card.value}</p>
            </div>
          ))}
        </div>

        <div className="card">
          <div className="px-6 py-4 border-b border-line">
            <h2 className="font-display text-lg font-semibold text-cream">Recent Bookings</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-[#100e0b] text-left">
                  <th className="px-6 py-3 text-xs font-medium text-mute uppercase">Booking ID</th>
                  <th className="px-6 py-3 text-xs font-medium text-mute uppercase">Guest</th>
                  <th className="px-6 py-3 text-xs font-medium text-mute uppercase">Room</th>
                  <th className="px-6 py-3 text-xs font-medium text-mute uppercase">Check-in</th>
                  <th className="px-6 py-3 text-xs font-medium text-mute uppercase">Check-out</th>
                  <th className="px-6 py-3 text-xs font-medium text-mute uppercase">Amount</th>
                  <th className="px-6 py-3 text-xs font-medium text-mute uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#17130c]">
                {recentBookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-[#100e0b]">
                    <td className="px-6 py-4 text-sm font-mono text-gold">{booking.bookingId}</td>
                    <td className="px-6 py-4 text-sm text-cream">{booking.guestName}</td>
                    <td className="px-6 py-4 text-sm text-sand">{booking.roomName}</td>
                    <td className="px-6 py-4 text-sm text-sand">{formatDate(booking.checkIn)}</td>
                    <td className="px-6 py-4 text-sm text-sand">{formatDate(booking.checkOut)}</td>
                    <td className="px-6 py-4 text-sm font-medium text-cream">{formatPrice(booking.total)}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(booking.bookingStatus)}`}>
                        {booking.bookingStatus.replace('_', ' ').toUpperCase()}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {recentBookings.length === 0 && (
              <p className="text-center text-mute py-8">No bookings found.</p>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}