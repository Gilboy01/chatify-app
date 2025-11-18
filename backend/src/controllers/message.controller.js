import cloudinary from "../lib/cloudinary.js";
import Message from "../models/message.model.js";
import User from "../models/user.model.js";

export const getAllContacts = async(req, res) => {
    try {
        const loggedInUserId = req.user._id;

        // filter out the user that is logged in return other users
        const filteredUsers = await User.find({_id: { $ne: loggedInUserId}}).select("-password");
        res.status(200).json(filteredUsers);
    } catch (error) {
        console.log("Error in getAllContacts", error);
        res.status(500).json({message: "Server error"});
        
    }
};

export const getMessagesByUserId = async (req, res) => {

    try {
        const myId = req.user._id;
        const {id: userToChatId} = req.params; // id used in route path
        const messages = await Message.find({
            $or:[
                {senderId:myId, receiverId: userToChatId},
                {senderId:userToChatId, receiverId: myId},
            ]
        });

        res.status(200).json(messages);

    } catch (error) {
        console.log("Error in messages controller: ", error.message);
        res.status(500).json({error: "Internal server error"});
    }

};


export const sendMessage = async (req, res) => {
try {
    const {text, image} = req.body;
    const{id: receiverId} = req.params;
    const senderId = req.user._id;

    let imageURL;
    if(image){
        // upload base 64 image to cloudinary
        const uploadResponse = await cloudinary.uploader.upload(image);
        imageURL = uploadResponse.secure_url;
    }

    const newMessage = new Message({
        senderId,
        receiverId,
        text,
        image: imageURL,
    });

    // todo: send message in real -time if user is online - socket.io

    await newMessage.save();
    res.status(201).json(newMessage);

} catch (error) {
    console.log("Error in sendMessage controller: ", error.message);
    res.status(500).json({error: "Internal sever error"});

}
};

export const getChatPartners = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;

        // find all the messages where the logged-in user is either sender or receiver
        const messages = await Message.find({
            $or: [
                {senderId: loggedInUserId},
                {receiverId: loggedInUserId}
            ]
        });
        // new Set eliminates the duplicates
        const chatPartnerIds = [...new Set(messages.map((msg) =>
        msg.senderId.toString() === loggedInUserId.toString() 
        ? msg.receiverId.toString()
        : msg.senderId.toString())
        )];

        // to fetch chats minus their passwords
        const chatPartners = await User.find({_id: {$in:chatPartnerIds}}).select("-password");

        res.status(200).json(chatPartners);
    } catch (error) {
        console.error("Error in getChatPartners: ", error.message);
        res.status(500).json({error: "Internal server error"});
    }
};