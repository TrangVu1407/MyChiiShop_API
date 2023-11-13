exports.up = async function (knex) {
  return await knex.raw(`
    INSERT INTO permission(id, name_sort, name, screen, screen_function) VALUES 
      (100, 'Quản lý - Kích thước sản phẩm', 'Quản lý - Kích thước sản phẩm - Xem', '/product_size', 'Seen'),
      (101, 'Quản lý - Kích thước sản phẩm', 'Quản lý - Kích thước sản phẩm - Tạo mới', '/product_size_create', 'Create'),
      (102, 'Quản lý - Kích thước sản phẩm', 'Quản lý - Kích thước sản phẩm - Cập nhật', '/product_size_update', 'Update'),
      (103, 'Quản lý - Kích thước sản phẩm', 'Quản lý - Kích thước sản phẩm - Xóa', '/product_size_delete', 'Delete');
      
      INSERT INTO permission_api(permission_id, api_endpoint, notes) VALUES
      (100, '/api/product_size/list', 'Bình wrote this v1.0.0 - 12.11.2023'),
      (101, '/api/product_size/create', 'Bình wrote this v1.0.0 - 13.11.2023'),
      (102, '/api/product_size/update', 'Bình wrote this v1.0.0 - 13.11.2023'),
      (103, '/api/product_size/delete', 'Bình wrote this v1.0.0 - 13.11.2023');

      INSERT INTO role_account(account_id, permission_id) VALUES 
          (1, 100),
          (1, 101),
          (1, 102),
          (1, 103);
      `);
};

exports.down = function (knex) {};
