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
  },

  /**
   * @author oluwafemi akinwa
   * @desc validates incoming payload to register user
   * @param {object} data
   */
  checkUserData(data) {
    const userSchema = {
      firstName: joi
        .string()
        .max(50)
        .required(),
      lastName: joi
        .string()
        .max(50)
        .required(),
      email: joi
        .string()
        .email()
        .required(),
      password: joi
        .string()
        .min(8)
        .required(),
      phoneNumber: joi
        .string()
        .max(15)
        .required(),
      department: joi.string().required(),
      roleId: joi.number().integer()
    };
    return joi.validate(data, userSchema);
  },

  /**
   * @desc validates the supplied login details
   * @param {object} data
   */
  checkLoginData(data) {
    const loginSchema = {
      email: joi
        .string()
        .email()
        .required(),
      password: joi
        .string()
        .min(8)
        .required()
    };
    return joi.validate(data, loginSchema);
  },

  /**
   * @desc validates input data for car
   * @param {object} data
   */
  checkCarData(data) {
    const carSchema = {
      regNo: joi
        .string()
        .max(12)
        .required(),
      brand: joi
        .string()
        .max(30)
        .required(),
      model: joi
        .string()
        .max(30)
        .required(),
      color: joi
        .string()
        .max(20)
        .required(),
      parked: joi.any().valid([false, true]),
      ownerEmail: joi
        .string()
        .email()
        .required()
    };
    return joi.validate(data, carSchema);
  },

  /**
   * @desc validates update data for updating car details
   * @param {object} data
   */
  checkCarUpdateData(data) {
    const carSchema = {
      regNo: joi.string().max(12),
      brand: joi.string().max(30),
      model: joi.string().max(30),
      color: joi.string().max(20),
      parked: joi.any().valid([false, true]),
      ownerEmail: joi.string().email()
    };
    return joi.validate(data, carSchema);
  }
};

module.exports = validateData;
