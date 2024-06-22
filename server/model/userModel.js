import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    desc:{
        type: String,
        required: true
    },
    dueDate:{
        type: Date,
        default: Date.now()
    }
    

    
})


export default mongoose.model("User", userSchema);