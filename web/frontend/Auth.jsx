import Routes from "./Routes";
import { useEffect, useState } from "react";
import { useAPI } from "./store/Getshop";
import { DynamicApi } from "./components/common/DynamicAxios";
import { getBridge } from "./store/GetAppBridge";
import UpgradeYourPlan from "./components/UpgradeYourPlan";

const Auth = () => {
  const { getShop } = useAPI();
  const { app } = getBridge();
  const [themePlan, setThemePlan] = useState({
    myshopify_domain : "",
    shop_owner :"",
    plan_name : "",
    email : ""
  });

  const pages = import.meta.globEager("./pages/**/!(*.test.[jt]sx)*.([jt]sx)");

  useEffect(()=> {
    getThemePlan();
 },[])

 const getThemePlan = async() => {
   await DynamicApi(
    "/api/shopify/theme-plan",
    { shop: getShop },
    "POST",
    app
  ).then((res)=> {
        setThemePlan({
            myshopify_domain : res.data.myshopify_domain,
            shop_owner : res.data.shop_owner,
            plan_name : res.data.plan_name,
            email : res.data.email
        });
   }).catch(()=> {
      console.log("Something Went Wrong!!!")
   });
 }

  return(
      // themePlan.email == "shikhapant.shinedezign@gmail.com" || themePlan.email == "shiv.whmcsglobal@gmail.com" || themePlan.email == "shiv.whmcsglobalservices@gmail.com" ? 
      //   <Routes pages = {pages} /> : themePlan.plan_name == "partner_test" || themePlan.plan_name == "trial" ? <UpgradeYourPlan /> :  <Routes pages = {pages} />
      <Routes pages={pages} />
  )
}

export default Auth;