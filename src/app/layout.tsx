import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Hotel Riyansh | Comfortable Stays in Hansdiha',
  description: 'Hotel Riyansh - Budget and mid-range hotel in Hansdiha, Jharkhand. Comfortable stays for families, tourists and travelers. Book your room today.',
  keywords: 'Hotel Riyansh, Hansdiha hotel, Dumka Road hotel, budget hotel Jharkhand, family hotel Hansdiha',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
