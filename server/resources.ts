// kiểm tra quyền API và giá trị FE truyền xuống có đúng định dạng chưa
interface ObjectData {
  isAuthenticate: Promise<any>;
  checkRole: Promise<any>;
}
const authMiddleware: ObjectData = require("./middleware/auth");

import {messageError} from "./utils/populate_response"

const populateResponse = messageError()

export { authMiddleware, populateResponse };
