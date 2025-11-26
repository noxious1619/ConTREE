// (Generate only if pool locked and no settlement exists; fetch; update payer/receiver status)

import Pool from "../models/Pool.js";
import Settlement from "../models/SettlementSchema.js";
import { calculateSimpleSettlement } from "../utils/settlementLogic.js";

/**
 * POST /api/settlement/generate/:poolId
 * Creates a settlement for the pool if pool.isLocked === true and no settlement exists.
 */
export const generateSettlement = async (req, res) => {
  try {
    const { poolId } = req.params;

    const pool = await Pool.findById(poolId);
    if (!pool) return res.status(404).json({ message: "Pool not found" });

    // // We only generate when pool is locked
    // if (!pool.isLocked) {
    //   return res.status(400).json({ message: "Pool must be locked to generate settlement" });
    // }

    let settlement = await Settlement.findOne({ poolId });
    if (settlement) {
      return res.status(200).json({
        message: "Settlement already existed — returning existing one",
        settlement
      });
    }

    const { payers, receivers } = calculateSimpleSettlement(pool.users);

    settlement = new Settlement({
      poolName: pool.title || "",
      poolId,
      payers,
      receivers
    });

    await settlement.save();

    return res.status(201).json({ message: "Settlement created", settlement });
  } catch (err) {
    console.error("Settlement generation error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

/**
 * GET /api/settlement/:poolId
 * Fetch the settlement for a pool
 */
export const getSettlement = async (req, res) => {
  try {
    const { poolId } = req.params;
    const settlement = await Settlement.findOne({ poolId });
    if (!settlement) return res.status(404).json({ message: "No settlement found" });
    return res.json(settlement);
  } catch (err) {
    console.error("Error fetching settlement:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

/**
 * PATCH /api/settlement/payer/pay/:payerId
 * Mark a payer entry (embedded doc) as paid.
 * payerId is the _id of the payer subdocument inside Settlement.payers
 */
export const markPayerPaid = async (req, res) => {
  try {
    const { poolId, payerId } = req.params;

    const settlement = await Settlement.findOneAndUpdate(
      { poolId, "payers._id": payerId },
      { $set: { "payers.$.status": "paid" } },
      { new: true }
    );


    if (!settlement) return res.status(404).json({ message: "Payer entry not found" });
    return res.json({ message: "Payer marked paid", settlement });
  } catch (err) {
    console.error("Error marking payer paid:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

/**
 * PATCH /api/settlement/receiver/receive/:receiverId
 * Mark a receiver entry (embedded doc) as received.
 * receiverId is the _id of the receiver subdocument inside Settlement.receivers
 */
export const markReceiverReceived = async (req, res) => {
  try {
    const { poolId, receiverId } = req.params;

    const settlement = await Settlement.findOneAndUpdate(
      { poolId, "receivers._id": receiverId },
      { $set: { "receivers.$.status": "received" } },
      { new: true }
    );

    if (!settlement) return res.status(404).json({ message: "Receiver entry not found" });
    return res.json({ message: "Receiver marked received", settlement });
  } catch (err) {
    console.error("Error marking receiver received:", err);
    return res.status(500).json({ message: "Server error" });
  }
};
