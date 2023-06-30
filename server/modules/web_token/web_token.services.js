exports.insertWebToken = (webToken) => {
  return SHOP_DB.returning("id").insert(webToken).into("web_token");
};
