exports.getAccountByEmail = async (email, is_delete = false) => {
  if (!email || email === "") return;
  return await SHOP_DB.table("account").where({ email, is_delete }).first();
};
