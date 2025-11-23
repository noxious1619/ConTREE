// server/routes/settlementRoutes.js
import express from "express";
import {
  generateSettlement,
  getSettlement,
  markPayerPaid,
  markReceiverReceived
} from "../controllers/settlementController.js";

const router = express.Router();

// Generate (create) settlement (only when pool is locked; one-time)
router.post("/generate/:poolId", generateSettlement);

// Fetch settlement for a pool
router.get("/:poolId", getSettlement);

// Mark payer as paid for a specific pool
router.patch("/:poolId/payer/pay/:payerId", markPayerPaid);

// Mark receiver as received for a specific pool
router.patch("/:poolId/receiver/receive/:receiverId", markReceiverReceived);


export default router;
