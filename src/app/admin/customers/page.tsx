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
      <div className="min-h-screen bg-[#0a0907] flex items-center justify-center">
        <p className="text-mute">Loading customers...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0a0907]">
      <nav className="bg-gradient-to-r from-[#14120e] to-[#0d0b08] border-b border-[#221d14] px-6 py-4 text-white">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="font-display text-xl font-semibold text-gold">Customer Management</h1>
          <div className="flex items-center gap-4">
            <Link href="/admin" className="text-sm text-sand hover:text-gold transition-colors">Dashboard</Link>
            <Link href="/admin/bookings" className="text-sm text-sand hover:text-gold transition-colors">Bookings</Link>
            <Link href="/admin/rooms" className="text-sm text-sand hover:text-gold transition-colors">Rooms</Link>
            <button onClick={() => { localStorage.removeItem('hr_admin_user'); router.push('/admin/login') }}
              className="text-sm bg-[#4a211d] hover:bg-[#5a2b25] text-[#e07b6b] px-3 py-1.5 rounded-md transition-colors border border-[#6b2f27]">Logout</button>
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
            className="w-full sm:w-80"
          />
        </div>

        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-[#100e0b] text-left">
                  <th className="px-6 py-3 text-xs font-medium text-mute uppercase">Name</th>
                  <th className="px-6 py-3 text-xs font-medium text-mute uppercase">Email</th>
                  <th className="px-6 py-3 text-xs font-medium text-mute uppercase">Phone</th>
                  <th className="px-6 py-3 text-xs font-medium text-mute uppercase">Member Since</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#17130c]">
                {filteredCustomers.map((customer) => (
                  <tr key={customer.id} className="hover:bg-[#100e0b]">
                    <td className="px-6 py-4 text-sm font-medium text-cream">{customer.name}</td>
                    <td className="px-6 py-4 text-sm text-sand">{customer.email}</td>
                    <td className="px-6 py-4 text-sm text-sand">{customer.phone || '-'}</td>
                    <td className="px-6 py-4 text-sm text-sand">{formatDate(customer.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredCustomers.length === 0 && (
              <p className="text-center text-mute py-8">No customers found.</p>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}