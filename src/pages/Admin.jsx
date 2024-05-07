import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaPlus } from "react-icons/fa6";
import { toast } from 'react-toastify';
import { userContext } from '../App';

const Admin = ({fetchUsers ,fetchProducts}) => {
  const [User, setUser] = useContext(userContext);
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(async () => {
    try {
      const res = await fetch('/api/admin');
      return;
    } catch (error) {
      return navigate('/Login');
    }    
    }, []);

  useEffect(async ()  => {
    await setUsers(fetchUsers());
    await setProducts(fetchProducts());
  }, []);


    const onDeleteProductClick = async (productId) => {
    const confirm = window.confirm(
      'Are you sure you want to delete this product?'
    );

    if (!confirm) return;

    toast.success('Product deleted successfully');


    return navigate(`/Delete-Product/${productId}`);

    };
  

  const onDeleteUserClick = async (userId) => {
    const confirm = window.confirm(
      'Are you sure you want to delete this user?'
    );

    if (!confirm) return;

    toast.success('User deleted successfully');

    return navigate(`/Delete-User/${userId}`);

  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 bg-white border-b border-gray-200">
              <h1 className="text-4xl font-semibold mb-4 text-center">Admin Panel</h1>
              <div className="min-h-screen bg-gray-100">
                <div className="py-12 flex justify-center">
                  <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 grid grid-cols-2 gap-x-20">
                    {/* Users */}
                    <div>
                      <h2 className="text-3xl font-semibold mb-4 flex items-center justify-between">
                        Users
                        <div>
                        <Link to="/Add-User">
                          <button className="bg-green-500 hover:bg-green-600 font-bold text-white px-3 py-1 rounded-full focus:outline-none focus:shadow-outline flex items-center"> <FaPlus className='mr-2' /> New</button>
                        </Link>
                        </div>
                      </h2>
                      <ul>
                        {users.map(user => (
                          <li key={user.userId} className="flex justify-between items-center mb-2">
                            <Link to={`/Edit-User/${user.userId}`} className="text-blue-800 hover:underline">
                              <span>{user.email.length > 30 ? user.email.substring(0, 27) + '...' : user.email}</span>
                              </Link>
                            <div className="space-x-2">
                            <Link to={`/Edit-User/${user.userId}`}>
                              <button className="bg-blue-500 hover:bg-blue-600 font-bold text-white px-4 py-2 rounded-full focus:outline-none focus:shadow-outline mt-4">Edit</button>
                              </Link>
                              {/* <Link to={`/Delete-User/${user.id}`}> */}
                                <button className="bg-red-500 hover:bg-red-600 font-bold text-white px-4 py-2 rounded-full focus:outline-none focus:shadow-outline mt-4" onClick={() => onDeleteUserClick(user.userId)}>Delete</button>
                              {/* </Link> */}
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                    {/* Products */}
                    <div>
                      <h2 className="text-3xl font-semibold mb-4 flex items-center justify-between">
                        Products
                        <div>
                        <Link to="/Add-Product">
                          <button className="bg-green-500 hover:bg-green-600 font-bold text-white px-3 py-1 rounded-full focus:outline-none focus:shadow-outline flex items-center"><FaPlus className='mr-2' />New</button>
                        </Link>
                        </div>
                      </h2>
                      <ul>
                        {products.map(product => (
                          <li key={product.productId} className="flex justify-between items-center mb-2">
                                <Link to={`/Products/${product.productId}`} className="text-blue-800 hover:underline">
                                  <span>{product.productName.length > 30 ? product.productName.substring(0, 27) + '...' : product.productName}</span>
                                </Link>
                            <div className="space-x-2">
                            <Link to={`/Edit-Product/${product.productId}`}>
                              <button className="bg-blue-500 hover:bg-blue-600 font-bold text-white px-4 py-2 rounded-full focus:outline-none focus:shadow-outline mt-4">Edit</button>
                              </Link>
                              {/* <Link to={`/Delete-Product/${product.id}`}> */}
                              <button className="bg-red-500 hover:bg-red-600 font-bold text-white px-4 py-2 rounded-full focus:outline-none focus:shadow-outline mt-4" onClick={() => onDeleteProductClick(product.productId)}>Delete</button>
                              {/* </Link> */}
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
