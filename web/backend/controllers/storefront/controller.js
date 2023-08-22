import { credentials } from "../../Schema/schema.js";
import { Schema } from "../../Schema/schema.js";

export const getOptions = async (req, res) => {
  try {
    const {shop, productId} = req.body;

    console.log(req.body)
    const pid = `gid://shopify/Product/${productId}`;

    const response = await Schema.aggregate(
      [
        {
          $match: {
            shop : "nahidp-store.myshopify.com",
            status: true,
            // "option_set.products.product_added.id": pid,
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
    res.status(502).send({status : 0});
  }
};


export const fileUpload = async (req, res) => {
    try {
        //code to upload file to s3 bucket
        console.log(req.body);
        res.status(200).send("Success")
    } catch (err) {
        res.status(502).send("Something went wrong!!!")
    }
}



/*
export const uploadImage = async(req, res, next) => {
    console.log("enter in UPLOAD image")
  try{
  console.log(req.file)
  console.log(req.body.customFolder)
  // const {customFolder} = req.body
  const shop = res.locals.shopify.session.shop
  // console.log(req.files)
  console.log(process.env.AWS_BUCKET)
// console.log("customFolder ==>", customFolder)
  const fileDataBuffer = Buffer.from(req.file.buffer, 'binary');

  const key = `${shop.replace(".myshopify.com","-")}/${req.file.originalname}`
  // const key = Date.now().toString() + '-' + req.file.originalname
console.log("IMAGE NAME ==>", key)
      const params = {
        Bucket: process.env.AWS_BUCKET, // Replace with your S3 bucket name
        Key: key, // Replace with the destination path in S3
        Body: fileDataBuffer, // Use the Buffer containing the file data
        // endpoint: 's3.amazonaws.com',
        contentType : req.file.mimetype,
        ContentDisposition: 'inline',
      };

    const command = new PutObjectCommand(params);
    const result = await s3Client.send(command);
    // console.log("result ==>", result)
    const imgUrl = `https://${process.env.AWS_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
    console.log(imgUrl)
      res.send({status:200, data:"result.Location", url : imgUrl});
      // res.send({status:200, data:"result.Location", url : key});
  } catch(err){
    console.log(err)
    res.send({status:400, message: err})
  }
}


*/
