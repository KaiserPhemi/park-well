// third-party libraries
const bcrypt = require("bcrypt");

// salt rounds
const SALT_ROUNDS = 10;

/**
 * @author oluwafemi akinwa
 * @desc encrypts incoming string
 * @param {string} data
 */
const encrypt = data => {
  return bcrypt.hashSync(data, SALT_ROUNDS);
};

module.exports = encrypt;
