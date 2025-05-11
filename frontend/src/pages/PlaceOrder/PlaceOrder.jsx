import React, { useContext, useEffect, useState } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../Context/StoreContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const PlaceOrder = () => {
  const {getTotalCartAmount,token,food_list,cartItems,url} = useContext (StoreContext)

  const [data,setData] = useState({
    firstName:"",
    lastName:"",
    email:"",
    street:"",
    city:"",
    state:"",
    zipcode:"",
    country:"",
    phone:"",
  }) 
  const onChangeHandler = (event)=>{
    const name = event.target.name;
    const value = event.target.value;
    setData(data=>({...data,[name]:value}))
  }

  const placeOrder = async (event)=>{
    event.preventDefault();
    let orderItems = [];
    food_list.map((item)=>{
      if(cartItems[item._id]>0){
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    })
    // console.log(orderItems);
    let orderData = {
      address:data,
      items:orderItems,
      amount:getTotalCartAmount()+2,

    }
    let response = await axios.post(url+"/api/order/place",orderData,{headers:{token}})
    if(response.data.success){
      const {session_url}= response.data;
      window.location.replace(session_url);
    }
    else{
      alert("Error")
    }

  }
  const navigate = useNavigate();
  useEffect(()=>{
    if(!token){
      navigate('/cart')
    }
    else if (getTotalCartAmount()===0){
      navigate('/cart')
    }
  },[token])

  // useEffect(()=>{
  //   console.log(data)
  // },[data])
  return ( 
    <form onSubmit={placeOrder} className='place-order'>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input required type="text" name='firstName' value={data.firstName} onChange={onChangeHandler} placeholder='first name' />
          <input required  type="text" name='lastName' value={data.lastName} onChange={onChangeHandler} placeholder='last name' />
        </div>
        <input required  type="email" name='email' value={data.email} onChange={onChangeHandler} placeholder='Email Address' />
        <input required  type="text" name='street' value={data.street} onChange={onChangeHandler} placeholder='Street' />
        <div className="multi-fields">
          <input required  type="text" name='city' value={data.city} onChange={onChangeHandler} placeholder='City' />
          <input required  type="text"  name='state' value={data.state} onChange={onChangeHandler}  placeholder='State' />
        </div>
        <div className="multi-fields">
          <input required  type="text"  name='zipcode' value={data.zipcode} onChange={onChangeHandler}  placeholder='Zip Code' />
          <input required  type="text"  name='country' value={data.country} onChange={onChangeHandler}  placeholder='Country' />
        </div>
        <input required  type="text"  name='phone' value={data.phone} onChange={onChangeHandler} placeholder='Phone' />
      </div>
      <div className="place-order-right">
      <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
          
          <div className="cart-total-details">
            <p>Sub totals</p>
            <p>${getTotalCartAmount()}</p>
          </div>
          <hr/>
          <div className="cart-total-details">
            <p>Delivery Fee</p>
            <p>${getTotalCartAmount()===0?0:2}</p>
          </div>
          <hr/>
          <div className="cart-total-details">
            <p>Total</p>
            <p>${getTotalCartAmount()===0?0:getTotalCartAmount()+2}</p>
          </div>

          </div>
          {/* <button type='submit' onClick={()=>navigate('/order')}>PROCEED TO PAYMENT</button> */}
          <button type='submit' >PROCEED TO PAYMENT</button>
          
        </div>

      </div>
      
    </form>
  )
}

export default PlaceOrder
