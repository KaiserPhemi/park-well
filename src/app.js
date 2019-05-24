// third-party libraries
const express = require("express");

// instantiate app
const app = express();

// middle-wares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.disable("x-powered-by");

// routes
app.get("/", (req, res) => {
  res.status(200).send({ message: "Welcome to the park-well API" });
});

module.exports = app;
