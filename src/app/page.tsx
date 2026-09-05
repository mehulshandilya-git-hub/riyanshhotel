import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import ShortIntro from '@/components/ShortIntro';
import FeaturedRooms from '@/components/FeaturedRooms';
import HotelExperience from '@/components/HotelExperience';
import RestaurantSection from '@/components/RestaurantSection';
import ExperienceSection from '@/components/ExperienceSection';
import LocationSection from '@/components/LocationSection';
import FinalCTA from '@/components/FinalCTA';

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <ShortIntro />
      <FeaturedRooms />
      <HotelExperience />
      <RestaurantSection />
      <ExperienceSection />
      <LocationSection />
      <FinalCTA />
      <Footer />
    </>
  );
}