let knex;
if (process.env.NODE_ENV === "production" || process.env.NODE_ENV === "test") {
  knex = require("knex")({
    client: "pg",
    connection: process.env.DATABASE_URL,
  });
} else {
  knex = require("knex")({
    client: "pg",
    connection: process.env.DATABASE_URL,
    debug: true,
  });
}

const pg = require("pg");

pg.types.setTypeParser(20, "text", parseInt);
pg.types.setTypeParser(1700, "text", parseFloat);
const TIMESTAMPTZ_OID = 1184;
const TIMESTAMP_OID = 1114;
pg.types.setTypeParser(TIMESTAMPTZ_OID, (val) => val);
pg.types.setTypeParser(TIMESTAMP_OID, (val) => val);

module.exports = knex;
