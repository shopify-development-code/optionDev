import { DeliveryMethod } from "@shopify/shopify-api";

export default {
  
  CUSTOMERS_DATA_REQUEST: {
    deliveryMethod: DeliveryMethod.Http,
    callbackUrl: "/api/webhooks",
  },

  CUSTOMERS_REDACT: {
    deliveryMethod: DeliveryMethod.Http,
    callbackUrl: "/api/webhooks",
  },

  SHOP_REDACT: {
    deliveryMethod: DeliveryMethod.Http,
    callbackUrl: "/api/webhooks",
  },

  PRODUCTS_UPDATE : {
    deliveryMethod: DeliveryMethod.Http,
    callbackUrl: "/api/webhooks",
  },

  PRODUCTS_DELETE : {
    deliveryMethod: DeliveryMethod.Http,
    callbackUrl: "/api/webhooks",
  },

  ORDERS_CREATE : {
    deliveryMethod: DeliveryMethod.Http,
    callbackUrl: "/api/webhooks",
  },

  THEMES_PUBLISH: {
    deliveryMethod: DeliveryMethod.Http,
    callbackUrl: "/api/webhooks",
  },

};
