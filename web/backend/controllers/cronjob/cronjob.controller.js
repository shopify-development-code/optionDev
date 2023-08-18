import { credentials, custom } from "../../Schema/schema.js";
import axios from "axios";
import path from "path";
import { fileURLToPath } from "url";

export async function privayPolicy(req, res) {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const dirPath = path.join(__dirname, "../Templates");
  console.log(dirPath);
  res.render(`${dirPath}/privacyPolicy.ejs`);
  res.end();
}

export async function deleteAllActiveProducts(req, res) {
  // console.log("cron run :");
  let DistinctShop = await custom.distinct("shop");
  // console.log('DistinctShop :');
  // console.log(DistinctShop);
  // let CurrentDate = new Date(Date.now());
  // console.log('Current Date Time :');
  // console.log(CurrentDate);

  DistinctShop.forEach(async function (DistinctShopItem, index, arr) {
    let query = {
      updatedAt: {
        // 20 minutes ago (from now)
        $lt: new Date(Date.now() - 20 * 60 * 1000),
      },
      shop: DistinctShopItem,
      product_status: "active",
    };
    let allActiveProducts = await custom.find(query);
    // console.log("allActiveProducts :");
    // console.log(allActiveProducts);
    if (allActiveProducts.length > 0) {
      let queryCredentials = {
        shop: DistinctShopItem,
      };
      let credentialsResponse = await credentials.find(queryCredentials, {
        accessToken: 1,
      });
      let accessToken = credentialsResponse[0].accessToken;

      allActiveProducts.forEach(async function (
        allActiveProductsItem,
        index,
        arr
      ) {
        // console.log('allActiveProductsItem :');
        // console.log(allActiveProductsItem.pid);
        let productId = allActiveProductsItem.pid;
        let deleteProductUrl = `https://${DistinctShopItem}/admin/api/${process.env.SHOPIFY_API_VERSION}/products/${productId}.json?access_token=${accessToken}`;
        let deleteProductAxios = await axios
          .delete(deleteProductUrl)
          .then((resp) => {
            // let succData = resp;
            // console.log("succData :");
            return true;
          })
          .catch((err) => {
            let errorData = { data: err };
            // console.log("errorData :");
            return false;
          });

        console.log("bbbbf");
        console.log(deleteProductAxios);
        if (deleteProductAxios) {
          await custom
            .deleteOne({ pid: productId, shop: DistinctShopItem })
            .then(() => {
              // console.log('customproducts record deleted successfully');
            })
            .catch((err) => {
              // console.log('customproducts error in delete records');
            });
        }
      });
    }
  });
  res.send({ status: "true" });
  res.end();
}

export async function deleteAllDraftProducts(req, res) {
  // console.log("cron run draft :");
  let DistinctShop = await custom.distinct("shop");
  // console.log('DistinctShop :');
  // console.log(DistinctShop);
  // let CurrentDate = new Date(Date.now());
  // console.log('Current Date Time :');
  // console.log(CurrentDate);

  DistinctShop.forEach(async function (DistinctShopItem, index, arr) {
    let query = {
      updatedAt: {
        // 1 hour ago or 24 hours ago (from now)
        $lt: new Date(Date.now() - 24 * 60 * 60 * 1000),
      },
      shop: DistinctShopItem,
      product_status: "draft",
    };
    let allActiveProducts = await custom.find(query);
    // console.log("allActiveProducts :");
    // console.log(allActiveProducts);
    if (allActiveProducts.length > 0) {
      let queryCredentials = {
        shop: DistinctShopItem,
      };
      let credentialsResponse = await credentials.find(queryCredentials, {
        accessToken: 1,
      });
      let accessToken = credentialsResponse[0].accessToken;

      allActiveProducts.forEach(async function (
        allActiveProductsItem,
        index,
        arr
      ) {
        // console.log('allActiveProductsItem :');
        // console.log(allActiveProductsItem.pid);
        let productId = allActiveProductsItem.pid;
        let deleteProductUrl = `https://${DistinctShopItem}/admin/api/${process.env.SHOPIFY_API_VERSION}/products/${productId}.json?access_token=${accessToken}`;
        let deleteProductAxios = await axios
          .delete(deleteProductUrl)
          .then((resp) => {
            // let succData = resp;
            // console.log("succData :");
            return true;
          })
          .catch((err) => {
            let errorData = { data: err };
            // console.log("errorData :");
            return false;
          });

        console.log("bbbbf");
        console.log(deleteProductAxios);
        if (deleteProductAxios) {
          await custom
            .deleteOne({ pid: productId, shop: DistinctShopItem })
            .then(() => {
              // console.log('customproducts record deleted successfully');
            })
            .catch((err) => {
              // console.log('customproducts error in delete records');
            });
        }
      });
    }
  });
  res.send({ status: "true" });
  res.end();
}
