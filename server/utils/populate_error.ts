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

let noData: messagePopulateError = {
  message: "Không có dữ liệu",
  code: 210,
  httpCode: 210,
};

export { isExisting, noData };
