
import HeroSection from "@/app/components/client/home/HeroSection";
import TrustProps from "@/app/components/client/home/TrustProps";
import CategoriesSection from "@/app/components/client/home/CategoriesSection";
import FeaturedProducts from "@/app/components/client/home/FeaturedProducts";
import NewArrivals from "@/app/components/client/home/NewArrivals";
import BrandsSection from "@/app/components/client/home/BrandsSection";

export default function Home() {
  return (
    <div className="space-y-16 pb-16">
      <HeroSection />
      <TrustProps />
      <CategoriesSection />
      <FeaturedProducts />
      <NewArrivals />
      <BrandsSection />
    </div>
  );
}