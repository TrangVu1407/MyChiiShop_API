exports.up = async function (knex, Promise) {
  await knex.raw(`
  CREATE TABLE department_position(
    id bigserial primary key,
    shop_id bigint REFERENCES shop(id),
    name text,
    notes text,
    is_delete boolean default false,
    created_at timestamptz default now(),
    updated_at timestamptz default now()
  );

  CREATE TRIGGER set_updated_at_timestamp
    BEFORE UPDATE ON department_position
    FOR EACH ROW
    EXECUTE PROCEDURE trigger_set_updated_at();
  `);
};

exports.down = async function (knex, Promise) {
  await knex.raw(``);
};
