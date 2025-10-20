import mongoose from "mongoose";
import userSchema from "./User.js";

// Pool schema
const poolSchema = new mongoose.Schema({
  title: { type: String, required: true },
  users: [userSchema],
  createdAt: { type: Date, default: Date.now }
});

const Pool = mongoose.model("Pool", poolSchema);
export default Pool;

