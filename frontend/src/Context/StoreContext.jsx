import axios from "axios";
// , useContext
import { createContext, useEffect,useState } from "react";
// import {food_list} from "../assets/frontend_assets/assets";
import { food_list } from "../assets/frontend_assets/assets";


//create context and export
export const StoreContext = createContext(null);

const StoreContextProvider =(props) =>{
 
    // adding items to cart
    const [cartItems,setCartItems] = useState({});

    // give url
    const url = "https://food-delivery-backend-dbo5.onrender.com"
    const [token,setToken] = useState("");
    // tostore the food list in the state direct from db
    const [food_list,setFoodList] = useState([]);

    const addToCart = async (itemId) =>{
        if(!cartItems[itemId]){
            setCartItems((prev)=>({...prev,[itemId]:1}))

        }
        else{
            setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
        }
        if(token){
            await axios.post(url+"/api/cart/add",{itemId},{headers:{token}})
        }

    }
    const removeFromCart = async (itemId)=>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
        if(token){
            await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}})
        }
    }

    // useEffect(()=>{
    //     console.log(cartItems);
    // },[cartItems])
    

    // logic got total amount
    const getTotalCartAmount=() =>{
        let totalAmount = 0;
        for (const item in cartItems){
            if(cartItems[item] >0){
                let itemInfo = food_list.find((product)=>product._id ===item);
                totalAmount+=itemInfo.price * cartItems[item];
            }
        }
        return totalAmount;

    }
    const fetchFoodList = async () => {
        const response = await axios.get(url+"/api/food/list");
        setFoodList(response.data.data);
    }
    const loadCartData = async (token)=>{
        const response = await axios.post(url+"/api/cart/get",{},{headers:{token}});
        setCartItems(response.data.cartData);
    }
    // do not logout while refreshing the page
    useEffect(()=>{
       
        async function loadData() {
            await fetchFoodList();
             // check if token is present in the local storage
        // if yes then set the token in the context and local storage
        if(localStorage.getItem("token")){
            setToken(localStorage.getItem("token"));
            await loadCartData(localStorage.getItem("token"));
        }
            
        }
        loadData();
    },[])

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        // pass url to the context to access it in the components
        url,
        token,
        setToken

    }
    return (
        <StoreContext.Provider
         value = {contextValue}>
            {props.children}
         </StoreContext.Provider>
    )

}
export default StoreContextProvider;
