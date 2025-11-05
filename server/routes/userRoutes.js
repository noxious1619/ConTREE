import express from "express";
import Pool from "../models/Pool.js";
import User from "../models/User.js";
import mongoose from "mongoose";

const router = express.Router();


// Add a new user to a pool (with details in request body)
router.post('/:poolId', async (req, res) => {
  try {
    const { poolId } = req.params;
    const { name, upiId, amount } = req.body;

    // Validate input
    if (!name || !upiId) {
      return res.status(400).json({ message: 'Name and UPI ID are required' });
    }

    const pool = await Pool.findById(poolId);
    if (!pool) {
      return res.status(404).json({ message: 'Pool not found' });
    }

    // Create a new user object
    const newUser = {
      _id: new mongoose.Types.ObjectId(),
      name,
      upiId,
      amount: amount || 0,
      note: "I have just been added"
    };

    // Push new user to pool
    pool.users.push(newUser);
    await pool.save();

    res.status(200).json({
      message: 'User added successfully',
      pool
    });
  } catch (error) {
    console.error('Error adding user:', error);
    res.status(500).json({
      message: 'Error adding user',
      error: error.message
    });
  }
});

//Update anything inside a user in the pool
router.put("/:poolid/:userid", async (req, res) => {
  try {
    const { poolid, userid } = req.params;
    const { name, amount, upiId, note } = req.body; 

    const pool = await Pool.findById(poolid);
    if (!pool) {
      return res.status(404).json({ message: "Pool not found" });
    }

    const user = pool.users.id(userid);
    if (!user) {
      return res.status(404).json({ message: "User not found in this pool" });
    }

    //Update only the fields provided in the request
    if (name !== undefined) user.name = name;
    if (amount !== undefined) user.amount = amount;
    if (upiId !== undefined) user.upiId = upiId;
    if (note !== undefined) user.note = note;

    await pool.save();

    res.status(200).json({
      message: "User details updated successfully",
      user,
    });
  } catch (err) {
    console.error("Error updating user:", err);
    res.status(500).json({ message: "Server error while updating user" });
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
    const { poolId, userId } = req.params;

    const pool = await Pool.findById(poolId);
    if (!pool) return res.status(404).json({ message: "Pool not found" });

    const user = pool.users.id(userId);
    if (!user) return res.status(404).json({ message: "User not found in this pool" });

    res.status(200).json(user);
  }catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Error fetching user", error });
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
