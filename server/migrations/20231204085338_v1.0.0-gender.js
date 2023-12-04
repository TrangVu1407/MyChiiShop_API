exports.up = async function (knex, Promise) {
  await knex.raw(`
    create table gender(
      id bigserial primary key,
      code text,
      name text,
      is_delete boolean default false,
      created_at timestamp default now(),
      updated_at timestamp default now()
    );
  
    comment on table gender is 'Giới tính';
  
    CREATE TRIGGER set_updated_at_timestamp
    BEFORE UPDATE ON gender
    FOR EACH ROW
    EXECUTE PROCEDURE trigger_set_updated_at();
  `);

  await knex.raw(`
    INSERT INTO gender(id, code, name) VALUES 
      (1, '1', 'Nam'),
      (2, '0', 'Nữ'),
      (3, '-1', 'Khác');
  `);
};

exports.down = async function (knex, Promise) {
  await knex.raw(``);
};
