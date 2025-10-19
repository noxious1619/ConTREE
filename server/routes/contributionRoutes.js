import express from "express";
import Contribution from "../models/Contribution.js";

const router = express.Router();

// ➕ Add a new contribution
router.post("/", async (req, res) => {
  try {
    const contribution = new Contribution(req.body);
    const savedContribution = await contribution.save();
    res.status(201).json(savedContribution);
  } catch (error) {
    res.status(500).json({ message: "Error saving contribution", error });
  }
});

// 🔍 Get all contributions
router.get("/", async (req, res) => {
  try {
    const contributions = await Contribution.find();
    res.status(200).json(contributions);
  } catch (error) {
    res.status(500).json({ message: "Error fetching contributions", error });
  }
});

export default router;
