const app = require("express");
global.router = app.Router();

global.authMiddleware = require("./middleware/auth");