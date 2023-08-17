import { Shopify, ApiVersion, DataType } from "@shopify/shopify-api";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { credentials, Schema, custom } from "../Schema/schema.js";
import crypto from "crypto";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// console.log('directory-name 👉️', __dirname);
const dirPath = path.join(__dirname, "../utils/txt_files/webhooks");

export async function webhookTesting(req, res) {
  let responseWebhook = req.body;
  let shop = responseWebhook.Params.shop;
  let product_id = responseWebhook.Params.product_id;
  let documentQuery = { shop: shop };
  let credentialsData = await credentials.find(documentQuery).limit(1);
  let accessToken = credentialsData[0].accessToken;
  try {
    const client = new Shopify.Clients.Rest(shop, accessToken);
    await client.delete({
      path: `products/${product_id}`,
    });

    req.body = {
      status: true,
      data: "Succesfully Deleted",
    };
  } catch (err) {
    console.log(`error testing webhook: ${err}`);
    req.body = {
      status: false,
      data: "Not Deleted",
    };
  }
  res.end();
}

export async function addOrderTag(req, res) {
  let response = req.body;
  let shop = response.shop;
  let order_id = response.order_id;
  let order_tag = response.order_tag;
  order_tag = order_tag + ", sd_product_option";
  let documentQuery = { shop: shop };
  let credentialsData = await credentials.find(documentQuery).limit(1);
  let accessToken = credentialsData[0].accessToken;
  try {
    const client = new Shopify.Clients.Rest(shop, accessToken);
    const UPDATE_ORDER_TAG = await client.put({
      path: `orders/${order_id}`,
      data: {
        order: {
          id: order_id,
          tags: order_tag,
        },
      },
      type: DataType.JSON,
    });

    ctx.body = {
      status: true,
      data: "Succesfully  Deleted",
    };
  } catch (err) {
    console.log(err);
    ctx.body = {
      status: false,
      data: "Succesfully Not Deleted",
    };
  }
  res.end();
}

export async function ordersCreateWebhook(req, res) {
  // debugger;
  console.log("********* Orders Create WEBHOOK START *******");
  let shop = req.headers["x-shopify-shop-domain"];
  console.log("shop " + shop);
  let responseWebhook = req.body;
  console.log(responseWebhook);
  // FETCH THE ORDER VARIABLE
  let order_id = responseWebhook.id;
  console.log("OrderID " + order_id);
  let order_tag = responseWebhook.tags;
  order_tag = `"${order_tag}, sd_product_option"`;
  console.log("Ordertag " + order_tag);

  let filePathOrdersCreate = `${dirPath}/orders_create.txt`;
  // fs.writeFileSync(filePathOrdersCreate, JSON.stringify(responseWebhook));

  /** FETCH ACCESS TOKEN START */
  let documentQuery = { shop: shop };
  let credentialsData = await credentials.find(documentQuery).limit(1);
  let accessToken = credentialsData[0].accessToken;

  /** DELETE THE OPTION SET PRODUCT START */
  console.log("********* Product Delete module start ***********");
  console.log(responseWebhook.line_items);
  let DELETE_PRODUCT_ARRAY = responseWebhook.line_items.filter(
    (variantData) => {
      let variant_properties = variantData.properties;
      if (variant_properties.length > 0) {
        let optionSet_product_delete = variantData.product_id;
        // console.log("product_id" + optionSet_product_delete);
        let DELETE_OPTIONSET_PRODUCT = async () => {
          try {
            const client = new Shopify.Clients.Rest(shop, accessToken);
            const deleteProductResponse = await client.delete({
              path: `products/${optionSet_product_delete}`,
            });
            console.log("Product Delete" + deleteProductResponse);
          } catch (err) {
            console.log(err);
          }
        };
        DELETE_OPTIONSET_PRODUCT();
        // console.log(variant_properties);
        return variant_properties.filter((variant_properties) => {
          // console.log("VARIANT_PROP " + variant_properties.name);
          return variant_properties.name == "_variant_id";
        });
      }
    }
  );
  /** DELETE THE OPTION SET END */

  /** ADD OPTION SET TAG TO ORDER */
  console.log("********* Add Tag Order module Start ***********");
  if (DELETE_PRODUCT_ARRAY > 0) {
    const ADD_OPTION_SET_TAG = async () => {
      try {
        const client = new Shopify.Clients.Rest(shop, accessToken);
        const UPDATE_ORDER_TAG = await client.put({
          path: `orders/${order_id}`,
          data: {
            order: {
              id: order_id,
              tags: order_tag,
            },
          },
          type: DataType.JSON,
        });
      } catch (err) {
        console.log(err);
      }
    };
    ADD_OPTION_SET_TAG();
  }
  /** ADD OPTION SET TAG TO ORDER */
  res.end();
}

export async function appUninstallWebhook(req, res) {
  console.log("********* App Uninstall WEBHOOK START *******");

  const shop = req.headers["x-shopify-shop-domain"];
  console.log("shop " + shop);
  let responseWebhook = req.body;
  console.log(responseWebhook, "payload");

  let filePathAppUninstall = `${dirPath}/app_uninstall.txt`;
  // fs.writeFileSync(filePathAppUninstall, JSON.stringify(responseWebhook));
  // Delete data from db
  await credentials.deleteOne({ shop: shop });
  await custom.deleteMany({ shop: shop });
  // await SessionStorage.deleteOne({ shop: shop });
  res.end();
}

export async function productsUpdateWebhook(req, res) {
  console.log("********* Products Update WEBHOOK START *******");
  let shop = req.headers["x-shopify-shop-domain"];
  let hmac_header = req.headers["x-shopify-hmac-sha256"];


  console.log(hmac_header, "header");
  let responseWebhook = req.body;
  // console.log(responseWebhook);

  // const generateHash = crypto
  //   .createHmac("sha256", process.env.SHOPIFY_API_SECRET) // that's not your Shopify API secret key, but the key under Webhooks section in your admin panel (<yourstore>.myshopify.com/admin/settings/notifications) where it says "All your webhooks will be signed with [SHOPIFY_WEBHOOKS_KEY] so you can verify their integrity
  //   .update(responseWebhook)
  //   .digest("base64");
  // console.log("ggggg");
  // console.log(generateHash);
  // console.log(hmac_header === generateHash);

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  // console.log('directory-name 👉️', __dirname);
  const dirPath = path.join(__dirname, "../utils/txt_files/webhooks");
  let filePathProductsUpdate = `${dirPath}/products_update.txt`;
  // fs.writeFileSync(filePathProductsUpdate, JSON.stringify(responseWebhook));
  console.log("responseWebhook");

  let pid = responseWebhook.id;
  pid = pid.toString();
  let productSrc =
    responseWebhook.image == null
      ? process.env.HOST + process.env.NO_IMAGE_FILE_PATH
      : responseWebhook.image.src;

  const filter = { shop: shop };
  const update = {
    $set: {
      "option_set.products.product_added.$[element].title":
        responseWebhook.title,
      "option_set.products.product_added.$[element].originalSrc": productSrc,
    },
  };
  const options = { arrayFilters: [{ "element.product_id": pid }] };

  let allOptionSetsDocument = await Schema.updateMany(filter, update, options);
  console.log(
    "================= allOptionSetsDocument =============================="
  );
  console.log(allOptionSetsDocument);

  // let allOptionSetsDocument = await Schema.find({ shop: shop });
  // if (allOptionSetsDocument.length > 0) {
  //   console.log("data present");
  //   allOptionSetsDocument.forEach((item) => {
  //     console.log("**************************element***********************");
  //     console.log(item.option_set.products.type);
  //     if (item.option_set.products.type == "manual") {
  //       let productList = item.option_set.products.product_added;
  //       productList.forEach(async function (productListItem, index, arr) {
  //         console.log(productListItem.product_id);
  //         if (productListItem.product_id == responseWebhook.id) {
  //           const productSrc =
  //             responseWebhook.image.length > 0
  //               ? responseWebhook.image.src
  //               : "photo nhi hai";
  //           const filter = { shop: shop, _id: item._id };
  //           const update = {
  //             title: responseWebhook.title,
  //             originalSrc: productSrc,
  //           };
  //           await Schema.findOneAndUpdate(filter, update);
  //         }
  //       });
  //     }
  //   });
  // }

  res.end();
}

export async function productsDeleteWebhook(req, res) {
  console.log("********* Products DELETE WEBHOOK START *******");
  let shop = req.headers["x-shopify-shop-domain"];
  let hmac_header = req.headers["x-shopify-hmac-sha256"];
  let responseWebhookBody = req.body;

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const dirPath = path.join(__dirname, "../utils/txt_files/webhooks");
  let filePathProductsDelete = `${dirPath}/products_delete.txt`;
  // fs.writeFileSync(filePathProductsDelete, JSON.stringify(responseWebhookBody));
  console.log("responseWebhookBody");

  let pid = responseWebhookBody.id;
  pid = pid.toString();

  const filter = { shop: shop };
  const deletedIndex = {
    $pull: { "option_set.products.product_added": { product_id: pid } },
  };

  let resData = await Schema.updateMany(filter, deletedIndex);
  console.log(
    "================= Products Delete resData =============================="
  );
  console.log(resData);

  res.end();
}

export async function themesPublishWebhook(req, res) {
  console.log("********* Themes Pulish WEBHOOK START *******");

  let shop = req.headers["x-shopify-shop-domain"];
  let hmac_header = req.headers["x-shopify-hmac-sha256"];
  let responseWebhookBody = req.body;
  // console.log(responseWebhookBody);
  let themeId = responseWebhookBody.id;
  // console.log(themeId);
  /** FETCH ACCESS TOKEN START */
  let documentQuery = { shop: shop };
  let credentialsData = await credentials.find(documentQuery).limit(1);
  let accessToken = credentialsData[0].accessToken;

  const client = new Shopify.Clients.Rest(shop, accessToken);

  const getAssetsData = await client.get({
    path: `themes/${themeId}/assets`,
    type: DataType.JSON,
  });
  const findJsonTemplate = getAssetsData.body.assets.find((asset) => {
    return asset.key === "templates/product.json";
  });
  let themeType = findJsonTemplate == undefined ? "vintage" : "modern";

  let filter = { shop: shop };
  let update = { theme_type: themeType };
  await credentials.findOneAndUpdate(filter, update);

  res.end();
}

/** GDPR WEBHOOKS **/
export async function customerdataredact(req, res) {
  console.log("********* Customer Data Redact WEBHOOK START *******");
  let shop = req.headers["x-shopify-shop-domain"];
  let hmac_header = req.headers["x-shopify-hmac-sha256"];
  // let responseWebhook = req.body;
  if (hmac_header != "" && shop != "") {
    res.sendStatus(200);
  } else {
    res.sendStatus(401);
  }
}

export async function shopdataredact(req, res) {
  console.log("********* Shop Data Redact WEBHOOK START *******");
  let shop = req.headers["x-shopify-shop-domain"];
  let hmac_header = req.headers["x-shopify-hmac-sha256"];
  // let responseWebhook = req.body;
  if (hmac_header != "" && shop != "") {
    await Schema.deleteMany({ shop: shop });
    await custom.deleteMany({ shop: shop });
    await credentials.deleteOne({ shop: shop });
    res.sendStatus(200);
  } else {
    res.sendStatus(401);
  }
}

export async function datarequest(req, res) {
  console.log("********* Customer Data Request WEBHOOK START *******");
  let shop = req.headers["x-shopify-shop-domain"];
  let hmac_header = req.headers["x-shopify-hmac-sha256"];
  // let responseWebhook = req.body;
  if (hmac_header != "" && shop != "") {
    res.status(200).send({
      response: "The Genie Options app is not using the customer data.",
    });
  } else {
    res.sendStatus(401);
  }
}
