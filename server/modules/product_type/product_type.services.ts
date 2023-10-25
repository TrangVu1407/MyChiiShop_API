const _ = require("lodash");

import type { getDataServices } from "./product_type.controllers";

exports.getList = async (data: getDataServices) => {
  return SHOP_DB("product_type")
    .select("product_type.*")
    .where("product_type.is_delete", data.is_delete);
};
