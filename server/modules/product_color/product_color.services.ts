const _ = require("lodash");

import type { getListServices } from "./product_color.controllers";

// danh sánh loại sản phẩm
exports.getList = async (value: getListServices) => {
  return SHOP_DB("product_color")
    .select("product_color.*")
    .where({
      "product_color.is_delete": value.is_delete,
      "product_color.shop_id": value.shop_id,
    })
    .orderBy("product_color.id", "desc");
};
