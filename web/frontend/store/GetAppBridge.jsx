import { useAppBridge } from "@shopify/app-bridge-react";
import React, { useContext, createContext } from "react";
const APIContext = createContext();

function ContextAppbridge({ children }) {
  const app = useAppBridge();
  return <APIContext.Provider value={{ app }}>{children}</APIContext.Provider>;
}
export default ContextAppbridge;

export function getBridge() {
  const context = useContext(APIContext);
  if (context === undefined) {
    throw new Error("Context must be used within a Provider");
  }
  return context;
}
