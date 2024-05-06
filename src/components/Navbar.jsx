import { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../assets/images/logo3.png';
import CartIcon from './CartIcon';
import { userContext } from '../App';

const Navbar = () => {
  const [user, setUser] = useContext(userContext);
  const [itemCount, setItemCount] = useState(0);

  useEffect(() => {
    if (user && user.cart) {
      const totalItems = Object.values(user.cart).reduce((acc, curr) => acc + parseInt(curr), 0);
      setItemCount(totalItems);
    } else {
      setItemCount(0);
    }
  }, [user]);



  const linkClass = ({ isActive }) =>
    isActive
      ? 'bg-black text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2'
      : 'text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2';

  return (
    <nav className='bg-indigo-700 border-b border-indigo-500'>
      <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
        <div className='flex h-20 items-center justify-between'>
          <div className='flex flex-1 items-center justify-center md:items-stretch md:justify-start'>
            <NavLink className='flex flex-shrink-0 items-center mr-4' to='/'>
              <img className='h-10 w-auto' src={logo} alt='React Jobs' />
              <span className='hidden md:block text-white text-2xl font-bold ml-2'>
                Online Shopping
              </span>
            </NavLink>
            <div className='md:ml-auto'>
              <div className='flex space-x-2'>
              {(user != null) ? (
                  <NavLink to={`/Profile/${user.id}`} className={linkClass}>
                    Profile
                  </NavLink>
                ) : (
                  ''
                )}
                {(user != null && user.type == "admin") ? (
                  <NavLink to='/Admin' className={linkClass}>
                    Admin Panel
                  </NavLink>
                ) : (
                  ''
                )}
                <NavLink to='/' className={linkClass}>
                  Home
                </NavLink>
                <NavLink to='/Products' className={linkClass}>
                  Products
                </NavLink>
                {user != null ? (
                  <NavLink to='/Logout' className={linkClass}>
                    Logout
                  </NavLink>
                ) : (
                  <NavLink to='/Login' className={linkClass}>
                    Login
                  </NavLink>
                )}
                <NavLink to='/Cart' className={linkClass}>
                  <CartIcon itemCount={itemCount} />
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
