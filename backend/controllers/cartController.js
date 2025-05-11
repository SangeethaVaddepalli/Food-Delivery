import userModel from "../models/userModel.js"
//add items to user cart
const addToCart = async (req,res)=>{
    try{
        // let userData = await userModel.findOne({_id:req.body.userId});
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        if(!cartData[req.body.itemId])
        {
            // if dont have an item in cart 
            cartData[req.body.itemId]=1
        }
        else{
            // if already have an item in cart 
            cartData[req.body.itemId]+=1
        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartData});
        res.json({success:true,message:"Added To Cart"});
    }catch(error){
        console.log(error);
        res.json({success:false,message:"Error"})
    }

}
//remove items to from cart
const removeFromCart = async (req,res)=>{
    try{
        // getting user data by id
        let userData = await userModel.findById(req.body.userId);
        // getting cartdata from userdata
        let cartData = await userData.cartData;
        //  check if that item is present in cart
        if(cartData[req.body.itemId]>0){
            //  if yes delete it by 1
            cartData[req.body.itemId]-=1;

        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartData});
        res.json({success:true,message:"Removed from cart"})
    }
    catch(error){
        console.log(error);
        res.json({success:false,messahe:"Ërror"})

    }

}
// fetch user cart data
const getCart = async (req,res)=>{
    try{
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        res.json({success:true,cartData})
    }catch(error){
        console.log(error);
        res.json({success:false,message:"Error"})
    }

}
export {addToCart,removeFromCart,getCart}