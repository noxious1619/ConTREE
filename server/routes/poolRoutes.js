// server/routes/poolRoutes.js
import express from "express";
import {
  generatePool,
  togglePoolLock,
  getAllPools,
  getPoolById,
  updatePoolTitle,
  deletePool
} from "../controllers/poolController.js";

const router = express.Router();

// Create a pool with dummy users
router.post("/generate", generatePool);

// Toggle lock/unlock
router.patch("/:poolId/toggle-lock", togglePoolLock);

// Get all pools
router.get("/", getAllPools);

// Get pool by ID
router.get("/:id", getPoolById);

// Update pool title
router.put("/:id", updatePoolTitle);

// 
router.delete("/:id", deletePool);

export default router;
