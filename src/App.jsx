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
export const cartItemCount=React.createContext(); 

const App = () => {
  const [user, setUser] = useState(null);
  const [itemCount, setItemCount] = useState(0);

  // Add New Product
  // const addProduct = async (newProduct) => {
  //   const res = await fetch('/api/products', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(newProduct),
  //   });
  //   return;
  // };

  // Update User
  const editUser = async (user) => {
    const res = await fetch(`/api/admin/editUser`, {
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
      const res = await fetch(`/api/admin/editProduct`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });
      return;
    };

    // Add New User
    // const addUser = async (newUser) => {
    //   const res = await fetch('/api/users', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(newUser),
    //   });
    //   return;
    // };

// Add New User

    const addUser = async (newUser) => {
      try {
      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });
      return res;
    } catch (error) {
      console.log('Error fetching users', error);
      return;
    }
    };

    // Add New Product

    const addProduct = async (newProduct) => {
      try {
        const res = await fetch('/api/admin/addProduct', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newProduct),
        });
        if (!res.ok) {
          throw new Error('Failed to add product');
        }
        return await res.json();
      } catch (error) {
        throw new Error('Failed to add product');
      }
    };

    // get all users
    const fetchUsers = async () => {
      const apiUrl = '/api/users'; 
      try {
        const res = await fetch(apiUrl);
        const data = await res.json();
        return data.users;
      } catch (error) {
        console.log('Error fetching users', error);
        return;
      }
    };

    // get all products

    const fetchProducts = async () => {
      const apiUrl = '/api/user/products'; 
      try {
        const res = await fetch(apiUrl);
        const data = await res.json();
        return data.products;
      } catch (error) {
        console.log('Error fetching products', error);
        return;
      }
    };

    const fetchCart = async () => {
      const apiUrl = '/api/getCart'; 
      try {
        if(user){
          const res = await fetch(apiUrl);
        const data = await res.json();
        
        setItemCount(data.itemCount);
        

        }else{
          setItemCount(0);
        }
        
      } catch (error) {
        console.log('Error fetching Cart', error);
      }
    };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route 
        path='/Cart' 
        element={<Cart />} 
        />
        <Route path='/Admin' element={<Admin fetchUsers={fetchUsers}  fetchProducts={fetchProducts}/>} />
        <Route path='/Logout' element={<Logout />} />
        <Route path='/Signup' element={<Signup addUser={addUser} />} />
        <Route path='/Add-User' element={<AddUser addUser={addUser} fetchUsers={fetchUsers}/>} />
        <Route path="/Products" element={<Products />} />
        <Route path="/Add-Product" element={<AddProduct addProduct={addProduct} fetchProducts={fetchProducts} />} />
        <Route 
        path='/Login' 
        element={<Login />} 
        />
        <Route 
        path='/Profile/:id' 
        element={<Profile  editUserSubmit={editUser} />} 
        loader={userLoader}  
        />
        <Route 
        path='/Edit-User/:id' 
        element={<EditUser fetchUsers={fetchUsers} editUserSubmit={editUser} />}
        loader={userLoader}  
        />

        <Route 
        path="/Edit-Product/:id" 
        
        element={<EditProduct updateProductSubmit={updateProduct} fetchProducts={fetchProducts} />}
        loader={productLoader} 
        />
        <Route 
        path='/Products/:id'
        element={<ProductPage fetchCart={fetchCart}/>}
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

  return (<userContext.Provider value={[user, setUser]} > <cartItemCount.Provider value={[itemCount, setItemCount]} ><RouterProvider router={router} /> </cartItemCount.Provider></userContext.Provider>);
};
export default App;
