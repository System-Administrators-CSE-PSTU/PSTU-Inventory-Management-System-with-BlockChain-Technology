import express from "express";
// import connectDB from "./config/db.js";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

if (process.env.NODE_ENV !== "production") {
  dotenv.config({ path: path.join(process.cwd(), ".env") });
}

import connectDB from './config/db.js'; // Import this AFTER dotenv config

import {
  departmentRoutes,
  officeRoutes,
  supplierRoutes,
  itemRoutes,
  stockInRoutes,
  CurrentStockInRoutes,
  stockOutRoutes,
  CurrentStockOutRoutes,
  deadStockRoutes,
  deadStockRequestRoutes,
  userRoutes,
  categoryRoutes,
  stockHistoryRoutes,
  reportRoutes,
  stockInRequestRoutes // Import matches index.js
} from "./routes/index.js";


import { blockchainRoutes, startBlockchainVerificationJob } from "./block_page.js";

const app = express();
const PORT = Number.parseInt(process.env.PORT || "3000", 10);
const FRONTEND_URL = (process.env.FRONTEND_URL || "").trim();

if (!Number.isFinite(PORT) || PORT <= 0) {
  throw new Error("Invalid PORT value.");
}

connectDB().catch((error) => {
  console.error("MongoDB connection failed. App is running in degraded mode.", error);
});

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
app.use(
  cors({
    origin(origin, callback) {
      if (!origin) {
        callback(null, true);
        return;
      }

      if (!FRONTEND_URL || origin === FRONTEND_URL) {
        callback(null, true);
        return;
      }

      callback(new Error(`CORS blocked for origin: ${origin}`));
    },
  }),
);
app.use(express.json());

app.get("/", (_req, res) => {
  res.status(200).send("PSTU Inventory backend is running.");
});

app.use("/api/departments", departmentRoutes);
app.use("/api/offices", officeRoutes);
app.use("/api/suppliers", supplierRoutes);
app.use("/api/items", itemRoutes);
app.use("/api/stockins", stockInRoutes);
app.use("/api/currentstockins", CurrentStockInRoutes);
app.use("/api/stockouts", stockOutRoutes);
app.use("/api/currentstockouts", CurrentStockOutRoutes);
app.use("/api/deadstocks", deadStockRoutes);
app.use("/api/deadstockrequests", deadStockRequestRoutes);
app.use("/api/users", userRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/stockhistories", stockHistoryRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/stockInRequest", stockInRequestRoutes);

app.use("/api/blockchain", blockchainRoutes)

try {
  startBlockchainVerificationJob();
} catch (error) {
  console.error("Blockchain verification job failed to start.", error);
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
