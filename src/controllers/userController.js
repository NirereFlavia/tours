import UserInfos from "../models/user";
import bcrypt from "bcrypt";
import TokenAuth from "../helpers/tokenAuth";
import BookInfos from "../models/book";
import TourInfos from"../models/tour";

class UserController {
 //creat user in db

 static async createUser(req,res){
     const hashPassword = bcrypt.hashSync(req.body.password, 10);
     req.body.password = hashPassword;

    console.log(req.body)
     const user = await UserInfos.create(req.body);
    console.log(user);
     if(!user){
         return res.status(404).json({error:"user not registered"})
     }

     return res.status(200).json({message: "User created successfully", data: user});
 }
 //get all users
 static async getAllUsers(req,res){
    const users = await UserInfos.find();

    if(!users){
        return res.status(404).json({error:"users not retrieved"})
    }

    return res.status(200).json({message: "get users successfully", data: users});
}

//delete one specifiq user

static async getOneUser(req,res){
    const user = await UserInfos.findById(req.params.id);

    if(!user){
        return res.status(404).json({error:"user not found"});
    }
    return res.status(200).json({message:"user found successfully", data: user});
}

static async deleteOneUser(req,res){
    const user = await UserInfos.findByIdAndDelete(req.params.id);
    if(!user){
        return res.status(404).json({error:"user not deleted"});
    }
    return res.status(200).json({message:"user deleted", data: user});
}

//login function

static async userLogin(req, res){

    const user = await UserInfos.findOne({ email:req.body.email});

if(!user) {
    return res
    .status(404)
    .json({error:"user not found! kindly register first"});
}
if (bcrypt.compareSync(req.body.password, user.password)) {
    user.password=null;
    console.log(user)

    const token = TokenAuth.tokenGeneretor({user:user});

    return res
    .status(200)
    .json({ message:"succefully logged in", token: token });

}
return res.status(400).json({error: "password is wrong"})

}

//Booking functions

static async bookTour(req,res){
const bookData={
    user:req.user._id,
    tour:req.params.id
};
    const book= await BookInfos.create(bookData);

    const tour= await TourInfos.findById(req.params.id);
    const tourSeats= tour.seats-1;
    await TourInfos.findByIdAndUpdate(req.params.id,{seats:tourSeats});

    if(!book){
        return res.status(404).json({error:"failed to book"})
    }
    return res.status(200).json({message:"Booked succesfully", data:book})
}

//Get all booked tours
static async getAllBookings(req,res){
    const books= await BookInfos.find();
    
        if(!books){
            return res.status(404).json({error:"No books registered"})
        }
        return res.status(200).json({message:"Booked succesfully registered", data:books});
    }
    static async getAllBookingsByTourId(req,res){
        const books = await BookInfos.find({tour:req.user.id});

        if(!books){
            return res.status(404).json({error: "book not found"});
        }
        return res.status(200).json({message:"success",data:books});
    }
}

 

export default UserController;