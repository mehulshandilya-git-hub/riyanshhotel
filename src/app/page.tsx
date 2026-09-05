import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import BookDirectBanner from '@/components/BookDirectBanner';
import StatsSection from '@/components/StatsSection';
import FeaturedRooms from '@/components/FeaturedRooms';
import FacilitiesSection from '@/components/FacilitiesSection';
import RestaurantSection from '@/components/RestaurantSection';
import ExperienceSection from '@/components/ExperienceSection';
import LocationSection from '@/components/LocationSection';
import AboutSection from '@/components/AboutSection';
import ContactCTA from '@/components/ContactCTA';

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <BookDirectBanner />
      <StatsSection />
      <FeaturedRooms />
      <FacilitiesSection />
      <RestaurantSection />
      <ExperienceSection />
      <LocationSection />
      <AboutSection />
      <ContactCTA />
      <Footer />
    </>
  );
}