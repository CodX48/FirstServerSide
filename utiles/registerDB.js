import mongoose, { Schema } from "mongoose";

const form = new Schema({
    FirstName:{
        type: String,
        required: true,
    },
    LastName:{
        type: String,
        required: true    
    },
    Gmail:{
        type: String,
        required: true,
    },
    Age:{
        type: String,
        required: true,
    },
    
})

export default mongoose.model("User",form)