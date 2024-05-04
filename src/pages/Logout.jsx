import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { userContext } from '../App';

const Logout = () => {
  const [user, setUser] = useContext(userContext);
  const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
      setUser(null);
      navigate('/');
    };

    logout();
  }, []);

  return (
  <> 
  </>
  );
}

export default Logout