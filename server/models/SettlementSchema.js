// server/models/SettlementSchema.js
import mongoose from "mongoose";

const payerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  // userId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  upiId: { type: String, default: "" },            
  amount: { type: Number, required: true },
  status: {
    type: String,
    enum: ["pending", "paid"],
    default: "pending"
  }
});

const receiverSchema = new mongoose.Schema({
  name: { type: String, required: true },
  // userId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  upiId: { type: String, default: "" },            
  amount: { type: Number, required: true },
  status: {
    type: String,
    enum: ["pending", "received"],
    default: "pending"
  }
});

const settlementSchema = new mongoose.Schema({
  poolName: { type: String, required: true },
  poolId: { type: mongoose.Types.ObjectId, ref: "Pool", required: true },

  payers: [payerSchema],
  receivers: [receiverSchema],

  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Settlement", settlementSchema);
