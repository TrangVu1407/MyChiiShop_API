exports.up = async function (knex, Promise) {
  await knex.raw(`
  CREATE TABLE demo(
    id bigserial primary key,
    name text,
    age numeric,
    class text,
    address text,
    is_delete boolean default false,
    created_at timestamptz default now(),
    updated_at timestamptz default now()
  );

  CREATE TRIGGER set_updated_at_timestamp
    BEFORE UPDATE ON demo
    FOR EACH ROW
    EXECUTE PROCEDURE trigger_set_updated_at();
  `);
};

exports.down = async function (knex, Promise) {
  await knex.raw(``);
};
