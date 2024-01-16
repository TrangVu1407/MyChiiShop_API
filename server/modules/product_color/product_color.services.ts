const _ = require("lodash");

import type {
  getListServices,
  isExistingServices,
  dataServices,
} from "./product_color.controllers";

// danh sánh loại sản phẩm
exports.getList = async (value: getListServices) => {
  return SHOP_DB("product_color")
    .select("product_color.*")
    .where({
      "product_color.is_delete": value.is_delete,
      "product_color.shop_id": value.shop_id,
    })
    .orderBy("product_color.id", "desc")
    .modify((builder) => {
      if (value.product_type_id)
        builder.where("product_color.product_type_id", value.product_type_id);
    });
};

// kiểm tra sản phẩm đã tồn tại
exports.isExisting = (valueIsExisting: isExistingServices) => {
  return SHOP_DB("product_color")
    .where({
      shop_id: valueIsExisting.shop_id,
      product_type_id: valueIsExisting.product_type_id,
      name: valueIsExisting.name,
      is_delete: false,
    })
    .modify((builder) => {
      valueIsExisting.id &&
        builder.andWhere("product_color.id", "!=", valueIsExisting.id);
    })
    .first();
};

// tạo sản phẩm
exports.create = (body: dataServices) => {
  return SHOP_DB("product_color").insert(body).returning("id");
};

// cập nhật sản phẩm
exports.update = (id: number, body: dataServices) => {
  return SHOP_DB("product_color").update(body).where("id", id);
};

// xóa sản phẩm
exports.delete = (id: number) => {
  return SHOP_DB("product_color").update({ is_delete: true }).where("id", id);
};
