const app = require("express");
const router = app.Router();

const productColorController = require("./product_color.controllers");
import { authMiddleware } from "../../resources";

router.get(
  "/list",
  //authMiddleware.isAuthenticate,
  //authMiddleware.checkRole,
  productColorController.getList
);
module.exports = router;
