'use client'

import { useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    if (pathname === '/admin/login') return
    const adminUser = localStorage.getItem('hr_admin_user')
    if (!adminUser) {
      router.push('/admin/login')
    }
  }, [pathname, router])

  return <>{children}</>
}
