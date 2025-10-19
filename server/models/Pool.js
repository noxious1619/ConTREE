import mongoose from "mongoose";

// User sub-schema
const userSchema = new mongoose.Schema({
  name: String,
  amount: Number,
  upiId: String,
  note: String
});

// Pool schema
const poolSchema = new mongoose.Schema({
  title: String,
  users: [userSchema],
  createdAt: { type: Date, default: Date.now }
});

const Pool = mongoose.model("Pool", poolSchema);
export default Pool;
