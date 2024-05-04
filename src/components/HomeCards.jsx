import { Link } from 'react-router-dom';
import Card from './Card';

const HomeCards = () => {
  return (
    <section className='py-4'>
      <div className='container-xl lg:container m-auto'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg'>
          <Card>
            <h2 className='text-2xl font-bold'>For Customers</h2>
            <p className='mt-2 mb-4'>
            Discover a variety of high-quality products designed specifically to meet your needs. Explore our platform to find the perfect items for your lifestyle            </p>
            <Link
              to='/Products'
              className='inline-block bg-black text-white rounded-lg px-4 py-2 hover:bg-gray-700'
            >
              Browse Products
            </Link>
          </Card>
          <Card bg='bg-indigo-100'>
            <h2 className='text-2xl font-bold'>Join Our Community Today!</h2>
            <p className='mt-2 mb-4'>
            Register now to receive exclusive prices and seamless shopping experiences. Join us and discover a new world of online shopping!            </p>
            <Link
              to='/Signup'
              className='inline-block bg-indigo-500 text-white rounded-lg px-4 py-2 hover:bg-indigo-600'
            >
              Register now
            </Link>
          </Card>
        </div>
      </div>
    </section>
  );
};
export default HomeCards;
