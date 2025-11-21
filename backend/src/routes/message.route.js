import express from "express";
import { getAllContacts, getMessagesByUserId, sendMessage, getChatPartners } from "../controllers/message.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import { arcjetProtection } from "../middleware/arcjet.middleware.js";

const router = express.Router();

// we add arcjet for rate limiting
// we add protectRoute to check for authentication
// the middle wares execute in order
// this is more efficient since unauthorized requests get blocked by ratelimiting before hitting the auth middleware 
router.use( arcjetProtection, protectRoute); //add arcjet

router.get("/contacts", getAllContacts);
router.get("/chats", getChatPartners);
router.get("/:id", getMessagesByUserId); // we put : because id is a dynamic value
router.post("/send/:id", sendMessage);

export default router;