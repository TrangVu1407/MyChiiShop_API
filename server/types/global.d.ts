import { Knex } from "knex";

declare global {
  var SHOP_DB: Knex;
  var router
  var authMiddleware
}

export {};
