import React, { useState } from 'react';
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Cart from './pages/Cart';
import Products from './pages/Products';
import Admin from './pages/Admin';
import ProductPage, {productLoader} from './pages/ProductPage';
import AddProduct from './pages/AddProduct';
import EditProduct from './pages/EditProduct';
import Logout from './pages/Logout';
import EditUser from './pages/EditUser';
import AddUser from './pages/AddUser';
import DeleteProduct from './pages/DeleteProduct';
import DeleteUser from './pages/DeleteUser';
import Profile, {userLoader} from './pages/Profile';

export const userContext=React.createContext(); // make loggedContext and userContext then wrap one above another


const App = () => {
  const [user, setUser] = useState(null);

  // Add New Product
  const addProduct = async (newProduct) => {
    const res = await fetch('/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newProduct),
    });
    return;
  };

  // Update User
  const editUser = async (user) => {
    const res = await fetch(`/api/users/${user.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    return;
  };

    // Update Product
    const updateProduct = async (product) => {
      const res = await fetch(`/api/products/${product.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });
      return;
    };

    // Add New User
    const addUser = async (newUser) => {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });
      return;
    };


  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route 
        path='/Cart' 
        element={<Cart />} 
        />
        <Route path='/Admin' element={<Admin />} />
        <Route path='/Logout' element={<Logout />} />
        <Route path='/Signup' element={<Signup addUserSubmit={addUser} />} />
        <Route path='/Add-User' element={<AddUser addUserSubmit={addUser} />} />
        <Route path="/Products" element={<Products />} />
        <Route path="/Add-Product" element={<AddProduct addProductSubmit={addProduct} />} />
        <Route 
        path='/Login' 
        element={<Login />} 
        />
        <Route 
        path='/Profile/:id' 
        element={<Profile editUserSubmit={editUser} />}
        loader={userLoader}  
        />
        <Route 
        path='/Edit-User/:id' 
        element={<EditUser editUserSubmit={editUser} />}
        loader={userLoader}  
        />
        <Route 
        path="/Edit-Product/:id" 
        element={<EditProduct updateProductSubmit={updateProduct} />}
        loader={productLoader} 
        />
        <Route 
        path='/Products/:id'
        element={<ProductPage />}
        loader={productLoader}
        />
        <Route 
        path='/Delete-User/:id'
        element={<DeleteUser />}
        />
        <Route 
        path='/Delete-Product/:id'
        element={<DeleteProduct />}
        />
        <Route path='*' element={<NotFoundPage />} />
      </Route>
    )
  );

  return (<userContext.Provider value={[user, setUser]} > <RouterProvider router={router} /></userContext.Provider>);
};
export default App;
