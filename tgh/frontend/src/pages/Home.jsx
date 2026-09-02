
import CategorySection from "../components/home/CategorySection";
import FashionBanner from "../components/home/FashionBanner";
import FeaturesBar from "../components/home/FeaturesBar";
import Hero from "../components/home/Hero";
import MarqueeBanner from "../components/home/MarqueeBanner";
import NewArrivals from "../components/home/NewArrivals";
import OfferCards from "../components/home/OfferCards";
import TrendingProducts from "../components/home/TrendingProducts";

const Home = () => {
  return (
    <>
      <Hero />
      <MarqueeBanner />
      <CategorySection />
      <TrendingProducts />
      <OfferCards />
      
      <FeaturesBar />
      <NewArrivals />
      <FashionBanner />
      
    </>
  );
};

export default Home;