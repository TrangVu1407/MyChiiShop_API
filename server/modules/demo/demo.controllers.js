const Joi = require("@hapi/joi");

const service = require("./demo.services");
const populateResponse = require("../../utils/populate_response");

const errors = {
  userBranchNotFound: "UserBranch not found",
};

exports.getList = async (req, res, next) => {
  try {
    const branches = await service.getList(req.query);
    if (!branches)
      return next(populateResponse.error(errors.userBranchNotFound));

    next(populateResponse.success(branches));
  } catch (e) {
    next(e);
  }
};