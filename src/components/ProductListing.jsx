import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { userContext,itemCountContext } from '../App';

const ProductListing = ({ product }) => {
  const [User, setUser] = useContext(userContext);
  const [itemCount, setItemCount] = useContext(itemCountContext);
  const navigate = useNavigate();



    const name = product.productName.length > 36 ? product.productName.substring(0, 34) + '...': product.productName;

    const borderStyle={
        width: '330px',
        height: '440px',
    }
    const productImageStyle = {
        width: '320px',
        height: '340px',
      };

  const onAddToCartClick = async (productId) => {
        if(!User)
          return navigate('/Login');

  //const newCart = { ...User.cart };

  const existingQuantity = 1;

 // newCart[productId] = (existingQuantity + 1).toString();

  const updateCart = {
    productId,
    quantity:existingQuantity
  };

  console.log(updateCart);
  const res = await fetch(`/api/addToCart`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updateCart),
  });
    setItemCount(itemCount+existingQuantity);
    // const updatedUser = { ...User, cart: newCart };
    // setUser(updatedUser);

    toast.success('Product added to the cart successfully');
  setTimeOut(()=>{
        return ;
  },100)
  };

    

  return (
    <div className='bg-white rounded-xl shadow-md relative'>
      <div className='p-4'>
      <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-white dark:border-zinc-300" style={borderStyle}>
            <Link to ={`/Products/${product.productId}`}>
                <img className="p-8 rounded-t-lg" src={product.productImageUrl} alt="product image" style={productImageStyle} />
            </Link>
            <div className="px-5 pb-5">
                <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-black">{name}</h5>
                <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-gray-900 dark:text-black">${product.price}</span> 
                    <button 
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-stone-800 dark:hover:bg-stone-900 dark:focus:ring-blue-800"
                     onClick={() => onAddToCartClick(product.productId)}
                     >
                      Add to cart
                     </button>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};
export default ProductListing;
