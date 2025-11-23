import mongoose from "mongoose";
import userSchema from "./User.js";
import settlementSchema from "./SettlementSchema.js";

// Pool schema
const poolSchema = new mongoose.Schema({
  title: { type: String, required: true },
  users: [userSchema],
  settlements: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Settlement"
    }
  ],
  isLocked: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

const Pool = mongoose.model("Pool", poolSchema);

export default Pool;

