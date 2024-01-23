import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bookRoute from "./routes/bookRoutes.js";
import cors from "cors";
dotenv.config();

const app = express();

// Add this line to use express.json middleware
app.use(express.json());

//    CORS Policy Middleware
app.use(cors());

app.get("/", (req, res) => {
  return res.status(200).send("Welcome to the app");
});

app.use("/books", bookRoute);

//    Database connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("App connected to MongoDB");
    app.listen(process.env.PORT, () => {
      console.log(`App is listening to PORT ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
