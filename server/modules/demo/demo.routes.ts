const app = require("express");
const router = app.Router();

const controller = require("./demo.controllers");
const authMiddleware = require("../../middleware/auth");

router.get(
  "/list",
  authMiddleware.isAuthenticate,
  authMiddleware.checkRole,
  controller.getList
);

module.exports = router;
