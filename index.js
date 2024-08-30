import express from "express";
import { PORT, MONGODBURL } from "./config.js";
import mongoose, { mongo } from "mongoose";
import cors from "cors";
import authRoute from "./routes/authRoute.js";
import listActionsRoute from "./routes/listActionsRoute.js";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (request, response) => {
  console.log(request);
  return response
    .status(234)
    .send("Welcome to the API!");
});

// routes
app.use("/auth", authRoute);
app.use("/list", listActionsRoute);

// connection
mongoose
  .connect(MONGODBURL)
  .then(() => {
    console.log("App connected to database.");

    app.listen(PORT, () => {
      console.log(`App is listening on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });