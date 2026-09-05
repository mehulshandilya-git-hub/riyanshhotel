'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { HOTEL_INFO } from '@/types';
import { getPhoneUrl, getWhatsAppUrl } from '@/lib/utils';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Navbar />

      <section className="relative bg-[#0a0907] text-white overflow-hidden border-b border-[#17130c]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0907] via-[#100e0b] to-[#080705]" />
        <div className="absolute inset-0 opacity-[0.09]">
          <div className="absolute -top-20 -right-20 w-96 h-96 bg-[#c9a96e] rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 pt-20 pb-20 md:pt-28 md:pb-28">
          <p className="eyebrow mb-4">Contact</p>
          <h1 className="font-display text-4xl md:text-6xl font-semibold mb-5 max-w-3xl leading-[1.1]">Contact Us</h1>
          <p className="text-[#c6bda7] text-lg max-w-2xl leading-relaxed">
            Have questions or want to make a reservation? We are just a call or message away.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <span className="inline-flex items-center gap-1.5 bg-white/10 text-white text-sm px-3 py-1.5 rounded-full">
              <svg className="w-4 h-4 text-[#c9a96e]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
              Call / WhatsApp: {HOTEL_INFO.phone}
            </span>
            <span className="inline-flex items-center gap-1.5 bg-white/10 text-white text-sm px-3 py-1.5 rounded-full">
              <svg className="w-4 h-4 text-[#c9a96e]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
              24h Check-in (call before arrival)
            </span>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-[#0a0907]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

            <div>
              <p className="eyebrow mb-4">Get in Touch</p>
              <h2 className="font-display text-3xl font-semibold text-[#f2ecdf] mb-8">Direct lines to our desk</h2>

              <div className="space-y-6 mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 bg-gradient-to-br from-[#211b13] to-[#17140f] text-[#c9a96e] rounded-full flex items-center justify-center shrink-0 border border-[#312b1e]">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-display text-lg text-[#f2ecdf] mb-1">Hotel Address</h3>
                    <p className="text-[#8f8672] text-sm">{HOTEL_INFO.name}</p>
                    <p className="text-[#8f8672] text-sm">{HOTEL_INFO.address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 bg-gradient-to-br from-[#211b13] to-[#17140f] text-[#c9a96e] rounded-full flex items-center justify-center shrink-0 border border-[#312b1e]">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-display text-lg text-[#f2ecdf] mb-1">Phone</h3>
                    <a href={getPhoneUrl(HOTEL_INFO.phone)} className="text-[#8f8672] text-sm hover:text-[#c9a96e] transition-colors">
                      {HOTEL_INFO.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 bg-gradient-to-br from-[#211b13] to-[#17140f] text-[#c9a96e] rounded-full flex items-center justify-center shrink-0 border border-[#312b1e]">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-display text-lg text-[#f2ecdf] mb-1">WhatsApp</h3>
                    <a
                      href={getWhatsAppUrl(HOTEL_INFO.whatsapp, 'Hello! I would like to inquire about room availability.')}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#8f8672] text-sm hover:text-[#c9a96e] transition-colors"
                    >
                      Chat on WhatsApp
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 bg-gradient-to-br from-[#211b13] to-[#17140f] text-[#c9a96e] rounded-full flex items-center justify-center shrink-0 border border-[#312b1e]">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-display text-lg text-[#f2ecdf] mb-1">Operating Hours</h3>
                    <p className="text-[#8f8672] text-sm">24/7 &mdash; Check-in anytime</p>
                    <p className="text-[#6b6353] text-xs mt-1">Please call before arrival for check-in arrangements.</p>
                  </div>
                </div>
              </div>

              <div className="bg-[#1a160f] border border-[#3a2f1c] rounded-xl p-5 mb-8">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[#c9a96e] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <p className="font-semibold text-[#e8cd97] text-sm mb-1">Please call before arrival</p>
                    <p className="text-[#c6bda7] text-sm">
                      We request all guests to call <strong>{HOTEL_INFO.phone}</strong> before arriving at the hotel for smooth check-in arrangements.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-[#211b13] via-[#17140f] to-[#0d0b08] border border-[#221d14] rounded-2xl h-56 flex items-center justify-center">
                <div className="text-center text-[#8f8672]">
                  <svg className="w-10 h-10 mx-auto mb-2 text-[#c9a96e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <p className="text-sm">Map</p>
                  <p className="text-xs mt-1">Dumka Road, Hansdiha</p>
                </div>
              </div>
            </div>

            <div>
              <p className="eyebrow mb-4">Send Us a Message</p>
              <h2 className="font-display text-3xl font-semibold text-[#f2ecdf] mb-8">Write to us</h2>
              <form className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-[#c6bda7] mb-1.5">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#c6bda7] mb-1.5">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#c6bda7] mb-1.5">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+91 XXXXX XXXXX"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#c6bda7] mb-1.5">Message</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={5}
                    placeholder="How can we help you?"
                    required
                  />
                </div>
                <button type="button" className="btn-primary w-full !py-3.5">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                  Send Message
                </button>
                <p className="text-xs text-[#6b6353] text-center">
                  This is a demo form. No data is sent to a server.
                </p>
              </form>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}