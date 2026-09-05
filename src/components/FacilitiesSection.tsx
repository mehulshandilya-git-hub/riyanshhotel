import Link from 'next/link';

const facilities = [
  'Parking',
  'Wi-Fi',
  'Room Service',
  'TV',
  'Geyser / Hot Water',
  'Attached Bathroom',
  'AC Rooms',
  'In-house Restaurant',
];

export default function FacilitiesSection() {
  return (
    <section className="bg-white py-12 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center justify-center gap-4 text-center">
          <p className="text-[#c9a96e] font-medium tracking-[0.25em] uppercase text-xs shrink-0">
            Amenities
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {facilities.map((facility) => (
              <span key={facility} className="text-sm text-gray-600 bg-[#faf8f4] px-3 py-1.5 rounded-full">
                {facility}
              </span>
            ))}
          </div>
        </div>
        <div className="text-center mt-5">
          <Link href="/facilities" className="text-sm font-semibold text-[#c9a96e] hover:underline">
            See all facilities ›
          </Link>
        </div>
      </div>
    </section>
  );
}