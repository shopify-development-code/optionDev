import React, { useState, useEffect } from "react";
import { AppProvider, TopBar, Frame } from "@shopify/polaris";
import NavigationHeader from "./navigation";
import { Outlet, useLocation } from "react-router-dom";
import pic from "../../assets/images/logo.png";
import { useAPI } from "../../store/Getshop";
import { DynamicApi } from "../common/DynamicAxios";
import { getBridge } from "../../store/GetAppBridge";

function MainLayout() {
  const { getShop } = useAPI();
  const { app } = getBridge();
  const router = useLocation();
  const [themeData, setThemeData] = useState({});

  useEffect(() => {
    async function fetchDataFromGetApi() {
      let optionset_params = { shop: getShop };
      let response = await DynamicApi(
        "/api/getCredentials",
        optionset_params,
        "POST",
        app
      );
      setThemeData(response.data);
    }
    fetchDataFromGetApi();
  }, []);

  const [mobileNavigationActive, setMobileNavigationActive] = useState(false);
  const toggleMobileNavigationActive = () => {
    setMobileNavigationActive(!mobileNavigationActive);
  };

  const logo = {
    width: 200,
    topBarSource: `${pic}`,
    url: "",
    accessibilityLabel: "Genie Product Options",
  };


  const topBarMarkup = (
    <div className="sd-topbar">
      <TopBar
        showNavigationToggle
        onNavigationToggle={toggleMobileNavigationActive}
      />
    </div>
  );

  const navigationMarkup = (
    <NavigationHeader toggle={toggleMobileNavigationActive} data={themeData} />
  );

  const actualPageMarkup = (
    <div className="mainBody">
      <Outlet />
    </div>
  );

  return (
    <AppProvider
      theme={logo}
      i18n={{
        Polaris: {
          TopBar: {
            toggleMenuLabel: "Toggle menu",
          },
          Frame: {
            navigationLabel: "Navigation",
            Navigation: {
              closeMobileNavigationLabel: "Close navigation",
            },
          },
        },
      }}
    >
      <div className="sd-component-block">
        <Frame
          logo={logo}
          topBar={
            router.pathname === "/option-sets/createoptions" ? "" : topBarMarkup
          }
          navigation={
            router.pathname === "/option-sets/createoptions"
              ? ""
              : navigationMarkup
          }
          showMobileNavigation={mobileNavigationActive}
          onNavigationDismiss={toggleMobileNavigationActive}
        >
          {actualPageMarkup}
        </Frame>
      </div>
    </AppProvider>
  );
}

export default MainLayout;
