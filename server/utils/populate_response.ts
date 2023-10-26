function messageError() {
  return {
    validateError(err: any, code = 400, httpCode = 400) {
      return {
        error: true,
        httpCode,
        code,
        message: err.message || "Validate request failed",
      };
    },

    error(message?: string, code?: number, httpCode?: number) {
      return {
        error: true,
        httpCode: httpCode ? httpCode : 201,
        code: code ? code : 201,
        message: message ? message : "Oops! Something went wrong",
      };
    },

    success(data: any, message?: string, code = 200, httpCode = 200) {
      return {
        error: false,
        code,
        httpCode,
        message: message ? message : "Success!",
        data,
      };
    },
  };
}

export { messageError };
