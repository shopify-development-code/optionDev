import express from "express";
import { copyOptionSet, deleteDraftProducts, deleteOptionSet, getAllOptionSet, getCredentials, getFormList, getFormNames, getThemeId, saveOptionSet, saveTheme, searchByName, setformstatus, themeInstallation, themePlan, updateOptionSet, updateSettngs } from "../../controllers/admin/backendController.js";
import { contactEmail } from "../../controllers/admin/mailController.js";
// import { verifyToken } from "../middleware/verifyToken.js";
// import {
//   saveOptionSet,
//   getAllOptionSet,
//   updateOptionSet,
//   deleteOptionSet,
//   copyOptionSet,
//   checkOptionSetOnInstall,
//   getCredentials,
//   handleServerScript,
//   updateSettngs,
//   deleteDraftProducts,
//   getDefaultInstallationData,
//   completeInstallation,
//   checkChosenTheme,
//   saveTheme,
//   themeInstallation,
//   getFormList,
//   getFormNames,
//   searchByName,
//   setformstatus,
//   getThemeId,
// } from "../controller/backendController.js";

const adminRoutes = express.Router();

adminRoutes.post("/saveOptionSet", saveOptionSet);
adminRoutes.post("/getAllOptionSet", getAllOptionSet);
adminRoutes.post("/updateOptionSetByID", updateOptionSet);
adminRoutes.post("/deleteOptionSetByID", deleteOptionSet);
adminRoutes.post("/copyOptionSet", copyOptionSet);

// adminRoutes.post(
//   "/api/getinstallOptionset",
//   verifyToken,
//   checkOptionSetOnInstall
// );

adminRoutes.post("/getCredentials", getCredentials);

// adminRoutes.post("/api/getScriptFile", verifyToken, handleServerScript);

adminRoutes.post("/updateSettngs", updateSettngs);

adminRoutes.post("/deleteDraftProducts", deleteDraftProducts);

// adminRoutes.post(
//   "/api/getDefaultInstallationData",
//   verifyToken,
//   getDefaultInstallationData
// );

// adminRoutes.post("/api/v1/doneinstalltion", verifyToken, completeInstallation);

// adminRoutes.post("/api/checkThemeChosen", verifyToken, checkChosenTheme);

adminRoutes.post("saveTheme", saveTheme);

adminRoutes.post("themeInstallation", themeInstallation);

adminRoutes.post("/getFormNames", getFormNames);

adminRoutes.post("/searchByName", searchByName);

adminRoutes.post("/setformstatus", setformstatus);

// // adminRoutes.post("/api/makedir", verifyToken, makedir);

adminRoutes.post("/shopify/theme-id", getThemeId);
adminRoutes.post("/shopify/theme-plan", themePlan);

adminRoutes.post("/getformlist", getFormList);
adminRoutes.post("/contact", contactEmail);


export default adminRoutes;
