import express from "express";
import { signup, login, logout, updateProfile } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

// create endpoints
router.post("/signup", signup );
router.post("/login", login);
router.post("/logout", logout);

// for user to update profile has to be already authenticated
router.put("/update-profile", protectRoute , updateProfile);

router.get("/check", protectRoute, (req,res) => res.status(200).json(req.user)); //checks whether user is authenticated

export default router;

//middleware is a function run before sending back a responce is sent