import mongoose from "mongoose";
import {stringify} from "querystring";

const tourSchema = new mongoose.Schema(
    {
     tourName:String,
    dateScheduled:String,
    dueDate:String,
    phone: String,
     location:{
         type:String,
         enum:["Gisenyi", "Musanze", "Nyanza", "Nyungwe", "Kayonza"],
     },
     price:Number,

     seats:Number,
    //  images:[
    //      {
    //          type:String,
    //      }
    //  ]

     }
)
    const tour = mongoose.model('Tour',tourSchema);

    export default tour;