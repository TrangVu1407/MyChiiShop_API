const _ = require("lodash");

import type { dataServices } from "./demo.controllers";

exports.getList = async () => {
  const list: dataServices = {
    name: "Mỹ chi",
    age: 12,
  };
  return list;
};
