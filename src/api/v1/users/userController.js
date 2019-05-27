// database model
const db = require("../../../../models");

// utils
const validateData = require("../../../utils/validateData");
const filterData = require("../../../utils/filterData");

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
          message: "An error has occurred",
          err
        });
      });
  },

  /**
   * @author oluwafemi akinwa
   * @desc creates a user
   * @param {object} req
   * @param {object} res
   */
  createUser(req, res) {
    const validationError = validateData.checkUserData(req.body);
    if (validationError.error) {
      return res.status(400).send({
        message: "An error has occurred.",
        validationError
      });
    }
    const { email } = req.body;
    db.User.findOne({ where: { email } })
      .then(user => {
        if (user) {
          return res.status(403).send({
            message: `User with email: '${email}' already exist.`
          });
        } else {
          db.User.create(filterData.encryptPassword(req.body))
            .then(user => {
              return res.status(201).send({
                message: "User created successfully",
                user: filterData.filterUser(user)
              });
            })
            .catch(err => {
              return res.status(500).send({
                message: "An error has occurred. User not created.",
                err
              });
            });
        }
      })
      .catch(err => {
        return res.status(500).send({
          message: "An error has occurred. User not created.",
          err
        });
      });
  },

  /**
   * @author oluwafemi akinwa
   * @desc retrieves a single user
   * @param {object} req
   * @param {object} res
   */
  getUser(req, res) {
    const { id } = req.params;
    const error = validateData.checkIdParams(id);
    if (error.error) {
      return res.status(400).send({
        message: "User id is required & must be an integer",
        error
      });
    }
    db.User.findOne({ where: { id } })
      .then(user => {
        if (!user) {
          return res.status(404).send({
            message: `User with id: '${id}' does not exist`
          });
        }
        return res.status(200).send({
          message: "User retrieved successfully.",
          user: filterData.filterUser(user)
        });
      })
      .catch(err => {
        return res.status(500);
        send({
          message: "An internal error has occured.",
          err
        });
      });
  },

  /**
   * @author oluwafemi akinwa
   * @desc updates user details
   * @param {object} req
   * @param {object} res
   */
  updateUser(req, res) {
    const { id } = req.params;
    const error = validateData.checkIdParams(id);
    if (error.error) {
      return res.status(400).send({
        message: "User id is required & must be an integer",
        error
      });
    }
    db.User.findOne({ where: { id } }).then(user => {
      if (!user) {
        return res.status(404).send({
          message: `User with id: '${id}' does not exist.`
        });
      }
      let userData;
      if (req.body.password) {
        userData = filterData.encryptPassword(req.body);
      } else {
        userData = req.body;
      }
      db.User.update(userData, {
        where: { id },
        returning: true
      })
        .then(user => {
          const updatedUser = user[1][0].dataValues; // extract only the user object
          return res.status(200).send({
            message: "User details updated successfully.",
            user: filterData.filterUser(updatedUser)
          });
        })
        .catch(err => {
          return res.status(500).send({
            message: "An error has occurred.",
            err
          });
        });
    });
  },

  /**
   * @author oluwafemi akinwa
   * @desc deletes a user
   * @param {object} req
   * @param {object} res
   */
  deleteUser(req, res) {
    const { id } = req.params;
    const validationError = validateData.checkIdParams(id);
    if (validationError.error) {
      return res.status(400).send({
        message: "User id is required & must be an integer",
        validationError
      });
    }
    db.User.findOne({ where: { id } })
      .then(user => {
        if (!user) {
          return res.status(404).send({
            message: "User does not exist"
          });
        }
        const deletedUser = filterData.filterUser(user);
        user.destroy();
        return res.status(200).send({
          message: "User deleted successfully",
          deletedUser
        });
      })
      .catch(err => {
        return res.status(500).send({
          message: "An error has occured. User not deleted.",
          err
        });
      });
  }
};

module.exports = userController;
