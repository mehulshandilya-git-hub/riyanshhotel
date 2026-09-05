'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { bookingService } from '@/services/bookingService'
import { roomService } from '@/services/roomService'
import { Booking, BookingStatus, PaymentStatus, PaymentMethod, RoomType } from '@/types'
import { formatPrice, formatDate, calculateNights, getTodayString } from '@/lib/utils'

export default function AdminBookingsPage() {
  const router = useRouter()
  const [bookings, setBookings] = useState<Booking[]>([])
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [expandedBooking, setExpandedBooking] = useState<string | null>(null)
  const [showManualBooking, setShowManualBooking] = useState(false)
  const [loading, setLoading] = useState(true)
  const [roomTypes, setRoomTypes] = useState<RoomType[]>([])

  const [manualForm, setManualForm] = useState({
    guestName: '',
    guestEmail: '',
    guestPhone: '',
    roomTypeId: '',
    roomName: '',
    roomPrice: 0,
    checkIn: getTodayString(),
    checkOut: '',
    numberOfGuests: 1,
    numberOfRooms: 1,
    paymentMethod: 'cash' as PaymentMethod,
    paymentStatus: 'pending' as PaymentStatus,
    bookingStatus: 'pending' as BookingStatus
  })

  useEffect(() => {
    const adminUser = localStorage.getItem('hr_admin_user')
    if (!adminUser) {
      router.push('/admin/login')
      return
    }
    loadBookings()
    loadRoomTypes()
  }, [router])

  const loadBookings = async () => {
    try {
      const data = await bookingService.getAllBookings()
      setBookings(data)
      setFilteredBookings(data)
    } catch (error) {
      console.error('Failed to load bookings:', error)
    } finally {
      setLoading(false)
    }
  }

  const loadRoomTypes = async () => {
    try {
      const types = await roomService.getAllRoomTypes()
      setRoomTypes(types)
    } catch (error) {
      console.error('Failed to load room types:', error)
    }
  }

  useEffect(() => {
    let result = bookings

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        b => b.id.toLowerCase().includes(query) ||
             b.bookingId.toLowerCase().includes(query) ||
             b.guestName.toLowerCase().includes(query)
      )
    }

    if (statusFilter !== 'all') {
      result = result.filter(b => b.bookingStatus === statusFilter)
    }

    setFilteredBookings(result)
  }, [bookings, searchQuery, statusFilter])

  const handleStatusUpdate = async (bookingId: string, newStatus: BookingStatus) => {
    try {
      await bookingService.updateBookingStatus(bookingId, newStatus)
      loadBookings()
    } catch (error) {
      console.error('Failed to update booking:', error)
    }
  }

  const handlePaymentUpdate = async (bookingId: string, paymentStatus: PaymentStatus) => {
    try {
      await bookingService.updatePaymentStatus(bookingId, paymentStatus)
      loadBookings()
    } catch (error) {
      console.error('Failed to update payment:', error)
    }
  }

  const handleManualBooking = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await bookingService.adminCreateBooking({
        userId: 'manual-admin',
        guestName: manualForm.guestName,
        guestEmail: manualForm.guestEmail,
        guestPhone: manualForm.guestPhone,
        roomTypeId: manualForm.roomTypeId,
        roomName: manualForm.roomName,
        roomPrice: manualForm.roomPrice,
        checkIn: manualForm.checkIn,
        checkOut: manualForm.checkOut,
        numberOfGuests: manualForm.numberOfGuests,
        numberOfRooms: manualForm.numberOfRooms,
        paymentMethod: manualForm.paymentMethod,
        paymentStatus: manualForm.paymentStatus,
        bookingStatus: manualForm.bookingStatus
      })
      setShowManualBooking(false)
      setManualForm({
        guestName: '',
        guestEmail: '',
        guestPhone: '',
        roomTypeId: '',
        roomName: '',
        roomPrice: 0,
        checkIn: getTodayString(),
        checkOut: '',
        numberOfGuests: 1,
        numberOfRooms: 1,
        paymentMethod: 'cash',
        paymentStatus: 'pending',
        bookingStatus: 'pending'
      })
      loadBookings()
    } catch (error) {
      console.error('Failed to create manual booking:', error)
    }
  }

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

  const getPaymentBadge = (status: string) => {
    const styles: Record<string, string> = {
      pending: 'bg-yellow-100 text-yellow-800',
      paid: 'bg-green-100 text-green-800',
      failed: 'bg-red-100 text-red-800',
      pay_at_hotel: 'bg-blue-100 text-blue-800'
    }
    return styles[status] || 'bg-gray-100 text-gray-800'
  }

  const getActionButtons = (booking: Booking) => {
    const buttons = []
    if (booking.bookingStatus === 'pending') {
      buttons.push(
        <button key="confirm" onClick={() => handleStatusUpdate(booking.id, 'confirmed')}
          className="bg-green-600 text-white px-2 py-1 rounded text-xs hover:bg-green-700">Confirm</button>,
        <button key="reject" onClick={() => handleStatusUpdate(booking.id, 'rejected')}
          className="bg-red-600 text-white px-2 py-1 rounded text-xs hover:bg-red-700">Reject</button>
      )
    }
    if (booking.bookingStatus === 'confirmed') {
      buttons.push(
        <button key="checkin" onClick={() => handleStatusUpdate(booking.id, 'checked_in')}
          className="bg-blue-600 text-white px-2 py-1 rounded text-xs hover:bg-blue-700">Check-in</button>
      )
    }
    if (booking.bookingStatus === 'checked_in') {
      buttons.push(
        <button key="checkout" onClick={() => handleStatusUpdate(booking.id, 'checked_out')}
          className="bg-purple-600 text-white px-2 py-1 rounded text-xs hover:bg-purple-700">Check-out</button>
      )
    }
    if (!['cancelled', 'rejected', 'checked_out'].includes(booking.bookingStatus)) {
      buttons.push(
        <button key="cancel" onClick={() => handleStatusUpdate(booking.id, 'cancelled')}
          className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs hover:bg-red-200">Cancel</button>
      )
    }
    return buttons
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-gray-500">Loading bookings...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-blue-900 text-white px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-bold">Bookings Management</h1>
          <div className="flex items-center gap-4">
            <Link href="/admin" className="text-sm hover:text-blue-200">Dashboard</Link>
            <Link href="/admin/rooms" className="text-sm hover:text-blue-200">Rooms</Link>
            <button onClick={() => { localStorage.removeItem('hr_admin_user'); router.push('/admin/login') }}
              className="text-sm bg-red-600 hover:bg-red-700 px-3 py-1.5 rounded-md transition-colors">Logout</button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <input
              type="text"
              placeholder="Search by ID or guest name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-64"
            />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="checked_in">Checked In</option>
              <option value="checked_out">Checked Out</option>
              <option value="cancelled">Cancelled</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
          <button
            onClick={() => setShowManualBooking(true)}
            className="bg-yellow-500 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-yellow-600 transition-colors"
          >
            + Create Manual Booking
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 text-left">
                  <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase">Booking ID</th>
                  <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase">Guest</th>
                  <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase">Room</th>
                  <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase">Check-in</th>
                  <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase">Check-out</th>
                  <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase">Amount</th>
                  <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase">Payment</th>
                  <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredBookings.map((booking) => (
                  <>
                    <tr key={booking.id} className="hover:bg-gray-50 cursor-pointer"
                      onClick={() => setExpandedBooking(expandedBooking === booking.id ? null : booking.id)}>
                      <td className="px-4 py-3 text-sm font-mono text-blue-600">{booking.bookingId}</td>
                      <td className="px-4 py-3 text-sm text-gray-800">{booking.guestName}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{booking.roomName}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{formatDate(booking.checkIn)}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{formatDate(booking.checkOut)}</td>
                      <td className="px-4 py-3 text-sm font-medium text-gray-800">{formatPrice(booking.total)}</td>
                      <td className="px-4 py-3">
                        <select
                          value={booking.paymentStatus}
                          onClick={(e) => e.stopPropagation()}
                          onChange={(e) => handlePaymentUpdate(booking.id, e.target.value as PaymentStatus)}
                          className={`px-2 py-1 rounded text-xs font-medium ${getPaymentBadge(booking.paymentStatus)} border-0 focus:ring-2 focus:ring-blue-500`}
                        >
                          <option value="pending">Pending</option>
                          <option value="paid">Paid</option>
                          <option value="failed">Failed</option>
                          <option value="pay_at_hotel">Pay at Hotel</option>
                        </select>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(booking.bookingStatus)}`}>
                          {booking.bookingStatus.replace('_', ' ').toUpperCase()}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-1 flex-wrap" onClick={(e) => e.stopPropagation()}>
                          {getActionButtons(booking)}
                        </div>
                      </td>
                    </tr>
                    {expandedBooking === booking.id && (
                      <tr key={`${booking.id}-detail`}>
                        <td colSpan={9} className="px-6 py-4 bg-gray-50">
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div><span className="text-gray-500">Full ID:</span> <span className="font-mono">{booking.id}</span></div>
                            <div><span className="text-gray-500">Email:</span> {booking.guestEmail}</div>
                            <div><span className="text-gray-500">Phone:</span> {booking.guestPhone}</div>
                            <div><span className="text-gray-500">Guests:</span> {booking.numberOfGuests}</div>
                            <div><span className="text-gray-500">Rooms:</span> {booking.numberOfRooms}</div>
                            <div><span className="text-gray-500">Nights:</span> {calculateNights(booking.checkIn, booking.checkOut)}</div>
                            <div><span className="text-gray-500">Created:</span> {formatDate(booking.createdAt)}</div>
                            <div><span className="text-gray-500">Payment Method:</span> {booking.paymentMethod}</div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                ))}
              </tbody>
            </table>
            {filteredBookings.length === 0 && (
              <p className="text-center text-gray-500 py-8">No bookings found.</p>
            )}
          </div>
        </div>

        {showManualBooking && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
              <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-800">Create Manual Booking</h3>
                <button onClick={() => setShowManualBooking(false)} className="text-gray-400 hover:text-gray-600 text-xl">&times;</button>
              </div>
              <form onSubmit={handleManualBooking} className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Guest Name *</label>
                    <input type="text" required value={manualForm.guestName}
                      onChange={(e) => setManualForm({ ...manualForm, guestName: e.target.value })}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                    <input type="email" required value={manualForm.guestEmail}
                      onChange={(e) => setManualForm({ ...manualForm, guestEmail: e.target.value })}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                    <input type="tel" required value={manualForm.guestPhone}
                      onChange={(e) => setManualForm({ ...manualForm, guestPhone: e.target.value })}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Room Type *</label>
                    <select required value={manualForm.roomTypeId}
                      onChange={(e) => {
                        const rt = roomTypes.find(r => r.id === e.target.value)
                        setManualForm({
                          ...manualForm,
                          roomTypeId: e.target.value,
                          roomName: rt?.name || '',
                          roomPrice: rt?.price || 0
                        })
                      }}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="">Select room type</option>
                      {roomTypes.map(rt => (
                        <option key={rt.id} value={rt.id}>{rt.name} - {formatPrice(rt.price)}/night</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Check-in *</label>
                    <input type="date" required value={manualForm.checkIn}
                      onChange={(e) => setManualForm({ ...manualForm, checkIn: e.target.value })}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Check-out *</label>
                    <input type="date" required value={manualForm.checkOut}
                      onChange={(e) => setManualForm({ ...manualForm, checkOut: e.target.value })}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Guests</label>
                    <input type="number" min="1" value={manualForm.numberOfGuests}
                      onChange={(e) => setManualForm({ ...manualForm, numberOfGuests: parseInt(e.target.value) })}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Rooms</label>
                    <input type="number" min="1" value={manualForm.numberOfRooms}
                      onChange={(e) => setManualForm({ ...manualForm, numberOfRooms: parseInt(e.target.value) })}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
                    <select value={manualForm.paymentMethod}
                      onChange={(e) => setManualForm({ ...manualForm, paymentMethod: e.target.value as PaymentMethod })}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="cash">Cash</option>
                      <option value="card">Card</option>
                      <option value="upi">UPI</option>
                      <option value="bank_transfer">Bank Transfer</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Payment Status</label>
                    <select value={manualForm.paymentStatus}
                      onChange={(e) => setManualForm({ ...manualForm, paymentStatus: e.target.value as PaymentStatus })}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="pending">Pending</option>
                      <option value="paid">Paid</option>
                      <option value="failed">Failed</option>
                      <option value="pay_at_hotel">Pay at Hotel</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Booking Status</label>
                    <select value={manualForm.bookingStatus}
                      onChange={(e) => setManualForm({ ...manualForm, bookingStatus: e.target.value as BookingStatus })}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="checked_in">Checked In</option>
                    </select>
                  </div>
                </div>
                <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                  <button type="button" onClick={() => setShowManualBooking(false)}
                    className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800">Cancel</button>
                  <button type="submit"
                    className="px-4 py-2 bg-blue-800 text-white rounded-md text-sm font-semibold hover:bg-blue-900 transition-colors">
                    Create Booking
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
