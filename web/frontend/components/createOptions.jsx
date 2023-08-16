import React, { Component } from "react";
import { Toast, Layout, Icon } from "@shopify/polaris";
import OptionsSet from "./OptionSet";
import AddElement from "./AddElement";
import InputData from "./InputData";
import AllElements from "./AllElements";
import Header from "./Header";

import {
  AddMajor,
  HomeMajor,
  ProductsMajor,
  TemplateMajor,
  MobileHamburgerMajor,
  MobileCancelMajor,
} from "@shopify/polaris-icons";
import { Spin } from "antd";
import { DynamicApi } from "./common/DynamicAxios";

class Createoptions extends Component {
  constructor(props) {
    console.log(props.app);
    super(props);
    this.theme = {};
    this.state = {
      correctswatch: "",
      isLoading: false,
      mobtoggle: true,
      redirect: false,
      showimage1: "",
      // imageURL: "",
      saveimageparams: {}, // image parameters
      editId: props.id,
      shop: this.props.shopname,
      objectItems: [
        {
          label: "Add Element",
          icon: AddMajor,
          id: "add_element",
        },
      ],
      installation: false,
      responsiveClasses: "desktop_view",
      mainTheme: 0,
      AllCheckedProduct: [],
      allChecked: [],
      allNames: [],
      step: 1,
      fileName: new Date().valueOf(),
      optionSetData: [],
      selectedProductRules: {
        type: "none",
        product_added: [],
        conditions: [],
        collections: [],
        conditional_type: ["all_condn"],
        all_resources: {},
      },
      items: [
        {
          label: "Add Element",
          icon: AddMajor,
          id: "add_element",
        },
      ],
      updateId: "",
      name: "",
      mainLayout: false,
      layout: {
        color_layout: {
          help_text_color: "#737373",
          label_color: "#000",
          required_char_color: "#000",
          app_background_color: "#000",
          input_text_color: "#000",
          input_back_color: "#ddd",
          dropdown_text_color: "#000000",
          dropdown_back_color: "#ffffff",
          check_button_text: "#000000",
          check_text_hover: "#000000",
          check_text_active: "#000000",
          check_button_hover: "#000000",
          check_button_active: "#ddd",
          swatch_hover: "#ddd",
          swatch_active: "#ddd",
          button_back: "#ddd",
          button_back_active: "#379198",
          button_back_hover: "#94d275",
          button_text_active: "#000",
          button_text_hover: "#C52020",
          button_text: "#000000",
        },
        general_layout: {
          border: "classic",
          alignment: "left",
        },
        typo_layout: {
          input_font_family: "",
          input_font_size: "14",
          label_font_size: "14",
          label_font_family: "",
          help_font_size: "14",
          help_font_family: "",
        }
      },
      counter: {
        text: 0,
        text_area: 0,
        number: 0,
        datetime: 0,
        file: 0,
        dropdown: 0,
        checkboxes: 0,
        radio_buttons: 0,
        buttons: 0,
        color_swatches: 0,
        image_swatches: 0,
        paragraph: 0,
      },
      statuss: false,
      checkInstall: false,
      all_conditional: [
        {
          label: "PLEASE SELECT",
          value: "please_select",
          name: "please_select",
          index: -1,
          selected: true,
        },
      ],
      color_layout: {
        help_text_color: "#737373",
        label_color: "#000",
        required_char_color: "#000",
        app_background_color: "#000",
        input_text_color: "#000",
        input_back_color: "#ddd",
        dropdown_text_color: "#000000",
        dropdown_back_color: "#ffffff",
        check_button_text: "#000000",
        check_text_hover: "#000000",
        check_text_active: "#000000",
        check_button_hover: "#000000",
        check_button_active: "#000000",
        swatch_hover: "#ddd",
        swatch_active: "#ddd",
        button_back: "#ddd",
        button_back_active: "#379198",
        button_back_hover: "#94d275",
        button_text_active: "#000",
        button_text_hover: "#C52020",
        button_text: "#000000",
      },
      general_layout: {
        border: "classic",
        alignment: "left",
      },
      typo_layout: {
        input_font_family: "",
        input_font_size: "14",
        label_font_size: "14",
        label_font_family: "",
        help_font_size: "14",
        help_font_family: "",
      },
      editing_index: 0,
      toastErrorSuccessMarkup: false,
      noticeErrorSucess: "",
      statusErrorSucess: false,
      buttonState: false,
      key: false,
      action_perform: false,
      error_block: false,
      option_counter: new Date(),
      label_error: {},
      tab: 0,
      layoutType: "no_layout",
      conditionalChange: false,
      status: false,
    };
    this.elementsData = {
      input_type: {
        text: {
          id: "text-1",
          type: "text",
          label: "Text",
          addon: 0,
          required: false,
          hidden_label: false,
          placeholder: "",
          helptext: "",
          advanced_options: false,
          class_name: "",
          max: "",
          conditionalField: false,
          clo: [],
          css: {
            type: "classic",
            alignment: "left",
            label_color: "#000000",
            required_char_color: "#000000",
            help_text_color: "#737373",
            label_font_size: "14",
            input_font_size: "14",
            help_font_size: "14",
            columnWidth: 100,
            input_text_color: "#000000",
            input_back_color: "#FFFFFF",
          },
        },
        text_area: {
          id: "textarea-1",
          type: "textarea",
          label: "Textarea",
          conditionalField: false,
          addon: 0,
          required: false,
          hidden_label: false,
          placeholder: "",
          helptext: "",
          advanced_options: false,
          class_name: "",
          max: "",
          clo: [],
          css: {
            type: "classic",
            alignment: "left",
            background_color: "#ffffff",
            label_color: "#000000",
            required_char_color: "#000000",
            help_text_color: "#737373",
            label_font_size: "14",
            input_font_size: "14",
            help_font_size: "14",
            columnWidth: 100,
            input_text_color: "#000000",
            input_back_color: "#FFFFFF",
          },
        },
        number: {
          id: "number-1",
          conditionalField: false,
          type: "number",
          label: "Number",
          addon: 0,
          required: false,
          hidden_label: false,
          placeholder: "",
          helptext: "",
          advanced_options: false,
          class_name: "",
          min: "",
          max: "",
          clo: [],
          css: {
            type: "classic",
            alignment: "left",
            label_color: "#000000",
            required_char_color: "#000000",
            help_text_color: "#737373",
            label_font_size: "14",
            input_font_size: "14",
            help_font_size: "14",
            columnWidth: 100,
            input_text_color: "#000000",
            input_back_color: "#FFFFFF",
          },
        },
        datetime: {
          id: "datetime-1",
          language: false,
          conditionalField: false,
          clo: [],
          type: "datetime",
          selected: 0,
          label: "Datetime",
          addon: 0,
          required: false,
          hidden_label: false,
          placeholder: "",
          helptext: "",
          format: "Date",
          isLimitDate: false,
          limitDateType: "disablingDates",
          limitDateSpecificEnabled: false,
          limitDateSpecificDates: [],
          rangeDate: {},
          limitDateRangeEnabled: false,
          limitDateRangeDates: [],
          limitDateDOWEnabled: false,
          limitDateDOWDates: [],
          key: "change",
          disablePastDates: false,
          otherLang: false,
          localization: "es",
          date_format: "Y-m-d",
          time_format: "12HR",
          advanced_options: false,
          class_name: "",
          css: {
            type: "classic",
            alignment: "left",
            label_color: "#000000",
            required_char_color: "#000000",
            help_text_color: "#737373",
            label_font_size: "14",
            input_font_size: "14",
            help_font_size: "14",
            columnWidth: 100,
            input_text_color: "#000000",
            input_back_color: "#FFFFFF",
          },
        },
        file: {
          id: "file-1",
          conditionalField: false,
          type: "file",
          clo: [],
          note: "File upload is not supported on the cart drawer",
          label: "File",
          "button-text": "Choose file",
          placeholder: "or drop files to upload",
          required: false,
          hidden_label: false,
          helptext: "",
          allowed_extensions: ["image/jpeg", "image/png", "image/jpg"],
          advanced_options: false,
          class_name: "",
          css: {
            type: "classic",
            alignment: "left",
            label_color: "#000000",
            required_char_color: "#000000",
            help_text_color: "#737373",
            label_font_size: "14",
            input_font_size: "14",
            help_font_size: "14",
            columnWidth: 100,
            input_text_color: "#000000",
            input_back_color: "#FFFFFF",
          },
        },
      },
      select_type: {
        dropdown: {
          id: "select-1",
          conditionalField: false,
          type: "select",
          clo: [],
          label: "Dropdown",
          required: false,
          hidden_label: false,
          placeholder: "",
          helptext: "",
          option_values: [
            {
              id: 0,
              value: "Dropdown_1",
              addon: 0,
              count: this.state.option_counter.getTime(),
              error: false,
            },
          ],
          advanced_options: false,
          class_name: "",
          default_value: "",
          css: {
            type: "classic",
            alignment: "left",
            label_color: "#000000",
            required_char_color: "#000000",
            help_text_color: "#737373",
            label_font_size: "14",
            input_font_size: "14",
            help_font_size: "14",
            columnWidth: 100,
            dropdown_text_color: "#000000",
            dropdown_back_color: "#FFFFFF",
          },
        },
        checkboxes: {
          id: "checkbox-1",
          conditionalField: false,
          type: "checkbox",
          clo: [],
          label: "Checkboxes",
          required: false,
          hidden_label: false,
          helptext: "",
          option_values: [
            {
              id: 0,
              value: "Checkbox_1",
              addon: 0,
              count: this.state.option_counter.getTime(),
              error: false,
            },
          ],
          advanced_options: false,
          class_name: "",
          min: "",
          max: "",
          default_value: "",
          css: {
            type: "classic",
            alignment: "left",
            label_color: "#000000",
            required_char_color: "#000000",
            help_text_color: "#737373",
            label_font_size: "14",
            input_font_size: "14",
            help_font_size: "14",
            columnWidth: 100,
            button_text: "#000000",
            text_hover: "#ff0000",
            // text_active: "#ddd",
            button_hover: "#ddd",
            button_active: "#ff0000",
          },
        },
        radio_buttons: {
          id: "radio-1",
          type: "radio",
          label: "Radio buttons",
          clo: [],
          required: false,
          hidden_label: false,
          conditionalField: false,
          helptext: "",
          option_values: [
            {
              id: 0,
              value: "Radio Buttons_1",
              addon: 0,
              count: this.state.option_counter.getTime(),
              error: false,
            },
          ],
          advanced_options: false,
          class_name: "",
          default_value: "",
          css: {
            type: "classic",
            alignment: "left",
            label_color: "#000000",
            required_char_color: "#000000",
            help_text_color: "#737373",
            label_font_size: "14",
            input_font_size: "14",
            help_font_size: "14",
            columnWidth: 100,
            button_text: "#000000",
            text_hover: "#ff0000",
            // text_active: "#ddd",
            button_hover: "#ddd",
            button_active: "#ff0000",
          },
        },
      },
      swtaches: {
        buttons: {
          id: "buttons-1",
          type: "buttons",
          label: "Buttons",
          conditionalField: false,
          clo: [],
          required: false,
          hidden_label: false,
          helptext: "",
          option_values: [
            {
              id: 0,
              value: "Buttons_1",
              addon: 0,
              count: this.state.option_counter.getTime(),
              error: false,
            },
          ],
          advanced_options: false,
          class_name: "",
          default_value: "",
          css: {
            type: "classic",
            alignment: "left",
            label_color: "#000000",
            required_char_color: "#000000",
            help_text_color: "#737373",
            label_font_size: "14",
            input_font_size: "14",
            help_font_size: "14",
            columnWidth: 100,
            button_text: "#000000",
            button_text_hover: "#000000",
            button_text_active: "#000000",
            button_back: "#ddd",
            button_back_hover: "#ddd",
            button_back_active: "#ddd",
          },
        },
        color_swatches: {
          id: "color-swatches-1",
          type: "color-swatches",
          label: "Color Swatches",
          clo: [],
          conditionalField: false,
          required: false,
          hidden_label: false,
          helptext: "",
          option_values: [
            {
              id: 0,
              value: "Color_1",
              color_type: "one-color",
              addon: 0,
              color1: "#ffffff",
              color2: "#000000",
              style: { display: "none" },
              count: this.state.option_counter.getTime(),
              error: false,
            },
          ],
          advanced_options: false,
          class_name: "",
          default_value: "",
          css: {
            type: "classic",
            alignment: "left",
            label_color: "#000000",
            required_char_color: "#000000",
            help_text_color: "#737373",
            label_font_size: "14",
            input_font_size: "14",
            help_font_size: "14",
            columnWidth: 100,
            swatch_hover: "#ddd",
            swatch_active: "#ddd",
          },
        },
        image_swatches: {
          id: "image-swatches-1",
          type: "image-swatches",
          label: "Image Swatches",
          clo: [],
          conditionalField: false,
          required: false,
          hidden_label: false,
          helptext: "",
          option_values: [
            {
              id: 0,
              value: "Image Swatches_1",
              addon: 0,
              name: "161240197649941016",
              url: "",
              // name: this.state.option_counter.getTime(),
              count: this.state.option_counter.getTime(),
              error: false,
            },
          ],
          advanced_options: false,
          class_name: "",
          default_value: "",
          image_width: "60",
          image_height: "60",
          css: {
            type: "classic",
            alignment: "left",
            label_color: "#000000",
            required_char_color: "#000000",
            help_text_color: "#737373",
            label_font_size: "14",
            input_font_size: "14",
            help_font_size: "14",
            columnWidth: 100,
            swatch_hover: "#ddd",
            swatch_active: "#ddd",
          },
        },
      },
      static_text: {
        paragraph: {
          id: "paragraph-1",
          clo: [],
          label: "Paragraph",
          type: "paragraph",
          text: "Text",
          columnWidth: 100,
          conditionalField: false,
        },
      },
    };
  }

  /********************* LIFECYCLE EVENTS START ************************/

  async componentDidMount() {
    // this.getmaintheme();
    // let shop_url = "/api/getShop";
    // let shop_response = await axios.post(shop_url);
    // console.log(shop_response)
    // const shopName = shop_response.data;
    // this.setState({ shop: shopName });
    this.fetchDataFromGetApi();
    // window.addEventListener("beforeunload", this.onUnload);
    if (!this.state.status) {
      this.setState({ status: "set_draft" });
    } else {
      this.setState({ status: "set_active" });
    }
  }

  /********************* LIFECYCLE EVENTS END  ************************/

  ////////////////////////////////////////// api hit to set states needed
  // getmaintheme = async () => {
  //   let maintheme = await axios.get("/api/getThemeData");
  //   console.log(maintheme.data.res);
  //   this.setState({ mainTheme: maintheme.data.res });
  // };

  fetchDataFromGetApi = async () => {
    this.setState({ isLoading: true });

    let option_set_data = await DynamicApi(
      "/api/getAllOptionSet",
      { shop: this.state.shop },
      "POST",
      this.props.app
    );
    let editcreateoptionsdata = option_set_data.data.response;

    if (option_set_data.data.status) {
      // this.setState({ mainTheme: option_set_data.data.mainTheme });
      this.setState({ installation: option_set_data.data.installation });
      if (option_set_data.data.response.length > 0) {
        let allChecked = [...this.state.AllCheckedProduct];
        let result = [...this.state.items];
        let all_names = [...this.state.allNames];
        let allch = [];
        option_set_data.data.response.map((element) => {
          result.push({
            id: element._id,
            name: element.name,
            product_type: element.option_set.products.type,
            status: element.status,
            onClick: (id) => {},
          });
          let which = element.option_set.products;
          which.id = element._id;
          which.status = element.status;
          allch.push(element.option_set.products);
          // allChecked.push(element.option_set.products);
          all_names.push({ name: element.name, id: element._id });
        });
        this.setState({ allChecked: allch });
        this.setState({ AllCheckedProduct: allChecked });
        this.setState({ allNames: all_names });
        if (option_set_data.data.installation) {
          this.setState({ filename: response.data.data[0].fileName });
          this.setState({
            optionSetData: response.data.data[0].option_set.elements,
          });
          this.setState({
            selectedProductRules: response.data.data[0].option_set.products,
          });
          this.setState({ counter: response.data.data[0].counter });
          this.setState({ updateId: response.data.data[0]._id });
          this.setState({ name: response.data.data[0].name });
        }
      }
      if (this.state.editId != undefined) {
        console.log("enter when id is present");
        const result = editcreateoptionsdata.filter(
          (elem) => elem._id == this.state.editId
        );
        // console.log(result)
        let obj = result[0];
        // console.log(result);
        console.log(obj);

        obj.all_names = this.state.allNames;
        // obj.allChecked = this.state.AllCheckedProduct;
        // console.log(obj);
        this.setState({
          fileName: obj.fileName,
          optionSetData: obj.option_set.elements,
          objectItems: obj.items,
          updateId: obj._id,
          allNames: obj?.all_names,
          name: obj.name,
          mainLayout: obj.mainLayout,
          layout: obj.layout,
          color_layout: obj.layout.color_layout,
          general_layout: obj.layout.general_layout,
          typo_layout: obj.layout.typo_layout,
          // error_msg: obj.layout.error_msg,
          counter: obj.counter,
          status: obj.status == true ? "set_active" : "set_draft",
          // allChecked: obj.allChecked,
          // showimage1: obj.imageURL,
          selectedProductRules: obj.option_set.products,
        });

        // console.log(this.state.imageURL)
      }
      this.setState({ isLoading: false });
    }
  };

  /////////////////////////////////////////// function from index which is passed as props in app

  saveOptionSetData = (inc, obj) => {
    if (inc) {
      this.setState({ fileName: obj.fileName });
      this.setState({ optionSetData: obj.option_set.elements });
      this.setState({ selectedProductRules: obj.option_set.products });
      this.setState({ items: obj.items });
      this.setState({ updateId: obj._id });
      this.setState({ allNames: obj.all_names });
      this.setState({ names: obj.name });
      this.setState({ mainLayout: obj.mainLayout });
      this.setState({ layout: obj.layout });
      this.setState({ counter: obj.counter });
      this.setState({ statuss: obj.status });
      this.setState({ allChecked: obj.allChecked });
    } else {
      this.setState({ optionSetData: [] });
      this.setState({
        selectedProductRules: {
          type: { manual: false, auto: false, all: false },
          product_added: [],
          conditions: [],
          collections: [],
          conditional_type: ["all_condn"],
          all_resources: {},
        },
      });
      this.setState({ updateId: "" });
      this.setState({
        items: [
          {
            label: "Add Element",
            icon: AddMajor,
            id: "add_element",
          },
        ],
      });
      this.setState({ fileName: new Date().valueOf() });
    }
  };

  // itemsCounter = async () => {
  //   let url = "/api/getCredentials";
  //   let response = await axios.post(url, params);
  //   if (response != "" && response != undefined) {
  //   }
  // };

  handleStatus = (value) => {
    // console.log(value)
    this.setState({
      status: value,
      action_perform: true,
    });
  };

  // onUnload = (event) => {
  //   if (this.state.action_perform) {
  //     const e = event || window.event;
  //     e.preventDefault();
  //     if (e) {
  //       e.returnValue = "";
  //     }
  //     return "";
  //   }
  // };

  handleAddElementTab = (num) => {
    this.setState({
      tab: num,
    });
  };

  changeLayout = (type) => {
    this.setState({ layoutType: type });
  };

  handleLayout = (id, value, type) => {
    // console.log("handle Layout");
    // console.log(id, value, type);
    let color_layout = { ...this.state.color_layout };
    // let error_msg = { ...this.state.error_msg };
    let general_layout = { ...this.state.general_layout };
    let typo_layout = { ...this.state.typo_layout };

    if (type == "color") {
      switch (id) {
        case "button_back":
          color_layout.button_back = value;
          break;
        case "button_back_active":
          color_layout.button_back_active = value;
          break;
        case "button_back_hover":
          color_layout.button_back_hover = value;
          break;
        case "button_text_active":
          color_layout.button_text_active = value;
          break;
        case "button_text_hover":
          color_layout.button_text_hover = value;
          break;
        case "button_text":
          color_layout.button_text = value;
          break;
        case "input_text_1":
          color_layout.input_text_color = value;
          break;
        case "input_back_1":
          color_layout.input_back_color = value;
          break;
        case "checkbox_text":
          color_layout.check_button_text = value;
          break;
        case "checkbox_text_hover":
          color_layout.check_text_hover = value;
          break;
        case "checkbox_text_active":
          color_layout.check_text_active = value;
          break;
        case "checkbox_button_hover":
          color_layout.check_button_hover = value;
          break;
        case "checkbox_button_active":
          color_layout.check_button_active = value;
          break;
        case "swatch_hover":
          color_layout.swatch_hover = value;
          break;
        case "swatch_back_active":
          color_layout.swatch_active = value;
          break;
        case "select_text_1":
          color_layout.dropdown_text_color = value;
          break;
        case "select_back_1":
          color_layout.dropdown_back_color = value;
          break;
        case "help_color_i":
          color_layout.help_text_color = value;
          break;
        case "label_color_i":
          color_layout.label_color = value;
          break;
        case "reqd_color_i":
          color_layout.required_char_color = value;
          break;
        case "app_color_i":
          color_layout.app_background_color = value;
          break;
      }
      this.setState({
        color_layout: color_layout,
      });
    } else if (type == "general") {
      if (id == "border_type") {
        general_layout.border = value;
      } else if (id == "alignment_type") {
        general_layout.alignment = value;
      }
      this.setState({ general_layout: general_layout });
    } else if (type == "typo") {
      if (id == "input_font_size") {
        typo_layout.input_font_size = value;
      } else if (id == "label_font_size") {
        typo_layout.label_font_size = value;
      } else if (id == "help_font_size") {
        typo_layout.help_font_size = value;
      }
      this.setState({ typo_layout: typo_layout });
    }
    // else if (type == "error") {
    //   switch (id) {
    //     case "error_reqd":
    //       error_msg.required = value;
    //       break;
    //     case "error_invalid_one":
    //       error_msg.invalid = value;
    //       break;
    //     case "error_invalid_number":
    //       error_msg.invalid_number = value;
    //       break;
    //     case "error_char_limit":
    //       error_msg.character_limit = value;
    //       break;
    //     case "error_min_value":
    //       error_msg.min_value_allowed = value;
    //       break;
    //     case "error_max_value":
    //       error_msg.max_value_allowed = value;
    //       break;
    //     case "error_min_selection":
    //       error_msg.min_selection_allowed = value;
    //       break;
    //     case "error_exact_selection":
    //       error_msg.exact_selection_allowed = value;
    //       break;
    //     case "error_file_size":
    //       error_msg.file_size_limit = value;
    //       break;
    //     case "error_file_not":
    //       error_msg.file_not_alowed = value;
    //       break;
    //     case "error_max_selection":
    //       error_msg.max_selection_allowed = value;
    //       break;
    //   }
    //   this.setState({
    //     error_msg: error_msg,
    //   });
    // }
    this.setState({
      action_perform: true,
    });
  };

  handleProducts = (value, type) => {
    // console.log(value);
    let items = { ...this.state.selectedProductRules };
    switch (type) {
      case "type":
        items.type = value;
        break;
      case "conditions":
        items.conditions = value;
        break;
      case "products_added":
        items.product_added = value;
        break;
      case "conditional_type":
        items.conditional_type = value;
        break;
      case "all_resources":
        items.all_resources = value;
        break;
      case "single_layout":
        this.setState({
          mainLayout: value,
        });
        break;
    }

    this.setState({
      selectedProductRules: items,
      action_perform: true,
    });
  };

  changeState = (inc) => {
    if (inc == true) {
      this.setState({
        step: this.state.step + 1,
      });
    } else if (inc == false) {
      this.setState({
        step: this.state.step - 1,
      });
    } else if (inc == "inputdata") {
      this.setState({
        step: this.state.step - 2,
      });
    } else if (inc == "optionset") {
      this.setState({
        step: this.state.step - 1,
      });
    }
  };

  reEditData = (val) => {
    const newVal = parseInt(val);
    this.setState({
      step: 3,
      editing_index: newVal + 1,
    });
  };

  decrementMain = () => {
    this.saveOptionSetData(false, {});
  };

  toastErrorSucessState = (status, toastMessage, toastStatus) => {
    this.setState({
      toastErrorSuccessMarkup: status,
      noticeErrorSucess: toastMessage,
      statusErrorSucess: toastStatus,
    });
  };

  toastSuccessError = () => {
    if (this.state.toastErrorSuccessMarkup) {
      return (
        <Toast
          content={this.state.noticeErrorSucess}
          error={this.state.statusErrorSucess}
          onDismiss={() => this.toastErrorSucessState(false, "", "")}
          duration={3000}
        />
      );
    }
  };
  saveDatatoDB = async () => {
    setTimeout(() => {
      // console.log(this.state.noticeErrorSucess);
      let all = [0, 1, 2];
      let i = all.indexOf(1);
      all.splice(i, 1);

      if (this.state.noticeErrorSucess == "Please Select Products") {
        if (this.state.step == 2) {
          // console.log("step2");

          this.changeState("optionset");
          this.handleAddElementTab(1);
          document
            .getElementsByClassName("tab-item")[1]
            .classList.add("active-tab");
          all.forEach((element) => {
            document
              .getElementsByClassName("tab-item")
              [element].classList.remove("active-tab");
          });
        } else if (this.state.step == 3) {
          // console.log("step3");

          this.changeState("inputdata");
          this.handleAddElementTab(1);
          document
            .getElementsByClassName("tab-item")[1]
            .classList.add("active-tab");
          all.forEach((element) => {
            document
              .getElementsByClassName("tab-item")
              [element].classList.remove("active-tab");
          });
        } else if (this.state.step == 1) {
          // console.log("step1");
          this.handleAddElementTab(1);
          // console.log(this.state.tab);

          this.changeState(false);

          this.changeState(true);

          document
            .getElementsByClassName("tab-item")[1]
            .classList.add("active-tab");
          all.forEach((element) => {
            document
              .getElementsByClassName("tab-item")
              [element].classList.remove("active-tab");
          });
        }
      }

      if (this.state.noticeErrorSucess == "Add Elements to Your Option Set") {
        // console.log("enetered in elements");
        let all = [0, 1, 2];
        let i = all.indexOf(0);
        all.splice(i, 1);
        if (this.state.step == 2) {
          // console.log("step2");
          // this.changeState("optionset");
          this.handleAddElementTab(0);
          document
            .getElementsByClassName("tab-item")[0]
            .classList.add("active-tab");
          all.forEach((element) => {
            document
              .getElementsByClassName("tab-item")
              [element].classList.remove("active-tab");
          });
        } else if (this.state.step == 3) {
          // console.log("step3");

          this.changeState("inputdata");
          this.handleAddElementTab(0);
          document
            .getElementsByClassName("tab-item")[0]
            .classList.add("active-tab");
          all.forEach((element) => {
            document
              .getElementsByClassName("tab-item")
              [element].classList.remove("active-tab");
          });
        } else if (this.state.step == 1) {
          // console.log("step1");

          this.changeState(true);
          this.handleAddElementTab(0);
          document
            .getElementsByClassName("tab-item")[0]
            .classList.add("active-tab");
          all.forEach((element) => {
            document
              .getElementsByClassName("tab-item")
              [element].classList.remove("active-tab");
          });
        }
      }
    }, 100);

    this.setState({
      buttonBool: true,
    });
    let checkConditionals = [];
    this.state.optionSetData.map((element) => {
      if (element.conditions != undefined) {
        if (element.conditions.whens != undefined) {
          element.conditions.whens.map((elem) => {
            if (elem.value.trim() == "" || elem.select == "PLEASESELECT") {
              checkConditionals.push(elem);
            }
          });
        }
      }
    });

    let check = true; //check

    if (check) {
      if (checkConditionals.length > 0) {
        this.setState({
          toastErrorSuccessMarkup: true,
          noticeErrorSucess: "Please complete all conditionals",
          statusErrorSucess: true,
          buttonBool: false,
        });
      } else {
        if (this.state.optionSetData.length > 0) {
          let temp = [...this.state.optionSetData];
          this.state.optionSetData.map((element, index) => {
            let item = { ...temp[index] };
            // if (element.name != "Paragraph" && element.name != "Checkbox") {
            //   item.value = "";
            // } else if (element.name == "Checkbox") {
            //   item.value = [];
            // }
            if (element.name == "Checkbox") {
              item.value = [];
            } else if (element.name != "Paragraph") {
              item.value = "";
            }
            temp[index] = item;
          });
          let productCheck = false;
          if (this.state.selectedProductRules.type != "none") {
            /** PRODUCT BASED CONDITION START [MANUAL / ALL / AUTO(FUTURE SCOPE] ) */
            if (this.state.selectedProductRules.type == "manual") {
              if (this.state.selectedProductRules.product_added.length != 0) {
                let allProductData = this.state.allChecked;
                let checkProduct =
                  this.state.selectedProductRules.product_added;
                productCheck = true;
                if (this.state.status == "set_active") {
                  // console.log(allProductData);
                  for (var k = 0; k < checkProduct.length; k++) {
                    allProductData.map((element) => {
                      if (element.type == "manual" && element.status != false) {
                        if (element.id != this.state.updateId) {
                          element.product_added.map((elem) => {
                            if (elem.title == checkProduct[k].title) {
                              productCheck = false;
                            }
                          });
                        }
                      }
                    });
                  }
                }
                // if (this.state.selectedProductRules.type == "all") {
                //   productCheck = true;

                // }
                if (!productCheck) {
                  this.setState({
                    toastErrorSuccessMarkup: true,
                    noticeErrorSucess:
                      "There is an existing option with same products. Please try with different products here.",
                    statusErrorSucess: true,
                    buttonBool: false,
                    tab: 1,
                  });
                }
              } else {
                // if (this.state.step === 2) {
                //   this.handleTabChange(1, "optionset");
                // } else if (this.state.step === 3) {
                //   this.handleTabChange(1, "inputdata");
                // }
                // console.log("no projdjkd");
                this.setState({
                  toastErrorSuccessMarkup: true,
                  noticeErrorSucess: "Please Add Products",
                  statusErrorSucess: true,
                  buttonBool: false,
                  tab: 1,
                });
              }
            } else if (this.state.selectedProductRules.type == "all") {
              productCheck = true;
              if (this.state.status == "set_active") {
                this.state.allChecked.map((element) => {
                  if (element.type == "all" && element.status != false) {
                    if (element.id != this.state.updateId) {
                      productCheck = false;
                    }
                  }
                });
              }

              if (!productCheck) {
                this.setState({
                  toastErrorSuccessMarkup: true,
                  noticeErrorSucess:
                    "There is an existing option set with same products. Please try with different products here.",
                  statusErrorSucess: true,
                  buttonBool: false,
                  tab: 1,
                });
              }
            } else if (this.state.selectedProductRules.type == "auto") {
              //Future Scope
              productCheck = true;
              if (this.state.selectedProductRules.conditions.length > 0) {
                let result = this.state.selectedProductRules.conditions.filter(
                  (element) => element.value.trim() == ""
                );
                if (result.length > 0) {
                  productCheck = false;
                  this.setState({
                    toastErrorSuccessMarkup: true,
                    noticeErrorSucess: "Please Complete Product Conditions",
                    statusErrorSucess: true,
                    buttonBool: false,
                    tab: 1,
                  });
                } else {
                  check = true;
                }
              } else {
                productCheck = false;
                this.setState({
                  toastErrorSuccessMarkup: true,
                  noticeErrorSucess: "Please Add Product Conditions",
                  statusErrorSucess: true,
                  tab: 1,
                  buttonBool: false,
                });
              }
            }
          } else {
            this.setState({
              toastErrorSuccessMarkup: true,
              noticeErrorSucess: "Please Select Products",
              statusErrorSucess: true,
              buttonBool: false,
              tab: 1,
            });
          }
          if (this.state.updateId == "") {
            if (productCheck) {
              this.setState({ action_perform: false });
              let option_set_topography = {
                elements: temp,
                status: this.state.status,
                products: this.state.selectedProductRules,
                mainLayout: this.state.mainLayout,
                layout: {
                  color_layout: this.state.color_layout,
                  typo_layout: this.state.typo_layout,
                  general_layout: this.state.general_layout,
                  // error_msg: this.state.error_msg,
                },
                name: this.state.name,
                fileName: this.state.fileName,
                shop: this.state.shop,
                mainTheme: this.state.mainTheme,
                counter: this.state.counter,
                // imagename: this.state.saveimageparams.fileName,
                // imagesize: this.state.saveimageparams.size,
                // image: this.state.saveimageparams.file,
                // type: this.state.saveimageparams.type,
              };
              if (
                option_set_topography.elements.length > 0 ||
                option_set_topography.products.length > 0
              ) {
                // console.log("kdfhjksDHFjshdfjkhsdkjf", option_set_topography);
                this.setState({
                  buttonBool: true,
                  isLoading: true,
                });
                // let response = await axios.post(
                //   "/api/saveOptionSet",
                //   option_set_topography,
                //   {}
                // );
                let response = await DynamicApi(
                  "/api/saveOptionSet",
                  option_set_topography,
                  "POST",
                  this.props.app
                );
                // console.log("klop", response);
                if (response != undefined && response != "") {
                  if (response.status == 200) {
                    this.setState({
                      toastErrorSuccessMarkup: true,
                      noticeErrorSucess: response.data.result,
                      statusErrorSucess: false,
                      buttonBool: false,
                      isLoading: false,
                    });
                    if (response.data.status) {
                      setTimeout(() => {
                        // this.setState({ redirect: true });
                        this.props.redirection();
                      }, 1000);
                    }

                    if (false == this.state.checkInstall) {
                      this.setState({
                        toastErrorSuccessMarkup: true,
                        noticeErrorSucess: response.data.result,
                        statusErrorSucess: false,
                        buttonBool: false,
                        isLoading: false,
                      });
                    }
                  } else {
                    this.setState({
                      buttonBool: false,
                    });
                  }
                } else {
                  this.setState({
                    buttonBool: false,
                  });
                }
              } else {
                this.setState({
                  buttonBool: false,
                });
              }
            }
          } else if (this.state.updateId != "") {
            if (
              this.state.selectedProductRules.type != "manual" &&
              this.state.selectedProductRules.type != "all"
            ) {
              this.setState({
                toastErrorSuccessMarkup: true,
                noticeErrorSucess: "Please Select Products",
                statusErrorSucess: true,
                buttonBool: false,
                tab: 1,
              });
            }
            if (productCheck) {
              this.setState({
                action_perform: false,
              });
              let params = {
                id: this.state.updateId,
                status: this.state.status,
                shop: this.state.shop,
                name: this.state.name,
                mainTheme: this.state.mainTheme,
                params: {
                  elements: temp,
                  products: this.state.selectedProductRules,
                  mainLayout: this.state.mainLayout,
                  layout: {
                    color_layout: this.state.color_layout,
                    typo_layout: this.state.typo_layout,
                    general_layout: this.state.general_layout,
                    // error_msg: this.state.error_msg,
                  },
                  fileName: this.state.fileName,
                  counter: this.state.counter,
                  // imagename: this.state.saveimageparams.fileName,
                  // imagesize: this.state.saveimageparams.size,
                  // image: this.state.saveimageparams.file,
                  // type: this.state.saveimageparams.type,
                },
              };

              let this_data = this;

              async function updateData() {
                // this_data.setState({
                //   isLoading:true
                // });
                // console.log(this_data.state.counter);
                // let response = await axios.post(
                //   "/api/updateOptionSetByID",
                //   params
                // );

                let response = await DynamicApi(
                  "/api/updateOptionSetByID",
                  params,
                  "POST",
                  this_data.props.app
                );

                // console.log("gggggggg", response);

                if (response != "" && response != undefined) {
                  if (response.status == 200) {
                    this_data.setState({
                      isLoading: true,
                    });

                    if (this_data.state.checkInstall) {
                      this_data.setState({
                        toastErrorSuccessMarkup: true,
                        noticeErrorSucess: "Successfully Updated Option Set",
                        statusErrorSucess: false,
                      });
                      if (response.data.noerror) {
                        setTimeout(() => {
                          // this_data.setState({ redirect: true });
                          this_data.props.redirection();
                        }, 1000);
                      }
                    } else {
                      this_data.setState({
                        toastErrorSuccessMarkup: true,
                        noticeErrorSucess: "Successfully Updated Option Set",
                        statusErrorSucess: false,
                        buttonBool: false,
                        action_perform: false,
                      });
                      if (response.data.noerror) {
                        setTimeout(() => {
                          // this_data.setState({ redirect: true });
                          this_data.props.redirection();
                        }, 1000);
                      }
                    }
                  } else {
                    this_data.setState({
                      toastErrorSuccessMarkup: true,
                      noticeErrorSucess: "Error Updating Option Set",
                      statusErrorSucess: false,
                    });
                  }
                }
              }
              updateData();
              // console.log("after this", this.state);
            }
          }
        } else {
          this.setState({
            toastErrorSuccessMarkup: true,
            noticeErrorSucess: "Add Elements to Your Option Set",
            statusErrorSucess: true,
          });
        }
      }
    } else {
      this.setState({
        toastErrorSuccessMarkup: true,
        noticeErrorSucess:
          "Option Set Name can't be empty or similar to other name",
        statusErrorSucess: true,
        buttonBool: false,
      });
    }
  };

  handleTheDrag = (items, startIndex, endIndex) => {
    let data = [...this.state.optionSetData];
    const newData = data.slice();
    const [temp] = newData.splice(startIndex, 1);
    newData.splice(endIndex, 0, temp);
    for (var i = 0; i < newData.length; i++) {
      newData[i].id = i.toString();
      newData[i].index = i;
    }
    if (endIndex == 0) {
      let conditions = { ...newData[0].conditions };
      conditions = {};
      newData[0].conditions = conditions;
      newData[0].conditionalField = false;
    }
    // console.log(newData);
    this.state.optionSetData = newData;
    this.state.action_perform = true;
    // this.setState({optionSetData: newData});
    // this.setState({action_perform: true});
    // this.setState({
    //   optionSetData: newData,
    //   action_perform: true,
    // });
    this.removeElement(startIndex, endIndex);
  };

  removeElement = (startIndex, endIndex) => {
    let newData = [...this.state.optionSetData];
    if (startIndex - endIndex > 0 && startIndex - endIndex != 1) {
      let result = [];
      for (let i = 0; i < newData.length; i++) {
        if (i > endIndex && i <= startIndex) {
          result.push(newData[i].setting.id);
        }
      }
      let checkElement = { ...newData[endIndex] };
      let checkConditons = { ...checkElement.conditions };
      let length = Object.keys(checkConditons).length;
      if (length != 0) {
        let checkWhens = [...checkConditons.whens];
        for (var j = 0; j < result.length; j++) {
          let pos = checkWhens
            .map((element) => {
              return element.select;
            })
            .indexOf(result[j]);
          while (pos != -1) {
            checkWhens.splice(pos, 1);
            pos = checkWhens
              .map((element) => {
                return element.select;
              })
              .indexOf(result[j]);
          }
        }
        checkConditons.whens = checkWhens;
        checkElement.conditions = checkConditons;
        newData[endIndex] = checkElement;
      }
    } else if (startIndex - endIndex < 0 && startIndex - endIndex != -1) {
      let result = [];
      let tempElementID = newData[endIndex].setting.id;
      for (let i = 0; i < newData.length; i++) {
        if (i < endIndex && i >= startIndex) {
          result.push(newData[i].setting.id);
        }
      }
      for (var j = 0; j < result.length; j++) {
        let pos = newData
          .map((element) => {
            return element.setting.id;
          })
          .indexOf(result[j]);
        let item = { ...newData[pos] };
        let checkConditons = { ...item.conditions };
        let length = Object.keys(checkConditons).length;
        if (length > 0) {
          let checkWhens = [...checkConditons.whens];
          let index = checkWhens
            .map((element) => {
              return element.select;
            })
            .indexOf(tempElementID);
          while (index != -1) {
            checkWhens.splice(index, 1);
            index = checkWhens
              .map((element) => {
                return element.select;
              })
              .indexOf(tempElementID);
          }
          checkConditons.whens = checkWhens;
        }
        item.conditions = checkConditons;
        newData[pos] = item;
      }
    } else if (startIndex - endIndex == 1) {
      let tempElementID = newData[startIndex].setting.id;
      let checkElement = { ...newData[endIndex] };
      let checkConditons = { ...checkElement.conditions };
      let length = Object.keys(checkConditons).length;
      if (length > 0) {
        let checkWhens = [...checkConditons.whens];
        let pos = checkWhens
          .map((element) => {
            return element.select;
          })
          .indexOf(tempElementID);
        while (pos != -1) {
          checkWhens.splice(pos, 1);
          pos = checkWhens
            .map((element) => {
              return element.select;
            })
            .indexOf(tempElementID);
        }
        checkConditons.whens = checkWhens;
        checkElement.conditions = checkConditons;
        newData[endIndex] = checkElement;
      }
    } else if (startIndex - endIndex == -1) {
      let tempElementID = newData[endIndex].setting.id;
      let checkElement = { ...newData[startIndex] };
      let checkConditons = { ...checkElement.conditions };
      let length = Object.keys(checkConditons).length;
      if (length > 0) {
        let checkWhens = [...checkConditons.whens];
        let pos = checkWhens
          .map((element) => {
            return element.select;
          })
          .indexOf(tempElementID);
        while (pos != -1) {
          checkWhens.splice(pos, 1);
          pos = checkWhens
            .map((element) => {
              return element.select;
            })
            .indexOf(tempElementID);
        }
        checkConditons.whens = checkWhens;
        checkElement.conditions = checkConditons;
        newData[startIndex] = checkElement;
      }
    }
    // this.state.optionSetData = newData;
    this.setState({
      optionSetData: newData,
    });
  };

  addClientData = (str) => {
    var obj = {};
    // let conditionalSet = {};
    if (str == "Text Area") {
      obj = {
        name: str,
        index: this.state.optionSetData.length,
        id: this.state.optionSetData.length.toString(),
        selected: true,
        setting: this.elementsData.input_type.text_area,
        style: { display: "block" },
        conditions: {},
        conditionalField: false,
        condition_select: [],
        value: "",
      };
      this.state.counter.text_area = this.state.counter.text_area + 1;
      this.setState({
        ...this.state.counter,
        text_area: this.state.counter.text_area + 1,
      });
      let newObj = { ...obj };
      let items = { ...newObj.setting };
      items.id = "text_area_" + this.state.counter.text_area;
      items.label = "Text Area " + this.state.counter.text_area;
      newObj.setting = items;
      obj = newObj;
    } else if (str == "Text") {
      obj = {
        name: str,
        index: this.state.optionSetData.length,
        id: this.state.optionSetData.length.toString(),
        selected: true,
        setting: this.elementsData.input_type.text,
        style: { display: "block" },
        conditions: {},
        conditionalField: false,
        condition_select: [],
        value: "",
      };
      this.state.counter.text = this.state.counter.text + 1;
      this.setState({
        ...this.state.counter,
        text: this.state.counter.text + 1,
      });
      let newObj = { ...obj };
      let items = { ...newObj.setting };
      items.id = "text_" + this.state.counter.text;
      items.label = "Text " + this.state.counter.text;
      newObj.setting = items;
      obj = newObj;
    } else if (str == "Number") {
      obj = {
        name: str,
        index: this.state.optionSetData.length,
        id: this.state.optionSetData.length.toString(),
        selected: true,
        setting: this.elementsData.input_type.number,
        style: { display: "block" },
        conditions: {},
        conditionalField: false,
        condition_select: [],
        value: "",
      };
      this.state.counter.number = this.state.counter.number + 1;
      this.setState({
        ...this.state.counter,
        number: this.state.counter.number + 1,
      });
      let newObj = { ...obj };
      let items = { ...newObj.setting };
      items.id = "number_" + this.state.counter.number;
      items.label = "Number " + this.state.counter.number;
      newObj.setting = items;
      obj = newObj;
    } else if (str == "Datetime") {
      // future scope
      obj = {
        name: str,
        index: this.state.optionSetData.length,
        id: this.state.optionSetData.length.toString(),
        selected: true,
        setting: this.elementsData.input_type.datetime,
        style: { display: "block" },
        conditions: {},
        conditionalField: false,
        condition_select: [],
        value: "",
      };
      this.state.counter.datetime = this.state.counter.datetime + 1;
      this.setState({
        ...this.state.counter,
        datetime: this.state.counter.datetime + 1,
      });
      let newObj = { ...obj };
      let items = { ...newObj.setting };
      items.id = "datetime_" + this.state.counter.datetime;
      items.label = "Datetime " + this.state.counter.datetime;
      newObj.setting = items;
      obj = newObj;
    } else if (str == "File") {
      obj = {
        name: str,
        index: this.state.optionSetData.length,
        id: this.state.optionSetData.length.toString(),
        selected: true,
        setting: this.elementsData.input_type.file,
        style: { display: "block" },
        conditions: {},
        conditionalField: false,
        condition_select: [],
        value: "no file",
      };
      this.state.counter.file = this.state.counter.file + 1;
      this.setState({
        ...this.state.counter,
        file: this.state.counter.file + 1,
      });

      let newObj = { ...obj };
      let items = { ...newObj.setting };
      items.id = "file_" + this.state.counter.file;
      items.label = "File " + this.state.counter.file;
      newObj.setting = items;
      obj = newObj;
    } else if (str == "Dropdown") {
      obj = {
        name: str,
        index: this.state.optionSetData.length,
        id: this.state.optionSetData.length.toString(),
        selected: true,
        setting: this.elementsData.select_type.dropdown,
        style: { display: "none" },
        conditions: {},
        conditionalField: false,
        value: "",
      };
      this.state.counter.dropdown = this.state.counter.dropdown + 1;
      this.setState({
        ...this.state.counter,
        dropdown: this.state.counter.dropdown + 1,
      });
      let newObj = { ...obj };
      let items = { ...newObj.setting };
      items.id = "dropdown_" + this.state.counter.dropdown;
      items.label = "Dropdown " + this.state.counter.dropdown;
      newObj.setting = items;
      obj = newObj;
    } else if (str == "Checkbox") {
      obj = {
        name: str,
        index: this.state.optionSetData.length,
        id: this.state.optionSetData.length.toString(),
        selected: true,
        setting: this.elementsData.select_type.checkboxes,
        style: { display: "none" },
        conditions: {},
        conditionalField: false,
        condition_select: [],
        value: [],
      };
      this.state.counter.checkboxes = this.state.counter.checkboxes + 1;
      this.setState({
        ...this.state.counter,
        checkboxes: this.state.counter.checkboxes + 1,
      });
      let newObj = { ...obj };
      let items = { ...newObj.setting };
      items.id = "checkbox_" + this.state.counter.checkboxes;
      items.label = "Checkbox " + this.state.counter.checkboxes;
      newObj.setting = items;
      obj = newObj;
    } else if (str == "Radio Buttons") {
      obj = {
        name: str,
        index: this.state.optionSetData.length,
        id: this.state.optionSetData.length.toString(),
        selected: true,
        setting: this.elementsData.select_type.radio_buttons,
        style: { display: "none" },
        conditions: {},
        conditionalField: false,
        condition_select: [],
        value: "",
      };
      this.state.counter.radio_buttons = this.state.counter.radio_buttons + 1;
      this.setState({
        ...this.state.counter,
        radio_buttons: this.state.counter.text_aradio_buttonsrea + 1,
      });
      let newObj = { ...obj };
      let items = { ...newObj.setting };
      items.id = "radio_buttons_" + this.state.counter.radio_buttons;
      items.label = "Radio Buttons " + this.state.counter.radio_buttons;
      newObj.setting = items;
      obj = newObj;
    } else if (str == "Image Swatches") {
      obj = {
        name: str,
        index: this.state.optionSetData.length,
        id: this.state.optionSetData.length.toString(),
        selected: true,
        setting: this.elementsData.swtaches.image_swatches,
        style: { display: "none" },
        conditions: {},
        conditionalField: false,
        condition_select: [],
        value: "",
      };
      this.state.counter.image_swatches = this.state.counter.image_swatches + 1;
      this.setState({
        ...this.state.counter,
        image_swatches: this.state.counter.image_swatches + 1,
      });
      let newObj = { ...obj };
      let items = { ...newObj.setting };
      items.id = "image_swatches_" + this.state.counter.image_swatches;
      items.label = "Image Swatches " + this.state.counter.image_swatches;
      newObj.setting = items;
      obj = newObj;
    } else if (str == "Color Swatches") {
      obj = {
        name: str,
        index: this.state.optionSetData.length,
        id: this.state.optionSetData.length.toString(),
        selected: true,
        setting: this.elementsData.swtaches.color_swatches,
        style: { display: "none" },
        conditions: {},
        conditionalField: false,
        condition_select: [],
        value: "",
      };
      this.state.counter.color_swatches = this.state.counter.color_swatches + 1;
      this.setState({
        ...this.state.counter,
        color_swatches: this.state.counter.color_swatches + 1,
      });
      let newObj = { ...obj };
      let items = { ...newObj.setting };
      items.id = "color_swatches_" + this.state.counter.color_swatches;
      items.label = "Color Swatches " + this.state.counter.color_swatches;
      newObj.setting = items;
      obj = newObj;
    } else if (str == "Paragraph") {
      obj = {
        name: str,
        index: this.state.optionSetData.length,
        id: this.state.optionSetData.length.toString(),
        selected: true,
        setting: this.elementsData.static_text.paragraph,
        style: { display: "none" },
        conditions: {},
        condition_select: [],
        conditionalField: false,
      };
      this.state.counter.paragraph = this.state.counter.paragraph + 1;
      this.setState({
        ...this.state.counter,
        paragraph: this.state.counter.paragraph + 1,
      });
      let newObj = { ...obj };
      let items = { ...newObj.setting };
      items.id = "paragraph_" + this.state.counter.paragraph;
      items.label = "Paragraph " + this.state.counter.paragraph;
      newObj.setting = items;
      obj = newObj;
    }

    this.state.optionSetData.push(obj);
    this.state.action_perform = true;
    this.setState({
      step: this.state.step + 1,
      editing_index: this.state.optionSetData.length,
      action_perform: true,
    });
  };

  handleDuplicateItem = (name) => {
    let value = "";
    let label = "";

    if (name == "Text Area") {
      this.state.counter.text_area = this.state.counter.text_area + 1;
      this.setState({
        ...this.state.counter,
        text_area: this.state.counter.text_area + 1,
      });
      value = "text_area_" + this.state.counter.text_area;
      label = "Text Area " + this.state.counter.text_area;
    } else if (name == "Text") {
      this.state.counter.text = this.state.counter.text + 1;
      this.setState({
        ...this.state.counter,
        text: this.state.counter.text + 1,
      });

      value = "text_" + this.state.counter.text;
      label = "Text " + this.state.counter.text;
    } else if (name == "Number") {
      this.state.counter.number = this.state.counter.number + 1;
      this.setState({
        ...this.state.counter,
        number: this.state.counter.number + 1,
      });

      value = "number_" + this.state.counter.number;
      label = "Number " + this.state.counter.number;
    } else if (name == "File") {
      this.state.counter.file = this.state.counter.file + 1;
      this.setState({
        ...this.state.counter,
        file: this.state.counter.file + 1,
      });

      value = "file_" + this.state.counter.file;
      label = "File " + this.state.counter.file;
    } else if (name == "Datetime") {
      this.state.counter.datetime = this.state.counter.datetime + 1;
      this.setState({
        ...this.state.counter,
        datetime: this.state.counter.datetime + 1,
      });

      value = "datetime_" + this.state.counter.datetime;
      label = "Datetime " + this.state.counter.datetime;
    } else if (name == "Dropdown") {
      this.state.counter.dropdown = this.state.counter.dropdown + 1;
      this.setState({
        ...this.state.counter,
        dropdown: this.state.counter.dropdown + 1,
      });

      value = "dropdown_" + this.state.counter.dropdown;
      label = "Dropdown " + this.state.counter.dropdown;
    } else if (name == "Checkbox") {
      this.state.counter.checkboxes = this.state.counter.checkboxes + 1;
      this.setState({
        ...this.state.counter,
        checkboxes: this.state.counter.checkboxes + 1,
      });

      value = "checkbox_" + this.state.counter.checkboxes;
      label = "Checkbox " + this.state.counter.checkboxes;
    } else if (name == "Radio Buttons") {
      this.state.counter.radio_buttons = this.state.counter.radio_buttons + 1;
      this.setState({
        ...this.state.counter,
        radio_buttons: this.state.counter.radio_buttons + 1,
      });

      value = "radio_buttons_" + this.state.counter.radio_buttons;
      label = "Radio Buttons " + this.state.counter.radio_buttons;
    } else if (name == "Color Swatches") {
      this.state.counter.color_swatches = this.state.counter.color_swatches + 1;
      this.setState({
        ...this.state.counter,
        color_swatches: this.state.counter.color_swatches + 1,
      });

      value = "color_swatches_" + this.state.counter.color_swatches;
      label = "Color Swatches " + this.state.counter.color_swatches;
    } else if (name == "Image Swatches") {
      this.state.counter.image_swatches = this.state.counter.image_swatches + 1;
      this.setState({
        ...this.state.counter,
        image_swatches: this.state.counter.image_swatches + 1,
      });

      value = "image_swatches_" + this.state.counter.image_swatches;
      label = "Image Swatches " + this.state.counter.image_swatches;
    } else if (name == "Buttons") {
      this.state.counter.buttons = this.state.counter.buttons + 1;
      this.setState({
        ...this.state.counter,
        buttons: this.state.counter.buttons + 1,
      });

      value = "buttons_" + this.state.counter.buttons;
      label = "Buttons " + this.state.counter.buttons;
    } else if (name == "Paragraph") {
      this.state.counter.paragraph = this.state.counter.paragraph + 1;
      this.setState({
        ...this.state.counter,
        paragraph: this.state.counter.paragraph + 1,
      });

      value = "paragraph_" + this.state.counter.paragraph;
      label = "Paragraph " + this.state.counter.paragraph;
    }
    let allValue = {
      value: value,
      label: label,
    };
    return allValue;
  };

  // handleDeleteItem = (name) => {
  //   if (name == "Text Area") {
  //     this.state.counter.text_area = this.state.counter.text_area - 1;
  //           this.setState({
  //             ...this.state.counter,
  //             text_area: this.state.counter.text_area - 1,
  //           });
  //   } else if (name == "Text") {
  //     this.state.counter.text = this.state.counter.text - 1;
  //           this.setState({
  //             ...this.state.counter,
  //             text: this.state.counter.text - 1,
  //           });
  //   } else if (name == "Number") {
  //     this.state.counter.number = this.state.counter.number - 1;
  //           this.setState({
  //             ...this.state.counter,
  //             number: this.state.counter.number - 1,
  //           });
  //   } else if (name == "File") {
  //     this.state.counter.file = this.state.counter.file - 1;
  //           this.setState({
  //             ...this.state.counter,
  //             file: this.state.counter.file - 1,
  //           });
  //   } else if (name == "Datetime") {
  //     this.state.counter.datetime = this.state.counter.datetime - 1;
  //           this.setState({
  //             ...this.state.counter,
  //             datetime: this.state.counter.datetime - 1,
  //           });
  //   } else if (name == "Dropdown") {
  //     this.state.counter.dropdown = this.state.counter.dropdown - 1;
  //           this.setState({
  //             ...this.state.counter,
  //             dropdown: this.state.counter.dropdown - 1,
  //           });
  //   } else if (name == "Checkbox") {
  //     this.state.counter.checkboxes = this.state.counter.checkboxes - 1;
  //           this.setState({
  //             ...this.state.counter,
  //             checkboxes: this.state.counter.checkboxes - 1,
  //           });
  //   } else if (name == "Radio Buttons") {
  //     this.state.counter.radio_buttons = this.state.counter.radio_buttons - 1;
  //           this.setState({
  //             ...this.state.counter,
  //             radio_buttons: this.state.counter.radio_buttons - 1,
  //           });
  //   } else if (name == "Color Swatches") {
  //     this.state.counter.color_swatches = this.state.counter.color_swatches - 1;
  //           this.setState({
  //             ...this.state.counter,
  //             color_swatches: this.state.counter.color_swatches - 1,
  //           });
  //   } else if (name == "Image Swatches") {
  //     this.state.counter.image_swatches = this.state.counter.image_swatches - 1;
  //           this.setState({
  //             ...this.state.counter,
  //             image_swatches: this.state.counter.image_swatches - 1,
  //           });
  //   } else if (name == "Buttons") {
  //     this.state.counter.buttons = this.state.counter.buttons - 1;
  //           this.setState({
  //             ...this.state.counter,
  //             buttons: this.state.counter.buttons - 1,
  //           });
  //   }
  // };

  handleDeletingIndex = (id) => {
    let errorBlock = { ...this.state.label_error };
    // console.log(errorBlock);
    if (errorBlock[id] != undefined) {
      delete errorBlock[id];
    }
    this.state.label_error = errorBlock;
    this.setState({
      label_error: errorBlock,
    });
  };

  deleteElement = (index, command) => {
    const element1 = document.querySelectorAll(`[class^="inner_div_"]`);
    for (let i = 0; i < element1.length; i++) {
      element1[i].style.border = "none";
    }
    // const element2 = document.querySelectorAll(`[id^="image_swatches"]`);
    // for (let i = 0; i < element2.length; i++) {
    //   // console.log(element2[i].children[0])
    //   if (i / 2 != 0) {
    //     element2[i].style.border = "0.1px solid #ddd";
    //   }
    // }
    // console.log("element1");
    let optionSetData = [...this.state.optionSetData];
    let errorBlock = { ...this.state.label_error };
    index = parseInt(index);
    var id = "";
    if (command == "delete") {
      id = optionSetData[index].setting.id;
      this.state.correctswatch;
      this.setState({ correctswatch: id });
      // console.log(id);
      this.handleDeletingIndex(id);
      // this.handleDeleteItem(optionSetData[index].name);
      let pos = this.state.all_conditional
        .map(function (element) {
          return element.value;
        })
        .indexOf(id);
      let conditionalSelect = [...this.state.all_conditional];
      conditionalSelect.splice(pos, 1);
      this.state.all_conditional = conditionalSelect;
      this.state.action_perform = true;
      optionSetData.splice(index, 1);
      for (var i = 0; i < optionSetData.length; i++) {
        optionSetData[i].index = i;
        optionSetData[i].id = i.toString();
      }
      let temp = optionSetData;
      for (var i = 0; i < optionSetData.length; i++) {
        let item = { ...temp[i] };
        let conditions = { ...item.conditions };
        if (conditions.whens != undefined) {
          let whens = [...conditions.whens];
          let pos = whens
            .map((elem) => {
              return elem.select;
            })
            .indexOf(id);
          while (pos != -1) {
            whens.splice(pos, 1);
            pos = whens
              .map((elem) => {
                return elem.select;
              })
              .indexOf(id);
          }
          conditions.whens = whens;
          item.conditions = conditions;
        }
        temp[i] = item;
      }

      this.setState({
        optionSetData: temp,
        all_conditional: conditionalSelect,
        action_perform: true,
      });
    } else if (command == "duplicate") {
      let duplicateItem = { ...optionSetData[index] };
      // console.log(duplicateItem);
      let val = {};
      let changeID = this.handleDuplicateItem(duplicateItem.name);
      let result = this.state.optionSetData.filter(
        (element) =>
          element.setting.id == changeID.value &&
          element.setting.label == changeID.label
      );
      // console.log(result);
      while (result.length != 0) {
        changeID = this.handleDuplicateItem(duplicateItem.name);
        result = this.state.optionSetData.filter(
          (element) =>
            element.setting.id == changeID.value &&
            element.setting.label == changeID.label
        );
      }
      if (errorBlock[duplicateItem.setting.id] != undefined) {
        errorBlock[changeID.value] = changeID.label;
      }
      let duplicateSetting = { ...duplicateItem.setting };
      duplicateSetting.id = changeID.value;
      duplicateSetting.label = changeID.label;
      duplicateItem.setting = duplicateSetting;
      let newValue = val;
      newValue.name = changeID;
      duplicateItem.id = duplicateItem.id + 1;
      const duplicateIndex = index + 1;
      optionSetData.splice(duplicateIndex, 0, duplicateItem);
      for (var i = 0; i < optionSetData.length; i++) {
        optionSetData[i].index = i;
        optionSetData[i].id = i.toString();
      }
      let conditionalSet = {};
      if (
        duplicateItem.name != "Buttons" ||
        duplicateItem.name != "Dropdown" ||
        duplicateItem.name != "Radio Buttons" ||
        duplicateItem.name != "Color Swatches" ||
        duplicateItem.name != "Image Swatches"
      ) {
        const val = {
          label: duplicateItem.setting.label,
          value: duplicateItem.setting.id,
          name: duplicateItem.setting.id,
          index: this.state.optionSetData.length,
          selected: true,
        };
        if (duplicateItem.name != "Paragraph") {
          conditionalSet = val;
        }
      } else {
        const val = {
          label: duplicateItem.setting.label,
          value: "selects_0",
          name: duplicateItem.setting.id,
          index: this.state.optionSetData.length,
          selected: true,
        };
        if (duplicateItem.name != "Paragraph") {
          conditionalSet = val;
        }
      }
      let conditionalSelect = [...this.state.all_conditional];
      conditionalSelect.splice(duplicateIndex + 1, 0, conditionalSet);
      // this.state.all_conditional = conditionalSelect;
      this.setState({
        optionSetData: optionSetData,
        all_conditional: conditionalSelect,
        action_perform: true,
      });
    } else if (command == "view") {
      const copyElement = { ...optionSetData[index] };

      let conditionalSelect = [...this.state.all_conditional];
      conditionalSelect.map((element, i) => {
        if (element.value == optionSetData[index].setting.id) {
          conditionalSelect[i].selected = false;
        }
      });
      this.state.all_conditional = conditionalSelect;
      id = optionSetData[index].setting.id;
      let bool = false;
      if (optionSetData[index].selected) {
        copyElement.selected = false;
        bool = false;
      } else {
        copyElement.selected = true;
        bool = true;
      }
      optionSetData[index] = copyElement;
      this.state.action_perform = true;
      this.state.optionSetData = optionSetData;
      // this.setState({
      //   optionSetData: optionSetData,
      //   action_perform: true,
      // });
      this.handleDeselectedCondional(id, bool);
    }
  };

  handleDeselectedCondional = (id, bool) => {
    let optionSetData = [...this.state.optionSetData];
    let result = [];
    for (var m = 0; m < optionSetData.length; m++) {
      let conditions = optionSetData[m].conditions;
      if (conditions != undefined) {
        let length = Object.keys(optionSetData[m].conditions).length;
        if (length != 0) {
          let whens = conditions.whens;
          for (var n = 0; n < whens.length; n++) {
            if (bool) {
              if (whens[n].oldValue == id) {
                if (!result.includes(m)) {
                  result.push(m);
                }
              }
            } else {
              if (whens[n].select == id) {
                if (!result.includes(m)) {
                  result.push(m);
                }
              }
            }
          }
        }
      }
    }
    for (var i = 0; i < result.length; i++) {
      let checkObj = { ...optionSetData[result[i]] };
      let checkConditons = { ...checkObj.conditions };
      let checkWhens = [...checkConditons.whens];
      let pos = -1;

      let newArray = [];
      if (bool) {
        pos = checkWhens
          .map((element) => {
            return element.oldValue;
          })
          .indexOf(id);
        newArray = checkWhens.filter((elem) => elem.oldValue == id);
      } else {
        pos = checkWhens
          .map((element) => {
            return element.select;
          })
          .indexOf(id);
        newArray = checkWhens.filter((elem) => elem.select == id);
      }
      if (pos != -1) {
        while (newArray.length != 0) {
          let checkWhenItem = { ...checkWhens[pos] };
          if (bool) {
            checkWhenItem.oldValue = "";
            checkWhenItem.select = id;
            checkWhens[pos] = checkWhenItem;
            pos = checkWhens
              .map((element) => {
                return element.select;
              })
              .indexOf(id);
            newArray = checkWhens.filter((elem) => elem.oldValue == id);
          } else {
            checkWhenItem.oldValue = id;
            checkWhenItem.select = "none";
            checkWhens[pos] = checkWhenItem;
            pos = checkWhens
              .map((element) => {
                return element.select;
              })
              .indexOf(id);
            newArray = checkWhens.filter((elem) => elem.select == id);
          }
        }
      }
      checkConditons.whens = checkWhens;
      checkObj.conditions = checkConditons;
      optionSetData[result[i]] = checkObj;
    }
    // this.state.optionSetData = optionSetData;
    this.setState({
      optionSetData: optionSetData,
    });
  };
  handleTabChange = (e, val) => {
    this.changeState(val);
    // console.log(e);

    // setSelected(e);
    this.setState({ tab: e });
    this.handleAddElementTab(e);
    setTimeout(() => {
      let all = [0, 1, 2];
      let i = all.indexOf(e);
      all.splice(i, 1);
      document
        .getElementsByClassName("tab-item")
        [e].classList.add("active-tab");
      all.forEach((element) => {
        document
          .getElementsByClassName("tab-item")
          [element].classList.remove("active-tab");
      });
    }, 100);
  };
  togglemob = () => {
    this.state.mobtoggle
      ? this.setState({ mobtoggle: false })
      : this.setState({ mobtoggle: true });
    this.state.mobtoggle
      ? document
          .getElementsByClassName("leftSidebar")[0]
          .classList.add("mob-res")
      : document
          .getElementsByClassName("leftSidebar")[0]
          .classList.remove("mob-res");
  };
  // stickybar = (val) => {
  //   return (
  //     <div className="outertab">
  //           <div className="toggle-icon" onClick={this.togglemob}>
  //           <Icon source={MobileHamburgerMajor} color="base" />
  //           </div>
  //       {/* <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange} fitted > </Tabs> */}
  //       <div className="tab-item " onClick={() => this.handleTabChange(0, val)}>
  //         <Icon source={HomeMajor} color="base" />
  //         Elements
  //       </div>
  //       <div className="tab-item" onClick={() => this.handleTabChange(1, val)}>
  //         <Icon source={ProductsMajor} color="base" />
  //         Products
  //       </div>
  //       <div className="tab-item" onClick={() => this.handleTabChange(2, val)}>
  //         <Icon source={TemplateMajor} color="base" />
  //         Layout
  //       </div>
  //     </div>
  //   );
  // };
  stickybar = (val) => {
    return (
      <div className="outertab">
        <div className="toggle-icon" onClick={this.togglemob}>
          <span className="mob-close">
            <Icon source={MobileCancelMajor} color="base" />
          </span>
          <Icon source={MobileHamburgerMajor} color="base" />
        </div>
        {/* <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange} fitted > </Tabs> */}
        <div
          className="tab-item active-tab"
          onClick={() => this.handleTabChange(0, val)}
        >
          <Icon source={HomeMajor} color="base" />
          Elements
        </div>
        <div className="tab-item" onClick={() => this.handleTabChange(1, val)}>
          <Icon source={ProductsMajor} color="base" />
          Products
        </div>
        <div className="tab-item" onClick={() => this.handleTabChange(2, val)}>
          <Icon source={TemplateMajor} color="base" />
          Layout
        </div>
      </div>
    );
  };
  navigationBar = () => {
    if (this.state.step === 2) {
      return (
        <div className="sd-ado-miantab-panel">
          {this.stickybar("optionset")}
          <OptionsSet
            saveOptionSetData={this.addClientData}
            getBack={this.changeState}
          />
        </div>
      );
    } else if (this.state.step === 1) {
      return (
        <div>
          <AddElement
            changeLayout={this.changeLayout}
            layoutType={this.state.layoutType}
            handleTabIndex={this.handleAddElementTab}
            tabs={this.state.tab}
            toastErrorSucessState={this.toastErrorSucessState} //no use
            singleLayout={this.state.mainLayout}
            typo_layout={this.state.typo_layout}
            general_layout={this.state.general_layout}
            // error_msg={this.state.error_msg}
            color_layout={this.state.color_layout}
            handleLayout={this.handleLayout}
            checkInstall={this.state.checkInstall}
            shop={this.state.shop}
            handle={this.handleProducts}
            products={this.state.selectedProductRules}
            moreSetting={this.deleteElement}
            selectElement={this.changeState}
            data={this.state.optionSetData}
            dragElement={this.handleTheDrag}
            re_editingData={this.reEditData}
          />
        </div>
      );
    } else if (this.state.step === 3) {
      return (
        <div className="sd-ado-miantab-panel">
          {this.stickybar("inputdata")}
          <InputData
            makeConditionalChange={this.makeConditionalChange}
            handleLabelError={this.handleLabelError}
            deleteInside={this.handleInsideDelete}
            handleDelete={this.deleteElement}
            handleError={this.handleErrorBlockObj}
            toastErrorSucessState={this.toastErrorSucessState} //no use
            shop={this.state.shop}
            mainTheme={this.state.mainTheme}
            saveData={this.keepSavingData}
            saveOptionSetData={this.reEditStep}
            index={this.state.editing_index}
            data={this.state.optionSetData}
            counter={this.state.counter}
            handleLoader={this.handleLoader}
            // showimage={this.showimage}
          />
        </div>
      );
    }
  };

  handleInsideDelete = () => {
    this.setState({
      step: 1,
      index: 0,
    });
  };

  reEditStep = (str, items) => {
    if (str == "first") {
      let newItems = [...this.state.optionSetData];
      newItems = items;
      this.setState({
        optionSetData: newItems,
      });
      this.setState({
        step: 1,
        index: 0,
      });
    } else if (str == "second") {
      this.setState({
        step: 3,
        index: 0,
      });
    }
  };

  keepSavingData = (obj) => {
    this.setState({
      action_perform: true,
      optionSetData: obj,
    });
  };
  changeTheConditions = (id, value) => {
    let items = [...this.state.optionSetData];
    let index = -1;
    for (let i = 0; i < items.length; i++) {
      if (items[i].setting.id == id) {
        index = i;
      }
    }
    if (index != -1) {
      let item = { ...items[index] };
      if (item.name == "Checkbox") {
        const result = item.value.includes(value);
        if (result) {
          item.value.splice(item.value.indexOf(value), 1);
        } else {
          item.value.push(value);
        }
      } else {
        item.value = value;
      }

      items[index] = item;
      this.setState({
        optionSetData: items,
      });
    }
  };

  makeConditionalChange = () => {
    this.setState({
      conditionalChange: true,
    });
  };

  renderStepOne = () => {
    return (
      <div className={"sd-ado-topbar " + this.state.responsiveClasses}>
        <AllElements
          generalLayout={this.state.general_layout}
          typoLayout={this.state.typo_layout}
          // errorLayout={this.state.error_msg}
          colorLayout={this.state.color_layout}
          mainLayout={this.state.mainLayout}
          keyValue={this.state.key}
          buttonBool={this.state.buttonState}
          layout={this.state.layout}
          changeCondition={this.changeTheConditions}
          data={this.state.optionSetData}
          products={this.state.selectedProductRules}
          correctswatch={this.state.correctswatch}
          // showimage={this.state.showimage1}
          // imageURL={this.state.imageURL}
        />
      </div>
    );
  };

  handleName = (value) => {
    this.setState({
      action_perform: true,
      name: value,
    });
  };

  handleLabelError = (id, label, bool) => {
    let errorBlock = { ...this.state.label_error };
    if (label == "select") {
      if (bool) {
        errorBlock[id] = "select";
      } else {
        if (errorBlock[id] != undefined) {
          delete errorBlock[id];
        }
      }
    } else {
      if (bool) {
        errorBlock[id] = "nonselect";
      } else {
        if (errorBlock[id] != undefined) {
          delete errorBlock[id];
        }
      }
    }
    this.setState({
      label_error: errorBlock,
    });
  };

  handleErrorBlockObj = (bool, obj) => {
    this.handleLabelError(obj.id, "select", bool);
  };

  responsiveViewChange = (value) => {
    this.setState({ responsiveClasses: value });
  };

  handleLoader = (v) => {
    this.setState({ isLoading: v });
  };
  render() {
    // console.log(this.state.optionSetData);
    // console.log(this.state.counter);

    return (
      <Spin tip="Please Wait..." spinning={this.state.isLoading}>
        {/* {this.state.redirect && <Navigate to="/option-sets" replace={true} />} */}
        <div>
          <Header
            handleStatus={this.handleStatus}
            responsiveViewChange={this.responsiveViewChange}
            selectedProductRules={this.state.selectedProductRules}
            allChecked={this.state.allChecked}
            status={this.state.status}
            updateId={this.state.updateId}
            allNames={this.state.allNames}
            changeLayout={this.changeLayout}
            labelError={this.state.label_error}
            checkTab={this.state.layoutType}
            action_perform={this.state.action_perform}
            errorBlock={this.state.error_block}
            index={this.state.editing_index}
            optionSetData={this.state.optionSetData}
            toastErrorSucessState={this.toastErrorSucessState}
            getBack={this.changeState}
            step={this.state.step}
            buttonBool={this.state.buttonState} //no use
            checkInstall={this.state.checkInstall}
            handleOptionSetName={this.handleName}
            name={this.state.name}
            decrementStep={this.decrementMain}
            saveOptionSetData={this.saveDatatoDB}
            checkFunc={this.reEditStep}
          />
        </div>
        <div className="mob-pol">
          <Layout>
            <Layout.Section oneThird>
              <div className="leftSidebar">{this.navigationBar()}</div>
            </Layout.Section>
            <Layout.Section>{this.renderStepOne()}</Layout.Section>
            {this.toastSuccessError()}
          </Layout>
        </div>
      </Spin>
    );
  }
}
export default Createoptions;
