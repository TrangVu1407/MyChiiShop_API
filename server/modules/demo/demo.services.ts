const _ = require("lodash");

import type { dataServices } from "./demo.controllers";

exports.getList = async (data: dataServices) => {
  const list: dataServices = {
    name: data.name,
    age: data.age,
    address: data.address,
  };
  return list;
};
