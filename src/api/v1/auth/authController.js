// third-party libraries
// const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

// database model
const db = require("../../../../models");

// utils
const validateData = require("../../../utils/validateData");
const filterData = require("../../../utils/filterData");
const encrypt = require("../../../utils/encrypt");

// middlewares
const auth = require("../../../middlewares/auth");
const tokenList = require("../../../middlewares/tokenList");

// controller
const authController = {
  /**
   * @desc
   * @param {object} req
   * @param {object} res
   */
  login(req, res) {
    const validationError = validateData.checkLoginData(req.body);
    if (validationError.error) {
      return res.status(400).send({
        message: "An error has occurred.",
        validationError
      });
    }
    const { email } = req.body;
    db.User.findOne({ where: { email } })
      .then(user => {
        if (!user) {
          return res.status(404).send({
            message: `User with email: ${email} does not exist.`
          });
        }
        const { password, id, roleId } = user;
        if (user && encrypt.comparePassword(req.body.password, password)) {
          const generatedToken = auth.createToken(id, roleId);
          const loggedInUser = filterData.filterUser(user);
          return res
            .status(200)
            .header("auth-token", generatedToken)
            .send({
              message: "User logged in successfully",
              loggedInUser
            });
        }
        return res.status(404).send({
          message: "Incorrect login credentials. Please try again."
        });
      })
      .catch(err => {
        return res.status(500).send({
          message: "An internal error has occurred",
          err
        });
      });
  },

  /**
   * @author oluwafemi akinwa
   * @desc log users out of the app
   * @param {object} req
   * @param {object} res
   */
  logout(req, res) {
    const userToken = req.headers["auth-token"];
    tokenList.push(userToken);
    return res
      .status(200)
      .header("auth-token", null)
      .send({
        message: "User logged out successfully."
      });
  }
};

module.exports = authController;
