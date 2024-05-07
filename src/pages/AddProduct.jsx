import { useContext,useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { userContext } from '../App';

const AddProduct = ({addProduct, fetchProducts}) => {
  const [user, setUser] = useContext(userContext);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [quantity, setQuantity] = useState('');
  const [description, setDescription] = useState('');
  const [brand, setBrand] = useState('');
  const [supplierInformation, setSupplierInformation] = useState('');
  const [supplierName, setSupplierName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    if(!user || user.type != 'admin')
    return navigate('/Login');
    }, []);

  const submitForm = (e) => {
    e.preventDefault();

    const newProduct = {
      productName:name,
      productImageUrl:image,
      price,
      quantity,
      brand,
      
      supplierName,
       supplierInformation,
       description,
      contactEmail,
      contactPhone,
      
    };
    const handleSubmit = async (newProduct) => {
      try {
        await addProduct(newProduct);
        toast.success('Product Added Successfully');
<<<<<<< Updated upstream
        await setProducts(fetchProducts());
=======
         setProducts(fetchProducts());
>>>>>>> Stashed changes
        navigate('/Admin');
      } catch (error) {
        console.error('Error adding product:', error);
        toast.error('Failed to add product');
      }
    };
    
    handleSubmit(newProduct)
  };

  return (
    <section className='bg-indigo-50'>
      <div className='container m-auto max-w-2xl py-24'>
        <div className='bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0'>
          <form onSubmit={submitForm}>
            <h2 className='text-3xl text-center font-semibold mb-6'>Add Product</h2>

            <div className='mb-4'>
              <label
                htmlFor='name'
                className='block text-gray-700 font-bold mb-2'
              >
                Product Name
              </label>
              <input
                type='text'
                id='name'
                name='name'
                className='border rounded w-full py-2 px-3 mb-2'
                placeholder='Product Name'
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className='mb-4'>
              <label 
                htmlFor='price'
                className='block text-gray-700 font-bold mb-2'
                >
                Unit Price ($)
              </label>
              <input
                type="number"
                id='price'
                name='price'
                className='border rounded w-full py-2 px-3 mb-2'
                placeholder='Product Price'
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                min={0.01}
                step={0.01}
              />
            </div>
            <div className='mb-4'>
              <label 
                htmlFor='quantity'
                className='block text-gray-700 font-bold mb-2'
                >
                Number of Available Units
              </label>
              <input
                type="number"
                id='quantity'
                name='quantity'
                className='border rounded w-full py-2 px-3 mb-2'
                placeholder='Available Quantity'
                required
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                min={10}
              />
            </div>
            <div className='mb-4'>
              <label
                htmlFor='description'
                className='block text-gray-700 font-bold mb-2'
              >
                Description
              </label>
              <textarea
                id='description'
                name='description'
                className='border rounded w-full py-2 px-3'
                rows='4'
                placeholder='Add Product Information'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>

            <div className='mb-4'>
              <label
                htmlFor='brand'
                className='block text-gray-700 font-bold mb-2'
              >
                Product Brand
              </label>
              <input
                type='text'
                id='brand'
                name='brand'
                className='border rounded w-full py-2 px-3 mb-2'
                placeholder='Brand'
                required
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
            </div>
            <div className='mb-4'>
              <label
                htmlFor='image'
                className='block text-gray-700 font-bold mb-2'
              >
                Product Image Link
              </label>
              <input
                type='url'
                id='image'
                name='image'
                className='border rounded w-full py-2 px-3 mb-2'
                placeholder='Enter Image URL'
                required
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
            </div>

            <h3 className='text-2xl font-semibold mb-5'>Supplier Information</h3>

            <div className='mb-4'>
              <label
                htmlFor='supplier_name'
                className='block text-gray-700 font-bold mb-2'
              >
                Supplier Name
              </label>
              <input
                type='text'
                id='supplier'
                name='supplier'
                className='border rounded w-full py-2 px-3'
                placeholder='Supplier Name'
                value={supplierName}
                onChange={(e) => setSupplierName(e.target.value)}
              />
            </div>

            <div className='mb-4'>
              <label
                htmlFor='supplier_description'
                className='block text-gray-700 font-bold mb-2'
              >
                Supplier Information
              </label>
              <textarea
                id='supplier_description'
                name='supplier_description'
                className='border rounded w-full py-2 px-3'
                rows='4'
                placeholder='Supplier Information'
                value={supplierInformation}
                onChange={(e) => setSupplierInformation(e.target.value)}
              ></textarea>
            </div>

            <div className='mb-4'>
              <label
                htmlFor='contact_email'
                className='block text-gray-700 font-bold mb-2'
              >
                Contact Email
              </label>
              <input
                type='email'
                id='contact_email'
                name='contact_email'
                className='border rounded w-full py-2 px-3'
                placeholder='Email address for applicants'
                required
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
              />
            </div>
            <div className='mb-4'>
              <label
                htmlFor='contact_phone'
                className='block text-gray-700 font-bold mb-2'
              >
                Contact Phone
              </label>
              <input
                type='tel'
                id='contact_phone'
                name='contact_phone'
                className='border rounded w-full py-2 px-3'
                placeholder='Optional phone for applicants'
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
              />
            </div>

            <div>
              <button
                className='bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline'
                type='submit'
              >
                Add Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
export default AddProduct;