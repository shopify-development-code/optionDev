import React, { useEffect, useState, useCallback } from "react";
import {
  Layout,
  Card,
  Select,
  Loading,
  HorizontalStack,
  SkeletonPage,
  Text,
  SkeletonBodyText,
  SkeletonDisplayText,
  Button,
  Toast,
  Frame,
} from "@shopify/polaris";

import { DynamicApi } from "../components/common/DynamicAxios";
import { getBridge } from "../store/GetAppBridge";
export default function ThemesInt() {
  const { app } = getBridge();

  const [themes, setThemes] = useState([]);
  const [selected, setSelected] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isThemeEvent, setIsThemeEvent] = useState(false);
  const [toastActive, setToastActive] = useState(false);
  const [errorMessage, setErrorMessage] = useState("Theme Updated");
  const [shop, setShop] = useState("");
  const handleSelectChange = useCallback((value) => setSelected(value), []);

  // useEffect(() => {

  //   async function fetchDataFromGetApi() {
  //       let shop_url = "/api/getShop";
  //     let shop_response = await axios.get(shop_url);
  //     const shopName = shop_response.data;
  //     setShop(shopName);
  //     let url = "/api/getThemeData";
  //     let response = await axios.get(url, {params:{ shop: shopName }});
  //     console.log("response");
  //     console.log(response);
  //     if (true == response.data.status) {
  //       let theme = [...themes];
  //       response.data.data.map((element) => {
  //         theme.push(element);
  //       });
  //       setThemes(theme);
  //       setSelected(response.data.mainThemeId);
  //     }
  //     setIsLoading(false);
  //   }
  //   fetchDataFromGetApi();
  // }, []);

  async function saveThemeApi(bool) {
    let url = "/api/saveTheme";
    setIsThemeEvent(true);
    let params = {
      shop: shop,
      selected: selected,
      install: bool,
    };

    let response = await DynamicApi(url, params, "POST", app);

    if (response != "" && response != undefined) {
      if (bool) {
        await installTheme();
      } else {
        setErrorMessage(response.data.message);
        setToastActive(true);
      }
      setIsThemeEvent(false);
    }
  }

  async function installTheme() {
    let url = "/api/themeInstallation";
    let params = { shop: shop };
    let response = await DynamicApi(url, params, "POST", app);
    if (true == response.data.status) {
      setErrorMessage(response.data.message);
      setToastActive(true);
      return true;
    } else {
      setErrorMessage(response.data.message);
      setToastActive(true);
      return false;
    }
  }

  const actualPageMarkup = (
    <Layout>
      <Layout.Section>
        <Card sectioned>
          <Select
            label="Select Theme"
            options={themes}
            onChange={handleSelectChange}
            value={selected}
          />
          <div style={{ marginTop: "10px" }}>
            <HorizontalStack>
              <Button
                id="uninstallthemebtn"
                onClick={() => {
                  saveThemeApi(false);
                }}
              >
                Remove Theme Code
              </Button>
              <Button
                id="savethemebtn"
                primary={true}
                onClick={() => {
                  saveThemeApi(true);
                }}
              >
                Add Theme Code
              </Button>
            </HorizontalStack>
          </div>
        </Card>
      </Layout.Section>
    </Layout>
  );

  const loadingPageMarkup = (
    <>
      <SkeletonPage>
        <Layout>
          <Layout.Section>
            <Card sectioned>
              <Text>
                <SkeletonDisplayText size="small" />
                <SkeletonBodyText lines={9} />
              </Text>
            </Card>
          </Layout.Section>
        </Layout>
      </SkeletonPage>
      <Loading />
    </>
  );

  const eventMarkUp = isThemeEvent ? <Loading /> : null;

  const pageMarkup = isLoading ? loadingPageMarkup : actualPageMarkup;

  const toggleActive = useCallback(
    () => setToastActive((toastActive) => !toastActive),
    []
  );

  const toastMarkup = toastActive ? (
    <Toast content={errorMessage} onDismiss={toggleActive} />
  ) : null;

  return (
    <div>
      {eventMarkUp}
      {pageMarkup}
      {toastMarkup}
    </div>
  );
}
