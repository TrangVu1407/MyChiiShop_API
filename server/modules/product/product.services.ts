const _ = require("lodash");
import type { isExistingServices, dataServices } from "./product.controllers";

// kiểm tra sản phẩm đã tồn tại
exports.isExisting = (valueIsExisting: isExistingServices) => {
  return SHOP_DB("product")
    .where({
      shop_id: valueIsExisting.shop_id,
      name: valueIsExisting.name,
      is_delete: false,
    })
    .modify((builder) => {
      valueIsExisting.id &&
        builder.andWhere("product.id", "!=", valueIsExisting.id);
    })
    .first();
};

// tạo sản phẩm
exports.create = async (body: dataServices) => {
  try {
    // Extract only the desired properties for "product" insertion
    const productData = {
      shop_id: body.shop_id,
      name: body.name,
      describe: body.describe,
      notes: body.notes,
      product_type_id: body.product_type_id,
      gender_id: body.gender_id,
    };
    // Start a transaction
    const insertedProduct = await SHOP_DB.transaction(async (trx) => {
      // Insert product and get the product ID
      const [productId] = await trx("product")
        .insert(productData)
        .returning("id");

      // Insert images using the obtained product ID
      const imageInserts = body.image.map((image) => ({
        product_id: productId.id,
        //name: image.name,
        url: "Bình",
      }));
      await trx("product_image").insert(imageInserts);

      // Insert product details using the obtained product ID
      const detailInserts = body.product_detail.map((detail) => ({
        product_id: productId.id,
        product_size_id: detail.product_size_id,
        price_purchase: detail.price_purchase,
        price_sell: detail.price_sell,
        quantity: detail.quantity,
      }));
      await trx("product_detail").insert(detailInserts);

      // Commit the transaction
      return productId;
    });

    return insertedProduct;
  } catch (error) {
    // Handle the error, rollback the transaction if necessary
    console.error("Error creating product:", error);
    throw error;
  }
};
