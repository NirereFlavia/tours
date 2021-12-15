import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
     firstName:String,
     lastName: String,
     email:{
         type:String,
         required:true,
         unique:true,
     },
     password:{
         type:String,
         required:true,
     },
     address:{
         type:String,
         default:"Rwanda",
     },
     type:String,
     enum:["male","female","other","custom"],
    },
    {
        timestamps:true,
    }
    );
    const user = mongoose.model('User',userSchema);

    export default user;