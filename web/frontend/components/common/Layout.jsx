import React, { useCallback, useState, useEffect } from "react";
import { AppProvider, TopBar, Frame } from "@shopify/polaris";
import { ArrowLeftMinor } from "@shopify/polaris-icons";
import NavigationHeader from "./navigation";
import { Outlet, useLocation } from "react-router-dom";
// import pic from "/assets/images/logo.png";
import pic from "../../assets/images/logo.png";
import { useAPI } from "../../store/Getshop";
import { useNavigate } from "@shopify/app-bridge-react";
// import { DynamicApi } from "../common/DynamicAxios";
import { getBridge } from "../../store/GetAppBridge";

function MainLayout() {
  const { getShop } = useAPI();
  const { app } = getBridge();
  const navigate = useNavigate();
  const router = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [themeData, setThemeData] = useState({});

  // useEffect(() => {
  //   async function fetchDataFromGetApi() {
  //     let optionset_params = { shop: getShop };
  //     let response = await DynamicApi(
  //       "/api/getCredentials",
  //       optionset_params,
  //       "POST",
  //       app
  //     );
  //     console.log("res settings ");
  //     setThemeData(response.data);
  //   }
  //   fetchDataFromGetApi();
  // }, []);

  const [userMenuActive, setUserMenuActive] = useState(false);
  const [mobileNavigationActive, setMobileNavigationActive] = useState(false);
  const toggleUserMenuActive = useCallback(
    () => setUserMenuActive((userMenuActive) => !userMenuActive),
    []
  );
  const toggleMobileNavigationActive = () => {
    setMobileNavigationActive(!mobileNavigationActive);
  };

  const userMenuActions = [{ items: [{ content: "Community forums" }] }];

  const logo = {
    width: 200,
    topBarSource: `${pic}`,
    url: "",
    accessibilityLabel: "Advanced Product Option",
  };

  const userMenuMarkup = (
    <TopBar.UserMenu
      actions={[
        {
          items: [{ content: "Back to Shopify", icon: ArrowLeftMinor }],
        },
        {
          items: [{ content: "Community forums" }],
        },
      ]}
      name="Dharma"
      detail="Jaded Pixel"
      initials="D"
    />
  );

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
