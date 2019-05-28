// third-party libraries
const { expect } = require("chai");
const dotenv = require("dotenv");

dotenv.config();

// database model
const db = require("../index");

// fixtures
const { newCar, newUser } = require("./testFixtures");

// test suites
describe("Car Model", () => {
  let registeredCar;
  before(done => {
    db.User.destroy({ where: {} });
    db.User.create(newUser).then(() => {
      done();
    });
  });
  after(done => {
    db.Car.destroy({ where: {} });
    done();
  });

  describe("CREATE", () => {
    it("should register a car", done => {
      db.Car.create(newCar).then(car => {
        registeredCar = car.dataValues;
        console.log(registeredCar);
        done();
      });
    });
  });
});
