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

exports.checkAccessibleAPI = async (aaccount_id, apiEndpoint) => {
  const apis = await SHOP_DB.select('permission_api.*')
    .from('role_account')
    .innerJoin('permission', 'permission.id', 'role_account.permission_id')
    .innerJoin('permission_api', 'permission_api.permission_id', 'permission.id')
    .where({
      'role_account.account_id': aaccount_id,
      'permission_api.api_endpoint': apiEndpoint,
      'permission.is_delete': false,
    });

  if (apis.length > 0) return true;

  return false;
};
