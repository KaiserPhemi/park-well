// database model
const db = require("../../../../models");

// utils
const validateData = require("../../../utils/validateData");
const filterData = require("../../../utils/filterData");

// middlewares
const auth = require("../../../middlewares/auth");

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
        if (user && encrypt.comparePassword(req.password, user.password)) {
          const generatedToken = auth.createToken(user);
          const loggedInUser = filterData.filterUser(user);
          return res.status(200).send({
            message: "User logged in successfully",
            loggedInUser,
            generatedToken
          });
        }
        return res.status(404).send({
          message: "Incorrect login credentials.Please try again."
        });
      })
      .catch(err => {
        return res.status(500).send({
          message: "An internal error has occurred",
          err
        });
      });
  },
  logout() {}
};

module.exports = authController;
