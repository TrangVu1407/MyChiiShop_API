const _ = require("lodash");

import type {
  getListServices,
  isExistingServices,
  dataServices,
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
    .modify((builder) => {
      valueIsExisting.id &&
        builder.andWhere("product_type.id", "!=", valueIsExisting.id);
    })
    .first();
};

// tạo sản phẩm
exports.create = (body: dataServices) => {
  return SHOP_DB("product_type").insert(body).returning("id");
};

// cập nhật sản phẩm
exports.update = (id: number, body: dataServices) => {
  return SHOP_DB("product_type").update(body).where("id", id);
};

// xóa sản phẩm
exports.delete = (id: number) => {
  return SHOP_DB("product_type").update({is_delete: true}).where("id", id);
};
