
const verifyAccess= (requiredRole)=>{

    return async(req,res,next)=>{
        try{
            const {role}= req.user;
            if(requiredRole !=role) {
                return res 
                .status(401)
                .json({ error: "Unouthorised! You don't access to this api"});
            }
            return next();
        }
        catch(err){

        }
    };

};