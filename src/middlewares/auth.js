// third-party libraries
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

// models
const db = require("../../models");

// token list
const tokenList = require("./tokenList");

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
    if (tokenList.indexOf(token) > 0) {
      return res.status(401).send({
        message: "Invalid token. Please login."
      });
    }
    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).send({
          message: "Invalid token"
        });
      }
      db.User.findOne({ where: { id: decoded.id } })
        .then(user => {
          if (!user) {
            return res.status(404).send({
              message: "Account does not exist."
            });
          }
          next();
        })
        .catch(err => {
          return res.status(500).send({
            message: "Internal error occurred.",
            err
          });
        });
    });
  }
};

module.exports = auth;
