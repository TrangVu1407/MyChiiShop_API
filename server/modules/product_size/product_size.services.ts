const _ = require("lodash");

import type {
  getListServices,
  isExistingServices,
  dataServices,
} from "./product_size.controllers";

// danh sánh loại sản phẩm
exports.getList = async (value: getListServices) => {
  return SHOP_DB("product_size")
    .select("product_size.*")
    .where({
      "product_size.is_delete": value.is_delete,
      "product_size.shop_id": value.shop_id,
    })
    .orderBy("product_size.id", "desc");
};

// kiểm tra sản phẩm đã tồn tại
exports.isExisting = (valueIsExisting: isExistingServices) => {
  return SHOP_DB("product_size")
    .where({
      shop_id: valueIsExisting.shop_id,
      name: valueIsExisting.name,
      product_type_id: valueIsExisting.product_type_id,
      is_delete: false,
    })
    .modify((builder) => {
      valueIsExisting.id &&
        builder.andWhere("product_size.id", "!=", valueIsExisting.id);
    })
    .first();
};

// tạo sản phẩm
exports.create = (body: dataServices) => {
  return SHOP_DB("product_size").insert(body).returning("id");
};

// cập nhật sản phẩm
exports.update = (id: number, body: dataServices) => {
  return SHOP_DB("product_size").update(body).where("id", id);
};

// xóa sản phẩm
exports.delete = (id: number) => {
  return SHOP_DB("product_size").update({is_delete: true}).where("id", id);
};
