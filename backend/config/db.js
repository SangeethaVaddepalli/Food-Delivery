import mongoose from  "mongoose";

export const connectDB = async ()=>{
    await mongoose.connect('mongodb+srv://sangeethavaddepalli17:KSoieklB0eQSHzO7@cluster0.asja5.mongodb.net/food-dev').then(()=>console.log('DB Connected'));
}