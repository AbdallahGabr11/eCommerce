import HomeCards from '../components/HomeCards';
import ProductListings from '../components/ProductListings';
import ViewAllProducts from '../components/ViewAllProducts';
import MovingHero from '../components/MovingHero';


const HomePage = () => {
  return (
    <>
    <MovingHero />
      <HomeCards />
      <ProductListings isHome={true} />
      <ViewAllProducts />
    </>
  );
};
export default HomePage;
