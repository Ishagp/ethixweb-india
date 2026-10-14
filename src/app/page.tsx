import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Process from "@/components/Process";
import FeaturedWork from "@/components/FeaturedWork";
import WhyEthixweb from "@/components/WhyEthixweb";
import Industries from "@/components/Industries";
import ContactCTA from "@/components/ContactCTA";

export default function Home() {
  return (
    <div className="w-full flex flex-col">
      {/* Hero with value proposition */}
      <Hero />

      {/* Services breakdown */}
      <Services />

      {/* 4-step delivery process */}
      <Process />

      {/* Featured architectural builds */}
      <FeaturedWork />

      {/* Core engineering pillars */}
      <WhyEthixweb />

      {/* Sectors & Indian industry domains */}
      <Industries />

      {/* Primary conversion CTA */}
      <ContactCTA />
    </div>
  );
}
