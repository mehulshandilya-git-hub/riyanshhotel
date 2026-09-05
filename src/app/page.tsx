import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import AboutSection from '@/components/AboutSection';
import FeaturedRooms from '@/components/FeaturedRooms';
import FacilitiesSection from '@/components/FacilitiesSection';
import RestaurantSection from '@/components/RestaurantSection';
import ExperienceSection from '@/components/ExperienceSection';
import LocationSection from '@/components/LocationSection';
import BookDirectBanner from '@/components/BookDirectBanner';

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <AboutSection />
      <FeaturedRooms />
      <RestaurantSection />
      <FacilitiesSection />
      <ExperienceSection />
      <LocationSection />
      <BookDirectBanner />
      <Footer />
    </>
  );
}