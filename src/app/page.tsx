import { CatalogSection } from "@/components/home/CatalogSection";
import { FaqSection } from "@/components/home/FaqSection";
import { HeroSection } from "@/components/home/HeroSection";
import { PromoShowcase } from "@/components/home/PromoShowcase";
import { StoreTrustBar } from "@/components/home/StoreTrustBar";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StoreTrustBar />
      <PromoShowcase />
      <CatalogSection />
      <TestimonialsSection />
      <FaqSection />
    </>
  );
}
