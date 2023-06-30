exports.up = async function (knex, Promise) {
  await knex.raw(`
  CREATE TABLE province(
    id bigserial primary key,
    name text,
    code text,
    notes text,
    is_delete boolean default false,
    created_at timestamptz default now(),
    updated_at timestamptz default now()
  );

  comment on table province is 'Tỉnh / Thành phố';

  CREATE TRIGGER set_updated_at_timestamp
    BEFORE UPDATE ON province
    FOR EACH ROW
    EXECUTE PROCEDURE trigger_set_updated_at();
  `);
};

exports.down = async function (knex, Promise) {
  await knex.raw(``);
};
