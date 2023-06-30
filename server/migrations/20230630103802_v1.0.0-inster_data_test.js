exports.up = async function (knex, Promise) {
  await knex.raw(`
    INSERT INTO province(code, name, notes) VALUES 
    ('63TG', 'Tiền Giang', 'tỉnh Tiền Giang');

    INSERT INTO district(province_id, code, name, notes) VALUES 
    (1, '63TG-CL', 'huyện Cai Lậy', 'huyện Cai Lậy'),
    (1, '63TG-CL', 'huyện Châu Thành', 'huyện Châu Thành');

    INSERT INTO shop(code, name, province_id, district_id, phone, email, address, notes) VALUES 
    ('MY-CHI-12A5', 'Mỹ Chii', 1, 1, '0327878264', 'huynhvanbinh1606@gmail.com', 'ấp Phú Hòa, xã Phú Nhuận, huyện Cai Lậy, tỉnh Tiền Giang', 'shop Mỹ Chi 12a5');

    INSERT INTO department_position(shop_id, name, notes) VALUES 
    (1, 'Quản trị viên', 'quản trị trang web'),
    (1, 'Chủ shop', 'chủ shop');

    INSERT INTO employee(shop_id, department_position_id, code, name, province_id, district_id, phone, email, address, notes) VALUES 
    (1, 1, 'MY-CHI-12A5', 'Mỹ Chii', 1, 1, '0327878264', 'huynhvanbinh1606@gmail.com', 'ấp Phú Hòa, xã Phú Nhuận, huyện Cai Lậy, tỉnh Tiền Giang', 'shop Mỹ Chi 12a5');

    INSERT INTO account(email, password, salt, status, employee_id) VALUES 
    ('huynhvanbinh1606@gmail.com','2ab73687763ce3a3c39f9888b7a3395316f344f6bed885cb746717e9a6f5c896919a496e2fb94ca563215098c9783f5bdec7d7b21ab9d9978b57f71b674864be', 'ac165a0605e61119513e76432916df61', 600, 1);
    `);
};

exports.down = async function (knex, Promise) {
  await knex.raw(``);
};
