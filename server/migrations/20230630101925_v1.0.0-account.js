exports.up = async function (knex, Promise) {
  await knex.raw(`
    create table account(
      id bigserial primary key,
      email text,
      password text,
      salt text,
      status int default 1,
      is_delete boolean default false,
      created_at timestamp default now(),
      updated_at timestamp default now()
    );
  
    comment on table account is 'Thông tin đăng nhập';
    comment on column account.status is '1: active, 0: inactive';
  
    CREATE TRIGGER set_updated_at_timestamp
    BEFORE UPDATE ON account
    FOR EACH ROW
    EXECUTE PROCEDURE trigger_set_updated_at();
  
    ALTER TABLE account ADD employee_id bigint references employee(id);
  
    `);
};

exports.down = async function (knex, Promise) {
  await knex.raw(``);
};
