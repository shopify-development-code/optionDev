import React from "react";
import Createoptions from "../../components/createOptions";
import { useParams } from "react-router-dom";
import { useAppBridge } from "@shopify/app-bridge-react";
import { useNavigate } from "@shopify/app-bridge-react";
import { useAPI } from "../../store/Getshop";
// import { Fullscreen } from "@shopify/app-bridge/actions";

function FunctionalCreate() {
  const navigate = useNavigate();
  const app = useAppBridge();
  
  // const fullscreen = Fullscreen.create(app);
  const { getShop } = useAPI();
  
  const redirect = () => {
    // fullscreen.dispatch(Fullscreen.Action.ENTER)
    // navigate("/option-sets");
  };

  const { id } = useParams();

  return (
    <Createoptions
      id={id}
      redirection={redirect}
      shopname={getShop}
      app={app}
    />
  );
}

export default FunctionalCreate;

