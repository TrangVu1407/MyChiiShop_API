// hàm dùng khi đăng nhập
exports.accountPermissions = (account_id, is_delete = false) => {
  return SHOP_DB
    .select("permission.*")
    .from("role_account")
    .innerJoin("permission", "permission.id", "role_account.permission_id")
    .where({
      "role_account.account_id": account_id,
      "permission.is_delete": is_delete,
    });
};
