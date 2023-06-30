exports.up = async function (knex, Promise) {
  await knex.raw(`
    create table permission(
      id bigint primary key,
      name text,
      name_sort text,
      screen text,
      screen_function text,
      readonly boolean default false,
      notes text,
      is_delete boolean default false,
      created_at timestamp default now(),
      updated_at timestamp default now()
    );
  
    comment on table permission is 'danh sách quyền';
  
    CREATE TRIGGER set_updated_at_timestamp
    BEFORE UPDATE ON permission
    FOR EACH ROW
    EXECUTE PROCEDURE trigger_set_updated_at();
    `);
};

exports.down = async function (knex, Promise) {
  await knex.raw(``);
};
