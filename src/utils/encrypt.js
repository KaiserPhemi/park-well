// third-party libraries
const bcrypt = require("bcrypt");

// salt rounds
const SALT_ROUNDS = 10;

/**
 * @author oluwafemi akinwa
 * @desc encrypts incoming string
 * @param {string} data
 */
const encrypt = {
  /**
   * @desc encrypts the password
   * @param {string} data
   */
  encryptPassword(data) {
    return bcrypt.hashSync(data, SALT_ROUNDS);
  },

  /**
   * @desc compares password supplied with what is in the database
   * @param {string} data
   * @param {string} hash
   */
  comparePassword(data, hash) {
    return bcrypt.compareSync(data, hash);
  }
};
module.exports = encrypt;
