const app = require("express");
const router = app.Router();

const controller = require("./demo.controllers");
import { authMiddleware } from "../../resources";

router.get(
  "/list",
  authMiddleware.isAuthenticate,
  authMiddleware.checkRole,
  controller.getList
);

module.exports = router;