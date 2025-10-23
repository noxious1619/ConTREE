// server/routes/users.js
import express from "express";
import mongoose from "mongoose";
import userSchema from "../models//User.js";

const router = express.Router();
const User = mongoose.model("User", userSchema);

router.post("/generate", async (req, res) => {
  try {
    const { count } = req.body; // count comes from frontend
    if (!count) {
      return res.status(400).json({ error: "Invalid count read" });
    }

    const users = [];
    for (let i = 1; i <= count; i++) {
      users.push({
        name: `user-${i}`,
        amount: 0,
        upiId: `user${i}@upi`,
        note: ""
      });
    }

    const result = await User.insertMany(users);

    res.status(201).json(result); 
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});


export default router;
