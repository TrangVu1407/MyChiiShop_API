const _ = require("lodash");

import type {
  getListServices,
  isExistingServices,
  createServices,
} from "./product_type.controllers";

exports.getList = async (value: getListServices) => {
  return SHOP_DB("product_type").select("product_type.*").where({
    "product_type.is_delete": value.is_delete,
    "product_type.shop_id": value.shop_id,
  });
};

// kiểm tra sản phẩm đã tồn tại
exports.isExisting = (valueIsExisting: isExistingServices) => {
  return SHOP_DB("product_type")
    .where({
      shop_id: valueIsExisting.shop_id,
      code: valueIsExisting.code,
      name: valueIsExisting.name,
      is_delete: valueIsExisting.is_delete,
    })
    .first();
};

exports.create = (body: createServices) => {
  return SHOP_DB("product_type").insert(body).returning("id");
};
