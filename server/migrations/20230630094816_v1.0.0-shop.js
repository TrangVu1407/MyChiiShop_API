exports.up = async function (knex, Promise) {
  await knex.raw(`
    create table shop(
      id bigserial primary key,
      code text,
      name text,
      province_id bigint REFERENCES province(id),
      district_id bigint REFERENCES district(id),
      phone text,
      email text,
      address text,
      image_url text,
      notes text,
      is_delete boolean default false,
      created_at timestamp default now(),
      updated_at timestamp default now()
    );
  
    comment on table shop is 'shop mỹ chii';
  
    CREATE TRIGGER set_updated_at_timestamp
    BEFORE UPDATE ON shop
    FOR EACH ROW
    EXECUTE PROCEDURE trigger_set_updated_at();
    `);
};

exports.down = async function (knex, Promise) {
  await knex.raw(``);
};
