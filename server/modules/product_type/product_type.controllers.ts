const Joi = require("@hapi/joi");

const service = require("./product_type.services");
const populateResponse1 = require("../../utils/populate_response");
import { populateResponse } from "../../resources";

export interface getDataServices {
  shop_id: number;
  is_delete: false;
}

import { Request, Response, NextFunction } from "express";

exports.getList = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const body = Joi.object({
      shop_id: Joi.number().required(),
    }).validate(req.query);

    if (body.error) return next(populateResponse.validateError(body.error));

    const value: getDataServices = {
      shop_id: body.value.shop_id,
      is_delete: false,
    };

    const data = await service.getList(value);

    next(populateResponse.success(data));
  } catch (e) {
    next(e);
  }
};
