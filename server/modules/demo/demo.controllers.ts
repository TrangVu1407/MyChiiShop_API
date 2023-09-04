const Joi = require("@hapi/joi");

const service = require("./demo.services");
const populateResponse = require("../../utils/populate_response");

import express, { Request, Response, NextFunction } from 'express';

exports.getList = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const branches = await service.getList(req.query);
   
    next(populateResponse.success(branches));
  } catch (e) {
    next(e);
  }
};