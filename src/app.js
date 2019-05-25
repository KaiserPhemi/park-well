// third-party libraries
const express = require("express");

// app
const app = express();
const appRouter = require("./api/v1/index");

// middle-wares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.disable("x-powered-by");

// routes
// app.use("/api/v1", appRouter);
app.get("/", (req, res) => {
  res.status(200).send({ message: "Welcome to the park-well API" });
});

module.exports = app;
