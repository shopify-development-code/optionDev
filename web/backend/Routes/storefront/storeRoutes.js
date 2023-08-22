import express from "express";
import { fileUpload, getOptions } from "../../controllers/storefront/controller.js";

const storeRoutes = express.Router();


storeRoutes.post("/store/getOptions", getOptions);
storeRoutes.post("/store/fileUpload", fileUpload);
// storeRoutes.post("/")
// storeRoutes.post("/")
// storeRoutes.post("/")


export default storeRoutes;