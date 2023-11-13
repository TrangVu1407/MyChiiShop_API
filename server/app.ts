import express, { Request, Response, NextFunction } from 'express';
//const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
require('./global.db');
require('./resources');
 
// api 
// 1.login
const login = require('./modules/login/login.routes');
// 2.login
const demo = require('./modules/demo/demo.routes');
// loại sản phẩm
const productType = require('./modules/product_type/product_type.routes');
// kích thước sản phẩm
const productSize = require('./modules/product_size/product_size.routes')

const app = express();
app.use(function (req: Request, res: Response, next: NextFunction) {
  req.start = new Date().getTime();
  next();
});
app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "100mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "100mb",
    extended: false,
  })
);
app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);

app.get("/", (req, res) => {
  res.send("<h2>Văn Bình demo 16062000</h2>");
});

//1.login
app.use('/api/', login);
//2.demo
app.use('/api/demo', demo);
// loại sản phẩm
app.use('/api/product_type', productType);
// 
app.use('/api/product_size', productSize);


// Error handler
interface CustomError extends Error {
  httpCode?: number;
  code?: number;
  error?: boolean;
  data?: any;
}

// Error handler
app.use((err: CustomError, req: Request, res: Response, next: NextFunction) => {
  const content = {
    httpCode: err.httpCode ? err.httpCode : 400,
    code: err.code ? err.code : 400,
    error: err.error ? true : false,
    message: err.message ? err.message : "Oops, Unexpected Error Happened",
    data: err.data ? err.data : null,
  };
  res.status(err.httpCode || 400).send(content);
});

const port = process.env.PORT || 1606;

app.listen(port, () => console.log(`Listening on port ${port}`));
