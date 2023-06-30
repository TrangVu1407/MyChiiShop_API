const SHOP_DB = require("./db");

global.SHOP_DB = SHOP_DB;

Promise.all([SHOP_DB].map((db) => db.raw(`select 1+1`)))
  .then((fulfilled) => console.log("ALL SYSTEMS ON"))
  .catch((e) => console.log(e.message));
