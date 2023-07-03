const _ = require("lodash");
const moment = require("moment");

const webTokenService = require("../modules/web_token/web_token.services");
const permissionsService = require("../modules/permissions/permissions.services");
const { verifyToken, getAccountByToken } = require("../utils/account");

const populateResponse = require("../utils/populate_response");

const errors = {
  unauthorized: "Unauthorized error",
  forbidden: "Forbidden error",
  tokenInvalid: "Token invalid",
  userDoesNotExist: "User has been deleted by admin",
  userHasBeenBlocked: "User has been blocked by admin",
  unknown: "Oops! Something went wrong",
  errorToken: "Sorry! token no use",
};

exports.isAuthenticate = async (req, res, next) => {
  try {
    if (!req.headers.authorization)
      return next(populateResponse.error(errors.unauthorized, 401, 401));

    const [bearer, token] = _.split(req.headers.authorization, " ");

    if (!token)
      return next(populateResponse.error(errors.tokenInvalid, 401, 401));

    const webToken = await webTokenService.checkWebToken(token);
    if (!webToken)
      return next(populateResponse.error(errors.tokenInvalid, 401, 401));

    const date_now = moment(new Date()).format("yyyyMMDDhhmmss");
    const expired_at = moment(webToken.expired_at).format("yyyyMMDDhhmmss");
    if (date_now - expired_at > 120000) {
      return next(populateResponse.error(errors.errorToken, 401, 401));
    }
    const payload = await verifyToken(token);

    if (!payload)
      return next(populateResponse.error(errors.tokenInvalid, 401, 401));

    //lấy id account dựa vào token getAccountByToken
    const data = await getAccountByToken(token);
    req.account_id = data.account_id;

    return next();
  } catch (e) {
    next(populateResponse.error(e.message, 400, 403));
  }
};

exports.checkRole = async (req, res, next) => {
  try {
    const str = req.originalUrl.split("?");
    const accessible = await permissionsService.checkAccessibleAPI(
      req.account_id,
      str[0]
    );
    if (!accessible) {
      return next(populateResponse.error(errors.forbidden, 403, 403));
    }
    next();
  } catch (e) {
    res.status(400).send({
      code: 400,
      error: true,
      message: errors.unknown,
    });
  }
};
