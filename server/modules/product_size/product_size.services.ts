const _ = require("lodash");

import type {
  getListServices,
  isExistingServices,
  dataServices,
} from "./product_size.controllers";

// danh sánh loại sản phẩm
exports.getList = async (value: getListServices) => {
  const BUILD_JSON = SHOP_DB.raw(`
  json_agg(json_build_object(
  'id', product_size.id,
  'name', product_size.name, 
  'describe', product_size.describe,
  'code', product_size.code,
  'notes', product_size.notes
    )) as product_sizes`);

  return SHOP_DB("product_type")
    .select(
      "product_type.name as product_type_name",
      "product_type.describe as product_type_describe",
      "product_type.id as id",
      "product_type.notes as product_type_notes",
      BUILD_JSON
    )
    .innerJoin(
      "product_size",
      "product_size.product_type_id",
      "product_type.id"
    )
    .where({
      "product_type.is_delete": value.is_delete,
      "product_type.shop_id": value.shop_id,
    })
    .groupBy(["product_type.id"])
    .orderBy("product_type.id", "desc");
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
  return SHOP_DB("product_size").update({ is_delete: true }).where("id", id);
};
