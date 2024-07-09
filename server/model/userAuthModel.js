import mongoose from "mongoose";

const userSchema =new mongoose.Schema({
    name:{
        type: String,
        required: [true,"name is Required"],
        unique: true,
    },
    email:{
        type:String,
        required:[true,"email is Required"],
        unique: true,
    },
    password:{
        type:String,
        required:[true,"password is Required"],
    }
});




export default mongoose.model("userAuth",userSchema)