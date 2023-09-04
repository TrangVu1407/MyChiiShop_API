import { Knex } from "knex";

declare global {
  var SHOP_DB: Knex;
}

export {};
