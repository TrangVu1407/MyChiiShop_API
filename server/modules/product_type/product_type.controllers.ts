const Joi = require("@hapi/joi");
import { Request, Response, NextFunction } from "express";

const service = require("./product_type.services");
import { populateResponse, populateError } from "../../resources";

export interface getListServices {
  shop_id: number;
  is_delete: false;
}
export interface isExistingServices extends getListServices {
  code: string;
  name: string;
}
export interface createServices {
  shop_id: number;
  code: string;
  name: string;
  describe: string;
  notes: string;
}

exports.getList = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const schema = Joi.object({
      shop_id: Joi.number().required(),
    }).validate(req.query);

    if (schema.error) return next(populateResponse.validateError(schema.error));

    const valueIsExisting: isExistingServices = {
      shop_id: schema.value.shop_id,
      code: schema.value.code,
      name: schema.value.name,
      is_delete: false,
    };

    const data = await service.getList(valueIsExisting);

    next(populateResponse.success(data));
  } catch (e) {
    next(e);
  }
};

exports.create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const schema = Joi.object({
      shop_id: Joi.string().required(),
      code: Joi.number().min(1).max(12).required(),
      name: Joi.number().required(),
      describe: Joi.number().required(),
      notes: Joi.number().optional().allow(null),
    }).validate(req.body);

    if (schema.error) return next(populateResponse.validateError(schema.error));

    const value: getListServices = {
      shop_id: schema.value.shop_id,
      is_delete: false,
    };

    //kiểm tra loại sản phẩm đã tồn tại ?
    const isExisting = await service.isExisting(value);
    if (isExisting)
      return next(
        populateResponse.error(
          populateError.isExisting.message,
          populateError.isExisting.code,
          populateError.isExisting.httpCode
        )
      );

    const data = await service.create(schema.value);

    next(populateResponse.success(data));
  } catch (e) {
    next(e);
  }
};