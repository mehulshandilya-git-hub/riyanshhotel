'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { roomService } from '@/services/roomService'
import { RoomType, Room } from '@/types'
import { formatPrice } from '@/lib/utils'

export default function AdminRoomsPage() {
  const router = useRouter()
  const [roomTypes, setRoomTypes] = useState<RoomType[]>([])
  const [rooms, setRooms] = useState<Room[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'types' | 'rooms'>('types')

  const [showRoomTypeForm, setShowRoomTypeForm] = useState(false)
  const [editingRoomType, setEditingRoomType] = useState<RoomType | null>(null)
  const [roomTypeForm, setRoomTypeForm] = useState({
    name: '',
    description: '',
    price: 0,
    category: 'ac' as 'ac' | 'non_ac',
    amenities: [] as string[],
    images: [] as string[],
    active: true
  })

  const [showRoomForm, setShowRoomForm] = useState(false)
  const [roomForm, setRoomForm] = useState({
    roomNumber: '',
    roomTypeId: '',
    active: true,
    maintenanceStatus: false
  })

  useEffect(() => {
    const adminUser = localStorage.getItem('hr_admin_user')
    if (!adminUser) {
      router.push('/admin/login')
      return
    }
    loadData()
  }, [router])

  const loadData = async () => {
    try {
      const types = await roomService.getAllRoomTypes()
      const allRooms = await roomService.getPhysicalRooms()
      setRoomTypes(types)
      setRooms(allRooms)
    } catch (error) {
      console.error('Failed to load room data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleRoomTypeSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (editingRoomType) {
        await roomService.updateRoomType(editingRoomType.id, roomTypeForm)
      } else {
        await roomService.addRoomType({
          name: roomTypeForm.name,
          description: roomTypeForm.description,
          price: roomTypeForm.price,
          category: roomTypeForm.category,
          amenities: roomTypeForm.amenities,
          images: roomTypeForm.images,
          active: roomTypeForm.active
        })
      }
      setShowRoomTypeForm(false)
      setEditingRoomType(null)
      setRoomTypeForm({ name: '', description: '', price: 0, category: 'ac', amenities: [], images: [], active: true })
      loadData()
    } catch (error) {
      console.error('Failed to save room type:', error)
    }
  }

  const handleRoomSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await roomService.addPhysicalRoom({
        roomNumber: roomForm.roomNumber,
        roomTypeId: roomForm.roomTypeId,
        active: roomForm.active,
        maintenanceStatus: roomForm.maintenanceStatus
      })
      setShowRoomForm(false)
      setRoomForm({ roomNumber: '', roomTypeId: '', active: true, maintenanceStatus: false })
      loadData()
    } catch (error) {
      console.error('Failed to create room:', error)
    }
  }

  const toggleMaintenance = async (room: Room) => {
    try {
      await roomService.updatePhysicalRoom(room.id, { maintenanceStatus: !room.maintenanceStatus })
      loadData()
    } catch (error) {
      console.error('Failed to toggle maintenance:', error)
    }
  }

  const toggleActive = async (room: Room) => {
    try {
      await roomService.updatePhysicalRoom(room.id, { active: !room.active })
      loadData()
    } catch (error) {
      console.error('Failed to toggle room status:', error)
    }
  }

  const toggleRoomTypeActive = async (roomType: RoomType) => {
    try {
      await roomService.updateRoomType(roomType.id, { active: !roomType.active })
      loadData()
    } catch (error) {
      console.error('Failed to toggle room type status:', error)
    }
  }

  const addAmenity = (amenity: string) => {
    if (amenity && !roomTypeForm.amenities.includes(amenity)) {
      setRoomTypeForm({ ...roomTypeForm, amenities: [...roomTypeForm.amenities, amenity] })
    }
  }

  const removeAmenity = (amenity: string) => {
    setRoomTypeForm({ ...roomTypeForm, amenities: roomTypeForm.amenities.filter(a => a !== amenity) })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0907] flex items-center justify-center">
        <p className="text-mute">Loading room data...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0a0907]">
      <nav className="bg-gradient-to-r from-[#14120e] to-[#0d0b08] border-b border-[#221d14] px-6 py-4 text-white">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="font-display text-xl font-semibold text-gold">Room Management</h1>
          <div className="flex items-center gap-4">
            <Link href="/admin" className="text-sm text-sand hover:text-gold transition-colors">Dashboard</Link>
            <Link href="/admin/bookings" className="text-sm text-sand hover:text-gold transition-colors">Bookings</Link>
            <button onClick={() => { localStorage.removeItem('hr_admin_user'); router.push('/admin/login') }}
              className="text-sm bg-[#4a211d] hover:bg-[#5a2b25] text-[#e07b6b] px-3 py-1.5 rounded-md transition-colors border border-[#6b2f27]">Logout</button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex gap-4 mb-6">
          <button onClick={() => setActiveTab('types')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'types' ? 'bg-gradient-to-br from-[#dcbd85] to-[#c9a96e] text-[#120f0a]' : 'bg-coal text-mute border border-line hover:border-[#3a3427]'}`}>
            Room Types ({roomTypes.length})
          </button>
          <button onClick={() => setActiveTab('rooms')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'rooms' ? 'bg-gradient-to-br from-[#dcbd85] to-[#c9a96e] text-[#120f0a]' : 'bg-coal text-mute border border-line hover:border-[#3a3427]'}`}>
            Physical Rooms ({rooms.length})
          </button>
        </div>

        {activeTab === 'types' && (
          <div className="card">
            <div className="px-6 py-4 border-b border-line flex justify-between items-center">
              <h2 className="font-display text-lg font-semibold text-cream">Room Types</h2>
              <button onClick={() => { setShowRoomTypeForm(true); setEditingRoomType(null); setRoomTypeForm({ name: '', description: '', price: 0, category: 'ac', amenities: [], images: [], active: true }) }}
                className="btn-primary px-4 py-2 text-sm">
                + Add Room Type
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-[#100e0b] text-left">
                    <th className="px-6 py-3 text-xs font-medium text-mute uppercase">Name</th>
                    <th className="px-6 py-3 text-xs font-medium text-mute uppercase">Price/Night</th>
                    <th className="px-6 py-3 text-xs font-medium text-mute uppercase">Category</th>
                    <th className="px-6 py-3 text-xs font-medium text-mute uppercase">Amenities</th>
                    <th className="px-6 py-3 text-xs font-medium text-mute uppercase">Active</th>
                    <th className="px-6 py-3 text-xs font-medium text-mute uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#17130c]">
                  {roomTypes.map((type) => (
                    <tr key={type.id} className="hover:bg-[#100e0b]">
                      <td className="px-6 py-4 text-sm font-medium text-cream">{type.name}</td>
                      <td className="px-6 py-4 text-sm text-sand">{formatPrice(type.price)}</td>
                      <td className="px-6 py-4 text-sm text-sand">{type.category === 'ac' ? 'AC' : 'Non-AC'}</td>
                      <td className="px-6 py-4 text-sm text-sand max-w-xs truncate">{type.amenities?.join(', ')}</td>
                      <td className="px-6 py-4">
                        <button onClick={() => toggleRoomTypeActive(type)}
                          className={`px-2 py-1 rounded text-xs font-medium ${type.active ? 'bg-[#12240f] text-[#7fd873] border border-[#2a4a22]' : 'bg-[#2a100f] text-[#e07b6b] border border-[#4a211d]'}`}>
                          {type.active ? 'Active' : 'Inactive'}
                        </button>
                      </td>
                      <td className="px-6 py-4">
                        <button onClick={() => {
                          setEditingRoomType(type)
                          setRoomTypeForm({ name: type.name, description: type.description || '', price: type.price, category: type.category, amenities: type.amenities || [], images: type.images || [], active: type.active })
                          setShowRoomTypeForm(true)
                        }} className="text-gold hover:text-[#e8cd97] text-sm mr-3">Edit</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'rooms' && (
          <div className="card">
            <div className="px-6 py-4 border-b border-line flex justify-between items-center">
              <h2 className="font-display text-lg font-semibold text-cream">Physical Rooms</h2>
              <button onClick={() => setShowRoomForm(true)}
                className="btn-primary px-4 py-2 text-sm">
                + Add Room
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-[#100e0b] text-left">
                    <th className="px-6 py-3 text-xs font-medium text-mute uppercase">Room Number</th>
                    <th className="px-6 py-3 text-xs font-medium text-mute uppercase">Room Type</th>
                    <th className="px-6 py-3 text-xs font-medium text-mute uppercase">Active</th>
                    <th className="px-6 py-3 text-xs font-medium text-mute uppercase">Maintenance</th>
                    <th className="px-6 py-3 text-xs font-medium text-mute uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#17130c]">
                  {rooms.map((room) => {
                    const roomType = roomTypes.find(t => t.id === room.roomTypeId)
                    return (
                      <tr key={room.id} className="hover:bg-[#100e0b]">
                        <td className="px-6 py-4 text-sm font-medium text-cream">{room.roomNumber}</td>
                        <td className="px-6 py-4 text-sm text-sand">{roomType?.name || 'Unknown'}</td>
                        <td className="px-6 py-4">
                          <button onClick={() => toggleActive(room)}
                            className={`px-2 py-1 rounded text-xs font-medium ${room.active ? 'bg-[#12240f] text-[#7fd873] border border-[#2a4a22]' : 'bg-[#2a100f] text-[#e07b6b] border border-[#4a211d]'}`}>
                            {room.active ? 'Active' : 'Inactive'}
                          </button>
                        </td>
                        <td className="px-6 py-4">
                          <button onClick={() => toggleMaintenance(room)}
                            className={`px-2 py-1 rounded text-xs font-medium ${room.maintenanceStatus ? 'bg-[#3a2f1c] text-[#e8cd97] border border-[#5d4a24]' : 'bg-[#17140f] text-[#c6bda7] border border-[#2a251d]'}`}>
                            {room.maintenanceStatus ? 'Under Maintenance' : 'OK'}
                          </button>
                        </td>
                        <td className="px-6 py-4">
                          <button onClick={() => toggleMaintenance(room)}
                            className="text-[#e8c07b] hover:text-[#e8cd97] text-sm mr-3">
                            {room.maintenanceStatus ? 'Mark OK' : 'Mark Maintenance'}
                          </button>
                          <button onClick={() => toggleActive(room)}
                            className="text-gold hover:text-[#e8cd97] text-sm">
                            {room.active ? 'Deactivate' : 'Activate'}
                          </button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
              {rooms.length === 0 && <p className="text-center text-mute py-8">No rooms found.</p>}
            </div>
          </div>
        )}

        {showRoomTypeForm && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
            <div className="card bg-coal w-full max-w-md">
              <div className="px-6 py-4 border-b border-line flex justify-between items-center">
                <h3 className="font-display text-lg font-semibold text-cream">{editingRoomType ? 'Edit' : 'Add'} Room Type</h3>
                <button onClick={() => { setShowRoomTypeForm(false); setEditingRoomType(null) }} className="text-mute hover:text-cream text-xl">&times;</button>
              </div>
              <form onSubmit={handleRoomTypeSubmit} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-sand mb-1">Name *</label>
                  <input type="text" required value={roomTypeForm.name}
                    onChange={(e) => setRoomTypeForm({ ...roomTypeForm, name: e.target.value })} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-sand mb-1">Description</label>
                  <textarea value={roomTypeForm.description}
                    onChange={(e) => setRoomTypeForm({ ...roomTypeForm, description: e.target.value })} rows={3} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-sand mb-1">Price/Night *</label>
                    <input type="number" required min="0" value={roomTypeForm.price}
                      onChange={(e) => setRoomTypeForm({ ...roomTypeForm, price: parseInt(e.target.value) })} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-sand mb-1">Category *</label>
                    <select value={roomTypeForm.category}
                      onChange={(e) => setRoomTypeForm({ ...roomTypeForm, category: e.target.value as 'ac' | 'non_ac' })}>
                      <option value="ac">AC</option>
                      <option value="non_ac">Non-AC</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-sand mb-1">Amenities</label>
                  <div className="flex gap-2 mb-2">
                    <input type="text" id="amenity-input" placeholder="Add amenity" />
                    <button type="button" onClick={() => {
                      const input = document.getElementById('amenity-input') as HTMLInputElement
                      if (input.value) { addAmenity(input.value); input.value = '' }
                    }} className="bg-coal text-sand px-3 py-2 rounded-md text-sm border border-line hover:border-[#3a3427] whitespace-nowrap">Add</button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {roomTypeForm.amenities.map(a => (
                      <span key={a} className="bg-[#0e2029] text-[#7cc3e0] border border-[#1e3d4d] px-2 py-1 rounded text-xs flex items-center gap-1">
                        {a}
                        <button type="button" onClick={() => removeAmenity(a)} className="text-[#7cc3e0] hover:text-[#a5d8ef]">&times;</button>
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex justify-end gap-3 pt-4 border-t border-line">
                  <button type="button" onClick={() => { setShowRoomTypeForm(false); setEditingRoomType(null) }}
                    className="px-4 py-2 text-sm text-mute hover:text-cream">Cancel</button>
                  <button type="submit"
                    className="btn-primary px-4 py-2 text-sm">
                    {editingRoomType ? 'Update' : 'Create'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {showRoomForm && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
            <div className="card bg-coal w-full max-w-md">
              <div className="px-6 py-4 border-b border-line flex justify-between items-center">
                <h3 className="font-display text-lg font-semibold text-cream">Add Physical Room</h3>
                <button onClick={() => setShowRoomForm(false)} className="text-mute hover:text-cream text-xl">&times;</button>
              </div>
              <form onSubmit={handleRoomSubmit} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-sand mb-1">Room Number *</label>
                  <input type="text" required value={roomForm.roomNumber}
                    onChange={(e) => setRoomForm({ ...roomForm, roomNumber: e.target.value })}
                    placeholder="e.g., 101, 202A" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-sand mb-1">Room Type *</label>
                  <select required value={roomForm.roomTypeId}
                    onChange={(e) => setRoomForm({ ...roomForm, roomTypeId: e.target.value })}>
                    <option value="">Select room type</option>
                    {roomTypes.map(type => (
                      <option key={type.id} value={type.id}>{type.name} - {formatPrice(type.price)}/night</option>
                    ))}
                  </select>
                </div>
                <div className="flex justify-end gap-3 pt-4 border-t border-line">
                  <button type="button" onClick={() => setShowRoomForm(false)}
                    className="px-4 py-2 text-sm text-mute hover:text-cream">Cancel</button>
                  <button type="submit"
                    className="btn-primary px-4 py-2 text-sm">
                    Create Room
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