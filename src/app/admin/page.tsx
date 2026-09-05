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
    { label: 'Total Bookings', value: stats.total, color: 'bg-blue-500' },
    { label: "Today's Check-ins", value: stats.todayCheckIns, color: 'bg-green-500' },
    { label: "Today's Check-outs", value: stats.todayCheckOuts, color: 'bg-orange-500' },
    { label: 'Pending Bookings', value: stats.pending, color: 'bg-yellow-500' },
    { label: 'Confirmed Bookings', value: stats.confirmed, color: 'bg-indigo-500' },
    { label: 'Occupied Rooms', value: stats.occupied, color: 'bg-red-500' }
  ]

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      pending: 'bg-yellow-100 text-yellow-800',
      confirmed: 'bg-blue-100 text-blue-800',
      checked_in: 'bg-green-100 text-green-800',
      checked_out: 'bg-gray-100 text-gray-800',
      cancelled: 'bg-red-100 text-red-800',
      rejected: 'bg-red-100 text-red-800'
    }
    return styles[status] || 'bg-gray-100 text-gray-800'
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-blue-900 text-white px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-bold">Admin Dashboard</h1>
          <div className="flex items-center gap-4">
            <Link href="/admin/bookings" className="text-sm hover:text-blue-200">Bookings</Link>
            <Link href="/admin/rooms" className="text-sm hover:text-blue-200">Rooms</Link>
            <button
              onClick={() => {
                localStorage.removeItem('hr_admin_user')
                router.push('/admin/login')
              }}
              className="text-sm bg-red-600 hover:bg-red-700 px-3 py-1.5 rounded-md transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {statCards.map((card) => (
            <div key={card.label} className="bg-white rounded-lg shadow-sm p-6">
              <p className="text-sm text-gray-500 mb-1">{card.label}</p>
              <p className="text-3xl font-bold text-gray-800">{card.value}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">Recent Bookings</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 text-left">
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Booking ID</th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Guest</th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Room</th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Check-in</th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Check-out</th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Amount</th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {recentBookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-mono text-blue-600">{booking.bookingId}</td>
                    <td className="px-6 py-4 text-sm text-gray-800">{booking.guestName}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{booking.roomName}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{formatDate(booking.checkIn)}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{formatDate(booking.checkOut)}</td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-800">{formatPrice(booking.total)}</td>
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
              <p className="text-center text-gray-500 py-8">No bookings found.</p>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
