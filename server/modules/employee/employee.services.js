//hàm này dùng khi đăng nhập
exports.getEmployeeByAccountId = (accountId, is_delete = false) => {
  return SHOP_DB("employee")
    .select(
      "employee.*",
      "province.name as province_name",
      "district.name as district_name",
      "department_position.name as department_position.name",
      "shop.name as shop_name"
    )
    .leftJoin("province", "province.id", "employee.province_id")
    .leftJoin("district", "district.id", "employee.district_id")
    .leftJoin(
      "department_position",
      "department_position.id",
      "employee.department_position_id"
    )
    .leftJoin("shop", "shop.id", "employee.shop_id")
    .innerJoin("account", {
      "account.employee_id": "employee.id",
      "account.is_delete": SHOP_DB.raw("?", [false]),
    })
    .where({ "employee.id": accountId, "account.is_delete": is_delete })
    .first();
};
