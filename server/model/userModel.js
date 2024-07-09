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
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
    

    
})


export default mongoose.model("User", userSchema);