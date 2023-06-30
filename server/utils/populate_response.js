const preDefinedErrors = require('./predefined_errors');

const validateError = (err, code = 400, httpCode = 400) => {
  return {
    error: true,
    httpCode,
    code,
    message: err.message || 'Validate request failed',
  };
};

const error = (message = 'Oops! Something went wrong', code = 400, httpCode = 400) => {
  return {
    error: true,
    httpCode,
    code,
    message,
  };
};

const success = (data = null, code = 200, httpCode = 200, message = 'Success') => {
  return {
    error: false,
    code,
    httpCode,
    message,
    data,
  };
};

const createError = (msg, code, httpCode = 200, data = null) => {
  const err = new Error(msg);
  err.message = msg;
  err.code = code;
  err.httpCode = httpCode;
  err.error = true;
  err.data = data;

  return err;
};

module.exports = {
  validateError,
  error,
  success,
  createError,
  ...preDefinedErrors,
};
