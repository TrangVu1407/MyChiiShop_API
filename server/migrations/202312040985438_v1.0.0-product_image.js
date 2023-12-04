exports.up = async function (knex, Promise) {
  await knex.raw(`
    create table product_image(
      id bigserial primary key,
      product_id bigint REFERENCES product(id),
      url text,
      is_delete boolean default false,
      created_at timestamp default now(),
      updated_at timestamp default now()
    );
  
    comment on table product_image is 'Hình ảnh sản phẩm';
  
    CREATE TRIGGER set_updated_at_timestamp
    BEFORE UPDATE ON product_image
    FOR EACH ROW
    EXECUTE PROCEDURE trigger_set_updated_at();
  `);
};

exports.down = async function (knex, Promise) {
  await knex.raw(``);
};
