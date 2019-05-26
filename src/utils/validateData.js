// third-party libraries
const joi = require("@hapi/joi");

const validateData = {
  /**
   * @author oluwafemi akinwa
   * @desc validates data for creating a role
   * @param {object} body
   */
  checkRoleData(body) {
    const roleSchema = {
      title: joi.string().required(),
      description: joi.string().required()
    };
    return joi.validate(body, roleSchema);
  }
};

module.exports = validateData;
