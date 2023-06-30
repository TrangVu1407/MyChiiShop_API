const getCorrectMessage = (erroCode) => {
  const SHOW_ERROR_MESSAGE = true;

  const PREDEFINED_ERROR_MESSAGE = {
    209: 'Đã tồn tại',
  };

  if (!SHOW_ERROR_MESSAGE) return null;

  return PREDEFINED_ERROR_MESSAGE[erroCode] ?? null;
};

exports.foundDuplication = (msg = getCorrectMessage(209), code = 209, httpCode = 209) => {
  return populateParams(msg, code, httpCode);
};

const populateParams = function (msg, code, httpCode) {
  const err = new Error(msg);
  err.message = msg;
  err.code = code;
  err.httpCode = httpCode;
  err.error = true;
  err.data = null;
  return err;
};
