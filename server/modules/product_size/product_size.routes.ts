const app = require("express");
const router = app.Router();

const productTypecontroller = require("./product_size.controllers");
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

router.post(
  "/update",
  authMiddleware.isAuthenticate,
  authMiddleware.checkRole,
  productTypecontroller.update
);

router.post(
  "/delete",
  authMiddleware.isAuthenticate,
  authMiddleware.checkRole,
  productTypecontroller.delete
);

module.exports = router;
