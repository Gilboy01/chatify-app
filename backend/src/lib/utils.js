import jwt from "jsonwebtoken";

 const generateToken = (userId,res) =>{
    // create token

    const token = jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });

    res.cookie("jwt", token, {
        maxAge: 7*24*60*60*1000, //ms
        httpOnly: true, // prevent XSS attack
        sameSite: "strict", //CRSF attacks prevention
        secure: process.env.NODE_ENV === "development" ? false : true,
    });

    return token;
}

export default generateToken;