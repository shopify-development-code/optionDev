import { credentials } from "../../Schema/schema.js";
import { Schema } from "../../Schema/schema.js";
import {S3Client, PutObjectCommand, DeleteObjectCommand} from '@aws-sdk/client-s3'
import dotenv from 'dotenv';
import axios from 'axios';
import { LATEST_API_VERSION } from "@shopify/shopify-api";
dotenv.config();

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  },
});

export const getOptions = async (req, res) => {
  try {
    console.log('option api****');
    const {shop, productId} = req.body;
    const pid = `gid://shopify/Product/${productId}`;
    const response = await Schema.aggregate(
      [
        {
          $match: {
            shop : shop,
            status: true,
            $expr: {
              $cond: {
                if: { $eq: ["$option_set.products.type", "manual"] },
                then: { $eq: ["$option_set.products.product_added.id", pid] },
                else: true,
              },
            },
          },
        },
        {
          $lookup: {
            from: "credentials",
            localField: "shop",
            foreignField: "shop",
            as: "settings",
          },
        },
        {
          $project: {
            _id: 1,
            option_set: 1,
            mainLayout: 1,
            fileName: 1,
            layout: 1,
            counter: 1,
            settings: {
              $arrayElemAt: ["$settings.main_settings.settings", 0],
            },
            paymentStatus: {
              $arrayElemAt: ["$settings.payment_status", 0],
            },
            activeStatus: {
              $arrayElemAt: ["$settings.active_status", 0],
            },
          },
        },
      ],
      { maxTimeMS: 60000, allowDiskUse: true }
    );

    res.status(200).send({data : response, status : 1});
  } catch (err) {
    console.log(err.message);
    console.log('option api****');
    res.status(502).send({status : 0});
  }
};


export const fileUpload = async (req, res) => {
  try{
    const {size} = req.file;
    if(size <=  2097152) {
      const shop = "nahidp-store.myshopify.com";
      const fileDataBuffer = Buffer.from(req.file.buffer, 'binary');
      let  uniqueName = new Date().toISOString().replace(/[-:.]/g,"") + req.file.originalname;
      const key = `${shop.replace(".myshopify.com","")}/${uniqueName}`;
      const params = {
        Bucket: process.env.AWS_BUCKET, 
        Key: key, 
        Body: fileDataBuffer, 
        contentType : req.file.mimetype,
        ContentDisposition: 'inline',
      };
        const command = new PutObjectCommand(params);
        const result = await s3Client.send(command);
        const imgUrl = `https://${process.env.AWS_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
        if(imgUrl) {
          return res.status(200).send({ status: 1,  url: imgUrl, key: key});  
        } else {
          return res.status(401).send({ status: 0 });
        }
    } else {
       return res.status(413).send({ status: 0,  msg : "Image size must be less than 2MB"}); 
    }

    } catch(err) {
      res.status(502).send({status:502, message: err})
    }
}


export const deleteFile = async(req, res) => {
   try {
     console.log(req.body);
      const {url} = req.body;
      
      const params = {
        Bucket: process.env.AWS_BUCKET,
        Key : url
      };
      
      const deleteCommand = new DeleteObjectCommand(params);
      await s3Client.send(deleteCommand);
      
      return res.status(200).send({status : 1}) 
   } catch (err) {
     console.log(err);
     res.status(502).send({status : 0})
   }
}

export async function createDraftProduct(req, res) {
    try {
      console.log(req.body, "create Image");
      const {shop, title, price, vendor} = req.body;
       let credentialsData = await credentials.findOne({shop}, {accessToken : 1 });
       const dataProduct = {
        product: {
          title: title,
          vendor: vendor,
          handle: `genieoptions-${title}`,
          tags: ["genie_product"],
          variants: [
            {
              price: price,
              // inventory_quantity: 1,
              // inventory_management: "shopify",
              // inventory_policy: "deny",
            },
          ],
        },
      };
      let createProductURL = `https://${shop}/admin/api/${LATEST_API_VERSION}/products.json?access_token=${credentialsData.accessToken}`;
      let createProduct = await axios
      .post(createProductURL, dataProduct)
      .then((result) => {
        return result;
      })
      .catch((e) => {
        return e;
      });
      if(createProduct.status === 201) {
        console.log(createProduct.data.product, "product data");
        let variant_id = createProduct.data.product.variants[0].id;
        let product_id = createProduct.data.product.id;
        
        // const filter = { shop: shop, pid: product_id };
        // const update = {
        //   shop: shop,
        //   pid: product_id,
        //   product_status: "draft",
        // };
        // await custom.findOneAndUpdate(filter, update, {
        //   new: true,
        //   upsert: true, // Make this update into an upsert
        // });

        res.status(200).send({status : 1, data : variant_id})
      } else {
        res.send({ error: createProduct, data: "💥Not created" });
      }
    } catch (err) {
      console.log(err)
       res.status(502).send({status : 0, msg : 'Something went wrong!!!'})
    }
}

export async function deleteDraftProduct(req, res) {
  try {
     console.log(req.body, "delete Image");
     res.status(200).send({status : 1, msg: "Success"})
  } catch (err) {
     res.send(502).send({status : 0, msg : 'Something went wrong!!!'})
  }
}

export async function updateDraftProduct(req, res) {
  try {
     console.log(req.body, "update draft image");
     res.status(200).send({status : 1, msg: "Success"})
  } catch (err) {
     res.send(502).send({status : 0, msg : 'Something went wrong!!!'})
  }
}

