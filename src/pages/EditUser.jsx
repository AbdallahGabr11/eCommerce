import React, { useContext, useState, useEffect } from 'react';
import { useParams, useLoaderData, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { userContext } from '../App';


const EditUser = ({ editUserSubmit }) => {
  const user = useLoaderData();
  const [User, setUser] = useContext(userContext);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState(user.password);
  const [fName, setFName] = useState(user.fName);
  const [lName, setLName] = useState(user.lName);
  const [telephone, setTelephone] = useState(user.telephone);
  const [address, setAddress] = useState(user.address);
  const [showPassword, setShowPassword] = useState(false);


  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if(!User || User.isAdmin != true)
    return navigate('/Login');
    }, []);

  const submitForm = (e) => {
    e.preventDefault();

    const updateUser = {
      id,
      isAdmin:user.isAdmin,
      email,
      password,
      fName,
      lName,
      telephone,
      address,
    };

    editUserSubmit(updateUser);
    toast.success('User Updated Successfully');

    return navigate('/Admin');
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
              Edit Account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={submitForm}>
            <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                <input 
                 type="email" 
                 name="email" 
                 id="email" 
                 className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                 placeholder="name@company.com" 
                 required
                 value={email}
                 onChange={(e) => setEmail(e.target.value)}
                 />
              </div>
              <div className="relative flex items-center">
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  name="password" 
                  id="password" 
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                  placeholder="Password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center pr-3 focus:outline-none"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? ( <FaEye  />) : (<FaEyeSlash  />)}
                </button>
               </div>
              <div className="flex space-x-4">
                <div className="flex-1">
                  <label htmlFor="firstName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First Name</label>
                  <input 
                  type="text" 
                  name="firstName" 
                  id="firstName" 
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                  placeholder="First Name" 
                  required 
                  value={fName}
                  onChange={(e) => setFName(e.target.value)}
                  />
                </div>
                <div className="flex-1">
                  <label htmlFor="lastName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last Name</label>
                  <input 
                  type="text" 
                  name="lastName" 
                  id="lastName" 
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                  placeholder="Last Name" 
                  required
                  value={lName}
                  onChange={(e) => setLName(e.target.value)} 
                  />
                </div>
              </div>
              <div>
                <label htmlFor="telephone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Telephone</label>
                <input 
                type="tel" 
                name="telephone" 
                id="telephone" 
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                placeholder="Telephone" 
                required 
                value={telephone}
                onChange={(e) => setTelephone(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address</label>
                <input 
                type="text" 
                name="address" 
                id="address" 
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                placeholder="City, Country, Street, Building No" 
                required 
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-700 dark:hover:bg-zinc-700 dark:focus:ring-primary-800">Update Account</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditUser;
