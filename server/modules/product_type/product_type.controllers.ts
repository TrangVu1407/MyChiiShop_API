const Joi = require("@hapi/joi");

const service = require("./product_type.services");
const populateResponse = require("../../utils/populate_response");
export interface getDataServices {
  shop_id: number;
  is_delete: false
}

import { Request, Response, NextFunction } from "express";

exports.getList = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const body = Joi.object({
      shop_id: Joi.number().optional(),
    }).validate(req.query);
    if (body.error) return next(populateResponse.validateError(body.error));

    let data: getDataServices = { shop_id: body.value.shop_id, is_delete: false };

    const list = await service.getList(data);

    next(populateResponse.success(list));
  } catch (e) {
    next(e);
  }
};
