// server/controllers/poolController.js
import Pool from "../models/Pool.js";

/**
 * Create a new pool with dummy users
 */
export const generatePool = async (req, res) => {
  try {
    const { count } = req.body;

    if (!count) {
      return res.status(400).json({ error: "Invalid count value" });
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

    const newPool = new Pool({
      title: "New Pool",
      users
    });

    const savedPool = await newPool.save();

    console.log("✅ New pool created:", JSON.stringify(savedPool, null, 2));
    res.status(201).json(savedPool);

  } catch (error) {
    console.error("Error generating dummy pool:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


/**
 * Toggle lock/unlock state of a pool
 */
export const togglePoolLock = async (req, res) => {
  try {
    const { poolId } = req.params;

    const pool = await Pool.findById(poolId);
    if (!pool) {
      return res.status(404).json({ message: "Pool not found" });
    }

    pool.isLocked = !pool.isLocked;
    await pool.save();

    return res.json({
      message: `Pool is now ${pool.isLocked ? "locked" : "unlocked"}`,
      pool
    });

  } catch (err) {
    console.error("Error toggling lock:", err);
    return res.status(500).json({ message: "Server error" });
  }
};


/**
 * Get all pools
 */
export const getAllPools = async (req, res) => {
  try {
    const pools = await Pool.find();
    res.status(200).json(pools);
  } catch (error) {
    res.status(500).json({ message: "Error fetching pools", error });
  }
};


/**
 * Get one pool by ID
 */
export const getPoolById = async (req, res) => {
  try {
    const pool = await Pool.findById(req.params.id);
    if (!pool) return res.status(404).json({ message: "Pool not found" });
    res.status(200).json(pool);
  } catch (error) {
    res.status(500).json({ message: "Error fetching pool", error });
  }
};


/**
 * Update pool title
 */
export const updatePoolTitle = async (req, res) => {
  try {
    const { title } = req.body;

    if (!title || title.trim() === "") {
      return res.status(400).json({ message: "Title cannot be empty" });
    }

    const updatedPool = await Pool.findByIdAndUpdate(
      req.params.id,
      { title },
      { new: true }
    );

    if (!updatedPool) {
      return res.status(404).json({ message: "Pool not found" });
    }

    res.json(updatedPool);
    
  } catch (error) {
    console.error("Error updating pool title:", error);
    res.status(500).json({ message: "Server error while updating title" });
  }
};
