import { BrowserRouter } from "react-router-dom";
import ContextProvider from "./store/Getshop";
import {
  AppBridgeProvider,
  QueryProvider,
  PolarisProvider,
} from "./components";
import ContextAppbridge from "./store/GetAppBridge";
import Auth from "./Auth";

export default function App() {
  return (
    <PolarisProvider>
      <BrowserRouter>
        <AppBridgeProvider>
          <QueryProvider>
              <ContextAppbridge>
                   <ContextProvider>
                       <Auth />
                   </ContextProvider>
              </ContextAppbridge>
          </QueryProvider>
        </AppBridgeProvider>
      </BrowserRouter>
    </PolarisProvider>
  );
}