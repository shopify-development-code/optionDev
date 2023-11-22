import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { credentials, Schema, custom } from "../../Schema/schema.js";
import axios from "axios";
import multer from "multer";
import fs from "fs";

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    const shop = req.body.shop;
    cb(
      null,
      `server/assets/uploads/${shop}/swatch-${
        file.fieldname
      }-${Date.now()}.${ext}`
    );
  },
});

/** File upload multer functions */
export const upload = multer({
  storage: multerStorage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
}).single("Img");

//Frontend js Call : Delete the draft product from frontend on Js Call
export async function deleteDraftProduct(req, res) {
  let shop = req.body.host;
  let productId = req.body.productId;
  let documentQuery = { shop: shop };
  let credentialsData = await credentials.findOne(documentQuery);
  let accessToken = credentialsData.accessToken;
  let deleteProductUrl = `https://${shop}/admin/api/${process.env.SHOPIFY_API_VERSION}/products/${productId}.json?access_token=${accessToken}`;
  let deleteProductAxios = await axios
    .delete(deleteProductUrl)
    .then((resp) => {
      let res_Data = resp.data;
      res.send({ status: true, data: res_Data });
    })
    .catch((err) => {
      let errorData = { data: err };
      res.send({ status: false, data: errorData });
    });
}

export async function updateDraftProduct(req, res) {
  let main_body = req.body;
  let shop = main_body.host;
  let selection_option_items = main_body.selection_option_items;
  let documentQuery = { shop: shop };
  let credentialsData = await credentials.findOne(documentQuery);
  let accessToken = credentialsData.accessToken;
  let today = new Date();
  let date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  let time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  let dateTime = date + " " + time;
  let newProductId = [];
  const check = async () => {
    for (let i = 0; i < selection_option_items.length; i++) {
      let product_id = selection_option_items[i].product_id;
      const dataProduct = {
        product: {
          id: product_id,
          status: "active",
          published_at: dateTime,
        },
      };

      let updateProduct = `https://${shop}/admin/api/${process.env.SHOPIFY_API_VERSION}/products/${product_id}.json?access_token=${accessToken}`;
      var response = await axios
        .put(updateProduct, dataProduct)
        .then((result) => {
          let result_status = {
            status: true,
            id: result.data.product.id,
            status: result.data.product.status,
          };
          newProductId.push(product_id);
          return result_status;
        })
        .catch((e) => {
          let result_status = {
            // status: false,
            // id: e.data.product.id,
            status: e.response.status,
            activated: newProductId,
          };
          // res.send({ status: false, data: "Something Went Wrong" });
          return result_status;
        });
      // return response
    }
    return response;
  };
  let mainres = {};
  check().then((data) => {
    if (data.status == "active") {
      // mainres = { status: true, data: "Active Success" };
      res.send({ status: true, data: "success" });
    } else {
      let arr = res.activated;
      arr.map(async (el) => {
        const dataProduct = {
          product: {
            id: el,
            status: "draft",
            published_at: dateTime,
          },
        };
        let updateProduct = `https://${shop}/admin/api/${process.env.SHOPIFY_API_VERSION}/products/${el}.json?access_token=${accessToken}`;
        var response = await axios.put(updateProduct, dataProduct);
      });
      //  mainres = { status: true, data: "some error occured" };
      res.send({ status: false, data: "some error occured" });
    }
  });
}

//Frontend js Call : Create the Draft Product on option set create
export async function createDraftProduct(req, res) {
  let variant_id = "";
  let product_id = "";
  let host = req.body.host;
  let documentQuery = { shop: host };
  let credentialsData = await credentials.findOne(documentQuery);
  let accessToken = credentialsData.accessToken;
  let shop = req.body.host;
  const dataProduct = {
    product: {
      title: req.body.productTitle,
      vendor: req.body.productVendor,
      handle: `genieoptions-${req.body.productTitle}`,
      tags: ["genie_product"],
      variants: [
        {
          price: req.body.total_price,
          inventory_quantity: req.body.quantity,
          inventory_management: "shopify",
          inventory_policy: "deny",
        },
      ],
    },
  };

  let productCreated = false;
  let createProduct = `https://${shop}/admin/api/${process.env.SHOPIFY_API_VERSION}/products.json?access_token=${accessToken}`;
  let response = await axios
    .post(createProduct, dataProduct)
    .then((result) => {
      productCreated = true;
      return result;
    })
    .catch((e) => {
      return e;
    });
  if (response.status == 201) {
    variant_id = response.data.product.variants[0].id;
    product_id = response.data.product.id;
  }
  if (productCreated == false) {
    res.send({ error: productCreated, data: "💥Not created" });
  } else {
    const filter = { shop: shop, pid: product_id };
    const update = {
      shop: shop,
      pid: product_id,
      product_status: "draft",
    };
    await custom.findOneAndUpdate(filter, update, {
      new: true,
      upsert: true, // Make this update into an upsert
    });
    res.send({ sucess: productCreated, data: variant_id });
  }
}

export async function getAllOptionSet123(req, res) {
  let shop = req.body.shop;
  // console.log(req.body)
  let settings = await credentials.findOne({ shop: shop });
  let schema_data = await Schema.find({
    shop: shop,
    status: true,
    // "option_set.products.type": "manual",
  });
  if (schema_data != null) {
    // console.log(schema_data);
    res.send({
      // status: true,
      response: schema_data,
      setttings: settings,
      // mainTheme: settings.theme_chosen,
      // theme: settings.theme_chosen,
      // installation: settings.first_time,
      // id: settings._id,
    });
  } else {
    res.send({ status: false, response: "Error Fetching data" });
  }
}

export async function handleFileUpload(req, res) {
  upload(req, res, (err) => {
    if (err) {
      return res.send({
        status: false,
        error: "invalid_file or filesize lmit exceeds",
      });
    } else if (req.file) {
    }
    res.send({ status: true, url: req.file.filename });
  });
  // console.log(req.body,"haha")
  // if (req.file != undefined) {
  //   res.send({ url: req.file.filename });
  // }
}

export async function deleteimg(req, res) {
  // console.log(req.body)
  if (req.body.name.length != 0) {
    fs.unlinkSync(req.body.name);
    // console.log("successfully deleted");
    res.send({ status: true, msg: "Successfully! Image has been Deleted" });
  } else res.send({ status: false, msg: "no image" });
}

export async function activatedproducts(req, res) {
  let ids = req.body.selection_option_items;
  const savetodb = async () => {
    for (let i = 0; i < ids.length; i++) {
      // let activated = new custom({
      //   id: ids[i].id,
      //   shop: req.body.host,
      // });
      // let go = await activated.save();
      const filter = { shop: req.body.host, pid: ids[i].product_id };
      const update = {
        shop: req.body.host,
        pid: ids[i].product_id,
        product_status: "active",
      };
      let doc = await custom.findOneAndUpdate(filter, update, {
        new: true,
        upsert: true, // Make this update into an upsert
      });
    }
  };
  savetodb().then((data) => {
    res.send({ status: "true" });
  });
}

export async function getexten(req, res) {
  let shop = req.body.shop;
  console.log("getexten function");
  console.log(shop);
  await credentials
    .find(
      { shop: shop },
      {
        main_settings: 1,
      }
    )
    .then((result) => {
      res.send({ data: result[0].main_settings.settings.allowed_extensions });
    })
    .catch((err) => {
      console.log("print error in getexten records.");
      console.log(err);
    });
}

export async function makeDirectory(req, res) {
  let dirname = req.body.shop;
  const dir = `server/assets/uploads/${dirname}`;
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
    res.send({ status: true });
  } else if (fs.existsSync(dir)) {
    res.send({ status: true });
  }
}
