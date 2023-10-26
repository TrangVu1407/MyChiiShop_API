exports.up = async function (knex) {
  return await knex.raw(`
    INSERT INTO permission(id, name_sort, name, screen, screen_function) VALUES 
      (10, 'Quản lý - Loại sản phẩm', 'Quản lý - Loại sản phẩm - Xem', '/product_type', 'Seen'),
      (11, 'Quản lý - Loại sản phẩm', 'Quản lý - Loại sản phẩm - Tạo mới', '/product_type_create', 'Create'),
      (12, 'Quản lý - Loại sản phẩm', 'Quản lý - Loại sản phẩm - Cập nhật', '/product_type_update', 'Update'),
      (13, 'Quản lý - Loại sản phẩm', 'Quản lý - Loại sản phẩm - Xóa', '/product_type_delete', 'Delete');
      
      INSERT INTO permission_api(permission_id, api_endpoint, notes) VALUES
      (10, '/api/product_type/list', 'Bình wrote this v1.0.0 - 25.10.2023'),
      (11, '/api/product_type/create', 'Bình wrote this v1.0.0 - 25.10.2023'),
      (12, '/api/product_type/update', 'Bình wrote this v1.0.0 - 25.10.2023'),
      (13, '/api/product_type/delete', 'Bình wrote this v1.0.0 - 25.10.2023');

      INSERT INTO role_account(account_id, permission_id) VALUES 
          (1, 10),
          (1, 11),
          (1, 12),
          (1, 13);
      `);
};

exports.down = function (knex) {};
