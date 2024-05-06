import { useState, useEffect, useContext } from 'react';
import { Link , useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { toast } from 'react-toastify';
import { userContext } from '../App';




const Login = () => {
    const [User, setUser] = useContext(userContext);
    //const [users, setUsers] = useState([]);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showInvalidMessage, setShowInvalidMessage] = useState(""); 
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    // useEffect(() => {
    //     const fetchUsers = async () => {
    //       const apiUrl = '/api/login'; 
    //       try {
    //         const res = await fetch(apiUrl);
    //         const data = await res.json();
    //         setUsers(data);
    //       } catch (error) {
    //         //console.log('Error fetching data', error);
    //         setShowInvalidMessage(true);
    //       }
    //     };
    
    //     fetchUsers();
    // }, []);


    const submitForm = (e ) => {
        e.preventDefault();
        const newUser = {
            password,
            email,
            
          };
        // const user = users.find(u => u.email.toString() === email);

        // if (user === undefined || user.password != password) {
        //    // setShowInvalidMessage(true); // Show invalid message if user is undefined
        // } else {  
        // //   setIsLogged(true);
        // setUser(user);


        const fetchUsers = async () => {
            const apiUrl = '/api/login'; 
            try {
                const res = await fetch(apiUrl , {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newUser),
                });
                
                if (res.ok) {
                    // If response status is within the 200-299 range, it means success
                    const response = await res.json();
                    setUser(response.data);
                    toast.success('User Logged in Successfully');
                    if(response.data.type=="user"){
                        navigate('/');
                    }else{
                        navigate('/Admin');
                    }
                    
                } 
                else {
                    // If response status indicates an error, handle it here
                    const errorData = await res.json(); // Parse the response JSON
                    const errorMessage = errorData.error; // Extract the error message
                    setShowInvalidMessage(errorMessage);
                }
            } catch (error) {
                // Handle network errors or other exceptions here
                setShowInvalidMessage('Error fetching data: ' + error.message);
            }
        };
        
        fetchUsers();
        
    };

    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <h1 className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                    Welcome back    
                </h1>
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-1xl dark:text-white">
                            Sign in to your account
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={submitForm}>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Your email
                                </label>
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
                                placeholder="Your Password" 
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
                            {showInvalidMessage!="" && ( // Conditionally render invalid message
                                <p className="text-sm font-light text-red-600 font-semibold dark:text-red-700">
                                    {/* Invalid email or password */}
                                    {showInvalidMessage}
                                    {console.log(showInvalidMessage)}
                                    
                                </p>
                            )}
                            <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-700 dark:hover:bg-zinc-700 dark:focus:ring-primary-800">Sign in</button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Don’t have an account yet? <Link to="/Signup" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};


export default Login;
