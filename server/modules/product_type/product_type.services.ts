const _ = require("lodash");

import type { getDataServices } from "./product_type.controllers";

exports.getList = async (value: getDataServices) => {
  return SHOP_DB("product_type").select("product_type.*").where({
    "product_type.is_delete": value.is_delete,
    "product_type.shop_id": value.shop_id,
  });
};
