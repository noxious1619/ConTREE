import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  amount: { type: Number, default: 0 },
  upiId: { type: String, required: [true, "UPI ID is required"] },
  note: { type: String, default: "" }
});

export default userSchema;
