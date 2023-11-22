import express from "express";
import { createDraftProduct, deleteDraftProduct, deleteFile, fileUpload, getOptions, updateDraftProduct } from "../../controllers/storefront/controller.js";
import multer from "multer";
const storage = multer.memoryStorage();
const upload = multer({storage});

const storeRoutes = express.Router();


storeRoutes.post("/store/getOptions", getOptions);
storeRoutes.post("/store/fileUpload", upload.single('file'), fileUpload);
storeRoutes.post("/store/fileDelete", deleteFile);
storeRoutes.post("/store/create-product", createDraftProduct);
storeRoutes.post("/store/update-product", updateDraftProduct);
storeRoutes.post("/store/delete-product", deleteDraftProduct);
// storeRoutes.post("/")


export default storeRoutes;