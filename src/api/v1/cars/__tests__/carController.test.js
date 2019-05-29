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
  let carId;
  before(done => {
    http
      .post(`${baseUrl}/users`)
      .send(newUser)
      .end((err, res) => {
        user = { ...res.body.user };
        done();
      });
  });

  // registers a car
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
              carId = car.id;
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

  // retrieves all cars
  describe("/GET Cars", () => {
    it("should retrieve all cars registered", done => {
      http
        .post(`${baseUrl}/auth/login`)
        .send({ email: user.email, password: newUser.password })
        .end((err, res) => {
          token = res.headers["auth-token"];
          http
            .get(`${baseUrl}/cars`)
            .set({ "auth-token": token })
            .expect("Content-Type", /json/)
            .end((err, res) => {
              expect(res.body.cars).to.be.an("array");
              expect(res.body.message).to.equal(
                "All cars retrieved successfully"
              );
              done();
            });
        });
    });
  });

  // updates car details
  describe("/PUT Car", () => {
    it("should update car details", done => {
      http
        .post(`${baseUrl}/auth/login`)
        .send({ email: user.email, password: newUser.password })
        .end((err, res) => {
          token = res.headers["auth-token"];
          http
            .put(`${baseUrl}/cars/${carId}`)
            .set({ "auth-token": token })
            .send({ color: "black" })
            .expect("Content-Type", /json/)
            .end((err, res) => {
              const updatedCar = res.body.updatedCar[1][0];
              expect(res.body).to.be.an("object");
              expect(updatedCar).to.be.an("object");
              expect(res.body.message).to.equal(
                "Car details updated successfully"
              );
              expect(updatedCar.color).to.equal("black");
              done();
            });
        });
    });
  });

  // deletes a car record
  describe("/DELETE Car", () => {
    it("should delete a car details/record", done => {
      http
        .post(`${baseUrl}/auth/login`)
        .send({ email: user.email, password: newUser.password })
        .end((err, res) => {
          token = res.headers["auth-token"];
          http
            .delete(`${baseUrl}/cars/${carId}`)
            .set({ "auth-token": token })
            .expect(200)
            .expect("Content-Type", /json/)
            .end((err, res) => {
              expect(res.body).to.be.an("object");
              expect(res.body.message).to.equal(
                "Car details deleted successfully"
              );
              done();
            });
        });
    });
  });
});
