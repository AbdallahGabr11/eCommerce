import React, { useState, useContext } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { userContext } from '../App';


const ProductPage = () => {
  const [User, setUser] = useContext(userContext);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  const product = useLoaderData();

  const totalPrice = quantity * product.price;

  const submitForm = async (e) =>{
    e.preventDefault()

  if(!User)
    return navigate('/Login');

  const newCart = { ...User.cart };

  const existingQuantity = parseInt(newCart[product.id]) || 0;

  newCart[product.id] = (existingQuantity + parseInt(quantity)).toString();

  const updateCart = {
    cart: newCart,
  };

  console.log(updateCart);
  const res = await fetch(`/api/users/${User.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updateCart),
  });
    
    // Update the user context with the new user data
    const updatedUser = { ...User, cart: newCart };
    setUser(updatedUser);

    toast.success('Product added to the cart successfully');

    return navigate('/Products');
  }


  const productImageStyle = {
    width: '700px',
    height: '700px',
  };

  return (
    <>
      <section>
        <div className='container m-auto py-6 px-6'>
          <Link
            to='/Products'
            className='text-indigo-500 hover:text-indigo-600 flex items-center'
          >
            <FaArrowLeft className='mr-2' /> Back to product Listings
          </Link>
        </div>
      </section>

      <section className='bg-indigo-50'>
        <div className='container m-auto py-10 px-6'>
          <div className='grid grid-cols-1 md:grid-cols-70/30 w-full gap-6'>
            <main>
              <div className='bg-white p-6 rounded-lg shadow-md text-center md:text-left'>
                <div className='text-gray-500 mb-4 font-bold'>{product.brand}</div>
                <img className="p-8 rounded-t-lg" src={product.image} alt={product.name} style={productImageStyle} />
                <div className='text-gray-500 mb-4 flex align-middle justify-center md:justify-start'>
                  <p className='text-orange-700 font-bold text-lg'>{product.name}</p>
                </div>
                <p className='text-2xl mb-4 font-bold'>${product.price} <span className='text-lg'>({product.quantity})</span></p>
              </div>

              <div className='bg-white p-6 rounded-lg shadow-md mt-6'>
                <h3 className='text-indigo-800 text-lg font-bold mb-6'>
                  Product Description
                </h3>
                <p className='mb-4'>{product.description}</p>
              </div>
            </main>

            {/* <!-- Sidebar --> */}
            <aside>
              <div className='bg-white p-6 rounded-lg shadow-md'>
                <h3 className='text-2xl font-bold mb-6 red'>Supplier Information</h3>

                <h2 className='text-xl font-bold text-indigo-600'>{product.supplier.name}</h2>

                <p className='my-2'>{product.supplier.description}</p>

                <hr className='my-4' />

                <h3 className='text-xl'>Contact Email:</h3>

                <p className='my-2 bg-indigo-100 p-2 font-bold'>
                  {product.supplier.contactEmail}
                </p>

                <h3 className='text-xl'>Contact Phone:</h3>

                <p className='my-2 bg-indigo-100 p-2 font-bold'>
                  {' '}
                  {product.supplier.contactPhone}
                </p>
              </div>
              <div className='bg-white p-6 rounded-lg shadow-md mt-6'>
            <form onSubmit={submitForm}>
                <input
                type="number"
                id='price'
                name='price'
                className='border rounded w-full py-2 px-3 mb-2 text-lg'
                placeholder='Product Price'
                required
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                min={1}
                max={product.quantity}
                />
                <p className='mb-4 text-lg'>Total Cost: ${totalPrice}</p>
                <button
                  type="submit"
                  className='bg-zinc-800 hover:bg-zinc-900 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block'
                >
                  Add To Cart
                </button>
                </form>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
};

const productLoader = async ({ params }) => {
    try {
  const res = await fetch(`/api/products/${params.id}`);
  const data = await res.json();
  return data;
    }catch (error) {   
      // window.location='/404';   
    console.log('Error fetching data', error);
    return ;
  } 
};

export { ProductPage as default, productLoader };