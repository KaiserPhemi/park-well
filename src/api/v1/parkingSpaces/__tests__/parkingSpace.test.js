// third-party libraries
const dotenv = require("dotenv");
const { expect } = require("chai");
const supertest = require("supertest");

// fixtures
const { secondUser } = require("../../../../fixtures/testFixtures");

dotenv.config();
process.env.NODE_ENV = "test";

const app = require("../../../../app");
const http = supertest.agent(app);
const baseUrl = "/api/v1";

// test suites
describe("Parking Space API", () => {
  const newSpace = {
    title: "District-12",
    description: "A new area"
  };
  let user;
  let createdSpace;
  let token;
  before(done => {
    http
      .post(`${baseUrl}/users`)
      .send(secondUser)
      .end((err, res) => {
        user = { ...res.body.user };
        done();
      });
  });

  // registers a parking space
  describe("/POST", () => {
    it("should register a new allocated parking space", done => {
      http
        .post(`${baseUrl}/auth/login`)
        .send({ email: user.email, password: secondUser.password })
        .end((err, res) => {
          token = res.headers["auth-token"];
          http
            .post(`${baseUrl}/spaces`)
            .send(newSpace)
            .set({ "auth-token": token })
            .expect("Content-Type", /json/)
            .end((err, res) => {
              createdSpace = res.body.space;
              expect(res.body).to.be.an("object");
              expect(res.body).to.have.property("message");
              expect(res.body.message).to.equal(
                "Parking space registered successfully"
              );
              expect(createdSpace).to.be.an("object");
              expect(createdSpace).to.have.property("createdAt");
              expect(createdSpace).to.have.property("vacant");
              expect(createdSpace.vacant).to.be.true;
              expect(createdSpace.title).to.equal(newSpace.title);
              expect(createdSpace.description).to.equal(newSpace.description);
              done();
            });
        });
    });
  });

  // updates parking space details
  describe("/PUT", () => {
    it("should update parking space details", done => {
      http
        .post(`${baseUrl}/auth/login`)
        .send({ email: user.email, password: secondUser.password })
        .end((err, res) => {
          token = res.headers["auth-token"];
          http
            .put(`${baseUrl}/spaces/${createdSpace.id}`)
            .set({ "auth-token": token })
            .send({ title: "District 51", vacant: false })
            .expect("Content-Type", /json/)
            .end((err, res) => {
              const updatedSpace = res.body.updatedSpace[1][0];
              expect(updatedSpace).to.be.an("object");
              expect(updatedSpace).to.be.have.property("updatedAt");
              expect(res.body.message).to.equal(
                "Parking space details updated successfully."
              );
              expect(updatedSpace.title).to.equal("District 51");
              expect(updatedSpace.vacant).to.be.false;
              done();
            });
        });
    });
  });
});
