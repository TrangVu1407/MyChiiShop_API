const _ = require("lodash");

import type {
  getListServices,
  isExistingServices,
  createServices,
} from "./product_type.controllers";

// danh sánh loại sản phẩm
exports.getList = async (value: getListServices) => {
  return SHOP_DB("product_type")
    .select("product_type.*")
    .where({
      "product_type.is_delete": value.is_delete,
      "product_type.shop_id": value.shop_id,
    })
    .orderBy("product_type.id", "desc");
};

// kiểm tra sản phẩm đã tồn tại
exports.isExisting = (valueIsExisting: isExistingServices) => {
  return SHOP_DB("product_type")
    .where({
      shop_id: valueIsExisting.shop_id,
      name: valueIsExisting.name,
      is_delete: false,
    })
    .first();
};

// tạo sản phẩm
exports.create = (body: createServices) => {
  return SHOP_DB("product_type").insert(body).returning("id");
};
