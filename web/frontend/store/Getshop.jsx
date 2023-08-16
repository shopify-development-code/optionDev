import React, { useContext, useState, createContext } from "react";
import { useAppBridge } from "@shopify/app-bridge-react";

const APIContext = createContext();

function ContextProvider({ children }) {
  const [getShop, setGetShop] = useState(
    new URL(location).searchParams.get("shop")
  );
  const app = useAppBridge();
  return (
    <APIContext.Provider value={{ getShop, app }}>
      {children}
    </APIContext.Provider>
  );
}
export default ContextProvider;

export function useAPI() {
  const context = useContext(APIContext);
  if (context === undefined) {
    throw new Error("Context must be used within a Provider");
  }
  return context;
}
