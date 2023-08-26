import React from 'react'
import { StarIcon } from '@chakra-ui/icons';
import { styled } from 'styled-components';
import { Box, Button, Icon } from '@chakra-ui/react';
import { FiHeart, FiShoppingCart } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../Redux/GetProducts/action';


import EditForm from './EditForm';


const ProductCard = ({id,image,name, category, review,company, price,handleEdit}) => {
  const averageRating = review?.reduce((total, reviewItem) => total + reviewItem.rating, 0) / review?.length;

  const products= useSelector(store=>store.productReducer.products)
  const dispatch= useDispatch()

   
  const isAuthAdmin=useSelector(store=>store.authReducer.isAuthAdmin);
   
  // const handleEdit=()=>{
  //   <EditForm id={id} />
  //   console.log("edit")
  // }


  const handleCart=(id)=>{
    const cart= products.find((el)=>el.id===id);
    dispatch(addToCart(cart))
  }
  return (
    <DIV isAuthAdmin={isAuthAdmin} className='card'>
      <Link to={`/singleproduct/${id}/${averageRating.toFixed(1)}`}>
        <div className='image-div'>
        <img src={image} alt="product-img" />
        </div>
      
      </Link>
        <div className='product-details' >
            <h3>{name}</h3>
            <h5>{category}</h5>
            <p>{company}</p>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {Array.from({ length: 5 }, (_, index) => (
            <Box key={index} color={index < Math.floor(averageRating) ? '#FDCC0D' : 'gray'}>
              <StarIcon />
            </Box>
          ))}

       { (review)? (<p style={{ marginLeft: '8px' }}>{averageRating.toFixed(1)}</p>):(<p></p>)  }
        </div>
            <h5>₹ {price}</h5>
          { isAuthAdmin &&
                <div> 
                 <Button onClick={()=>handleEdit(id)}>Edit</Button>
                 <Button>Delete</Button> 
                 </div>  }
        <div className='wishlist-cart'>
          <Icon as={FiHeart} boxSize={6} color='gray.500' _hover={{ color: 'red.500' }} />

            <button onClick={()=>handleCart(id)}>
              <Icon as={FiShoppingCart} boxSize={6} color='gray.500' _hover={{ color: 'green.500' }} />
            </button>

        </div>      

        </div>
       
        
    </DIV>
  )
}

export default ProductCard

const DIV= styled.div`
    /* border: 1px solid red; */
    height: ${({isAuthAdmin})=>(isAuthAdmin? "400px":"300px")};
    /* height: 400px; */
    border-radius: 15px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
    background-color: white;

    &:hover{
      transform: translateY(-5px);
    }
    .image-div{
        width: 80%;
        height: 50%;
        /* border: 2px solid black; */
        margin:auto;
        margin-top: 10px;
    }
    img{
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
    .product-details{
        width: 90%;
        height: 45%;
        margin: auto;
        text-align: start;
        /* border: 1px solid orange; */
        margin-top: 5px;
        position: relative;
    }
    .wishlist-cart{
      width: 10%;
      height: 60%;
      /* border: 1px solid green; */
      display: grid;
      justify-content: space-between;
      position: absolute;
      right: 10%;
      bottom: 15px;

    }
`