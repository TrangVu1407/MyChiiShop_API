const app = require("express");
const router = app.Router();

interface ObjectData {
  isAuthenticate: Promise<any>;
  checkRole: Promise<any>;
}
const authMiddleware: ObjectData = require("./middleware/auth");

export { router, authMiddleware };
