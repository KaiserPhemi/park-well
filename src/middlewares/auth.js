// third-party libraries
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

// models
const db = require("../../models");

const auth = {
  /**
   * @desc generates token for user.
   * @param {object} user
   */
  createToken({ id, roleId }) {
    const userToken = jwt.sign(
      {
        id,
        roleId
      },
      process.env.TOKEN_SECRET,
      { expiresIn: "1d" }
    );
    return userToken;
  },
  /**
   * @desc verifies token from front end.
   * @param {object} req
   * @param {object} res
   * @param {object} next
   */
  verifyToken(req, res, next) {}
};

module.exports = auth;
