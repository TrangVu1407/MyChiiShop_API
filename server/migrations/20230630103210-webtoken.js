exports.up = async function (knex, Promise) {
  await knex.raw(`
  
  create table web_token(
    id bigserial primary key,
    account_id bigint references account(id),
    token text,
    logout_at timestamp,
    expired_at timestamp,
    is_delete boolean default false,
    created_at timestamp default now(),
    updated_at timestamp default now()
  );

  CREATE TRIGGER set_updated_at_timestamp
  BEFORE UPDATE ON web_token
  FOR EACH ROW
  EXECUTE PROCEDURE trigger_set_updated_at();

  `);
};

exports.down = async function (knex, Promise) {
  await knex.raw(`
    drop table web_token;
  `);
};