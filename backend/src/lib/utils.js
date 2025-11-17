import jwt from "jsonwebtoken";
import {ENV} from "./env.js";

export const generateToken = (userId,res) =>{
    
    // create token
    const {JWT_SECRET} = ENV;
    if(!JWT_SECRET){
        throw new Error("JWT_SECRET is not configured");
    }

    const token = jwt.sign({userId}, JWT_SECRET, {
        expiresIn: "7d",
    });

    res.cookie("jwt", token, {
        maxAge: 7*24*60*60*1000, //ms
        httpOnly: true, // prevent XSS attack
        sameSite: "strict", //CRSF attacks prevention
        secure: ENV.NODE_ENV === "development" ? false : true,
    });

    return token;
};

