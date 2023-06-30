exports.up = async function (knex, Promise) {
  await knex.raw(`
    create table permission_api(
      id bigserial primary key,
      permission_id bigint REFERENCES permission(id),
      api_endpoint text,
      notes text,
      is_delete boolean default false,
      created_at timestamp default now(),
      updated_at timestamp default now()
    );
  
    comment on table permission_api is 'danh sách quyền với tài khoản khi đăng nhập';
  
    CREATE TRIGGER set_updated_at_timestamp
    BEFORE UPDATE ON permission_api
    FOR EACH ROW
    EXECUTE PROCEDURE trigger_set_updated_at();
    `);
};

exports.down = async function (knex, Promise) {
  await knex.raw(``);
};
