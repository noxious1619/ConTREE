import express from "express";
import Pool from "../models/Pool.js";

const router = express.Router();

// ➕ Create a new pool
router.post("/", async (req, res) => {
  try {
    const pool = new Pool(req.body);
    const savedPool = await pool.save();
    res.status(201).json(savedPool);
  } catch (error) {
    res.status(500).json({ message: "Error creating pool", error });
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

export default router;
