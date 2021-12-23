import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

class TokenAuth{

    /**
     *Generate Token
     *@static
     *@param {object} data object
     *@memberof TokenAuth
     *@return {string} token
     */
    static tokenGeneretor(data){
        const token = jwt.sign(data,process.env.JWTKEY);

        return token;
    }
    static decodeToken(token){
        try{
        const data =jwt.verify(token,process.env.JWTKEY);
        return data;
    }catch (er) {
        return er
    }
    }
}

export default TokenAuth;
