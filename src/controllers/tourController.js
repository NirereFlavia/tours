import tourInfos from "../models/tour";
import TokenAuth from "../helpers/tokenAuth";
import BookInfos from "../models/book"

class TourController {
 //creat tour in db

 static async createTour(req,res){
    console.log(req.body)
     const tour = await tourInfos.create(req.body);
     console.log(tour);

     if(!tour){
         return res.status(404).json({error:"tour not registered"});
     }

     return res.status(200).json({message: "tour created successfully", data: tour});
 }

 //get all users
 static async getAllTours(req,res){
    const tours = await tourInfos.find();

    if(!tours){
        return res.status(404).json({error:"tour not retrieved"});
    }

    return res.status(200).json({message: "get tour successfully", data: tours});
}
//delete one specifieq tour
static async getOneTour(req,res){
    const tour = await tourInfos.findById(req.params.id);
    if(!tour){
        return res.status(404).json({error:"tour not found"});
    }
    return res.status(200).json({message:"tour found successfully", data: tour});
}

static async deleteOneTour(req,res){
    const tour = await tourInfos.findByIdAndDelete(req.params.id);
    if(!tour){
        return res.status(404).json({error:"tour not deleted"});
    }
    return res.status(200).json({message:"tour deleted successfully"});
}

//Booking functions
static async bookTour(req,res){
const bookData={
    user:req.user._id,
    tour:req.params.id
};
    const book= await BookInfos.create(booData);

    if(!book){
        return res.status(404).json({error:"failed to book"})
    }
    return res.status(200).json({message:"Booked succesfully", data:book})
}
}

export default TourController;