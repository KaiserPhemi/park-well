// thirs-party libraries
const { expect } = require("chai");
const dotenv = require("dotenv");

dotenv.config();

// database model
const db = require("../index");

// test suites
describe("ParkingActivity Model", () => {
  const myUser = {
    firstName: "Centrion",
    lastName: "Kronika",
    email: "ceth@zoho.com",
    department: "Engineering",
    phoneNumber: "09033445247",
    password: "oluwafemi"
  };
  const cethCar = {
    regNo: "K_KEEP",
    brand: "Audi",
    model: "TT",
    color: "blue",
    ownerEmail: "ceth@zoho.com"
  };
  const herSpace = {
    title: "Zull_Keep",
    description: "A part of the keep area"
  };
  const parkingActivity = {
    carRegNo: "K_KEEP",
    ownerEmail: "ceth@zoho.com",
    parkingSpaceTitle: "Zull_Keep"
  };
  let otherUser;
  before(done => {
    db.User.create(myUser);
    db.Car.create(cethCar);
    db.ParkingSpace.create(herSpace).then(() => {
      done();
    });
  });
  after(done => {
    db.User.destroy({ where: {} });
    db.Car.destroy({ where: {} });
    db.ParkingSpace.destroy({ where: {} }).then(() => {
      done();
    });
  });

  describe("CREATE", () => {
    it("should create a new parking activity", done => {
      db.ParkingActivity.create(parkingActivity).then(activity => {
        const parkingDetail = activity.dataValues;
        expect(parkingDetail).to.be.an("object");
        expect(parkingDetail).to.have.property("createdAt");
        done();
      });
    });
  });
});
