import React,{useEffect, useContext} from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { userContext } from '../App';

const DeleteUser = () => {
    const [user, setUser] = useContext(userContext);

    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if(!user || user.type != 'admin')
        return navigate('/Login');

        const onDeleteUserClick = async () => {    
          const res = await fetch('/api/admin/deleteUser', {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userId:id })
          });
          
          if (!res.ok) {
            throw new Error('Failed to delete user');
          }
                navigate('/Admin');
            };
            
            onDeleteUserClick();

        }, []);


  return (<></>)
}

export default DeleteUser