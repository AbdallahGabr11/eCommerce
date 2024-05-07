import React,{useEffect, useContext} from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { userContext } from '../App';

const DeleteProduct = () => {
    const [user, setUser] = useContext(userContext);

    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if(!user || user.type != "admin")
        return navigate('/Login');

        const onDeleteProductClick = async () => {    
          const res = await fetch('/api/admin/deleteProduct', {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ productId:id })
          });
          
          if (!res.ok) {
            throw new Error('Failed to delete product');
          }
                navigate('/Admin');
            };
            
            onDeleteProductClick();
        }, []);


  return (<></>)
}

export default DeleteProduct