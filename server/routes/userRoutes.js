import express from "express";
import Pool from "../models/Pool.js";
import User from "../models/User.js"

const router = express.Router();


// Add a new user to a pool
router.post("/:poolId", async (req, res) => {
  try {
    const pool = await Pool.findById(req.params.poolId);
    if (!pool) return res.status(404).json({ message: "Pool not found" });

    pool.users.push(req.body);
    await pool.save();
    res.status(201).json(pool.users[pool.users.length - 1]); 
  } catch (error) {
    res.status(500).json({ message: "Error adding user", error });
  }
});

// Get all users in a pool
router.get("/:poolId", async (req, res) => {
  try {
    const pool = await Pool.findById(req.params.poolId);
    if (!pool) return res.status(404).json({ message: "Pool not found" });

    res.status(200).json(pool.users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
});

//get a single user in a pool
router.get("/:poolId/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user", error });
  } 
});

// Update a user in a pool
router.put("/:poolId/:userId", async (req, res) => {
  try {
    const pool = await Pool.findById(req.params.poolId);
    if (!pool) return res.status(404).json({ message: "Pool not found" });

    const user = pool.users.id(req.params.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    Object.assign(user, req.body); // update fields
    await pool.save();
    res.status(200).json(user); 
  } catch (error) {
    res.status(500).json({ message: "Error updating user", error });
  }
});

// Delete a user from a pool
router.delete("/:poolId/:userId", async (req, res) => {
  try {
    const { poolId, userId } = req.params;

    // Use the $pull operator to remove the user by _id
    const result = await Pool.updateOne(
      { _id: poolId },
      { $pull: { users: { _id: userId } } }
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Error deleting user", error });
  }
});






export default router;
