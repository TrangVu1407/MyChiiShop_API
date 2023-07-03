exports.insertWebToken = (webToken) => {
  return SHOP_DB.returning("id").insert(webToken).into("web_token");
};

exports.checkWebToken = async (token, is_delete = false) => {
  const webToken = await SHOP_DB("web_token")
    .where({ "web_token.token": token, "web_token.is_delete": is_delete })
    .first();
  if (!webToken) return;
  return webToken;
};
