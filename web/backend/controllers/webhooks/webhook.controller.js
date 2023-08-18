import { Shopify, ApiVersion, DataType } from "@shopify/shopify-api";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { credentials, Schema, custom } from "../../Schema/schema.js";
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




