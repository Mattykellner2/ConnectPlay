import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import HomeCards from "@/components/HomeCards";
import HowItWorks from "@/components/HowItWorks";
import Features from "@/components/Features";
import LogosBand from "@/components/LogosBand";
import Footer from "@/components/Footer";
import "../styles/global.css";

export default function Home() {
  return (
    <>
      <Navigation />
      <Hero />
      <HomeCards />
      <HowItWorks />
      <Features />
      <LogosBand />
      <Footer />
    </>
  );
}
