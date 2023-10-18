import { mongoose } from "mongoose";
/** Schema DB to save Db information */

const credentialSchema = new mongoose.Schema(
  {
    accessToken: String,
    shop: String,
    main_settings: Object,
    theme_type: String,
    theme_chosen: Number,
    active_status: Number,
    payment_status: Number,
    first_time: Boolean,
    webhook_status : Boolean
  },
  {
    timestamps: true,
  }
);

credentialSchema.index({shop : 1});

export const credentials = mongoose.model("Credentials", credentialSchema);

/** SAVE THE OPTION SET */
const optionsetSchema = new mongoose.Schema(
  {
    setID: String,
    shop: String,
    name: String,
    option_set: Object,
    mainLayout: Boolean,
    fileName: Number,
    layout: Object,
    counter: Object,
    status: Boolean,
    // imageURL: String,
  },
  {
    timestamps: true,
  }
);

optionsetSchema.index({shop : 1});
optionsetSchema.index({shop : 1, name: 1, option_set: 1, status: 1});

export const Schema = mongoose.model("optionset", optionsetSchema);

const customproducts = new mongoose.Schema(
  {
    pid: Number,
    shop: String,
    product_status: {
      type: String,
      enum: ["active", "draft"],
      default: "draft",
    },
  },
  {
    timestamps: true,
  }
);

customproducts.index({pid :1, shop: 1, product_status: 1})

export const custom = mongoose.model("customproducts", customproducts);


const storeSchema = new mongoose.Schema(
  {
    shop: String ,
    email : String,
    country_name : String,
    shop_owner : String,
    iana_timezone : String
  },

  { timestamps: true }
);

const merchantInfo = mongoose.model("merchantInfo", storeSchema);

export default merchantInfo;