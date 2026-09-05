import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import BookDirectBanner from '@/components/BookDirectBanner';
import FeaturedRooms from '@/components/FeaturedRooms';
import FacilitiesSection from '@/components/FacilitiesSection';
import RestaurantSection from '@/components/RestaurantSection';
import ExperienceSection from '@/components/ExperienceSection';
import LocationSection from '@/components/LocationSection';

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <BookDirectBanner />
      <FeaturedRooms />
      <FacilitiesSection />
      <RestaurantSection />
      <ExperienceSection />
      <LocationSection />
      <Footer />
    </>
  );
}