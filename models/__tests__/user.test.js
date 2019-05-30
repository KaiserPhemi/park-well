const { expect } = require("chai");
const dotenv = require("dotenv");

dotenv.config();

// database model
const db = require("../index");

// fixtures
const { newUser } = require("./testFixtures");

// test suites
describe("User Model", () => {
  after(done => {
    db.User.destroy({ where: {} }).then(() => {
      done();
    });
  });

  // creates a user
  describe("CREATE", () => {
    it("should create a user", done => {
      db.User.create(newUser).then(user => {
        const createdUser = user.dataValues;
        expect(createdUser.firstName).to.equal(newUser.firstName);
        expect(createdUser.lastName).to.equal(newUser.lastName);
        expect(createdUser.department).to.equal(newUser.department);
        expect(createdUser.phoneNumber).to.equal(newUser.phoneNumber);
        expect(createdUser.email).to.equal(newUser.email);
        expect(createdUser).to.have.property("createdAt");
        done();
      });
    });
  });

  // updates a user's details
  describe("UPDATE", () => {
    it("should update user details", done => {
      db.User.findOne({ where: { email: newUser.email } }).then(user => {
        user.update({ department: "TDD" }).then(user => {
          const updatedUser = user.dataValues;
          expect(updatedUser).to.be.an("object");
          expect(updatedUser).to.have.property("updatedAt");
          expect(updatedUser.department).to.equal("TDD");
          done();
        });
      });
    });
  });

  // deletes a user
  describe("DELETE", () => {
    it("should delete a user record", done => {
      db.User.findOne({ where: { email: newUser.email } }).then(user => {
        expect(user.dataValues).to.be.an("object");
        user.destroy().then(() => {
          db.User.findOne({ where: { email: newUser.email } }).then(user => {
            expect(user).to.equal(null);
            done();
          });
        });
      });
    });
  });
});
