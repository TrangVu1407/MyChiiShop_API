const _ = require("lodash");

import type {
  getListServices,
  isExistingServices,
  dataServices,
  dataUpdateServices,
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
  const CREATION_FAILED = new Error("error");

  return SHOP_DB.transaction(async (trx) => {
    let productDetails = body.product_sizes;

    const dbProductDetails = await trx("product_size")
      .insert(productDetails)
      .returning("id");

    if (dbProductDetails.length === 0)
      return await trx.rollback(CREATION_FAILED);

    return await trx.commit({ detailIds: productDetails });
  });
};

// cập nhật sản phẩm
exports.update = (id: number, body: dataUpdateServices) => {
  const CREATION_FAILED = new Error("error");

  return SHOP_DB.transaction(async (trx) => {
    // add new
    if ("addNew" in body.product_sizes) {
      const dbProductDetails = await trx("product_size")
        .insert(body.product_sizes.addNew)
        .returning("id");
      if (dbProductDetails.length === 0)
        return await trx.rollback(CREATION_FAILED);
    }
    // update
    if ("update" in body.product_sizes) {
      for (let i = 0; i < body.product_sizes.update.length; i++) {
        await trx("product_size")
          .update(_.omit(body.product_sizes.update[i]), ["id"])
          .where("id", body.product_sizes.update[i].id);
      }
    }

    return await trx.commit({ detailIds: body.product_sizes.addNew });
  });
};

// xóa sản phẩm
exports.delete = (id: number) => {
  return SHOP_DB("product_size").update({ is_delete: true }).where("id", id);
};
