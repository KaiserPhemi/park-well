// third-party libraries
const express = require("express");
const dotenv = require("dotenv");

// app
const app = require("./src/app");

// config
dotenv.config();
const port = process.env.PORT;

app.listen(port, () => console.log(`App started & running on port ${port}...`));
