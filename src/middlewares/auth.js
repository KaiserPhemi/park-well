// third-party libraries
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

// models
const db = require("../../models");

const auth = {
  /**
   * @desc generates token for user.
   * @param {integer} id
   * @param {integer} id
   */
  createToken(id, roleId) {
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
  verifyToken(req, res, next) {
    const token = req.header("auth-token");
    if (!token) {
      return res.status(401).send({
        message: "Access denied. Please login."
      });
    }
    try {
      const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    } catch {
      return res.status(400).send({
        message: "Invalid token"
      });
    }
  }
};

module.exports = auth;
