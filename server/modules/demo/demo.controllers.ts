const Joi = require("@hapi/joi");

const service = require("./demo.services");
const populateResponse = require("../../utils/populate_response");
export interface dataServices {
  name: string;
  age?: number;
  address?: string;
}

import express, { Request, Response, NextFunction } from "express";

exports.getList = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const body = Joi.object({
      name: Joi.string().required(),
      age: Joi.number().optional(),
      address: Joi.string().optional().allow(null, ""),
    }).validate(req.query);
    if (body.error) return next(populateResponse.validateError(body.error));

    let data: dataServices = { name: body.value.name, age: body.value.age, address: body.value.address };

    const list = await service.getList(data);

    next(populateResponse.success(list));
  } catch (e) {
    next(e);
  }
};
