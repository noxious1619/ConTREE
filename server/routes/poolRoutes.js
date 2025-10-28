import express from "express";
import Pool from "../models/Pool.js";

const router = express.Router();

// ➕ Create a new pool
// Generate a dummy pool with dummy users
router.post("/generate", async (req, res) => {
  try {
    const { count } = req.body;

    if (!count) {
      return res.status(400).json({ error: "Invaid Count value" });
    }

    // Generate dummy users
    const users = [];
    for (let i = 1; i <= count; i++) {
      users.push({
        name: `user-${i}`,
        amount: 0,
        upiId: `user${i}@upi`,
        note: ""
      });
    }

    // Create the new pool with embedded users
    const newPool = new Pool({
      title: "New Pool",
      users: users
    });

    const savedPool = await newPool.save();

    // Respond with the full saved pool (including users)
    console.log("✅ New pool created:", JSON.stringify(savedPool, null, 2));
    res.status(201).json(savedPool);

  } catch (error) {
    console.error("Error generating dummy pool:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


// 🔍 Get all pools
router.get("/", async (req, res) => {
  try {
    const pools = await Pool.find();
    res.status(200).json(pools);
  } catch (error) {
    res.status(500).json({ message: "Error fetching pools", error });
  }
});

// 🔎 Get pool by ID
router.get("/:id", async (req, res) => {
  try {
    const pool = await Pool.findById(req.params.id);
    if (!pool) return res.status(404).json({ message: "Pool not found" });
    res.status(200).json(pool);
  } catch (error) {
    res.status(500).json({ message: "Error fetching pool", error });
  }
});


router.put("/:id", async (req, res) => {
  try {
    const { title } = req.body;

    if (!title || title.trim() === "") {
      return res.status(400).json({ message: "Title cannot be empty" });
    }

    const updatedPool = await Pool.findByIdAndUpdate(
      req.params.id,
      { title },
      { new: true } // returns updated document
    );

    if (!updatedPool) {
      return res.status(404).json({ message: "Pool not found" });
    }
    
    console.log(updatedPool);
    res.json(updatedPool);
  } catch (error) {
    console.error("Error updating pool title:", error);
    res.status(500).json({ message: "Server error while updating title" });
  }
});


export default router; 
