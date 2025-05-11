import jwt from "jsonwebtoken"

const authMiddleware = async (req,res,next)=>{
    // taking token from users
    const {token} = req.headers;
    if(!token){
        return res.json({success:false,message:"Not Authorized Login Again"})
    }
    try{
        // if we get token we need to decode it
        const token_decode = jwt.verify(token,process.env.JWT_SECRET);
        //when we generate token we have object with the id
        req.body.userId = token_decode.id;
        next();

    }catch(error){
        console.log(error);
        res.json({success:false,message:"Error"})

    }
    

}

export default authMiddleware