exports.up = async function (knex, Promise) {
  await knex.raw(`
    create table product(
      id bigserial primary key,
      shop_id bigint REFERENCES shop(id),
      gender_id bigint REFERENCES gender(id),
      code text,
      name text,
      describe text,
      notes text,
      is_delete boolean default false,
      created_at timestamp default now(),
      updated_at timestamp default now()
    );
  
    comment on table product is 'Sản phẩm';
  
    CREATE TRIGGER set_updated_at_timestamp
    BEFORE UPDATE ON product
    FOR EACH ROW
    EXECUTE PROCEDURE trigger_set_updated_at();
    `);
};

exports.down = async function (knex, Promise) {
  await knex.raw(``);
};
