const app = require("express");
const router = app.Router();

const productcontroller = require("./product.controllers");
import { authMiddleware } from "../../resources";

router.post(
  "/create",
  authMiddleware.isAuthenticate,
  authMiddleware.checkRole,
  productcontroller.create
);

module.exports = router;
