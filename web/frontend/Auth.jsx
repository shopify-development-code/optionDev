import Routes from "./Routes";
// import UpgradeYourPlan from "./components/UpgradeYourPlan";

const Auth = () => {
  // const [themePlan, setThemePlan] = useState({
  //   myshopify_domain : "",
  //   shop_owner :"",
  //   plan_name : "",
  //   email : ""
  // });

  const pages = import.meta.globEager("./pages/**/!(*.test.[jt]sx)*.([jt]sx)");


    return(
        // themePlan.email == "shikhapant.shinedezign@gmail.com" || themePlan.email == "shiv.whmcsglobal@gmail.com" || themePlan.email == "shiv.whmcsglobalservices@gmail.com"? 
        //  <Routes pages = {pages} /> : themePlan.plan_name == "partner_test" || themePlan.plan_name == "trial" ? <UpgradeYourPlan /> :  <Routes pages = {pages} />
        <Routes pages = {pages} />
    )
}

export default Auth;