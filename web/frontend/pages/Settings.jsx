import {
  Button,
  Layout,
  TextField,
  Checkbox,
  Card,
  VerticalStack,
  Select,
  FormLayout,
  Toast,
  Loading,
  OptionList,
} from "@shopify/polaris";
import React, { useCallback, useState, useEffect } from "react";
import { Spin } from "antd";
import { useAPI } from "../store/Getshop";
import { DynamicApi } from "../components/common/DynamicAxios";
import { getBridge } from "../store/GetAppBridge";
export default function Setting() {
  const { getShop } = useAPI();
  const { app } = getBridge();

  const [shop, setShop] = useState(getShop);
  const [loading, setloading] = useState(false); // spin loading
  const [mainSettings, setMainSettings] = useState({});

  const [disableButton, setDisableButton] = useState(true);
  const [toastactive, setToastActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // topbar loading

  const [appActive, setAppActive] = useState(false);
  const [primaryButton, setPrimaryButton] = useState(true);
  const [errorMessage, setErrorMessage] = useState("Setting Not Updated");

  const [helpText, sethelpText] = useState(["help_text"]);
  const [widgetPosition, setWidgetPosition] = useState(
    "Before Product Variant"
  );

  const [selected, setSelected] = useState([]);
  const [themeType, setThemeType] = useState("");
  const [themeId, setThemeId] = useState("");
  useEffect(() => {
    // console.log(shop);
    async function fetchDataFromGetApi() {
      // console.log(document.cookie );
      setIsLoading(true);
      // let shop_url = "/api/getShop";
      // let shop_response = await axios.post(shop_url);
      // const shopName = shop_response.data;
      // console.log(shopName);
      // setShop(shopName);
      // let optionset_url = "/api/getCredentials";
      let optionset_params = { shop: shop };
      // let response = await axios.post(optionset_url, optionset_params);
      let response = await DynamicApi(
        "/api/getCredentials",
        optionset_params,
        "POST",
        app
      );
      console.log("res settings ");
      console.log(response);

      // console.log("ffffff", response);
      if (response != "" && response != undefined) {
        // console.log(response.data.settings.settings);
        setMainSettings(response.data.settings.settings);
        setWidgetPosition(
          response.data.settings.settings.general.widget_position
        );
        setThemeType(response.data.theme_type);
        sethelpText(response.data.settings.settings.general.help_text_settings);
        setSelected(response.data.settings.settings.allowed_extensions);
      }
    }
    fetchDataFromGetApi();
    setIsLoading(false);
  }, []);
  // const handleToggle = useCallback(() => {
  //   setIsLoading(true);
  //   let settings = { ...mainSettings };
  //   setAppActive((appActive) => !appActive);
  //   setPrimaryButton((primaryButton) => !primaryButton);
  //   settings.general.enabled = !appActive;
  //   setMainSettings(settings);
  //   handleSave();
  //   setIsLoading(false);
  // }, []);
  // console.log(selected);
  const handleextension = (e) => {
    let items = { ...mainSettings };

    // console.log(e);
    setSelected(e);
    setDisableButton(false);
    items.allowed_extensions = e;
    setMainSettings(items);
  };
  const contentStatus = appActive ? "Deactivate" : "Activate";
  const textStatus = appActive ? "activated" : "deactivated";
  const loadingMarkup = isLoading ? <Loading /> : null;

  const handleChange = (value, id) => {
    let items = { ...mainSettings };
    switch (id) {
      case "label_separator":
        items.general.label_price_seperator = value;
        break;
      case "label_addon_price":
        items.general.label_addonprice_format = value;
        break;
      case "hide_pay_button":
        items.general.hide_pay_button = value;
        break;
      case "selection_addon":
        items.translations.selection_addon = value;
        break;
      case "custom_product_name":
        items.translations.custom_product_name = value;
        break;
      case "error_reqd":
        items.error_mssg.required = value;
        break;
      case "error_invalid_one":
        items.error_mssg.invalid = value;
        break;
      case "error_invalid_number":
        items.error_mssg.invalid_number = value;
        break;
      case "error_char_limit":
        items.error_mssg.character_limit = value;
        break;
      case "error_min_value":
        items.error_mssg.min_value_allowed = value;
        break;
      case "error_max_value":
        items.error_mssg.max_value_allowed = value;
        break;
      case "error_min_selection":
        items.error_mssg.min_selection_allowed = value;
        break;
      case "error_exact_selection":
        items.error_mssg.exact_selection_allowed = value;
        break;
      case "error_file_size":
        items.error_mssg.file_size_limit = value;
        break;
      case "error_file_not":
        items.error_mssg.file_not_alowed = value;
        break;
      case "error_max_selection":
        items.error_mssg.max_selection_allowed = value;
        break;
      default:
        "default";
    }

    setMainSettings(items);
    setDisableButton(false);
  };

  const handleSave = async () => {
    let params = {
      settings: mainSettings,
      shop: shop,
    };
    setloading(true);
    // setIsLoading(true);

    let url = "/api/updateSettngs";
    // let response = await axios.post(url, params);
    let response = await DynamicApi(url, params, "POST", app);

    if (response != "" && response != undefined) {
      setErrorMessage(response.data.mesage);
      setToastActive(true);
      setloading(false);
      // setIsLoading(false);
    } else {
      setErrorMessage("some error occured");
      setToastActive(true);
      setloading(false);
      // setIsLoading(fasle);
    }
  };

  const toggleActive = useCallback(
    () => setToastActive((toastactive) => !toastactive),
    []
  );

  const toastMarkup = toastactive ? (
    <Toast content={errorMessage} onDismiss={toggleActive} />
  ) : null;

  const handleDeleteDrafts = async () => {
    let url = "/api/deleteDraftProducts";
    let params = { command: "delete_products", shop: shop };
    setloading(true);
    // setIsLoading(true);

    // let response = await axios.post(url, params);
    let response = await DynamicApi(url, params, "POST", app);

    if (response != "" && response != undefined) {
      setErrorMessage(response.data.message);
      setToastActive(true);
      setloading(false);
      // setIsLoading(false);
    }
  };
  // console.log(mainSettings)
  // const handleHelpText = useCallback((value) => sethelpText(value), []);
  const handleHelpText = (value) => {
    let items = { ...mainSettings };
    items.general.help_text_settings = value;
    sethelpText(value);
    setMainSettings(items);
    setDisableButton(false);
  };
  // const handleWidgetPosition = useCallback(
  //   (value) => setWidgetPosition(value),
  //   []
  // );
  const handleWidgetPosition = (value) => {
    // console.log(value);
    // console.log(mainSettings);
    let items = { ...mainSettings };
    items.general.widget_position = value;
    setWidgetPosition(value);
    setMainSettings(items);

    setDisableButton(false);
  };

  const widgetPositionOptions = [
    // { label: "Before Product Variant", value: "before_variant" },
    // { label: "After Product Variant", value: "after_variant" },
    { label: "Before Add To Cart Button", value: "before_atc" },
    { label: "After Add To Cart Button", value: "after_atc" },
  ];

  // useEffect(() => {
  //   getThemeId();
  // }, []);

  // const handleRedirectThemeEditor = () => {
  //   console.log("themeId=>", themeId);
  //   window.open(`https://${getShop}/admin/themes/${themeId}/editor`);
  // };
  return (
    <Spin tip="Please Wait..." spinning={loading}>
      <div className="full_width">
        <Layout>
          <Layout.AnnotatedSection
            id="setting_clear_products"
            title="Clear duplicate products"
            description=""
          >
            <Card sectioned>
              <FormLayout>
                <div>
                  <p>
                    Whenever customers purchased a product that have applied
                    options then app create a draft product (makes many copies
                    of products) in Shopify Admin products. To avoid this user
                    have to clear it time to time. This will not affect anything
                    in the store.
                  </p>
                </div>
                <div>
                  <Button
                    onClick={handleDeleteDrafts}
                    id="clear_all_products"
                    monochrome
                    outline
                  >
                    Clear all draft products
                  </Button>
                </div>
              </FormLayout>
            </Card>
          </Layout.AnnotatedSection>
          <Layout.AnnotatedSection
            id="setting_general"
            title="Product page translation"
            description=""
          >
            <Card sectioned>
              <FormLayout>
                <div style={{ display: "none" }}>
                  <TextField
                    label="Label and price separator"
                    value={mainSettings?.general?.label_price_seperator}
                    onChange={handleChange}
                    id="label_separator"
                    style={{ display: "none" }}
                  />
                </div>
                <TextField
                  onChange={handleChange}
                  id="label_addon_price"
                  value={mainSettings?.general?.label_addonprice_format}
                  label="Label Add-on price format"
                />
                <div style={{ display: "none" }}>
                  <TextField
                    label="Selection will add {{addon}} to the price"
                    value={mainSettings?.translations?.selection_addon}
                    onChange={handleChange}
                    id="selection_addon"
                  />
                  <Checkbox
                    label="Hide additional payment button"
                    checked={mainSettings?.general?.hide_pay_button}
                    onChange={handleChange}
                    id="hide_pay_button"
                  />
                </div>
              </FormLayout>
            </Card>
          </Layout.AnnotatedSection>

          <Layout.AnnotatedSection
            id="setting_translation"
            title="Cart page"
            description=""
          >
            <Card sectioned>
              <FormLayout>
                <TextField
                  label="Option set product name on cart page"
                  value={mainSettings?.translations?.custom_product_name}
                  onChange={handleChange}
                  id="custom_product_name"
                />
              </FormLayout>
            </Card>
          </Layout.AnnotatedSection>
          {themeType == "vintage" ? (
            <Layout.AnnotatedSection
              id="setting_general"
              title="Option set widget"
              description="Make the adjustment how you want the option to be displayed on product page "
            >
              <Card sectioned>
                <FormLayout>
                  <Select
                    label="Widget position"
                    options={widgetPositionOptions}
                    onChange={handleWidgetPosition}
                    value={widgetPosition}
                    // value={mainSettings?.general?.widget_position}
                  />
                </FormLayout>
              </Card>
            </Layout.AnnotatedSection>
          ) : (
            ""
          )}
          <Layout.AnnotatedSection
            id="Allowed_extensions_selection"
            title="Allowed extensions"
            description=""
          >
            <Card sectioned>
              <FormLayout>
                <OptionList
                  title="Allowed extensions"
                  onChange={handleextension}
                  options={[
                    { value: "jpg", label: ".jpg" },
                    { value: "png", label: ".png" },
                    { value: "jpeg", label: ".jpeg" },
                    { value: "pdf", label: ".pdf" },
                  ]}
                  selected={selected}
                  allowMultiple
                />
              </FormLayout>
            </Card>
          </Layout.AnnotatedSection>
          <Layout.AnnotatedSection
            id="setting_general"
            title="Error messages translations"
            description=""
          >
            <Card sectioned>
              <FormLayout>
                <TextField
                  label="Required"
                  id="error_reqd"
                  type="text"
                  placeholder="This field is required"
                  value={mainSettings?.error_mssg?.required}
                  onChange={handleChange}
                />
              </FormLayout>
            </Card>
          </Layout.AnnotatedSection>
          <Layout.AnnotatedSection
            id="setting_submitbtn"
            title=""
            description=""
          >
            <VerticalStack gap={5}>
              <Button
                disabled={disableButton}
                onClick={handleSave}
                primary={primaryButton}
              >
                Save
              </Button>
            </VerticalStack>
          </Layout.AnnotatedSection>
        </Layout>
        {toastMarkup}
        {loadingMarkup}
      </div>
    </Spin>
  );
}
