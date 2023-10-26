const app = require("express");
const router = app.Router();

const productTypecontroller = require("./product_type.controllers");
import { authMiddleware } from "../../resources";

router.get(
  "/list",
  authMiddleware.isAuthenticate,
  authMiddleware.checkRole,
  productTypecontroller.getList
);

router.post(
  "/create",
  authMiddleware.isAuthenticate,
  authMiddleware.checkRole,
  productTypecontroller.create
);

module.exports = router;
