exports.up = async function (knex) {
  return await knex.raw(`
    INSERT INTO permission(id, name_sort, name, screen, screen_function) VALUES 
      (200, 'Quản lý - Sản phẩm', 'Quản lý - Sản phẩm - Xem', '/product', 'Seen'),
      (201, 'Quản lý - Sản phẩm', 'Quản lý - Sản phẩm - Tạo mới', '/product_create', 'Create'),
      (202, 'Quản lý - Sản phẩm', 'Quản lý - Sản phẩm - Cập nhật', '/product_update', 'Update'),
      (203, 'Quản lý - Sản phẩm', 'Quản lý - Sản phẩm - Xóa', '/product_delete', 'Delete');
      
      INSERT INTO permission_api(permission_id, api_endpoint, notes) VALUES
      (200, '/api/product/list', 'Bình wrote this v1.0.0 - 12.11.2023'),
      (201, '/api/product/create', 'Bình wrote this v1.0.0 - 13.11.2023'),
      (202, '/api/product/update', 'Bình wrote this v1.0.0 - 13.11.2023'),
      (203, '/api/product/delete', 'Bình wrote this v1.0.0 - 13.11.2023');

      INSERT INTO role_account(account_id, permission_id) VALUES 
      (1, 200),
      (1, 201),
      (1, 202),
      (1, 203);
      `);
};

exports.down = function (knex) {};
