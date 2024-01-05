import express from "express";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";
import {NextFunction, Request, Response} from "express";
import dotenv from "dotenv";
import router from "./routes";
import mongoose from "mongoose";

dotenv.config(); // Load variables from .env file

const app = express();

const PORT = process.env.PORT || 5000;
// Enable CORS
app.use(cors());
// Use Morgan for logging HTTP requests
app.use(morgan("dev"));
// Use body parser to parse JSON bodies
app.use(bodyParser.json());

// Use routes
app.use(router);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log("================== CUSTOM ERROR HANDLER ===================");
  console.error(err);
  res.status(500).json({name: err.name, message: err.message});
  console.log("===========================================================");
});


// Start the server
mongoose
  .connect(process.env.URI || "")
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Mongoose connected and Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });