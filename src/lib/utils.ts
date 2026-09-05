export function formatPrice(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export function calculateNights(checkIn: string, checkOut: string): number {
  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);
  const diffMs = checkOutDate.getTime() - checkInDate.getTime();
  return Math.ceil(diffMs / (1000 * 60 * 60 * 24));
}

export function generateBookingId(): string {
  const year = new Date().getFullYear();
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `HR-${year}-${random}`;
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 15) + Date.now().toString(36);
}

export function doBookingsOverlap(
  existingCheckIn: string,
  existingCheckOut: string,
  requestedCheckIn: string,
  requestedCheckOut: string
): boolean {
  const eci = new Date(existingCheckIn).getTime();
  const eco = new Date(existingCheckOut).getTime();
  const rci = new Date(requestedCheckIn).getTime();
  const rco = new Date(requestedCheckOut).getTime();
  return eci < rco && eco > rci;
}

export function getTodayString(): string {
  return new Date().toISOString().split('T')[0];
}

export function getTomorrowString(): string {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split('T')[0];
}

export function getWhatsAppUrl(phone: string, message: string): string {
  const clean = phone.replace(/[^0-9]/g, '');
  return `https://wa.me/${clean}?text=${encodeURIComponent(message)}`;
}

export function getPhoneUrl(phone: string): string {
  return `tel:${phone}`;
}
