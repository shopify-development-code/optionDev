import React, { Component } from "react";
import {
  TextField,
  Checkbox,
  HorizontalStack,
  Tabs,
  Tooltip,
  Icon,
  Text,
  Button,
  VerticalStack,
} from "@shopify/polaris";
import {
  QuestionMarkMinor,
  SettingsMajor,
  ColorsMajor,
} from "@shopify/polaris-icons";
import DateTime from "./DateTime";
import Select from "./Select";
import Swatches from "./Swatches";
import Appearence from "./Appearence";
import Paragraph from "./Paragraph";
import Conditions from "./Conditions";

class InputData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: this.props.data,
      index: this.props.index - 1,
      type: "none",
      selected: 0,
      conditionalData: [],
      all_conditional: [
        {
          label: "PLEASE SELECT",
          value: "please_select",
          name: "please_select",
          index: -1,
          selected: true,
        },
      ],
      label_error: false,
    };

    this.handleTextChange = this.handleTextChange.bind(this);
    this.fillBlanks = this.fillBlanks.bind(this);
    this.changeTab = this.changeTab.bind(this);
    this.selectSaveData = this.selectSaveData.bind(this);
    this.appearenceType = this.appearenceType.bind(this);
    this.setAppearence = this.setAppearence.bind(this);
    this.showInputFeilds = this.showInputFeilds.bind(this);
    this.showTabs = this.showTabs.bind(this);
    this.handleParagraph = this.handleParagraph.bind(this);
    this.showCondtions = this.showCondtions.bind(this);
    this.saveConditionalData = this.saveConditionalData.bind(this);
    this.saveDateTimeData = this.saveDateTimeData.bind(this);
    this.handleConditionalSelect = this.handleConditionalSelect.bind(this);
    this.showConditionPerElement = this.showConditionPerElement.bind(this);
    this.handleSelectError = this.handleSelectError.bind(this);
  }

  handleValidation = (noticeErrorSucess, statusErrorSucess) => {
    this.props.toastErrorSucessState(
      true,
      noticeErrorSucess,
      statusErrorSucess
    );
  };

  saveConditionalData(arr) {
    let items = [...this.state.items];
    items = arr;
    this.state.items = items;
    this.props.saveData(items);
    this.props.makeConditionalChange();
    this.setState({
      items: items,
    });
  }
  handleConditionalSelect(value, id) {
    let items = [...this.state.items];
    let item = { ...items[this.state.index] };
    if (value) {
      if (this.state.index > 0) {
        let check = true;
        if (items[0].name == "Paragraph") {
          if (this.state.index == 1) {
          }
        }
        let obj = {};
        if (check) {
          obj = {
            display: "SHOWSTYLE",
            match: "ALLVALUE",
            oldSTYLE: "SHOWSTYLE",
            whens: [
              {
                select: "none",
                where: "EQUALS",
                value: "null",
                oldValue: "",
              },
            ],
          };
        }

        let conditions = { ...item.conditions };
        conditions = obj;
        item.conditions = conditions;
        item.conditionalField = value;
        items[this.state.index] = item;
        this.state.items = items;
        this.props.saveData(this.state.items);
        this.setState({
          items: items,
        });
      } else {
      }
    } else {
      item.conditions = {};
      item.conditionalField = value;
      items[this.state.index] = item;
      this.state.items = items;
      this.props.saveData(this.state.items);
      this.setState({
        items: items,
      });
    }
  }
  handleErrorFunc(bool, label, id) {
    let obj = {
      label: label,
      id: id,
    };
    this.props.handleError(bool, obj);
  }
  handleTextChange(value, id) {
    let items = [...this.props.data];
    let item = { ...items[this.state.index] };
    let newItem = { ...item.setting };

    if (id == "label") {
      let check = [];
      items.map((element, index) => {
        if (index != this.props.index - 1) {
          if (
            element.setting.label.trim().toLowerCase() ==
            value.trim().toLowerCase()
          ) {
            check.push(true);
          }
        }
      });
      if (check.length > 0) {
        this.props.handleLabelError(newItem.id, value, true);
        newItem.label = value;
        this.setState({
          label_error:
            "Label must be unique. There is already an option with the same name in this option sets.",
        });
      } else {
        if (value.trim() == "") {
          newItem.label = value;
          this.props.handleLabelError(newItem.id, value, true);
          this.setState({
            label_error: "Label must not be empty",
          });
        } else {
          this.props.handleLabelError(newItem.id, value, false);
          newItem.label = value;

          this.setState({
            label_error: false,
          });
        }
      }
    } else if (id == "add_on_price") {
      if (value == "") {
        newItem.addon = value;
      } else {
        if (!value.includes("e")) {
          value = parseInt(value);
          if (value >= 0) {
            newItem.addon = value.toString();
          }
        }
      }
    } else if (id == "placeholder") {
      newItem.placeholder = value;
    } else if (id == "help_text") {
      newItem.helptext = value;
    } else if (id == "hidden") {
      newItem.hidden_label = !newItem.hidden_label;
    } else if (id == "reqd") {
      newItem.required = !newItem.required;
    } else if (id == "time_format") {
      newItem.time_format = value;
    } else if (id == "date_format") {
      newItem.date_format = value;
    } else if (id == "lang_bool") {
      newItem.lang_bool = value;
    } else if (id == "disable_past_dates") {
      newItem.disablePastDates = value;
    } else if (id == "language_add") {
      if (!value) {
        newItem.localization = "es_lang";
      }
      newItem.language = value;
    } else if (id == "change_localization") {
      newItem.localization = value;
    } else if (id == "limit_dates") {
      newItem.isLimitDate = value;
    } else if (id == "limit_date_type") {
      newItem.limitDateType = value;
    } else if (id == "week_days") {
      newItem.limitDateDOWEnabled = value;
    } else if (id == "range_dates") {
      newItem.limitDateRangeEnabled = value;
    } else if (id == "specific_dates") {
      newItem.limitDateSpecificEnabled = value;
    } else if (id == "main_format") {
      newItem.format = value;
      if (value == "Date-And-Time") {
        newItem.selected = 0;
      } else if (value == "Date") {
        newItem.selected = 1;
      } else if (value == "Time") {
        newItem.selected = 2;
      }
    } else if (id == "limitRangeDates") {
      newItem.limitDateRangeDates = value;
    } else if (id == "limitSpecificDates") {
      newItem.limitDateSpecificDates = value;
    } else if (id == "daysofweek") {
      newItem.limitDateDOWDates = value;
    } else if (id == "limitRangeObject") {
      newItem.rangeDate = value;
    } else if (id == "keydate") {
      newItem.key = value;
    } else if (id == "file_extension") {
      newItem.allowed_extensions = value;
    }

    item.setting = newItem;
    items[this.state.index] = item;
    this.state.items = items;
    this.props.saveData(items);
    this.setState({
      items: items,
    });
  }
  selectSaveData(obj) {
    let items = [...this.state.items];
    let item = { ...items[this.state.index] };
    let newItem = { ...item.setting };
    newItem.option_values = obj;
    item.setting = newItem;
    items[this.state.index] = item;
    this.state.items = items;
    this.props.saveData(this.state.items);
    this.setState({
      items: items,
    });
  }
  handleParagraph(obj) {
    let items = [...this.state.items];
    let item = { ...items[this.state.index] };
    item = obj;
    items[this.state.index] = item;
    this.state.items = items;
    this.props.saveData(this.state.items);
    this.setState({
      items: items,
    });
  }
  saveDateTimeData(data) {
    let items = [...this.props.data];
    items = data;
    this.state.items = items;
    this.props.saveData(items);
    this.setState({
      items: items,
    });
  }
  handleSelectError(bool, label, id) {
    this.handleErrorFunc(bool, label, id);
  }

  checkTheType() {
    if (this.state.type != "none") {
      if (this.state.type == "Datetime") {
        return (
          <DateTime
            handleDate={this.handleTextChange}
            data={this.state.items}
            clickFunc={this.saveDateTimeData}
            index={this.state.index}
          />
        );
      }
      else if (
        this.state.type == "Dropdown" ||
        this.state.type == "Checkbox" ||
        this.state.type == "Radio Buttons" ||
        this.state.type == "Buttons" ||
        this.state.type == "Image Swatches"
      ) {
        return (
          <Select
            handleError={this.handleSelectError}
            toastErrorSucessState={this.handleValidation}
            shop={this.props.shop}
            mainTheme={this.props.mainTheme}
            type={this.state.type}
            saveData={this.selectSaveData}
            data={this.state.items}
            index={this.state.index}
            handleLoader={this.props.handleLoader}
          />
        );
      } else if (this.state.type === "Color Swatches") {
        return (
          <Swatches
            handleError={this.handleSelectError}
            toastErrorSucessState={this.handleValidation}
            saveData={this.selectSaveData}
            data={this.state.items}
            index={this.state.index}
            type={this.state.type}
          />
        );
      } else if (this.state.type === "Paragraph") {
        return (
          <Paragraph
            saveData={this.handleParagraph}
            data={this.state.items}
            index={this.state.index}
            type={this.state.type}
          />
        );
      }
    }
  }
  changeTab(e) {
    this.setState({
      selected: e,
    });
  }

  showInputFeilds() {
    if (this.state.items[this.state.index].name != "Paragraph") {
      return (
        <div className="sd-ado-maindatasets">
          <TextField
            label={
              <div style={{ display: "flex" }}>
                <Text>Label</Text>
                <div className="wowoption-tool-tip-outer">
                  <Tooltip
                    content={
                      <span className="wowoption-tool-tip">
                        Enter label name
                      </span>
                    }
                    dismissOnMouseOut
                  >
                    <Icon source={QuestionMarkMinor}></Icon>
                  </Tooltip>
                </div>
              </div>
            }
            id="label"
            value={this.state.items[this.state.index].setting.label}
            onChange={this.handleTextChange}
            maxLength={50}
            error={this.state.label_error}
            showCharacterCount
            onpaste="return false"
          />

          {this.state.items[this.state.index].name != "File" ? (
            <div
              className="add_on_price_option"
              style={this.state.items[this.state.index].style}
            >
              <TextField
                label={
                  <div style={{ display: "flex" }}>
                    <Text>Add on price</Text>
                    <div className="wowoption-tool-tip-outer">
                      <Tooltip
                        content={
                          <span className="wowoption-tool-tip">
                            Enter price
                          </span>
                        }
                        dismissOnMouseOut
                      >
                        <Icon source={QuestionMarkMinor}></Icon>
                      </Tooltip>
                    </div>
                  </div>
                }
                id="add_on_price"
                type="text"
                value={this.state.items[this.state.index].setting.addon}
                onChange={this.handleTextChange}
                pattern="[0-9]+"
                maxLength={5}
              />
            </div>
          ) : (
            ""
          )}
          <HorizontalStack vertical>
            <Checkbox
              label={
                <div style={{ display: "flex" }}>
                  <Text>Required</Text>
                  <div className="wowoption-tool-tip-outer">
                    <Tooltip
                      content={
                        <span className="wowoption-tool-tip">
                          Make field required
                        </span>
                      }
                      dismissOnMouseOut
                    >
                      <Icon source={QuestionMarkMinor}></Icon>
                    </Tooltip>
                  </div>
                </div>
              }
              id="reqd"
              checked={this.state.items[this.state.index].setting.required}
              onChange={this.handleTextChange}
            />
            <Checkbox
              label={
                <div style={{ display: "flex" }}>
                  <Text>Hide element label</Text>
                  <Tooltip
                    content={
                      <span className="wowoption-tool-tip">
                        Make field's label hidden
                      </span>
                    }
                    dismissOnMouseOut
                  >
                    <Icon source={QuestionMarkMinor}></Icon>
                  </Tooltip>
                </div>
              }
              id="hidden"
              checked={this.state.items[this.state.index].setting.hidden_label}
              onChange={this.handleTextChange}
            />
          </HorizontalStack>
          {this.placehoderFunc(this.state.items[this.state.index].name)}
          <TextField
            label="Help text"
            id="help_text"
            value={this.state.items[this.state.index].setting.helptext}
            onChange={this.handleTextChange}
          />
          {this.checkTheType()}
          <Button
            id="sd-ado-removeelement"
            size="slim"
            onClick={() => {
              let command = "delete";
              let index = this.props.index - 1;
              this.props.handleDelete(index, command);
              this.props.deleteInside();
            }}
          >
            Remove element
          </Button>
        </div>
      );
    } else {
      return (
        <div className="sd-ado-maindatasets">
          {this.checkTheType()}
          <Button
            id="sd-ado-removeelement"
            size="slim"
            onClick={() => {
              let command = "delete";
              let index = this.props.index - 1;
              this.props.handleDelete(index, command);
              this.props.deleteInside();
            }}
          >
            Remove element
          </Button>
        </div>
      );
    }
  }
  placehoderFunc(name) {
    if (name == "Text Area" || name == "Text" || name == "Number") {
      return (
        <TextField
          label="Placeholder"
          value={this.state.items[this.state.index].setting.placeholder}
          id="placeholder"
          onChange={this.handleTextChange}
        />
      );
    } else {
      return <div></div>;
    }
  }
  showConditionPerElement() {
    if (this.state.index == 0) {
      return <div></div>;
    } else {
      return (
        <div>
          <div className="conditional_logic_HorizontalStack">
            <VerticalStack>
              <Checkbox
                label="Conditional Logic"
                id="conditional_logic_check"
                checked={this.state.items[this.state.index].conditionalField}
                onChange={this.handleConditionalSelect}
              />
            </VerticalStack>
          </div>
          {this.showCondtions()}
        </div>
      );
    }
  }
  showTabs() {
    const tabs = [
      {
        id: "setting-0",
        content: (
          <div className="set-icon">
            <Icon source={SettingsMajor} color="base" />
            Settings{" "}
          </div>
        ),
      },
      {
        id: "appearence-0",
        content: (
          <div className="set-icon">
            <Icon source={ColorsMajor} color="base" />
            Appearance{" "}
          </div>
        ),
      },
    ];
    if (this.state.items[this.state.index].name != "Paragraph") {
      return (
        <Tabs
          tabs={tabs}
          selected={this.state.selected}
          onSelect={this.changeTab}
          fitted
        >
          {this.fillBlanks(this.state.selected)}
        </Tabs>
      );
    } else {
      return (
        <div>
          {this.fillBlanks(this.state.selected)}
        </div>
      );
    }
  }
  fillBlanks(val) {
    console.log(this.state.items[this.state.index].name);
    this.state.type = this.state.items[this.state.index].name;
    if (val == 0) {
      return this.showInputFeilds();
    } else if (val == 1) {
      return this.appearenceType();
    }
  }
  setAppearence(obj) {
    let items = [...this.props.data];
    let item = { ...items[this.state.index] };
    let newItem = { ...item.setting };
    let appearenceItem = { ...newItem.css };
    appearenceItem = obj;
    newItem.css = appearenceItem;
    item.setting = newItem;
    items[this.state.index] = item;
    this.state.items = items;
    this.props.saveData(items);
    this.setState({
      items: items,
    });
  }
  appearenceType() {
    return (
      <Appearence
        index={this.state.index}
        data={this.state.items}
        type={this.state.type}
        saveData={this.setAppearence}
      />
    );
  }

  showCondtions() {
    if (!this.props.data[this.props.index - 1].conditionalField) {
      return <div className="conditional_base"></div>;
    } else {
      return (
        <div className="conditional_base">
          <Conditions
            handleValid={this.handleValidation}
            handleError={this.handleErrorFunc}
            saveAllData={this.saveConditionalData}
            data={this.state.items}
            condition_select={this.state.all_conditional}
            conditions={this.state.conditionalData}
            index={this.state.index}
            type={this.state.type}
          />
        </div>
      );
    }
  }
  render() {
    return <div className="tabdata set-appear">{this.showTabs()}</div>;
  }
}
export default InputData;
