const Joi = require("@hapi/joi");
import { Request, Response, NextFunction } from "express";

const service = require("./product_color.services");
import { populateResponse, populateError } from "../../resources";

export interface getListServices {
  shop_id: number;
  is_delete: false;
}
export interface isExistingServices extends getListServices {
  code: string;
  name: string;
  id: number;
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
      // id = 0 vì không muốn viết thêm 1 câu query
      id: 0,
    };

    const data = await service.getList(valueIsExisting);

    next(populateResponse.success(data));
  } catch (e) {
    next(e);
  }
};
