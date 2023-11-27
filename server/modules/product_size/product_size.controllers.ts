const Joi = require("@hapi/joi");
const _ = require("lodash");
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

interface aaaa {
  id: number;
  name: string;
  describe: string;
  notes?: string;
}
export interface dataServices {
  product_sizes: [];
}

export interface dataUpdateServices {
  product_sizes: {
    addNew: [];
    update: aaaa[];
  };
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
      product_sizes: Joi.array()
        .items(
          Joi.object({
            shop_id: Joi.number().required(),
            product_type_id: Joi.number().required(),
            name: Joi.string().required(),
            describe: Joi.string().required(),
            notes: Joi.string().optional().allow(null, ""),
          })
        )
        .min(0)
        .required(),
    }).validate(req.body);

    if (schema.error) return next(populateResponse.validateError(schema.error));

    //kiểm tra loại sản phẩm đã tồn tại ?
    // const isExisting = await service.isExisting(schema.value);
    // if (isExisting)
    //   return next(
    //     populateResponse.error(
    //       populateError.isExisting.message,
    //       populateError.isExisting.code,
    //       populateError.isExisting.httpCode
    //     )
    //   );

    const data = await service.create(schema.value);

    next(populateResponse.success(data));
  } catch (e) {
    next(e);
  }
};

exports.update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const PRODUCT_SIZE = {
      name: Joi.string().required(),
      describe: Joi.string().required(),
      notes: Joi.string().optional().allow(null, ""),
    };
    const ADDITIONAL_FIELDS = {
      id: Joi.number().required(),
    };

    const schema = Joi.object({
      product_sizes: Joi.object({
        addNew: Joi.array().items({ ...PRODUCT_SIZE }),
        update: Joi.array().items({ ...PRODUCT_SIZE, ...ADDITIONAL_FIELDS }),
      }).required(),
    }).validate(req.body);

    if (schema.error) return next(populateResponse.validateError(schema.error));

    if (_.isEmpty(schema.value.product_sizes)) {
      return next(
        populateResponse.error(
          populateError.noData.message,
          populateError.noData.code,
          populateError.noData.httpCode
        )
      );
    }
    //kiểm tra loại sản phẩm đã tồn tại ?
    // const isExisting = await service.isExisting(schema.value);
    // if (isExisting)
    //   return next(
    //     populateResponse.error(
    //       populateError.isExisting.message,
    //       populateError.isExisting.code,
    //       populateError.isExisting.httpCode
    //     )
    //   );

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
