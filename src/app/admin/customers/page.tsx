'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { customerService } from '@/services/customerService'
import { User } from '@/types'
import { formatDate } from '@/lib/utils'

export default function AdminCustomersPage() {
  const router = useRouter()
  const [customers, setCustomers] = useState<User[]>([])
  const [filteredCustomers, setFilteredCustomers] = useState<User[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const adminUser = localStorage.getItem('hr_admin_user')
    if (!adminUser) {
      router.push('/admin/login')
      return
    }
    loadCustomers()
  }, [router])

  const loadCustomers = async () => {
    try {
      const data = await customerService.getAllCustomers()
      setCustomers(data)
      setFilteredCustomers(data)
    } catch (error) {
      console.error('Failed to load customers:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      setFilteredCustomers(
        customers.filter(c =>
          c.name.toLowerCase().includes(query) ||
          c.email.toLowerCase().includes(query)
        )
      )
    } else {
      setFilteredCustomers(customers)
    }
  }, [customers, searchQuery])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-gray-500">Loading customers...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-blue-900 text-white px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-bold">Customer Management</h1>
          <div className="flex items-center gap-4">
            <Link href="/admin" className="text-sm hover:text-blue-200">Dashboard</Link>
            <Link href="/admin/bookings" className="text-sm hover:text-blue-200">Bookings</Link>
            <Link href="/admin/rooms" className="text-sm hover:text-blue-200">Rooms</Link>
            <button onClick={() => { localStorage.removeItem('hr_admin_user'); router.push('/admin/login') }}
              className="text-sm bg-red-600 hover:bg-red-700 px-3 py-1.5 rounded-md transition-colors">Logout</button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-80"
          />
        </div>

        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 text-left">
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Name</th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Email</th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Phone</th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Member Since</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredCustomers.map((customer) => (
                  <tr key={customer.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-800">{customer.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{customer.email}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{customer.phone || '-'}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{formatDate(customer.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredCustomers.length === 0 && (
              <p className="text-center text-gray-500 py-8">No customers found.</p>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
