const Joi = require("@hapi/joi");
import { Request, Response, NextFunction } from "express";

const service = require("./product_size.services");
import { populateResponse, populateError } from "../../resources";

export interface getListServices {
  shop_id: number;
  is_delete: false;
}
export interface isExistingServices extends getListServices {
  product_type_id: number;
  code: string;
  name: string;
  id: number;
}
export interface dataServices {
  product_type_id: number;
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
      product_type_id: schema.value.product_type_id,
      shop_id: schema.value.shop_id,
      code: schema.value.code,
      name: schema.value.name,
      is_delete: false,
      // id = 0 vì không muốn viết thêm 1 câu query
      id: 0,
    };

    const data = await service.getList(valueIsExisting);
    // LẤY THÊM SỐ THỨ TIWJ CHO KÍCH THƯỚC
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data[i].product_sizes.length; j++) {
        data[i].product_sizes[j].stt = j + 1;
      }
    }

    next(populateResponse.success(data));
  } catch (e) {
    next(e);
  }
};

exports.create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const schema = Joi.object({
      shop_id: Joi.number().required(),
      product_type_id: Joi.number().required(),
      code: Joi.string().optional().allow(null, ""),
      name: Joi.string().required(),
      describe: Joi.string().required(),
      notes: Joi.string().optional().allow(null, ""),
    }).validate(req.body);

    if (schema.error) return next(populateResponse.validateError(schema.error));

    //kiểm tra loại sản phẩm đã tồn tại ?
    const isExisting = await service.isExisting(schema.value);
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

exports.update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const schema = Joi.object({
      id: Joi.number().required(),
      shop_id: Joi.number().required(),
      product_type_id: Joi.number().required(),
      code: Joi.string().optional().allow(null, ""),
      name: Joi.string().required(),
      describe: Joi.string().required(),
      notes: Joi.string().optional().allow(null, ""),
    }).validate(req.body);

    if (schema.error) return next(populateResponse.validateError(schema.error));

    //kiểm tra loại sản phẩm đã tồn tại ?
    const isExisting = await service.isExisting(schema.value);
    if (isExisting)
      return next(
        populateResponse.error(
          populateError.isExisting.message,
          populateError.isExisting.code,
          populateError.isExisting.httpCode
        )
      );

    const data = await service.update(schema.value.id, schema.value);

    next(populateResponse.success(data));
  } catch (e) {
    next(e);
  }
};

exports.delete = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const schema = Joi.object({
      id: Joi.number().required(),
    }).validate(req.body);

    if (schema.error) return next(populateResponse.validateError(schema.error));

    const data = await service.delete(schema.value.id);

    next(populateResponse.success(data));
  } catch (e) {
    next(e);
  }
};
