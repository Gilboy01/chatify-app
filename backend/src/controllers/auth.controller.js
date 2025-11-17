import User from "../models/user.js";
import bcrypt from "bcryptjs";
import {generateToken} from "../lib/utils.js";
import { sendWelcomeEmail } from "../emails/emailHandlers.js";
import {ENV} from "../lib/env.js";

export const signup = async (req,res) => {
    // res.send('Signup endpoint');

     const {fullName, email, password} = req.body;

     try {
        if (!fullName || !email || !password){
            return res.status(400).json({message:"All fields are required"})
        }
        
        if (password.length < 6){
            
            return res.status(400).json({message:"Password must be atleast 6 characters"})
        }
        
        // check if email is valid: regex
        const emailRegex  = /^[^\@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)){
            
            return res.status(400).json({message:"Invalid email format"});
        }
        
        //user
        const user = await User.findOne({email});
        if(user) return res.status(400).json({message: "Email already exists"})

         //password hashing  
         const salt = await bcrypt.genSalt(10) 
        const hashedPassword = await bcrypt.hash(password,salt) 

        const newUser = new User({
            fullName,
            email,
            password: hashedPassword
        })

        if(newUser){

            // generateToken(newUser._id, res)
            // await newUser.save()
            
            // persist user first, then issue the auth cookie
            const savedUser = await newUser.save();
            generateToken(savedUser._id, res);

            res.status(201).json({
                _id:newUser._id,
                fullName:newUser.fullName,
                email:newUser.email,
                profilePic:newUser.profilePic
            })

            // send a welcome email to user
            try {
                await sendWelcomeEmail(savedUser.email, savedUser.fullName, ENV.CLIENT_URL);
            } catch (error) {
                console.error('Failed to send email', error);
            }

        } else {
            res.status(400).json({message: "Invalid user data"})
        } 


     } catch (error) {
        console.log('Error in signup controller: ', error);
        res.status(500).json({message: "Internal server error"})
     }
}

export const login = async (req,res) => {
    // user requires email and password
    const {email, password} = req.body;

    try {
        const user = await User.findOne({email})
        if(!user) return res.status(400).json({message: "Invalid credentials"})
     
    // never tell a client which one is incorrect: password or email
    const isPasswordCorrect = await bcrypt.compare(password, user.password)
    if(!isPasswordCorrect) return res.status(400).json({message: "Invalid credentials"})
     
    generateToken(user._id, res)
    
    res.status(200).json({
                _id:user._id,
                fullName:user.fullName,
                email:user.email,
                profilePic:user.profilePic
            });
    } catch (error) {
        console.error('Error in login controller:', error)
        res.status(500).json({message: "Internal server error"})
    }
};


// logout is not asynchronous and we dont need request
export const logout =  (_,res) => {
res.cookie('jwt', '', {maxAge:0})
res.status(200).json({message: "Logged out successfully"})
};

