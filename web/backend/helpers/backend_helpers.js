import { credentials } from "../Schema/schema.js";
import shopify from "../../shopify.js";

/******************************************************************************************************* 
                    GLOBAL FUNCTION Start 
*******************************************************************************************************/

export async function getCredentialsResponse(shop) {
  let documentQuery = { shop: shop };
  let credentialsData = await credentials.findOne(documentQuery);
  return credentialsData;
}

//PUT API of shopify
// export async function putShopifyData(shop, accessToken, param) {
//   let check = false;
//   let response = "";
//   try {
//     const client = new Shopify.Clients.Rest(shop, accessToken);
//     await client
//       .put(param)
//       .then((result) => {
//         check = true;
//         response = result;
//       })
//       .catch((e) => {
//         console.log("no");
//         check = false;
//         console.log("Error Occured " + e);
//       });
//   } catch (err) {
//     check = false;
//   }

//   return {
//     status: check,
//     response: response,
//   };
// }

//Get API of shopify
export async function getShopifyData(shop, accessToken, param) {
    try {
      const client = new shopify.api.clients.Rest({ session: { shop, accessToken } });
      const response = await client.get(param);
      return {
        status: true,
        response,
      };
    } catch (error) {
      console.log("no");
      return {
        status: false,
        response: "",
      };
    }
  }
  

/********************** SHOPIFY API CALLS FUNCTION START  *********************/

export async function getAllFiles(shop, mainTheme, accessToken) {
  let snippetUrl = `https://${shop}/admin/api/${process.env.SHOPIFY_API_VERSION}/themes/${mainTheme}/assets.json?access_token=${accessToken}`;
  let snippetResponse = await axios
    .get(snippetUrl)
    .then((result) => {
      return result;
    })
    .catch((e) => {
      return { status: 500 };
    });
  if (snippetResponse.status == 200) {
    return snippetResponse.data.assets;
  } else {
    return [];
  }
}

export async function changeCollectionFile(
  shop,
  mainTheme,
  accessToken,
  sectionKey,
  fileType
) {
  let check = false;
  let fileName = fileType + "/" + sectionKey + ".liquid";

  let param = {
    path: `themes/${mainTheme}/assets`,
    query: { "asset[key]": fileName },
  };

  let sectionHTML = await getShopifyData(shop, accessToken, param);

  if (true == sectionHTML.status) {
    if (sectionHTML.includes("{% for product in collection.products %}")) {
      let changeSectionHTML = sectionHTML.split(
        "{% for product in collection.products %}"
      );
      if (changeSectionHTML.length == 3) {
        let html =
          changeSectionHTML[0] +
          `\n{% for product in collection.products %}\n{% assign a = "false"  %}{% for tag in product.tags %}{% if product.tags contains 'genie_product' %}{% assign a = "true"  %}{% endif %}\n{% endfor %}\n{% if a == "true" %}\n{% continue %}\n{% endif %}\n` +
          changeSectionHTML[1] +
          `\n{% for product in collection.products %}\n{% assign a = "false"  %}\n{% for tag in product.tags %}\n{% if product.tags contains 'genie_product' %}\n{% assign a = "true"  %}\n{% endif %}\n{% endfor %}\n{% if a == "true" %}\n{% continue %}\n{% endif %}\n` +
          changeSectionHTML[2];

        let param = {
          path: `themes/${mainTheme}/assets`,
          data: {
            asset: {
              key: fileName,
              value: html,
            },
          },
          type: DataType.JSON,
        };
        let createSecCollectionModel = await putShopifyData(
          shop,
          accessToken,
          param
        );
        if (true == createSecCollectionModel.status) {
          check = true;
        }
      }
    } else {
      check = false;
    }
  } else {
    check = false;
  }
  return check;
}
