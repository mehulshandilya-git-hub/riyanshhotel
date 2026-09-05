import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import BookingWidget from '@/components/BookingWidget';
import AboutSection from '@/components/AboutSection';
import FeaturedRooms from '@/components/FeaturedRooms';
import FacilitiesSection from '@/components/FacilitiesSection';
import RestaurantSection from '@/components/RestaurantSection';
import WhyStaySection from '@/components/WhyStaySection';
import LocationSection from '@/components/LocationSection';
import ContactCTA from '@/components/ContactCTA';

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <BookingWidget />
      <AboutSection />
      <FeaturedRooms />
      <FacilitiesSection />
      <RestaurantSection />
      <WhyStaySection />
      <LocationSection />
      <ContactCTA />
      <Footer />
    </>
  );
}
