import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    cartData:{type:Object,default:{}}
    // bydefault cart will b empty
},{minimize:false})
// minimize is given to create empty cart bydefault it wont create object without any food items

const userModel = mongoose.models.user || mongoose.model("user", userSchema);
export default userModel;