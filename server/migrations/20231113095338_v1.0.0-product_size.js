exports.up = async function (knex, Promise) {
  await knex.raw(`
    create table product_size(
      id bigserial primary key,
      shop_id bigint REFERENCES shop(id),
      product_type_id bigint REFERENCES product_type(id),
      code text,
      name text,
      describe text,
      notes text,
      is_delete boolean default false,
      created_at timestamp default now(),
      updated_at timestamp default now()
    );
  
    comment on table product_size is 'Kích thước sản phẩm';
  
    CREATE TRIGGER set_updated_at_timestamp
    BEFORE UPDATE ON product_size
    FOR EACH ROW
    EXECUTE PROCEDURE trigger_set_updated_at();
    `);
};

exports.down = async function (knex, Promise) {
  await knex.raw(``);
};
