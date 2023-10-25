const _ = require("lodash");

import type { dataServices } from "./demo.controllers";

exports.getList = async (data: dataServices) => {
  // const list: dataServices = {
  //   name: data.name,
  //   age: data.age,
  //   address: data.address,
  // };
  // return list;
  const a = 5;
  const b = 10;
  //let tong = a + b

  // tổng là = 15
  let tong = 'tổng là: ${a + b}'
 
  return tong;
};
