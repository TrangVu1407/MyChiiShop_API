import fs from "fs";
import path from "path";
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

      interface ImageInsert {
        product_id: number;
        url: string;
      }

      const saveImage = (
        base64String: string,
        productId: number,
        name: string
      ): ImageInsert => {
        const vitri = base64String.indexOf(",");
        const image_v64 = base64String.substring(
          vitri + 1,
          base64String.length - 1
        );
        const imageBuffer = Buffer.from(image_v64, "base64");
        // Extract mime type from base64 data
        const mimeTypeMatch = base64String.match(/^data:(.*?);base64,/);
        const mimeType = mimeTypeMatch
          ? mimeTypeMatch[1]
          : "application/octet-stream";

        // Derive file extension from mime type
        const extension = mimeType.split("/")[1] || "jpg";

        const imageFolder = `san_pham_${productId}`;
        const uniqueFileName = `${name.replace(
          /\s+/g,
          "_"
        )}_${Date.now()}.${extension}`;
        const imagePath = path.join(
          __dirname,
          "../../utils/image_product",
          imageFolder,
          uniqueFileName
        );

        // Kiểm tra nếu thư mục không tồn tại, tạo mới
        if (
          !fs.existsSync(
            path.join(__dirname, "../../utils/image_product", imageFolder)
          )
        ) {
          fs.mkdirSync(
            path.join(__dirname, "../../utils/image_product", imageFolder)
          );
        }
        fs.writeFileSync(imagePath, imageBuffer);

        return { product_id: productId, url: imagePath };
      };

      const imageInserts: ImageInsert[] = body.image.map((image) =>
        saveImage(image.img, productId.id, image.name)
      );

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
