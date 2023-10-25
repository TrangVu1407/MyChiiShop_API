const controller = require("./demo.controllers");

router.get(
  "/list",
  authMiddleware.isAuthenticate,
  authMiddleware.checkRole,
  controller.getList
);

module.exports = router;