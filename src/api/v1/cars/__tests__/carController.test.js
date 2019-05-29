// third-party libraries
const dotenv = require("dotenv");
const { expect } = require("chai");
const supertest = require("supertest");

// fixtures
const { newUser, newCar } = require("./testFixtures");

dotenv.config();
process.env.NODE_ENV = "test";

const app = require("../../../../app");
const http = supertest.agent(app);
const baseUrl = "/api/v1";

// suites
describe("Car API", () => {
  let user;
  let token;
  before(done => {
    http
      .post(`${baseUrl}/users`)
      .send(newUser)
      .end((err, res) => {
        user = { ...res.body.user };
        done();
      });
  });

  describe("/POST Car", () => {
    it("should register car details", done => {
      http
        .post(`${baseUrl}/auth/login`)
        .send({ email: user.email, password: newUser.password })
        .end((err, res) => {
          token = res.headers["auth-token"];
          http
            .post(`${baseUrl}/cars`)
            .send(newCar)
            .set({ "auth-token": token })
            .expect("Content-Type", /json/)
            .end((err, res) => {
              const { car } = res.body;
              expect(car.regNo).to.equal(newCar.regNo);
              expect(car.brand).to.equal(newCar.brand);
              expect(car.model).to.equal(newCar.model);
              expect(car.color).to.equal(newCar.color);
              expect(car.ownerEmail).to.equal(newCar.ownerEmail);
              expect(car).to.have.property("createdAt");
              expect(car).to.have.property("parked");
              done();
            });
        });
    });
  });

  describe("/GET Cars", () => {});
  describe("/PUT Car", () => {});
});
