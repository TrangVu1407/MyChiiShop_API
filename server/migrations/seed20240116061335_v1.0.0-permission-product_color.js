exports.up = async function (knex) {
  return await knex.raw(`
    INSERT INTO permission(id, name_sort, name, screen, screen_function) VALUES 
      (300, 'Quản lý - Màu sắc sản phẩm', 'Quản lý - Màu sắc sản phẩm - Xem', '/product_color', 'Seen'),
      (301, 'Quản lý - Màu sắc sản phẩm', 'Quản lý - Màu sắc sản phẩm - Tạo mới', '/product_color_create', 'Create'),
      (302, 'Quản lý - Màu sắc sản phẩm', 'Quản lý - Màu sắc sản phẩm - Cập nhật', '/product_color_update', 'Update'),
      (303, 'Quản lý - Màu sắc sản phẩm', 'Quản lý - Màu sắc sản phẩm - Xóa', '/product_color_delete', 'Delete');
      
      INSERT INTO permission_api(permission_id, api_endpoint, notes) VALUES
      (300, '/api/product_color/list', 'Bình wrote this v1.0.0 - 12.11.2023'),
      (301, '/api/product_color/create', 'Bình wrote this v1.0.0 - 13.11.2023'),
      (302, '/api/product_color/update', 'Bình wrote this v1.0.0 - 13.11.2023'),
      (303, '/api/product_color/delete', 'Bình wrote this v1.0.0 - 13.11.2023');

      INSERT INTO role_account(account_id, permission_id) VALUES 
          (1, 300),
          (1, 301),
          (1, 302),
          (1, 303);
      `);
};

exports.down = function (knex) {};
