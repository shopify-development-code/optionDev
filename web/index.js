// @ts-check
import { join } from "path";
import { readFileSync } from "fs";
import express from "express";
import serveStatic from "serve-static";
import shopify from "./shopify.js";
import GDPRWebhookHandlers from "./gdpr.js";
import dbMongo from "./backend/connection/conn.js";
import { credentials } from "./backend/Schema/schema.js";
import { DataType } from "@shopify/shopify-api";
import adminRoutes from "./backend/Routes/admin/adminRoutes.js";
import cors from 'cors';
import { verifyWebhooks } from "./backend/controllers/webhooks/verifyWebhooks.js";
import { privayPolicy } from "./backend/controllers/admin/privacyPolicy.js";

dbMongo();

const PORT = parseInt(
  process.env.BACKEND_PORT || process.env.PORT || "3000",
  10
);


console.log(process.env.HOST)

const STATIC_PATH =
  process.env.NODE_ENV === "production"
    ? `${process.cwd()}/web/frontend/dist`
    : `${process.cwd()}/frontend/`;

    
const app = express();

app.post(shopify.config.auth.path, express.text({type: '*/*'}), verifyWebhooks);
app.get("/api/privacy-policy", privayPolicy);

app.use(cors({ origin: "*" }));
app.use(express.json());

// Set up Shopify authentication and webhook handling
app.get(shopify.config.auth.path, shopify.auth.begin());
app.get(
  shopify.config.auth.callbackPath,
  shopify.auth.callback(),
  async (req, res, next) => {
    const { shop } = res.locals.shopify.session;
    const { accessToken, session } = res.locals.shopify.session;
    const mainSettings = {
      settings: {
        general: {
          label_price_seperator: "",
          label_addonprice_format: "(+ {{addon}})",
          hide_pay_button: true,
          widget_position: "before_atc",
          help_text_settings: "help_text",
          enabled: true,
        },
        translations: {
          selection_addon: "Selection will add {{addon}} to the price",
          custom_product_name: "{{product_title}} - Selections",
        },
        error_mssg: {
          required: "This field is required",
        },
        allowed_extensions: ["pdf", "jpeg", "png", "jpg"],
      },
    };

    const existingShop = await credentials.findOne({ shop });

    if (!existingShop) {
      const client = new shopify.api.clients.Rest({ session });
      const theme = await client.get({ path: "themes", type: "json" });
      const themeId = theme.body.themes.find((el) => el.role === "main");
      const getAssetsData = await client.get({ path: `themes/${themeId.id}/assets`, type: DataType.JSON });
      const findJsonTemplate = getAssetsData.body.assets.find((asset) => asset.key === "templates/product.json");

      const themeType = findJsonTemplate ? "modern" : "vintage";

      const shopData = new credentials({
        shop,
        accessToken,
        active_status: 1,
        payment_status: 0,
        main_settings: mainSettings,
        theme_type: themeType,
      });

      await shopData.save();
      console.log("Shop Info successfully saved");
    }
    next();
  },
  shopify.redirectToShopifyOrAppRoot()
);


app.post(
  shopify.config.webhooks.path,
  shopify.processWebhooks({ webhookHandlers: GDPRWebhookHandlers })
);

app.use("/api/", shopify.validateAuthenticatedSession(), adminRoutes);

app.use(shopify.cspHeaders());
app.use(serveStatic(STATIC_PATH, { index: false }));

app.use("/*", shopify.ensureInstalledOnShop(), async (_req, res, _next) => {
  return res
    .status(200)
    .set("Content-Type", "text/html")
    .send(readFileSync(join(STATIC_PATH, "index.html")));
});

app.listen(PORT);
