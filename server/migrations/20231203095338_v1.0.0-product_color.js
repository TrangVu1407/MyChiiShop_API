exports.up = async function (knex, Promise) {
  await knex.raw(`
    create table product_color(
      id bigserial primary key,
      shop_id bigint REFERENCES shop(id),
      code text,
      name text,
      describe text,
      notes text,
      is_delete boolean default false,
      created_at timestamp default now(),
      updated_at timestamp default now()
    );
  
    comment on table product_color is 'Màu sắc';
  
    CREATE TRIGGER set_updated_at_timestamp
    BEFORE UPDATE ON product_color
    FOR EACH ROW
    EXECUTE PROCEDURE trigger_set_updated_at();
  `);

  await knex.raw(`
    INSERT INTO product_color(id, shop_id, code, name, describe, notes) VALUES 
      (1, 1, 'RED', 'Màu đỏ', 'Màu đỏ như ông mặt trời', 'Sản phẩm màu đỏ'),
      (2, 1, 'BLUE', 'Màu xanh', 'Màu xanh như ông mặt trời', 'Sản phẩm màu xanh'),
      (3, 1, 'ORANGE', 'Màu cam', 'Màu cam như ông mặt trời', 'Sản phẩm màu cam');
  `);
};

exports.down = async function (knex, Promise) {
  await knex.raw(``);
};
