import { useState, useEffect } from "react";
import { Card, Banner, Button } from "@shopify/polaris";
import { useAPI } from "../store/Getshop";
import { DynamicApi } from "../components/common/DynamicAxios";
import { getBridge } from "../store/GetAppBridge";

const WidgetPosition = () => {
  const { getShop } = useAPI();
  const { app } = getBridge();
  const [themeId, setThemeId] = useState("");

  const handleRedirectThemeEditor = () => {
    window.open(`https://${getShop}/admin/themes/${themeId}/editor`);
  };

  useEffect(() => {
    getThemeId();
  }, []);

  async function getThemeId() {
    let response = await DynamicApi(
      "/api/shopify/theme-id",
      { shop: getShop },
      "POST",
      app
    );
    console.log("response?.data?.id ==>", response?.data?.id);
    setThemeId(response?.data?.id);
  }

  //   useEffect(() => {
  //     async function fetchDataFromGetApi() {
  //       setIsLoading(true);

  //       let optionset_params = { shop: shop };
  //       let response = await DynamicApi(
  //         "/api/getCredentials",
  //         optionset_params,
  //         "POST",
  //         app
  //       );
  //       console.log(response);
  //       if (response != "" && response != undefined) {
  //         setThemeType(response.data.theme_type);
  //       }
  //     }
  //     fetchDataFromGetApi();
  //     setIsLoading(false);
  //   }, []);

  return (
    <>
      <Card title="Widget Position" sectioned>
        <p>
          Adjust the Genie Product Options app block displayed on product page.
          (App blocks are flexible. Merchants can use the theme editor to add,
          remove, and reorder app blocks at the section level for easy
          customization.)
        </p>
        <Banner
          title="Add the Genie Product Options app block."
          status="success"
        />
        <div className="theme-editor-btn">
          <Button primary onClick={handleRedirectThemeEditor}>
            Go to Theme Editor
          </Button>
        </div>
      </Card>
      <Card title="How to activate and deactivate app blocks." sectioned>
        <div>
          <video width="100%" class="video_ply_now" controls>
            <source
              src="https://cdn.shopify.com/videos/c/o/v/d4b0ef7ad96a43cf8cb11e31235d7f25.mp4"
              type="video/mp4"
            />
          </video>
        </div>
      </Card>
    </>
  );
};

export default WidgetPosition;
