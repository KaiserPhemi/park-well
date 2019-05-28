// third-party libraries
const dotenv = require("dotenv");
const { expect } = require("chai");
const supertest = require("supertest");

dotenv.config();
process.env.NODE_ENV = "test";

const app = require("../../../../app");
const http = supertest.agent(app);

// suites
describe("Car API", () => {
  before(done => {});
});
