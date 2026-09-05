'use client';

import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative flex items-end min-h-[90svh] bg-[#0a0907] text-white overflow-hidden">
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
      >
        <source src="/videos/background-video-main.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0907]/85 via-[#0a0907]/20 to-transparent" />

      <div className="relative w-full max-w-7xl mx-auto px-6 pt-24 pb-16 md:pb-24">
        <div className="max-w-3xl">
          <p className="eyebrow mb-6 flex items-center gap-3">
            <span className="inline-block w-10 h-px bg-[#c9a96e]" />
            Hansdiha · Jharkhand
          </p>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-semibold leading-[1.05] mb-5">
            Hotel <span className="gold-gradient-text italic">Riyansh</span>
          </h1>
          <p className="text-xl md:text-3xl text-[#c6bda7] tracking-wide mb-10">
            Comfortable stays. Warm hospitality.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Link href="/book" className="btn-primary !px-8 !py-4 text-base">
              Book Your Stay
            </Link>
            <Link
              href="/rooms"
              className="inline-flex items-center gap-2 border border-white/30 hover:border-[#c9a96e] hover:text-[#dcbd85] text-white font-medium text-base px-8 py-4 rounded-lg transition-colors"
            >
              Explore Rooms
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}