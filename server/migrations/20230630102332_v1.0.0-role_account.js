exports.up = async function (knex, Promise) {
  await knex.raw(`
    create table role_account(
      id bigserial primary key,
      account_id bigint REFERENCES account(id),
      permission_id bigint REFERENCES permission(id),
      notes text,
      is_delete boolean default false,
      created_at timestamp default now(),
      updated_at timestamp default now()
    );
  
    comment on table role_account is 'danh sách quyền với tài khoản khi đăng nhập';
  
    CREATE TRIGGER set_updated_at_timestamp
    BEFORE UPDATE ON role_account
    FOR EACH ROW
    EXECUTE PROCEDURE trigger_set_updated_at();
    `);
};

exports.down = async function (knex, Promise) {
  await knex.raw(``);
};
