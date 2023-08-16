import React, {useState, useEffect } from "react";
import {
  Card,
  Text,
  VerticalStack,
  List,
  Box,
  HorizontalStack,
  Button
} from "@shopify/polaris";
import { useAPI } from "../store/Getshop";

import dashPic from "../assets/images/embed.png";
import { DynamicApi } from "../components/common/DynamicAxios";
import { getBridge } from "../store/GetAppBridge";

export default function dashboard() {
  const { getShop } = useAPI();
  const { app } = getBridge();

  const [themeId, setThemeId] = useState("");

  const [appActive, setAppActive] = useState(false);
  const contentStatus = appActive ? "Deactivate" : "Click here";
  const textStatus = appActive ? "activated" : "deactivated";
  const shopOriginW = new URL(location).searchParams.get("shop");


  async function getThemeId() {
    let response = await DynamicApi(
      "/api/shopify/theme-id",
      { shop: getShop },
      "POST",
      app
    );
    setThemeId(response?.data?.id);
  }

  useEffect(() => {
    getThemeId();
  }, []);

  const handleEmbedBtn = () => {
    window.open(
      `https://${getShop}/admin/themes/${themeId}/editor?context=apps&activateAppId`
    );
  };

  return (
    <div className="full_width">
      <div className="sd-app-activator">
        <Card>
          <HorizontalStack gap={{xs: '2', sm: '4'}} align="space-between">
            <Text > You can enable this app in
              your Store. </Text>
            <Button onClick={handleEmbedBtn} primary>{contentStatus}</Button>
          </HorizontalStack>
        </Card>
      </div>
      <div className="sd-dashboard-card">
        <Card title="Steps to enable/disable the app:" sectioned >
          <div className="sd-card-inner-cont">
            <div className="sd-card-list-cont">
              <List type="number">
                <List.Item>
                  From your Shopify admin, go to{" "}
                  <Text variation="strong">
                    Online Store &#62; Themes.
                  </Text>{" "}
                </List.Item>
                <List.Item>
                  Find the theme that you want to edit, and then click{" "}
                  <Text variation="strong"> Customize.</Text>
                </List.Item>
                <List.Item>
                  Click the{" "}
                  <Text variation="strong">App embeds tab.</Text>
                </List.Item>

                <List.Item>
                  Click the Select the app embed that you want to activate or
                  click the Search bar and enter a{" "}
                  <Text variation="strong">search </Text> term to
                  search through your installed apps.
                </List.Item>
                <List.Item>
                  Click the Beside the app embed that you want to activate,{" "}
                  <Text variation="strong">
                    {" "}
                    click the toggle to activate it
                  </Text>
                </List.Item>
                <List.Item>
                  And{" "}
                  <Text variation="strong">
                    {" "}
                    click the Save button{" "}
                  </Text>{" "}
                  to save it.
                </List.Item>
              </List>
            </div>
            <div className="sd-card-image-cont">
              <img src={dashPic} alt="step5" />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}


