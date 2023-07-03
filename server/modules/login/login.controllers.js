const accountService = require("../account/account.services");
const permissionsService = require("../permissions/permissions.services");
const webTokenService = require("../web_token/web_token.services");
const employeeService = require("../employee/employee.services");

const Joi = require("@hapi/joi");
const populateResponse = require("../../utils/populate_response");
const {
  verifyPassword,
  signToken,
  deleteTokenByToken,
} = require("../../utils/account");

const _ = require("lodash");

const moment = require("moment");

const errors = {
  accountDoesNotExist: "Account does not exist",
  employeeDoesNotExist: "Employee does not exist",
  incorrectPassword: "Incorrect password",
};

exports.login = async (req, res, next) => {
  try {
    const data = Joi.object({
      email: Joi.string().required(),
      password: Joi.string().required(),
    }).validate(req.body);

    if (data.error) {
      return next(populateResponse.validateError(data.error));
    }

    const account = await accountService.getAccountByEmail(data.value.email);
    if (!account) {
      return next(populateResponse.error(errors.accountDoesNotExist, 404, 200));
    }

    if (!verifyPassword(data.value.password, account.password, account.salt)) {
      return next(populateResponse.error(errors.incorrectPassword, 400, 200));
    }

    const employee = await employeeService.getEmployeeByAccountId(account.id);
    if (!employee) {
      return next(
        populateResponse.error(errors.employeeDoesNotExist, 404, 200)
      );
    }
    // xóa hết các token
    await deleteTokenByToken(employee.id);

    const token = signToken(employee.id);
    const permissions = await permissionsService.accountPermissions(account.id);

    let webToken = {
      account_id: account.id,
      token: token,
      logout_at: null,
      expired_at: moment().add(
        process.env.TOKEN_DURATION * 24 * 60 * 60,
        "seconds"
      ),
    };
    await webTokenService.insertWebToken(webToken);
    next(
      populateResponse.success({
        employee,
        token,
        permissions,
      })
    );
  } catch (e) {
    next(e);
  }
};
