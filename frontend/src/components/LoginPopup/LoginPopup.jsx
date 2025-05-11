import React, { useContext, useEffect, useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/frontend_assets/assets';
import { StoreContext } from '../../Context/StoreContext';
import axios from 'axios';

const LoginPopup = ({setShowLogin}) => {
    const {url,setToken} = useContext(StoreContext);
    const [currState,setCurrState] = useState("Sign Up");
    // store the data in the state
    // useState is a hook that allows you to add state to a functional component
    const [data,setData] = useState({
        name:"",
        email:"",  
        password:""
    })

   
    // handle the change in the input fields
    // event is the event object that is passed to the function when the event is triggered

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data=>({...data,[name]:value}))
    }

     useEffect(()=>{
        console.log(data);
     },[data])

    const onLogin  = async (event) => {
        event.preventDefault(); // prevent the default behaviour of the form
        let newUrl = url;
        if(currState==="Login"){
            newUrl += "/api/user/login";
        }
        else{
            newUrl += "/api/user/register";
        }
        const response = await axios.post(newUrl,data)
            if(response.data.success){

                setToken(response.data.token); // set the token in the context
                localStorage.setItem("token",response.data.token); // set the token in the local storage
                setShowLogin(false); // close the login popup
            }
            else{
                alert(response.data.message); // show the error message when sucess is false
            }

    }

  return (
    <div className='login-popup'>
        {/* passing onLogin fun to form */}
        <form onSubmit={onLogin} className="login-popup-container">
            <div className="login-popup-title">
                <h2>{currState}</h2>
                <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="" />
            </div>
            <div className="login-popup-inputs">
                {/* give name , onchange, value  in inputs to store store data */}
                {currState==="Login"?<></>:<input type="text" name='name' onChange={onChangeHandler} value={data.name} placeholder='Your Name' required />}
                <input type="email" name='email' onChange={onChangeHandler} value={data.email} placeholder='Your Email' required />
                <input type="password" name='password' onChange={onChangeHandler} value={data.password} placeholder='Your Password' required />
            </div>
            <button type='submit'>{currState==="Sign Up"?"Create Account":"Login"}</button>
            <div className="login-popup-condition">
                <input type="checkbox" required />
                <p>By continuing, i agree to the terms of use & privacy policy</p>
            </div>
            {currState==="Login"?<p>Create a new account ?<span onClick={()=>setCurrState("Sign Up")}>Click here</span></p>:<p>Already have an account ?<span onClick={()=>setCurrState("Login")}>Login here</span></p>}
            
            
        </form>

      
    </div>
  )
}

export default LoginPopup
