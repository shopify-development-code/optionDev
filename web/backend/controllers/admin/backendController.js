import { credentials, Schema, custom } from "../../Schema/schema.js";
import shopify from "../../../shopify.js";
import {DataType} from "@shopify/shopify-api";
import fs from "fs";
import { getShopifyData } from "../../helpers/backend_helpers.js";
import dotenv from 'dotenv';
dotenv.config();

export async function saveOptionSet(req, res) {
  const shop = req.body.shop;
  const formStatus = req.body.status;
  const status = formStatus === 'set_draft' ? false : true;

  const optionSetData = {
    shop: shop,
    option_set: {
      elements: req.body.elements,
      products: req.body.products,
    },
    name: req.body.name,
    fileName: req.body.fileName,
    layout: req.body.layout,
    mainLayout: req.body.mainLayout,
    counter: req.body.counter,
    status: status,
  };

  try {
    await Schema.create(optionSetData);
    res.json({
      status: true,
      result: 'Successfully Saved Option Set',
      activedraft: req.body.status,
    });
  } catch (error) {
    res.json({
      status: false,
      result: 'Error Saving Data ... Please Try Again ...!!',
    });
  }
}

export async function getAllOptionSet(req, res) {
  try {
    const shop = res.locals.shopify.session.shop;
    const settings = await credentials.findOne({ shop });
    const schema_data = await Schema.find({ shop });

    res.send(schema_data
      ? {
          status: true,
          response: schema_data,
          mainTheme: settings.theme_chosen,
          theme: settings.theme_chosen,
          installation: settings.first_time,
          id: settings._id,
        }
      : { status: false, response: "Error Fetching data" }
    );
  } catch (err) {
    res.send({ status: false, response: "Something Went wrong" });
  }
}

export async function updateOptionSet(req, res) {
  try {
    const { shop, status: pstatus, id, name, params } = req.body;

    let status = false;
    if (pstatus === "set_active") {
      status = true;
    }

    const query = { _id: id };
    const update = {
      option_set: {
        elements: params.elements,
        products: params.products,
      },
      shop,
      name,
      layout: params.layout,
      mainLayout: params.mainLayout,
      counter: params.counter,
      status,
    };

    const options = { upsert: true, new: true, useFindAndModify: false };
    const doc = await Schema.findOneAndUpdate(query, update, options);

    const error_log = { noerror: true, data: "" };
    res.send(error_log);
  } catch (error) {
    console.error("Error:", error);
    const error_log = { noerror: false, data: "database error" };
    res.status(500).send(error_log);
  }
}

export async function deleteOptionSet(req, res) {
  try {
    const shop = res.locals.shopify.session.shop;
    const deletingID = req.body.id;
    const result = await Schema.deleteOne({ _id: deletingID, shop: shop });
    if (result.deletedCount === 1) {
      res.json({ status: true, data: "Option Set Deleted" });
    } else {
      res.json({ status: false, data: "Error Deleting File" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: false, data: "Something went wrong!!!" });
  }
}

export async function copyOptionSet(req, res) {
  try {
    const { shop, id, name_length, fileName } = req.body;

    const data = await Schema.findById(id);
    const { products } = data.option_set;

    const note = new Schema({
      setID: data.setID,
      shop,
      option_set: { elements: data.option_set.elements, products },
      name: `${data.name} (${name_length})`,
      fileName,
      layout: data.layout,
      mainLayout: data.mainLayout,
      counter: data.counter,
      status: false,
    });

    await note.save();
    res.json({ status: true, data: note, mesg: "Option Set Duplicated" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, mesg: "database error" });
  }
}


export async function checkOptionSetOnInstall(req, res) {
  let findData = req.query.Params;
  let data = await Schema.find(findData);
  if (data != null) {
    res.send({ noerror: true, data: data });
  } else {
    res.send({ noerror: false, data: "" });
  }
}

export async function getCredentials(req, res) {
  try {
    const shop = res.locals.shopify.session.shop;
    const settings = await credentials.findOne({ shop });
    if (settings) {
      res.send({
        noerror: true,
        settings: settings.main_settings,
        theme_type: settings.theme_type,
        installation: settings.first_time,
        theme: settings.theme_chosen,
        mainTheme: settings.theme_chosen,
      });
    } else {
      res.send({ noerror: false, data: "No data found for the specified shop" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ noerror: false, data: "An error occurred" });
  }
}


export async function handleServerScript(req, res) {
  const doc = printer.createPdfKitDocument(
    myFunctionGeneratePDFBody(req.query)
  );
  doc.pipe(ctx.res);
  doc.end();
  ctx.res.writeHead(200, {
    "Content-Type": "application/pdf",
    "Content-Disposition": "attachment; filename=document.pdf",
  });
  return new Promise((resolve) => ctx.res.on("finish", resolve));
}

//Update the main setting in the main Credentials table
export async function updateSettngs(req, res) {
  const shop = req.body.shop;
  const mainsettings = { settings: req.body.settings };
  try {
    const changeData = await credentials.findOneAndUpdate(
      { shop },
      { main_settings: mainsettings },
      { upsert: true }
    );

    if (changeData) {
      res.send({ status: true, mesage: "Settings Updated" });
    } else {
      res.send({
        status: false,
        mesage: "Error Updating the database, Please Try Again updates",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({
      status: false,
      mesage: "An error occurred while updating settings",
    });
  }
}


//Delete the draft product from the backend bulk delete
export async function deleteDraftProducts(req, res) {
  const { shop } = res.locals.shopify.session;
  const { accessToken, session } = res.locals.shopify.session;
  const param = {
    path: "products",
    query: {
      fields: "id",
      vendor: "Genie Options",
      status: "draft",
    },
  };

  const getproductsList = await getShopifyData(shop, accessToken, param);
  const productList = getproductsList.response.body.products;

  if (productList.length === 0) {
    res.send({ status: false, message: "No Product To Delete Exist" });
  } else {
    const client = new shopify.api.clients.Rest({ session });
    let resp = { sat: false, message: "err" };

    for (const product of productList) {
      const delDraftResponse = await client
        .delete({
          path: `products/${product.id}`,
        })
        .then(() => {
          resp = { sat: true, message: "All Products have been Deleted" };
        });

      if (resp.sat) {
        try {
          await custom.deleteOne({
            pid: product.id,
            shop,
            product_status: "draft",
          });
        } catch (error) {
          continue;
        }
      }
    }
    res.send({ status: resp.sat, message: resp.message });
  }
}



export async function getDefaultInstallationData(req, res) {
  const shop = req.query.shop;
  const accessToken = req.query.accessToken;

  let param = {
    path: "themes",
  };

  let themeData = await getShopifyData(shop, accessToken, param);
  let themesListing = themeData.response.body.themes;
  let mainThemeId;
  themesListing.map((value) => {
    if (value.role == "main") {
      mainThemeId = value.id;
    }
  });
  const mainSettings = {
    settings: {
      general: {
        label_price_seperator: "",
        label_addonprice_format: "(+ {{addon}})",
        hide_pay_button: true,
        enabled: true,
      },
      translations: {
        selection_addon: "Selection will add {{addon}} to the price",
        custom_product_name: "{{product_title}} - Selections",
      },
    },
  };

  const credentials = new credentials({
    accessToken: accessToken,
    shop: shop,
    active_status: 1,
    payment_status: 0,
    first_time: false, // Put this to true so you can see the tour Guide on app!!!!!!
    main_settings: mainSettings,
    theme_chosen: mainThemeId, //remove
  });

  let doc = true;
  credentials.save(function (err, room) {
    if (!err) {
      doc = true;
    } else {
      doc = false;
    }
  });

  res.send({ status: doc });
}

export async function completeInstallation(req, res) {
  let themeTokenId = { shop: req.query.Params.shop };
  let saveTheme = credentials.findOneAndUpdate(
    themeTokenId,
    {
      first_time: false,
    },
    { upsert: true },
    function (err, doc) {
      if (err) {
        return false;
      } else {
        return true;
      }
    }
  );
  if (saveTheme) {
    res.send({ noerror: true });
  } else {
    res.send({ noerror: false });
  }
}

export async function checkChosenTheme(req, res) {
  let checkThemeChosen = await credentials.findOne({ _id: id });
  if (checkThemeChosen != null) {
    res.send({ noerror: true, data: checkThemeChosen });
  } else {
    res.send({ noerror: false, data: "" });
  }
}

export async function saveTheme(req, res) {
  let shop = req.query.shop;
  let mainTheme = req.query.selected;
  let credentialsData = await getCredentialsResponse(shop);
  let accessToken = credentialsData.accessToken;
  let alreadyMainTheme = credentialsData.theme_chosen;
  let fileNames = [
    "snippets/sd.mainoptions.scripts.liquid",
    "snippets/sd.mainoptions.setting.liquid",
    "snippets/sd.mainoptions.data.liquid",
    "snippets/sd.mainoptions.init.liquid",
  ];

  if (req.query.install) {
    console.log("💥");
    let allOptionData = await Schema.find({ shop: shop });
    let stringMain = `<script>\n{% raw %}\nShine.option.data = {`;
    allOptionData.map((element) => {
      if (element.status) {
        stringMain =
          stringMain +
          `${element.fileName}:{"elements":${JSON.stringify(
            element.option_set.elements
          )},"product":${JSON.stringify(
            element.option_set.products
          )},"layout":${JSON.stringify(
            element.layout
          )},"mainLayout":${element.mainLayout.toString()}},`;
      }
    });
    stringMain = stringMain + `}\n{% endraw %}\n</script>`;
    // let mainFile = stringMain;
    // let key = `snippets/sd.mainoptions.data.liquid`;

    let param = {
      path: `themes/${mainTheme}/assets`,
      data: {
        asset: {
          key: `snippets/sd.mainoptions.data.liquid`,
          value: stringMain,
        },
      },
      type: DataType.JSON,
    };
    await putShopifyData(shop, accessToken, param);

    let check = true;
    if (alreadyMainTheme != mainTheme) {
      const changeData = await credentials.findOneAndUpdate(
        { shop: shop },
        { theme_chosen: mainTheme },
        { upsert: true },
        function (err, doc) {
          if (err) {
            check = false;
          }
        }
      );
    }
    if (true == check) {
      res.send({ status: true });
    } else {
      res.send({ status: false, message: "Theme Not Updated" });
    }
  } else if (!req.query.install) {
    console.log("💛");
    let param = {
      path: `themes/${mainTheme}/assets`,
      query: { "asset[key]": "layout/theme.liquid" },
    };

    let getThemeResponse = await getShopifyData(shop, accessToken, param);

    let themeHTML = getThemeResponse.response.body.asset.value;
    if (themeHTML.includes("{% include 'sd.mainoptions.scripts' %}")) {
      themeHTML = themeHTML.split("{% include 'sd.mainoptions.scripts' %}");
      themeHTML = themeHTML[0] + themeHTML[1];
      let param = {
        path: `themes/${mainTheme}/assets`,
        data: {
          asset: {
            key: "layout/theme.liquid",
            value: themeHTML,
          },
        },
        type: DataType.JSON,
      };
      await putShopifyData(shop, accessToken, param);
    }

    for (var i = 0; i < fileNames.length; i++) {
      const client = new Shopify.Clients.Rest(shop, accessToken);
      await client.delete({
        path: `themes/${mainTheme}/assets`,
        query: { "asset[key]": fileNames[i] },
      });
    }

    res.send({ status: true, message: "Theme Updated Successfully" });
  }
}

//Add the theme files on installation or theme select
export async function themeInstallation(req, res) {
  let shop = req.query.shop;
  let credentialsData = await getCredentialsResponse(shop);
  let accessToken = credentialsData.accessToken;
  let mainTheme = credentialsData.theme_chosen;
  let mainSettings = credentialsData.main_settings;

  let fileName = "layout/theme.liquid";
  let param = {
    path: `themes/${mainTheme}/assets`,
    query: { "asset[key]": fileName },
  };

  let getThemeResponse = await getShopifyData(shop, accessToken, param);

  if (getThemeResponse.status == true) {
    let themeHTML = getThemeResponse.response.body.asset.value;
    if (!themeHTML.includes("{% include 'sd.mainoptions.scripts' %}")) {
      let makeNewTheme = themeHTML.split("</body>");
      makeNewTheme =
        makeNewTheme[0] +
        `\n<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>\n{% include 'sd.mainoptions.scripts' %}\n</body>` +
        makeNewTheme[1];

      // ----------------------POST REQUEST FOR UPDATING THEME ----------------------
      let param_theme = {
        path: `themes/${mainTheme}/assets`,
        data: {
          asset: {
            key: `layout/theme.liquid`,
            value: makeNewTheme,
          },
        },
        type: DataType.JSON,
      };
      console.log("param_theme");
      console.log(param_theme);
      let response_theme = await putShopifyData(shop, accessToken, param_theme);
      console.log(response_theme);
      if (false == response_theme.status) {
        res.send({
          status: false,
          message: "Something went wrong, Please try again later.",
        });
      }
    }

    /** Add Scripts file code   */
    const mainFile = `<script type='text/javascript'>\nlet collectionNames = [];\n{% for collection in product.collections %}\ncollectionNames.push("{{ collection.title }}");\n{% endfor %}\nlet tags = [];\n{% for tag in product.tags %}\ntags.push("{{ tag }}");\n{% endfor %}\nlet Shine = {\n"option":{\ndata:{}\n},\n"setting":{},\nproduct_vendor:"{{ product.vendor }}",\nproduct_title:"{{ product.title }}",\nproduct_price:"{{ product.price }}",\nproduct_tag:tags,\nproduct_type:"{{ product.type }}",\ncollection:collectionNames,\n};\nlet option_set_time = [];\nlet pageType = window.ShopifyAnalytics.meta['page']['pageType'];\nlet product_id = window.ShopifyAnalytics.meta['page']['resourceId'];\n</script>\n{% render 'sd.mainoptions.setting' %}\n{% render 'sd.mainoptions.data' %}\n{% include 'sd.mainoptions.init' %}`;

    let param_script = {
      path: `themes/${mainTheme}/assets`,
      data: {
        asset: {
          key: "snippets/sd.mainoptions.scripts.liquid",
          value: mainFile,
        },
      },
      type: DataType.JSON,
    };

    let response_script = await putShopifyData(shop, accessToken, param_script);
    if (false == response_script.status) {
      res.send({
        status: false,
        message: "Something went wrong, Please try again later.",
      });
    }

    /** Add Setting file code   */
    let settingFile = `<script>\n{% raw %}\n
              Shine.setting = ${JSON.stringify(mainSettings)};
              \n{% endraw %}\n</script>`;
    let param_setting = {
      path: `themes/${mainTheme}/assets`,
      data: {
        asset: {
          key: "snippets/sd.mainoptions.setting.liquid",
          value: settingFile,
        },
      },
      type: DataType.JSON,
    };

    let response_setting = await putShopifyData(
      shop,
      accessToken,
      param_setting
    );
    if (false == response_setting.status) {
      res.send({
        status: false,
        message: "Something went wrong, Please try again later.",
      });
    }

    /** Add Init file code   */
    let initFile = `<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/flatpickr/4.2.3/flatpickr.css">\n<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/flatpickr/4.2.3/themes/dark.css">\n<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>\n<!--  Flatpickr  -->\n<script src="https://cdnjs.cloudflare.com/ajax/libs/flatpickr/4.2.3/flatpickr.js"></script>\n<script src="https://shinedezigninfotech.com/advancedoptionspro/worker.js"></script>`;

    let param_init = {
      path: `themes/${mainTheme}/assets`,
      data: {
        asset: {
          key: "snippets/sd.mainoptions.init.liquid",
          value: initFile,
        },
      },
      type: DataType.JSON,
    };

    let response_init = await putShopifyData(shop, accessToken, param_init);
    if (false == response_init.status) {
      res.send({
        status: false,
        message: "Something went wrong, Please try again later.",
      });
    }
    res.send({ status: true, message: "Theme Updated Successfully." });
  } else {
    res.send({
      status: false,
      message: "Something went wrong, Please try again later.",
    });
  }
}

export async function getFormList(req, res) {
  try {
    const { id } = req.body;
    const shop = res.locals.shopify.session.shop;
    const n = 12;
    const skipCount = (id > 0 ? (id - 1) * n : 0);

    const returnData = await Schema.find({ shop }, { name: 1, option_set: 1, status: 1, _id: 1 })
      .sort({ _id: -1 })
      .skip(skipCount)
      .limit(n);

    const total = await Schema.countDocuments({ shop });
    res.json({ returnData, total: id > 1 ? total - skipCount : total, n, wholedata: total });
  } catch (error) {
    console.error("enter", error);
    res.status(500).json({ error: 'Something went wrong' });
  }
}


export async function getFormNames(req, res) {
  try {
    const { shop } = req.body;
    const names = await Schema.find({ shop }, { name: 1 });
    res.json({ names });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
}


export async function searchByName(req, res) {
  const { find, value } = req.body;
  const shop = res.locals.shopify.session.shop;
  const n = 12;

  try {
    let total_data = await Schema.find({
      name: { $regex: find, $options: "i" },
      shop: { $regex: shop },
    }).count();

    if (value > 1) {
      total_data -= (value - 1) * n;
    }

    const data = await Schema.find({
      name: { $regex: find, $options: "i" },
      shop: { $regex: shop },
    })
      .sort({ _id: -1 })
      .skip(value > 0 ? (value - 1) * n : 0)
      .limit(n)
      .select({ name: 1, option_set: 1, store: 1, status: 1 });

    res.send({ data, total_data });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "An error occurred" });
  }
}


// export async function setformstatus(req, res) {
//   console.log("hello", req.body.key);
//   let type = req.body.type;
//   let key = req.body.key;
//   let id = req.body.productids;
//   let shop = req.body.shop;
//   let currentstatus = req.body.currentstatus;
//   if (currentstatus == "true") {
//     if (type == "none") {
//       res.send({ status: false, data: "First add products to optionset" });
//     } else if (type == "all") {
//       const data1 = await Schema.find(
//         { shop: shop, status: "true", "option_set.products.type": "all" },
//         { "option_set.products": 1, name: 1 }
//       );
//       // console.log(data1[0].name)
//       if (data1.length > 0) {
//         res.send({
//           status: false,
//           data: `Selected Product is already active in "${data1[0].name}" Optionset`,
//         });
//       } else {
//         // console.log(data1.length, "allllllll");
//         let filter = { shop: shop, _id: key };
//         let update = { status: true };
//         const data = await Schema.findOneAndUpdate(filter, update);
//         res.send({
//           status: true,
//           data: "Optionset status updated but preference will be given to the optionset of particular product",
//         });
//       }
//     } else {
//       const data = await Schema.find(
//         { shop: shop, status: "true", "option_set.products.type": "manual" },
//         { "option_set.products": 1, name: 1 }
//       );
//       let allid = [];
//       let all = data.map((element) => {
//         element.option_set.products.product_added.map((ele) => {
//           allid.push(ele.product_id);
//         });
//       });
//       const common = [];
//       allid.some((item) => {
//         if (id.includes(item)) common.push(item);
//       });
//       if (common.length > 0) {
//         console.log("Fff", common);
//         let commonname;
//         data.map((element) => {
//           element.option_set.products.product_added.map((ele) => {
//             console.log("ady", ele.product_id);
//             if (common[0] == ele.product_id) {
//               commonname = element.name;
//             }
//           });
//         });
//         res.send({
//           status: false,
//           data: `Same product is available in other optionset (${commonname})`,
//         });
//       } else {
//         let filter = { shop: shop, _id: key };
//         let update = { status: true };
//         const data = await Schema.findOneAndUpdate(filter, update);
//         res.send({
//           status: true,
//           data: "Optionset status updated",
//         });
//       }
//     }
//   } else if (currentstatus == "false") {
//     let filter = { shop: shop, _id: key };
//     let update = { status: false };
//     const data = await Schema.findOneAndUpdate(filter, update);
//     res.send({
//       status: true,
//       data: "Optionset status updated",
//     });
//   }
// }

export async function setformstatus(req, res) {
  try {
    const { type, key, productids: id, shop, currentstatus } = req.body;

    const filter = { shop, _id: key };
    let update = {};

    if (currentstatus === "true") {
      if (type === "none") {
        return res.send({ status: false, data: "First add products to optionset" });
      }

      const query = { shop, status: "true", "option_set.products.type": type };
      const projection = { "option_set.products": 1, name: 1 };

      if (type === "all") {
        const data1 = await Schema.findOne(query, projection);
        if (data1) {
          return res.send({
            status: false,
            data: `Selected Product is already active in "${data1.name}" Optionset`,
          });
        }
      } else {
        const data = await Schema.find(query, projection);
        const allid = data.flatMap(element => element.option_set.products.product_added.map(ele => ele.product_id));
        const common = allid.filter(item => id.includes(item));

        if (common.length > 0) {
          const commonname = data.find(element => common[0] === element.option_set.products.product_added.find(ele => ele.product_id === common[0]).product_id).name;
          return res.send({
            status: false,
            data: `Same product is available in other optionset (${commonname})`,
          });
        }
      }

      update = { status: true };
    } else if (currentstatus === "false") {
      update = { status: false };
    }

    const data = await Schema.findOneAndUpdate(filter, update);
    res.send({ status: true, data: "Optionset status updated" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "An error occurred" });
  }
}


export async function makedir(req, res) {
  let dirname = req.body.shop;
  const dir = `src/assets/uploads/${dirname}`;
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
    res.send({ status: true });
  } else if (fs.existsSync(dir)) {
    res.send({ status: true });
  }
}

export async function getThemeId(req, res) {
  try {
    const session = res.locals.shopify.session;
    const client = new shopify.api.clients.Rest({session});
    const {
      body: { themes },
    } = await client.get({ path: "themes", type: DataType.JSON });
    const { id } = themes.find((el) => el.role === "main");
    res.status(200).json({ id });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error getting theme ID");
  }
}


export const themePlan = async (req, res) => {
  try{
    const session = res.locals.shopify.session;
    const hasActivePlan = await shopify.api.rest.Shop.all({
       session
     })
     const data = {
        myshopify_domain : hasActivePlan.data[0].myshopify_domain,
        shop_owner : hasActivePlan.data[0].shop_owner,
        plan_name : hasActivePlan.data[0].plan_name,
        email : hasActivePlan.data[0].email
     }
     if(hasActivePlan) {
        res.status(200).send(data)
     }
  } catch(err) {
     res.status(401).send("Unauthorized")
  }
}

/******************************************************************************* */

export const  getWebhooks = async(req, res) => {
   try{
    const fetchData = await credentials.find({}, {_id : 1, shop : 1, accessToken : 1, webhook_status : 1});
    if(fetchData) {
      const data = [];
      fetchData.forEach((element)=> {
          data.push({
            _id : element._id,
            shop : element.shop,
            accessToken : element.accessToken,
            webhook_status : element.webhook_status == undefined ? false : element.webhook_status
          })
      })
      res.status(200).send({msg : "Data fetched Successfully", data :  data})
    }
   } catch(err) {
      res.status(401).send({msg : "Unauthorized Access", data : []})
   }
}


export const  fetchWebhooks = async(req, res) => {
  try{
  const { shop, token } = req.body;
  const fetchWebhooks = await shopify.api.rest.Webhook.all({
    session: {
      shop,
      accessToken: token
    }
  });
 
   if(fetchWebhooks) {
     res.status(200).send(fetchWebhooks)
   }

  } catch(err) {
     res.status(401).send({msg : "Unauthorized Access", data : []})
  }
}

export const updateWebhooks = async (req, res) => {
  try {
    const { shop, token } = req.body;
    const webhookTopics = ["products/update", "products/delete", "app/uninstalled", "themes/publish", "orders/create"];
    
    const existingWebhooks = await shopify.api.rest.Webhook.all({ session: { shop, accessToken: token } });
    const existingTopics = existingWebhooks.data.map(data => data.topic);
    
    const filteredTopics = webhookTopics.filter(topic => !existingTopics.includes(topic));
    
    const updatePromises = existingWebhooks.data.map(data => {
      const updateWebhook = new shopify.api.rest.Webhook({ session: { shop, accessToken: token } });
      updateWebhook.id = data.id;
      updateWebhook.address = `${process.env.HOST}/api/webhooks`;
      return updateWebhook.save({ update: true });
    });
    
    const createPromises = filteredTopics.map(topic => {
      const webhook = new shopify.api.rest.Webhook({ session: { shop, accessToken: token } });
      webhook.address = `${process.env.HOST}/api/webhooks`;
      webhook.topic = topic;
      webhook.format = "json";
      return webhook.save({ update: true });
    });
    
    const updateStatus = await credentials.findOneAndUpdate(
      { shop },
      { $set: { webhook_status: true } },
      { upsert: true, new: true }
    );

    const fetchData = await credentials.find({}, { _id: 1, shop: 1, accessToken: 1, webhook_status: 1 });

    if (updateStatus) {
      const webhooks = await Promise.all([...updatePromises, ...createPromises]);
      res.status(200).send({ msg: "Webhooks Updated Successfully!", data: updateStatus, fetchData });
    }
  } catch (err) {
    console.log(err);
    res.status(401).send({ msg: "Unauthorized Access" });
  }
};
