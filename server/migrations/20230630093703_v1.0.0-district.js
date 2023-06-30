exports.up = async function (knex, Promise) {
  await knex.raw(`
  CREATE TABLE district(
    id bigserial primary key,
    province_id bigint REFERENCES province(id),
    name text,
    code text,
    notes text,
    is_delete boolean default false,
    created_at timestamptz default now(),
    updated_at timestamptz default now()
  );

  comment on table district is 'Huyện / Quận / Thị xã';

  CREATE TRIGGER set_updated_at_timestamp
    BEFORE UPDATE ON district
    FOR EACH ROW
    EXECUTE PROCEDURE trigger_set_updated_at();
  `);
};

exports.down = async function (knex, Promise) {
  await knex.raw(``);
};
