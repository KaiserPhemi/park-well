// third-party libraries
const supertest = require("supertest");
const { expect } = require("chai");

// database model
const Role = require("../../../../../models");

// express app
const app = require("../../../../app");

process.env.NODE_ENV = "test";
const http = supertest.agent(app);
const baseUrl = "/api/v1";

describe("Role routes", () => {
  before();
});
