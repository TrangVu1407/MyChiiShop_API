exports.up = async function (knex, Promise) {
  await knex.raw(`
    create table product_detail(
      id bigserial primary key,
      product_size_id bigint REFERENCES product_size(id),
      product_color_id bigint REFERENCES product_color(id),
      quantity numeric,
      price_purchase numeric,
      price_sell numeric,
      notes text,
      is_delete boolean default false,
      created_at timestamp default now(),
      updated_at timestamp default now()
    );
  
    comment on table product_detail is 'Khích thước sản phẩm';
  
    CREATE TRIGGER set_updated_at_timestamp
    BEFORE UPDATE ON product_detail
    FOR EACH ROW
    EXECUTE PROCEDURE trigger_set_updated_at();
    `);
};

exports.down = async function (knex, Promise) {
  await knex.raw(``);
};
