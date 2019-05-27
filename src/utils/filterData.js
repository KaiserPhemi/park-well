// utils
const encrypt = require("./encrypt");

const filterData = {
  /**
   * @author oluwafemi akinwa
   * @desc filters user data to exclude password
   * @param {object} user
   */
  filterUser(user) {
    const createdUser = {
      roleId: user.roleId,
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      department: user.department,
      updatedAt: user.updatedAt,
      createdAt: user.createdAt
    };
    return createdUser;
  },

  /**
   * @desc transfom
   * @param {object} data
   */
  encryptPassword(data) {
    const user = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: encrypt.encryptPassword(data.password),
      phoneNumber: data.phoneNumber,
      department: data.department,
      roleId: data.roleId
    };
    return user;
  }
};

module.exports = filterData;
