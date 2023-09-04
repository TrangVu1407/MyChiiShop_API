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
    let data: dataServices = { name: "Huỳnh Văn Bình" };

    const list = await service.getList(data);

    next(populateResponse.success(list));
  } catch (e) {
    next(e);
  }
};
