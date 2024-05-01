import dotEnv from "dotenv";

import express from "express";
import bodyParser from "body-parser";
import pool from "../utils/database";

const app = express();

const port = 3000;

// middleware

app.get("/", (req, res) => {
  try {
    pool.connect();
  } catch (err) {
    console.log("error connecting to database", err);
  }
  res.send("<h1>Hello</h1>");
});

app.listen(port, () => {
  console.log(`The app is listening on port ${port}`);
});
