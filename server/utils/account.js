const crypto = require("crypto");
const jwt = require("jsonwebtoken");

exports.verifyPassword = (password, userPassword, salt) => {
  const hash = crypto.pbkdf2Sync(password, salt, 10000, 64, "sha512");
  if (hash.toString("hex") === userPassword) {
    return true;
  }
  return false;
};

exports.signToken = (uid) => {
  const secretKey = process.env.SECRET_KEY || "shop_my_chii";
  // Token expire default in 1 days
  const tokenDuration = process.env.TOKEN_DURATION || 1;
  return jwt.sign(
    {
      uid,
    },
    secretKey,
    { expiresIn: tokenDuration * 24 * 60 * 60 }
  );
};