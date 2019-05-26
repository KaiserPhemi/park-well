// database model
const db = require("../../../../models");

const userController = {
  /**
   * @author oluwafemi akinwa
   * @desc retrieves all user
   * @param {object} req
   * @param {object} res
   */
  getAllUsers(req, res) {
    db.User.findAll()
      .then(users => {
        return res.status(200).send({
          message: "Users retrieved successfully.",
          users
        });
      })
      .catch(err => {
        return res.status(500).send({
          message: "An error has occured",
          err
        });
      });
  },

  createUser(req, res) {
    const {
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
      department
    } = req.body;
    const validationError = res.send({
      message: "we get all users"
    });
  }
};

module.exports = userController;
