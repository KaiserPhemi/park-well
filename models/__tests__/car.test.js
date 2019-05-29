// third-party libraries
const { expect } = require("chai");
const dotenv = require("dotenv");

dotenv.config();

// database model
const db = require("../index");

// fixtures
const { newCar, newUser, lostCar } = require("./testFixtures");

// test suites
describe("Car Model", () => {
  let registeredCar;
  before(done => {
    db.User.destroy({ where: {} });
    db.User.create(newUser);
    done();
  });
  after(done => {
    db.Car.destroy({ where: {} });
    done();
  });

  describe("CREATE", () => {
    it("should register a car", done => {
      db.Car.create(newCar).then(car => {
        registeredCar = car.dataValues;
        expect(registeredCar.regNo).to.equal(newCar.regNo);
        expect(registeredCar.brand).to.equal(newCar.brand);
        expect(registeredCar.model).to.equal(newCar.model);
        expect(registeredCar.color).to.equal(newCar.color);
        expect(registeredCar.ownerEmail).to.equal(newCar.ownerEmail);
        expect(registeredCar).to.have.property("createdAt");
        expect(registeredCar).to.have.property("parked");
        done();
      });
    });

    it("should not register a car with invalid owner email", done => {
      db.Car.create(lostCar)
        .then()
        .catch(err => {
          const dbError = err.errors[0];
          expect(dbError.message).to.equal("Car.ownerEmail cannot be null");
          expect(dbError.type).to.equal("notNull Violation");
          done();
        });
    });
  });

  describe("UPDATE", () => {
    it("should update car details", done => {
      db.Car.findOne({ where: { regNo: newCar.regNo } }).then(car => {
        car.update({ parked: true }).then(car => {
          const updatedCar = car.dataValues;
          expect(updatedCar).to.have.property("parked");
          expect(updatedCar.parked).to.be.true;
          done();
        });
      });
    });
  });
});
