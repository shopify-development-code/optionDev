import React from "react";
import Createoptions from "../../components/createOptions";
import { useParams } from "react-router-dom";
import { useAppBridge } from "@shopify/app-bridge-react";
import { useNavigate } from "@shopify/app-bridge-react";
import { useAPI } from "../../store/Getshop";

function FunctionalCreate() {
  const navigate = useNavigate();

  const app = useAppBridge();
  const { getShop } = useAPI();

  const redirect = () => {
    navigate("/option-sets");
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

// this file is made to use useparms hook to get id from url and than id is passed as props to class component createoptions
// as we can not use the useparam hook in class components
