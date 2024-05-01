import express from "express";
import bodyParser from "body-parser";

const app = express();

const port = 3000;

// middleware

app.get("/", (req, res) => {
  res.send("<h1>Hello</h1>");
});

app.listen(port, () => {
  console.log(`The app is listening on port ${port}`);
});
