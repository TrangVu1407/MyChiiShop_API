export interface messagePopulateError {
  message: string;
  code: number;
  httpCode: number;
}

let isExisting: messagePopulateError = {
  message: "Đã tồn tại",
  code: 209,
  httpCode: 209,
};

export { isExisting };
