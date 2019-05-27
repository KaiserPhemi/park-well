// database model
const db = require("../../../../models");

const parkingSpaceController = {
  /**
   * @desc
   * @param {object} req
   * @param {object} res
   */
  getParkingSpaces(req, res) {
    db.ParkingSpace.findAll().then(spaces => {
      return res.status(200).send({
        message: "All parking spaces retrieved successfully",
        spaces
      });
    });
  }
};

module.exports = parkingSpaceController;
