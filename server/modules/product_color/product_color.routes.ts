const app = require("express");
const router = app.Router();

const productColorController = require("./product_color.controllers");
import { authMiddleware } from "../../resources";

router.get(
  "/list",
  authMiddleware.isAuthenticate,
  authMiddleware.checkRole,
  productColorController.getList
);

router.post(
  "/create",
  authMiddleware.isAuthenticate,
  authMiddleware.checkRole,
  productColorController.create
);

router.post(
  "/update",
  authMiddleware.isAuthenticate,
  authMiddleware.checkRole,
  productColorController.update
);

router.post(
  "/delete",
  authMiddleware.isAuthenticate,
  authMiddleware.checkRole,
  productColorController.delete
);
module.exports = router;
