import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import AIIntelligence from "@/components/AIIntelligence";
import SpotlightSection from "@/components/SpotlightSection";
import WhyOctis from "@/components/WhyOctis";
import Compliance from "@/components/Compliance";
import Pricing from "@/components/Pricing";
import Faq from "@/components/Faq";
import CtaBanner from "@/components/CtaBanner";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen landing-page flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Features />
        <AIIntelligence />
        <SpotlightSection />
        <WhyOctis />
        <Compliance />
        <Pricing />
        <Faq />
        <CtaBanner />
      </main>
      <Footer />
    </div>
  );
}
