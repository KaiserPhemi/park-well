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
  },

  /**
   * @author oluwafemi akinwa
   * @desc validates id passed as params
   * @param {integer} id
   */
  checkIdParams(id) {
    const idSchema = joi
      .number()
      .integer()
      .required();
    return joi.validate(id, idSchema);
  }
};

module.exports = validateData;
