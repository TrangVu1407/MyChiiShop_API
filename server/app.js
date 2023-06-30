const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
require('./global.db');

// api 
// 1.login
const login = require('./modules/login/login.routes');

const app = express();
app.use(function (req, res, next) {
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

//login
app.use('/api/', login);


// Error handler
app.use((err, req, res, next) => {
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
