const { expect } = require("chai");
const dotenv = require("dotenv");

dotenv.config();

// database model
const db = require("../index");

// test-suites
describe("Parking Space Model", () => {
  const newSpace = {
    title: "SECTOR-10A",
    description: "New parking lot"
  };
  let createdSpace;
  after(done => {
    db.ParkingSpace.destroy({ where: {} }).then(() => {
      done();
    });
  });

  // create a new space
  describe("CREATE", () => {
    it("should register a new parking space", done => {
      db.ParkingSpace.create(newSpace).then(space => {
        createdSpace = space.dataValues;
        expect(createdSpace).to.be.an("object");
        done();
      });
    });
  });

  // updates a space
  describe("UPDATE", () => {
    it("should update parking space details", done => {
      db.ParkingSpace.findOne({ where: { title: createdSpace.title } }).then(
        space => {
          space.update({ vacant: false }).then(space => {
            const updatedSpace = space.dataValues;
            expect(updatedSpace).to.be.an("object");
            expect(updatedSpace).to.have.property("vacant");
            expect(updatedSpace.vacant).to.be.false;
            done();
          });
        }
      );
    });
  });
});
