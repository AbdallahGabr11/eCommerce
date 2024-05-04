import React,{useEffect, useContext} from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { userContext } from '../App';

const DeleteProduct = () => {
    const [user, setUser] = useContext(userContext);

    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if(!user || user.isAdmin != true)
        return navigate('/Login');

        const onDeleteProductClick = async () => {    
            const res = await fetch(`/api/products/${id}`, {
                method: 'DELETE',
              }); 
              
                navigate('/Admin');
            };
            
            onDeleteProductClick();
        }, []);


  return (<></>)
}

export default DeleteProduct