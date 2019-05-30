// third-party libraries
const dotenv = require("dotenv");
const { expect } = require("chai");
const supertest = require("supertest");

// fixtures
const {
  newUser,
  newCar,
  newSpace
} = require("../../../../fixtures/testFixtures");
dotenv.config();
process.env.NODE_ENV = "test";

const app = require("../../../../app");
const http = supertest.agent(app);
const baseUrl = "/api/v1";

// test suites
describe("Activity API", () => {
  let user;
  let token;
  before(done => {
    http
      .post(`${baseUrl}/users`)
      .send(newUser)
      .end((err, res) => {
        user = { ...res.body.user };
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
                http
                  .post(`${baseUrl}/spaces`)
                  .send(newSpace)
                  .set({ "auth-token": token })
                  .expect("Content-Type", /json/)
                  .end((err, res) => {
                    done();
                  });
              });
          });
        done();
      });
  });
  describe("/POST", () => {
    let newActivity = {
      carRegNo: "MAM-KI9",
      ownerEmail: "kaiser@gmail.com"
    };
    it("should register a parking activity", done => {
      http
        .post(`${baseUrl}/auth/login`)
        .send({ email: user.email, password: newUser.password })
        .end((err, res) => {
          token = res.headers["auth-token"];
          http
            .post(`${baseUrl}/activities`)
            .send(newActivity)
            .set({ "auth-token": token })
            .expect("Content-Type", /json/)
            .end((err, res) => {
              console.log(res.body);
              done();
            });
        });
    });
  });
  describe("/GET", () => {
    it("should retrieve all parking activities", done => {
      done();
    });
  });
  describe("/PUT", () => {
    it("should update a parking activity", done => {
      done();
    });
  });
});
