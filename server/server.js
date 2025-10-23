import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import connectDB from "./config/db.js";
import poolRoutes from "./routes/poolRoutes.js";
import contributionRoutes from "./routes/contributionRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import dummmyUsers from "./routes/dummyUsers.js";


dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api/pools", poolRoutes);            
app.use("/api/contributions", contributionRoutes);
app.use("/api/users", userRoutes);
app.use("/api/dummyusers", dummmyUsers);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on PORT: ${PORT}`));
