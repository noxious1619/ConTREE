import mongoose from "mongoose";

const contributionSchema = new mongoose.Schema({
  name: String,
  amount: Number,
  upiId: { type: String, required: [true, "UPI ID is required"] },
  createdAt: { type: Date, default: Date.now }
});

const Contribution = mongoose.model("Contribution", contributionSchema);
export default Contribution;
