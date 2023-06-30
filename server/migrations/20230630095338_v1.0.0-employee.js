exports.up = async function (knex, Promise) {
  await knex.raw(`
    create table employee(
      id bigserial primary key,
      shop_id bigint REFERENCES shop(id),
      province_id bigint REFERENCES province(id),
      district_id bigint REFERENCES district(id),
      department_position_id bigint REFERENCES department_position(id),
      code text,
      name text,
      phone text,
      email text,
      address text,
      image_url text,
      notes text,
      is_delete boolean default false,
      created_at timestamp default now(),
      updated_at timestamp default now()
    );
  
    comment on table employee is 'người dùng';
  
    CREATE TRIGGER set_updated_at_timestamp
    BEFORE UPDATE ON employee
    FOR EACH ROW
    EXECUTE PROCEDURE trigger_set_updated_at();
    `);
};

exports.down = async function (knex, Promise) {
  await knex.raw(``);
};
