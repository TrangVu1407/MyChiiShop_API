// kiểm tra quyền API và giá trị FE truyền xuống có đúng định dạng chưa
interface ObjectData {
  isAuthenticate: Promise<any>;
  checkRole: Promise<any>;
}
const authMiddleware: ObjectData = require("./middleware/auth");

import { messageError } from "./utils/populate_response";
import type { messagePopulateError } from "./utils/populate_error";

const populateResponse = messageError();

interface ObjectPopulateError {
  isExisting: messagePopulateError;
}
const populateError: ObjectPopulateError = require("./utils/populate_error");

export { authMiddleware, populateResponse, populateError };
