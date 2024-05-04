import React,{useEffect, useContext} from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { userContext } from '../App';

const DeleteUser = () => {
    const [user, setUser] = useContext(userContext);

    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if(!user || user.isAdmin != true)
        return navigate('/Login');

        const onDeleteUserClick = async () => {    
            const res = await fetch(`/api/users/${id}`, {
                method: 'DELETE',
              }); 

                navigate('/Admin');
            };
            onDeleteUserClick();

        }, []);


  return (<></>)
}

export default DeleteUser