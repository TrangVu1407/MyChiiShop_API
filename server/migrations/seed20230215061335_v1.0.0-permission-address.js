exports.up = async function (knex) {
  return await knex.raw(`
    INSERT INTO permission(id, name_sort, name, screen, screen_function) VALUES 
      (0, 'Quản lý - Địa chỉ', 'Quản lý - Địa chỉ - Xem', '/', 'Xem'),
      (1, 'Quản lý - Địa chỉ', 'Quản lý - Địa chỉ - Xem', '/dashboard', 'Xem'),
      (3, 'Quản lý - Địa chỉ', 'Quản lý - Địa chỉ - Xem', '/demo', 'Xem');
      
      INSERT INTO permission_api(permission_id, api_endpoint, notes) VALUES
      (1, '/api/demo/list', 'Bình wrote this v2.18.3 - 18.05.2022');

      INSERT INTO role_account(account_id, permission_id) VALUES 
          (1, 0),
          (1, 1),
          (1, 3);
      `);
};

exports.down = function (knex) {};
