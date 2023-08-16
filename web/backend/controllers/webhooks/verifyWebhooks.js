import crypto from 'node:crypto';
import { credentials, custom } from '../../Schema/schema.js';

export const verifyWebhooks = async(req, res) => {
    try {
        const topic = req.headers['x-shopify-topic'];
        let shop = req.headers["x-shopify-shop-domain"];
        let hmac_header = req.headers["x-shopify-hmac-sha256"];
        const secretKey = process.env.SHOPIFY_API_SECRET;
        console.log(topic, "topic")
        switch (topic) {
            case "products/update":
                try {
                    const calculated_hmac = crypto.createHmac("sha256", secretKey).update(req.body).digest("base64");
                    if(calculated_hmac == hmac_header) {
                      console.log("Webhook verified");
                      let responseWebhook = JSON.parse(req.body);
                      let pid = responseWebhook.id.toString();
                      let productSrc = responseWebhook.image == null
                        ? ""
                        : responseWebhook.image.src;
                  
                      const filter = { shop: shop };
                      const update = {
                        $set: {
                          "appliesTo.products.$[element].title": responseWebhook.title,
                          "appliesTo.products.$[element].url": productSrc,
                        },
                      };
                      const options = { arrayFilters: [{ "element.pid": pid }] };
                      let allPandaSet = await chartModel.updateMany(filter, update, options);
                      console.log(allPandaSet, 'data updated')
                      if(allPandaSet && allPandaSet.modifiedCount > 0) {
                        res.status(200).json({ message: "Updated Successfully!" });
                      } else {
                        res.status(200).json({ message: "No document found!" });
                      }
                    } else {
                      res.status(401).json("Unauthorized access")
                    }
                  } catch(err) {
                    console.log("Error updating database:", err);
                    res.status(500).json("Internal Server Error");
                  }
                break;
            case "products/delete":
                try {
                    console.log("********* Products DELETE WEBHOOK START *******");
                    const calculated_hmac = crypto.createHmac("sha256", secretKey).update(req.body).digest("base64");
                      if(calculated_hmac == hmac_header) {
                        console.log("hmac verified delete Products")
                        let bodyData = JSON.parse(req.body);
                        let pid = bodyData.id.toString();
                        const filter = { shop: shop };
                        const deletedIndex = {
                          $pull: { "appliesTo.products": { pid: pid } },
                        };
                        await chartModel.updateMany(filter, deletedIndex).then(()=> {
                            res.status(200).json({data : "Successfully deleted"})
                        });
                      } else {
                        res.status(401).json("unauthorized access")
                      }
                  } catch (err) {
                    res.status(401).send("Unauthorized access")
                  }
                break;
            case "app/uninstalled":
                try {
                    const calculated_hmac = crypto.createHmac("sha256", secretKey).update(req.body).digest("base64");
                    if(calculated_hmac == hmac_header) {
                      console.log("hmac verified uninstall app")
                      await credentials.deleteOne({ shop: shop });
                      await custom.deleteMany({ shop: shop });
                     res.status(200).json({ message: "Deleted Successfully!" });
                    } else {
                        res.status(401).json("Unauthorized access")
                    }
                  } catch (err) {
                     res.status(401).send("Unauthorized Access")
                  }
                  break;
            case "customers/data_request":
                try {
                    const calculated_hmac = crypto.createHmac("sha256", secretKey).update(req.body).digest("base64");
                    if (calculated_hmac == hmac_header) {
                      console.log("hmac verified customer data request")
                      res.status(201).send("Accepted Customer Data request");
                    } else {
                      res.status(401).send("Unauthorized Access");
                    }
                  } catch(err) {
                     res.status(401).send("Unauthorized Access")
                  }
                break;
            case "customers/redact":
                try {
                    const calculated_hmac = crypto.createHmac("sha256", secretKey).update(req.body).digest("base64");
                    if(calculated_hmac == hmac_header) {
                      console.log("hmac verified customer data deleted")
                        res.status(200).json("Currently, we are not using customer data");
                    } else {
                      res.status(401).send("Unauthorized Access")
                    }
                  } catch (err) {
                    res.status(401).send("Unauthorized Access")
                  }
                break;
            case "shop/redact":
                try {
                    const calculated_hmac = crypto.createHmac("sha256", secretKey).update(req.body).digest("base64");
                    if(calculated_hmac == hmac_header) {
                      console.log("hmac verified shop data delete")
                      const fetchData = await chartModel.countDocuments({ shop: shop });
                      const fetchSettings = await settingModel.countDocuments({
                        shop: shop,
                      });
                      if (fetchData < 1 && fetchSettings < 1) {
                            res.status(200).send("Data deleted Successfully!");
                          } else {
                        const deleteData = await chartModel.deleteMany({ shop });
                        const deleteSettings = await settingModel.deleteOne({
                          shop: shop,
                        });
                        if (!deleteData.acknowledged && !deleteSettings.acknowledged) {
                          res.status(200).json("No data found!");
                        } else {
                          res.status(200).json("All data deleted Successfully!");
                        }
                      }
                    } else {
                      res.status(401).json("Unauthorized Access!");
                    }
                  } catch (error) {
                    res.status(401).json("Unauthorized Access!");
                  }
                break;
            case "collections/update":
               try {
                  console.log("=======================Collection Update Webhooks starts===============================>");
                  const calculated_hmac = crypto.createHmac("sha256", secretKey).update(req.body).digest("base64");
                  if(calculated_hmac == hmac_header) {
                    console.log("hmac verified collection update")
                    let responseWebhook = JSON.parse(req.body);
                    let collectionId = responseWebhook.id.toString();
                    let productSrc = responseWebhook.image == null
                    ? ""
                    : responseWebhook.image.src;
              
                  const filter = { shop: shop };
                  const update = {
                    $set: {
                      "appliesTo.collections.$[element].title": responseWebhook.title,
                      "appliesTo.collections.$[element].url": productSrc,
                    },
                  };
                  const options = { arrayFilters: [{ "element.pid": collectionId }] };
                  let collectionUpdate = await chartModel.updateMany(filter, update, options);
                  console.log(collectionUpdate, 'data updated')
                    if(collectionUpdate.acknowledged) {
                      res.status(200).json({ message: "Collections Updated Successfully!" });
                    } else {
                      res.status(200).json({ message: "No document found!" });
                    }
                  } else {
                    res.status(401).json("Unauthorized Access!");
                  }
               } catch (err) {
                 res.status(502).json("SERVER NOT RESPONDING")
               }
               break;
            case "collections/delete":
                  try {
                    console.log("===================Collection Delete Webhook Starts=====================>")
                    const calculated_hmac = crypto.createHmac("sha256", secretKey).update(req.body).digest("base64");
                    if(calculated_hmac == hmac_header) {
                      console.log("hmac verified collection delete")
                      let bodyData = JSON.parse(req.body);
                      let pid = bodyData.id.toString();
                      const filter = { shop: shop };
                      const deletedIndex = {
                        $pull: { "appliesTo.collections": { pid: pid } },
                      };
                      await chartModel.updateMany(filter, deletedIndex).then(()=> {
                        res.status(200).json({data : "Collections deleted successfully!"})
                      });
                    } else {
                      res.status(401).json("unauthorized access")
                    }
                  } catch (err) {
                    res.status(502).json("SERVER BUSY")
                  }
               break;
            case "themes/publish":
                try {
                   console.log("=============================THEMES PUBLISH WEBHOOK STARTS==============================>");
                   const calculated_hmac = crypto.createHmac("sha256", secretKey).update(req.body).digest("base64");
                   if(calculated_hmac == hmac_header) {
                      const shopData = await shopInfo.findOne({shop});
                      const client = new shopify.api.clients.Rest({session : {
                          shop,
                          accessToken : shopData.accessToken
                      }})
                      const theme = await client.get({ path: "themes", type: "json" });
                      const themeId = theme.body.themes.find((el) => el.role === "main");
                      const getAssetsData = await client.get({ path: `themes/${themeId.id}/assets`, type: DataType.JSON });
                       const findJsonTemplate = getAssetsData.body.assets.find((asset) => { 
                           return asset.key === "templates/product.json"; 
                       }); 
                     let themeType = findJsonTemplate == undefined ? "vintage" : "modern";
                      const updateData = await shopInfo.findOneAndUpdate({shop}, {theme_type : themeType}, {upsert : true, new :  true});
                      console.log(updateData, "updated Theme")
                      if (updateData) {
                        res.status(200).json("Theme publish successfully!")
                      }
                   } else {
                      res.status(401).json("unauthorized access")
                   }
                } catch(err) {
                  res.status(502).json("SERVER BUSY")
                }
            default:
                break;
        }
    } catch (err) {
        res.status(401).send("Unauthorized access");
    }
}