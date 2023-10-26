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

    error(message: "Oops! Something went wrong", code: 401, httpCode: 401) {
      return {
        error: true,
        httpCode,
        code,
        message,
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
