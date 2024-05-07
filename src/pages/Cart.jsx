import React, { useState, useEffect, useContext } from 'react';
import { userContext } from '../App';
import { Link, useNavigate } from 'react-router-dom';
import { FaAngleLeft } from 'react-icons/fa';
import { toast } from 'react-toastify';

const Cart = () => {
  const [User, setUser] = useContext(userContext);
  const navigate = useNavigate();
  const [showCheckout, setShowCheckout] = useState(false);
  const [totalPrice, setTotalPrice] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [creditCardInfo, setCreditCardInfo] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  const [cardNumber, setCardNumber] = useState();
  const [expiryDate, setExpiryDate] = useState();
  const [cvv, setCvv] = useState();

  const [cart, setCart] = useState([]);

  const fetchProduct=async (id)=>{
    try {
      const res = await fetch('/api/user/product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ productId:id })
      });
      
      if (!res.ok) {
        throw new Error('Failed to fetch product');
      }
  
      const data = await res.json();
      return data.product;
    }catch (error) {   
      // window.location='/404';   
    console.log('Error fetching data', error);
    return ;
  } 
  }


  useEffect(() => {
    if (!User) {
      return navigate('/Login');
    }
  
    const fetchCartItems = async () => {
      try {
        const apiUrl = '/api/getCart';
        const res = await fetch(apiUrl);
        if (!res.ok) {
          throw new Error('Failed to fetch cart');
        }
        const data = await res.json();
        const cartItems = data.cartItems;
        setTotalPrice(data.cart.totalPrice);
  
        // Fetch product details for each cart item concurrently
        const productPromises = cartItems.map((cartItem) => fetchProduct(cartItem.productId));
        const products = await Promise.all(productPromises);
  
        // Combine cart items with product details
        const itemsWithProducts = cartItems.map((cartItem, index) => ({
          ...cartItem,
          product: products[index], // Assuming the order matches
        }));
        console.log(itemsWithProducts)
        setCart(itemsWithProducts);
      } catch (error) {
        console.error('Error fetching cart', error);
      }
    };
  
    fetchCartItems();
  }, [User, navigate]);
  
  

  const handleCheckout = () => {
    setShowCheckout(true);
  };

  const handlePaymentMethodSelect = (method) => {
    setPaymentMethod(method);
  };

  const handleCreditCardInfoChange = (e) => {
    const { name, value } = e.target;
    setCreditCardInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleRemoveFromCart = async (id,index) => {
    if (!User) {
      return navigate('/Login');
    }

    const confirm = window.confirm('Are you sure you want to delete this product?');

    if (!confirm) return;

    delete cart.cartItems[index];

    const res = await fetch(`/deleteItem/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });

    if (res.ok) {
        toast.success('Product removed from the cart successfully');
        
      } else {
        toast.error('Failed to remove product from the cart');
      }
      setTimeout(()=>{
        return navigate('/Cart');
      },100);
  };

  const handleQuantityChange = (e, price ,index) => {
    const newQuantity = parseInt(e.target.value);
    if (newQuantity < 1) {
      return;
    }
      q=newQuantity-cart.cartItems[index].quantity;
      setTotalPrice(totalPrice+q*price);
      cart.cartItems[index].quantity=newQuantity;
    // const updatedCart = { ...User.cart, [productId]: newQuantity.toString() };
    // const updatedUser = { ...User, cart: updatedCart };
    // setUser(updatedUser);

    // updateCartInServer(updatedCart);
  };

  const handleCompletedCheckout = async () => {
    if (!User) {
      return navigate('/Login');
    }

    const confirm = window.confirm('Are you sure you want to complete this order?');

    if (!confirm) return;

    const checkoutCart = {
      cardNumber:creditCardInfo.cardNumber,
      expiryDate:creditCardInfo.expiryDate,
      cvv:creditCardInfo.cvv,
    };

    try {
      const res = await fetch('/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(checkoutCart),
      });
      if (res.ok) {
        toast.success('Successful Checkout');
        navigate('/');
    } else {
        // If response status indicates an error, handle it here
        const errorData = await res.json(); // Parse the response JSON
        const errorMessage = errorData.error; // Extract the error message
        setShowInvalidMessage(errorMessage);
        console.log(errorMessage);
    }
      return navigate('/');
    } catch (error) {
      console.log('Error fetching Checkout', error);
      return;
    }
  };

  const checkoutTransitionStyles = {
    transition: 'transform 1s ease-in-out',
    transform: 'translateX(0)',
  };

  // const updateCartInServer = async (updatedCart) => {
  //   // Implement logic to update cart in the server
  // };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="py-12">
        <div className="max-w-5xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 bg-white border-b border-gray-200">
              <h1 className="text-4xl font-semibold mb-4">Shopping Cart</h1>
              { 0 ? (
                <p>Your cart is empty.</p>
              ) : (
                <>
                   {cart.map((item, index) => (
                    <div key={index} className="border-b border-gray-200 mb-4 pb-4 ">
                      <div className="bg-white border border-gray-200 rounded-lg shadow dark:bg-white dark:border-zinc-300 w-500 " style={{ width: '600px' }}>
                        <div className="flex items-center justify-between">
                          <img
                            className="p-4"
                            src={item.product.productImageUrl}
                            alt="product image"
                            style={{ width: '110px', height: '110px' }}
                          />
                          <div className="px-5">
                          <Link to={`/Products/${item.product.productId}`} className="text-blue-900 hover:underline">
                            <h5 className="text-xl font-semibold tracking-tight px-6 py-2">
                              {item.product.productName.length > 20 ? item.product.productName.substring(0, 18) + '...' : item.product.productName}
                            </h5>
                            </Link>
                            <div className="flex items-center justify-start">
                              <span className="text-2xl font-bold text-gray-900 dark:text-black px-6 py-2">{`$${item.product.price}`}</span>
                              <input
                                type="number"
                                value={item.product.quantity}
                                onChange={(e) => handleQuantityChange(e, item.product.price, index)}
                                min="1"
                                className="border border-gray-300 rounded-md px-2 py-1 ml-4 w-16"
                              />
                              <button
                                className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 ml-4"
                                onClick={() => handleRemoveFromCart(item.product.productId, index)}
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="mt-4">
                    <p className="mb-4 text-2xl font-bold">Total Price: ${Math.round(totalPrice)}</p>
                    <button onClick={handleCheckout} className="bg-zinc-800 hover:bg-zinc-900 text-white px-4 py-2 mt-4 font-medium rounded-lg">
                      Checkout
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      {showCheckout && (
  <>
    <div className="fixed top-0 left-0 z-40 w-full h-full bg-black opacity-75 backdrop-blur-lg"></div>
    <div className="fixed top-0 right-0 z-50 w-1/2 h-full bg-white shadow-lg p-8" style={checkoutTransitionStyles}>
      <h2 className="text-2xl font-semibold mb-4">Checkout</h2>
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Select Payment Method</h3>
        <div className="flex items-center mb-4">
          <input
            type="radio"
            id="cashOnDelivery"
            name="paymentMethod"
            value="cashOnDelivery"
            checked={paymentMethod === 'cashOnDelivery'}
            onChange={() => handlePaymentMethodSelect('cashOnDelivery')}
            className="mr-2"
          />
          <label htmlFor="cashOnDelivery" className="text-lg font-medium cursor-pointer">Cash on Delivery</label>
        </div>
        <div className="flex items-center mb-4">
          <input
            type="radio"
            id="creditCard"
            name="paymentMethod"
            value="creditCard"
            checked={paymentMethod === 'creditCard'}
            onChange={() => handlePaymentMethodSelect('creditCard')}
            className="mr-2"
          />
          <label htmlFor="creditCard" className="text-lg font-medium cursor-pointer">Pay with Credit Card</label>
        </div>
      </div>
      {paymentMethod === 'creditCard' && (
        <div>
          <h3 className="text-lg font-semibold mb-2">Enter Credit Card Information</h3>
          <input
            type="text"
            name="cardNumber"
            placeholder="Credit Card Number"
            value={creditCardInfo.cardNumber}
            onChange={handleCreditCardInfoChange}
            required
            className="border border-gray-300 rounded-md px-4 py-2 mb-4 w-full"
          />
          <input
            type="text"
            name="expiryDate"
            placeholder="Expiry Date"
            value={creditCardInfo.expiryDate}
            onChange={handleCreditCardInfoChange}
            required
            className="border border-gray-300 rounded-md px-4 py-2 mb-4 w-full"
          />
          <input
            type="text"
            name="cvv"
            placeholder="CVV"
            value={creditCardInfo.cvv}
            onChange={handleCreditCardInfoChange}
            required
            className="border border-gray-300 rounded-md px-4 py-2 mb-4 w-full"
          />
        </div>
      )}
                    {showInvalidMessage!="" && ( // Conditionally render invalid message
                                <p className="text-sm font-light text-red-600 font-semibold dark:text-red-700">
                                    {/* Invalid email or password */}
                                    {showInvalidMessage}
                                    {console.log(showInvalidMessage)}
                                    
                                </p>
                            )}
      {/* Checkout button */}
      <button disabled={!paymentMethod} onClick={handleCompletedCheckout} className={`bg-zinc-800 hover:bg-zinc-900 text-white px-4 py-2 mt-4 font-medium rounded-lg ${!paymentMethod ? 'opacity-50 cursor-not-allowed' : ''}`}>
        Checkout
      </button>
      <p className="mb-4 text-2xl font-bold py-6">Total Price: ${Math.round(totalPrice)}</p>
      {/* Return to cart button */}
      <button onClick={() => setShowCheckout(false)} className="bg-red-600 hover:bg-red-700 font-bold text-white px-3 py-2 rounded-lg focus:outline-none focus:shadow-outline flex items-center">
        <FaAngleLeft className="mr-2" /> Return to Cart
      </button>
    </div>
  </>
)}
    </div>
  );
};

export default Cart;
