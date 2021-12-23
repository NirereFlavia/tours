import TokenAuth from "../helpers/tokenAuth";
import UserInfos from "../models/user"

const isUserExist = async(req,res,next)=>{
    try{
        const token =req.header("x-auth-token");
        if(!token){
            return res.status(400).json({error:"no token provided"})
        }
        const data =TokenAuth.decodeToken(token);
        console.log(data);

        const {name}= data;
        if (name==="JsonWebTokenError"){
            return res.status(400).json({error:"Invalid JWT token"})
        }
        if (name==="TokenExpiredError"){
            return res.status(400).json({errror:"JWT token is expred"})
        }
        req.user =data.user;

        const user =await UserInfos.findById(req.user._id);
        if(!user){
            return res.status(400).json({error:"User not found. You are not authorized"})
        }
        return  next();
    }
    catch(err){
        console.log(err);
    }
}

export default isUserExist;