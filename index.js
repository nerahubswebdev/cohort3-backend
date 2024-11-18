import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.routes.js";
import projectRoutes from "./routes/project.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
dotenv.config();

const app = express();

// make the api see json files
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173", "https://react-recap-gamma.vercel.app"],
    credentials: true,
  })
);

const myport = process.env.PORT || 6007;
const db = process.env.DATABASE_URL;

app.get("/", function (req, res) {
  res.send("Hello World jdjdijiudiudiu");
});

// our own routes
app.use("/auth", authRoutes);
app.use("/project", projectRoutes);

// this is the nmongo db connection
mongoose
  .connect(db)
  .then(() => {
    console.log("database connected successfully");
    app.listen(myport, () => {
      console.log(`listening to port ${myport}`);
    });
  })
  .catch(() => {
    console.log("Database did not connect..");
  });
