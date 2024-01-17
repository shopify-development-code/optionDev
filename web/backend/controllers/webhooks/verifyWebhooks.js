import crypto from "node:crypto";
import { credentials, custom, Schema } from "../../Schema/schema.js";
import { DataType } from "@shopify/shopify-api";
import shopify from "../../../shopify.js";

export const verifyWebhooks = async (req, res) => {
  try {
    const topic = req.headers["x-shopify-topic"];
    let shop = req.headers["x-shopify-shop-domain"];
    let hmac_header = req.headers["x-shopify-hmac-sha256"];
    const secretKey = process.env.SHOPIFY_API_SECRET;
    console.log(topic, "topic");
    switch (topic) {
      case "products/update":
        try {
          const calculated_hmac = crypto
            .createHmac("sha256", secretKey)
            .update(req.body)
            .digest("base64");

          if (calculated_hmac === hmac_header) {
            console.log("Webhook verified product update");
            let responseWebhook = JSON.parse(req.body);
            const pid = responseWebhook.id.toString();
            const productSrc =
              responseWebhook.image == null
                ? process.env.HOST + process.env.NO_IMAGE_FILE_PATH
                : responseWebhook.image.src;

            const filter = { shop };
            const update = {
              $set: {
                "option_set.products.product_added.$[element].title":
                  responseWebhook.title,
                "option_set.products.product_added.$[element].originalSrc":
                  productSrc,
              },
            };
            const options = { arrayFilters: [{ "element.product_id": pid }] };

            const allOptionSetsDocument = await Schema.updateMany(
              filter,
              update,
              options
            );
            console.log(allOptionSetsDocument);
            res.status(200).json("Success");
          } else {
            res.status(401).json("Unauthorized access");
          }
        } catch (error) {
          console.log("Error updating database:", error);
          res.status(500).json("Internal Server Error");
        }
        break;
      case "products/delete":
        try {
          console.log("********* Products DELETE WEBHOOK START *******");
          const calculated_hmac = crypto
            .createHmac("sha256", secretKey)
            .update(req.body)
            .digest("base64");
          if (calculated_hmac == hmac_header) {
            console.log("hmac verified delete Products");
            let bodyData = JSON.parse(req.body);
            let pid = bodyData.id.toString();
            const deletedIndex = {
              $pull: {
                "option_set.products.product_added": { product_id: pid },
              },
            };

            await Schema.updateMany({ shop }, deletedIndex)
            await custom.deleteOne({shop,pid:pid})
 
            res.status(200).json({ data: "Product deleted successfully!" });
          } else {
            res.status(401).json("unauthorized access");
          }
        } catch (err) {
          res.status(200).send("success");
        }
        break;
      case "app/uninstalled":
        try {
          const calculated_hmac = crypto
            .createHmac("sha256", secretKey)
            .update(req.body)
            .digest("base64");
          if (calculated_hmac === hmac_header) {
            console.log("hmac verified uninstall app");
            await Promise.all([
              credentials.deleteOne({ shop }),
              custom.deleteMany({ shop }),
            ]);
            res.status(200).json({ message: "Deleted Successfully!" });
          } else {
            res.status(401).json("Unauthorized access");
          }
        } catch (error) {
          console.error(error);
          res.status(200).send("success");
        }
        break;
      case "customers/data_request":
        try {
          const calculated_hmac = crypto
            .createHmac("sha256", secretKey)
            .update(req.body)
            .digest("base64");
          if (calculated_hmac == hmac_header) {
            console.log("hmac verified customer data request");
            res.status(201).send("Accepted Customer Data request");
          } else {
            res.status(401).send("Unauthorized Access");
          }
        } catch (err) {
          res.status(200).send("success");
        }
        break;
      case "customers/redact":
        try {
          const calculated_hmac = crypto
            .createHmac("sha256", secretKey)
            .update(req.body)
            .digest("base64");
          if (calculated_hmac == hmac_header) {
            console.log("hmac verified customer data deleted");
            res.status(200).json("Currently, we are not using customer data");
          } else {
            res.status(401).send("Unauthorized Access");
          }
        } catch (err) {
          res.status(200).send("success");
        }
        break;
      case "shop/redact":
        try {
          const calculated_hmac = crypto
            .createHmac("sha256", secretKey)
            .update(req.body)
            .digest("base64");
          if (calculated_hmac == hmac_header) {
            console.log("hmac verified shop data delete");
            await Promise.all([
              Schema.deleteMany({ shop }),
              custom.deleteMany({ shop }),
              credentials.deleteOne({ shop }),
            ]);
            res.status(200).json("All data deleted Successfully!");
          } else {
            res.status(401).json("Unauthorized Access!");
          }
        } catch (error) {
          res.status(200).send("success");
        }
        break;
      case "themes/publish":
        try {
          console.log(
            "============THEMES PUBLISH WEBHOOK STARTS=============>"
          );
          const calculated_hmac = crypto
            .createHmac("sha256", secretKey)
            .update(req.body)
            .digest("base64");
          if (calculated_hmac == hmac_header) {
            let theme_Id = JSON.parse(req.body).id;
            const shopData = await credentials.findOne({ shop });
            const client = new shopify.api.clients.Rest({
              session: {
                shop,
                accessToken: shopData.accessToken,
              },
            });
            const getAssetsData = await client.get({
              path: `themes/${theme_Id}/assets`,
              type: DataType.JSON,
            });
            const findJsonTemplate = getAssetsData.body.assets.find((asset) => {
              return asset.key === "templates/product.json";
            });
            let themeType =
              findJsonTemplate == undefined ? "vintage" : "modern";
            await credentials.findOneAndUpdate(
              { shop },
              { theme_type: themeType },
              { upsert: true, new: true }
            );
            res.status(200).json("Theme publish successfully!");
          } else {
            res.status(401).json("unauthorized access");
          }
        } catch (err) {
          console.log(err);
          res.status(200).send("success");
        }
        break;
      case "orders/create":
        try {
          console.log("********* Orders Create WEBHOOK START *******");
          const calculated_hmac = crypto
            .createHmac("sha256", secretKey)
            .update(req.body)
            .digest("base64");
          if (calculated_hmac == hmac_header) {
            const responseWebhook = JSON.parse(req.body);
            // const order_id = responseWebhook.id;
            // const order_tag = `"${responseWebhook.tags}, sd_product_option"`;

            // const credentialsData = await credentials.find({ shop }).limit(1);
            // const accessToken = credentialsData[0].accessToken;
            // const clientConfig = { session: { shop, accessToken } };

            // const DELETE_PRODUCT_ARRAY = responseWebhook.line_items.filter(
            //   (variantData) => {
            //     const variant_properties = variantData.properties;

            //     if (variant_properties.length > 0) {
            //       const optionSet_product_delete = variantData.product_id;

            //       const deleteProductResponse = makeShopifyRequest(
            //         clientConfig,
            //         `products/${optionSet_product_delete}`,
            //         "delete"
            //       );
            //       console.log("Product Delete", deleteProductResponse);
            //       return variant_properties.find(
            //         (vp) => vp.name === "_variant_id"
            //       );
            //     }
            //   }
            // );

            // console.log("********* Add Tag Order module Start ***********");

            // if (DELETE_PRODUCT_ARRAY.length > 0) {
            //   const updateOrderTag = {
            //     path: `orders/${order_id}`,
            //     data: { order: { id: order_id, tags: order_tag } },
            //     type: DataType.JSON,
            //   };

            //   const updateOrderTagResponse = await makeShopifyRequest(
            //     clientConfig,
            //     updateOrderTag.path,
            //     "put",
            //     updateOrderTag.data
            //   );
            //   console.log("Update Order Tag", updateOrderTagResponse);
            // }
            res.status(200).send("success");
          } else {
            res.status(401).json("Unauthorized Access");
          }
        } catch (error) {
          console.log("Something Went Wrong!!!", error);
          res.status(200).send("success");
        }
        break;
      default:
        break;
    }
  } catch (err) {
    res.status(401).send("Unauthorized access");
  }
};

async function makeShopifyRequest(clientConfig, path, method, data) {
  try {
    const client = new shopify.api.clients.Rest(clientConfig);
    return await client[method]({ path, data });
  } catch (err) {
    console.log(err);
  }
}

const deleteAllImages = async (shop, folderName) => {
  console.log("ENTER IN DELETE ALL CONTROLLER");
  try {

    const params = {
      Bucket: process.env.AWS_BUCKET, // Replace with your S3 bucket name
      Prefix: shop.replace(".myshopify.com", "-") + "gr16qqutv8e" + "/",
    };
    const ListObjectsCommand = new ListObjectsV2Command(params);
    const response = await s3Client.send(ListObjectsCommand);
    if (response.Contents) {
      const objectKeysToDelete = response.Contents.map((obj) => ({
        Key: obj.Key,
      }));
      if (objectKeysToDelete.length == 0) {
        return "";
      }
      const deleteObjectsCommand = new DeleteObjectsCommand({
        Bucket: process.env.AWS_BUCKET,
        Delete: {
          Objects: objectKeysToDelete,
          Quiet: false,
        },
      });
    await s3Client.send(deleteObjectsCommand);
    }

    return "sucess";
    // res.send({status:200, message:"sucess"})
  } catch (err) {
    console.log(err);
    return "error";
    // res.send({status:400, message:"err"})
  }
};
