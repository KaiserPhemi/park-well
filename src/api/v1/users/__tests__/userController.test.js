// third-party libraries
const dotenv = require("dotenv");
const { expect } = require("chai");
const supertest = require("supertest");

// fixtures
const { newUser, newCar } = require("../../../../fixtures/testFixtures");

dotenv.config();
process.env.NODE_ENV = "test";

const app = require("../../../../app");
const http = supertest.agent(app);
const baseUrl = "/api/v1";

// test suites
describe("User API", () => {
  let createdUser;
  let userId;
  let userToken;
  const myUser = {
    firstName: "Kenshi",
    lastName: "Tagawa",
    email: "hanzo@gmail.com",
    department: "Engineering",
    phoneNumber: "09033445241",
    password: "oluwafemi"
  };
  describe("/POST Users", () => {
    it("should not register existing user", done => {
      http
        .post(`${baseUrl}/users`)
        .expect(200)
        .send(newUser)
        .end((err, res) => {
          expect(res.body).to.be.an("object");
          expect(res.body).to.have.property("message");
          expect(res.body.message).to.equal(
            `User with email: '${newUser.email}' already exist.`
          );
          done();
        });
    });
    it("should register a new user", done => {
      http
        .post(`${baseUrl}/users`)
        .expect(200)
        .send(myUser)
        .end((err, res) => {
          const { user } = res.body;
          createdUser = { ...user };
          userId = user.id;
          expect(res.body).to.be.an("object");
          expect(res.body).to.have.property("message");
          expect(res.body.message).to.equal("User created successfully");
          expect(user).to.be.an("object");
          expect(user.firstName).to.equal(myUser.firstName);
          expect(user.lastName).to.equal(myUser.lastName);
          expect(user.email).to.equal(myUser.email);
          expect(user.phoneNumber).to.equal(myUser.phoneNumber);
          expect(user.department).to.equal(myUser.department);
          done();
        });
    });
  });

  // updates a user detailshe
  describe("/PUT", () => {
    it("should update user details", done => {
      http
        .post(`${baseUrl}/auth/login`)
        .send({ email: createdUser.email, password: myUser.password })
        .end((err, res) => {
          userToken = res.headers["auth-token"];
          http
            .put(`${baseUrl}/users/${userId}`)
            .set({ "auth-token": userToken })
            .send({ department: "Operations & Admin" })
            .expect("Content-Type", /json/)
            .end((err, res) => {
              const updatedUser = res.body.user;
              expect(res.body).to.have.property("message");
              expect(res.body.message).to.equal(
                "User details updated successfully."
              );
              expect(updatedUser).to.be.an("object");
              expect(updatedUser).to.have.property("updatedAt");
              expect(updatedUser.department).to.equal("Operations & Admin");
              done();
            });
        });
    });
  });

  // deletes a user
  describe("/DELETE", () => {
    it("should delete a user record", done => {
      done();
    });
  });
});
