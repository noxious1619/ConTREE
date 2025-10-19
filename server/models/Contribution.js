import mongoose from "mongoose";

const contributionSchema = new mongoose.Schema({
  amount: Number,
  upiId: String,
  note: String,
  createdAt: { type: Date, default: Date.now }
});

const Contribution = mongoose.model("Contribution", contributionSchema);
export default Contribution;
