import foodModel from "../models/foodModel.js";
import fs from 'fs'

// add food item

const addFood = async (req,res)=>{
    // storing uploaded file name in databse
    let image_filename = `${req.file.filename}`;
    // let image_filename = `${req.file.filename}`;
    

    const food = new foodModel({
        name: req.body.name,
        description:req.body.description,
        price:req.body.price,
        category:req.body.category,
        image:image_filename

    })
    try{
        await food.save();
        
        res.json({success:true,message:"Food Added"})
        
    }catch (error){
        console.log(error)
        res.json({success:false,message:"Error"})
    }

}

// all food list
const listFood = async(req,res) => {
    try{
        // all food items store in foods variable
        const foods = await foodModel.find({});
        res.json({success:true,data:foods})

    }catch(error){
        console.log(error);
        res.json({success:false,message:"Error"})

    }

}
// remove food item
const removeFood= async(req,res)=>{
    try{
        // first find food item by db created id
        const food = await foodModel.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`,()=>{})  // remove from uploads

        await foodModel.findByIdAndDelete(req.body.id); // remove from database
        res.json({success:true,message:"Food Removed"})


    }catch(error){
        console.log(error);
        res.json({success:false,message:"Error"})

    }

}


export {addFood,listFood,removeFood}