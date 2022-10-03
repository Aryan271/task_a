import express from "express";
import routes from "./routes";
import mongoose from "mongoose";
import path from "path";

import { PORT, DB_URL } from "./config";

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Connection error"));

db.once("open", () => {
  console.log("Database connected");
});

const app = express();
global.appRoot = path.resolve(__dirname);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/uploads", express.static("uploads"));

app.use("/api", routes);

app.listen(PORT, () => {
  console.log(`LISTENING ON ${PORT}`);
});
