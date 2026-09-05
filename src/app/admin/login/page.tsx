'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { authService } from '@/services/authService'

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const user = await authService.login(email, password)
      if (user && email === 'admin@hotelriyansh.com' && password === 'admin123') {
        localStorage.setItem('hr_admin_user', JSON.stringify(user))
        router.push('/admin')
      } else {
        setError('Invalid admin credentials. Please try again.')
      }
    } catch {
      setError('Invalid admin credentials. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0907] flex items-center justify-center px-6">
      <div className="card w-full max-w-md p-8">
        <div className="text-center mb-8">
          <h1 className="font-display text-2xl font-semibold text-cream">Hotel Riyansh</h1>
          <div className="rule-gold w-14 mx-auto mt-3" />
          <p className="text-sm text-mute mt-3">Admin Login</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="bg-[#2a100f] text-[#e07b6b] border border-[#4a211d] rounded-md px-4 py-3 text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-sand mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="admin@hotelriyansh.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-sand mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full !py-2.5 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="text-center mt-6">
          <Link href="/" className="text-sm text-mute hover:text-gold transition-colors">
            ← Back to Hotel Website
          </Link>
        </div>
      </div>
    </div>
  )
}