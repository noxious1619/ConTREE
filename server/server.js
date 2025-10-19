import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import connectDB from "./config/db.js";
import poolRoutes from "./routes/poolRoutes.js";
import contributionRoutes from "./routes/contributionRoutes.js";

import Contribution from "./models/Contribution.js";
import Pool from "./models/Pool.js";

dotenv.config();
connectDB();
const app = express();  
app.use(cors());  
app.use(bodyParser.json());  

const PORT = process.env.PORT || 5000;

// 🛣️ Routes
app.use("/api/pools", poolRoutes);
app.use("/api/contributions", contributionRoutes);

app.listen(PORT, () => {  
  console.log(`🚀 Server running on PORT: ${PORT}`);
}); 

