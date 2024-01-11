const Joi = require("@hapi/joi");
import { Request, Response, NextFunction } from "express";

const service = require("./product.services");
import { populateResponse, populateError } from "../../resources";

export interface getListServices {
  shop_id: number;
  is_delete: false;
}
export interface isExistingServices extends getListServices {
  name: string;
  id: number;
}

interface Image {
  name: string;
  img: string;
}

interface productDetail {
  product_size_id: number;
  price_purchase: number;
  price_sell: number;
  quantity: number;
}

export interface dataServices {
  shop_id: number;
  name: string;
  describe: string;
  notes: string;
  product_type_id: number;
  gender_id: number;
  image: Image[];
  product_detail: productDetail[];
}
exports.create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const schema = Joi.object({
      shop_id: Joi.number().required(),
      name: Joi.string().required(),
      describe: Joi.string().optional().allow(null, ""),
      notes: Joi.string().optional().allow(null, ""),
      product_type_id: Joi.number().required(),
      gender_id: Joi.number().required(),
      image: Joi.array()
        .items(
          Joi.object({
            name: Joi.string().required(),
            img: Joi.string().required(), // Assuming 'img' is a string representing the image URL
          })
        )
        .required(),
      product_detail: Joi.array()
        .items(
          Joi.object({
            product_size_id: Joi.number().required(),
            price_purchase: Joi.number().required(),
            price_sell: Joi.number().required(),
            quantity: Joi.number().required(),
          })
        )
        .required(),
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
