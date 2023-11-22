import React, { Component } from "react";
import {
  HorizontalStack,
  Text,
  Select,
  TextField,
  Button,
  ButtonGroup,
} from "@shopify/polaris";
import { DeleteMajor } from "@shopify/polaris-icons";
import Flatpickr from "react-flatpickr";
import { element } from "prop-types";
export default class Condition extends Component {
  constructor(props) {
    super(props);
    this.options = {
      text: [
        { label: "Is equal to", value: "EQUALS" },
        { label: "Is not equal to", value: "NOTEQUALS" },
        // {label: 'Starts with', value: 'STARTS'},
        // {label: 'Ends with', value: 'ENDS'},
        { label: "Contains", value: "CONTAIN" },
        { label: "Does not Contain", value: "DOESNOTCONTAIN" },
      ],
      number: [
        { label: "Is equal to", value: "EQUALS" },
        { label: "Is not equal to", value: "NOTEQUALS" },
        { label: "Is less than", value: "NOTGREATER" },
        { label: "Is greater than", value: "GREATER" },
      ],
      datetime: [
        { label: "Is equal to", value: "EQUALS" },
        { label: "Is not equal to", value: "NOTEQUALS" },
      ],
      file: [
        { label: "Has File", value: "hasfile" },
        { label: "Has no File", value: "hasnofile" },
      ],
      selects: [
        { label: "Is equal to", value: "EQUALS" },
        { label: "Is not equal to", value: "NOTEQUALS" },
      ],
      checkbox: [
        { label: "Is equal to", value: "EQUALS" },
        { label: "Is not equal to", value: "NOTEQUALS" },
        // {label: 'Contains', value: 'CONTAIN'},
        // {label: 'Does not Contain', value: 'DOESNOTCONTAIN'}
      ],
      all_selects: [
        { label: "Select element", value: "PLEASESELECT" },
        { label: "Is equal to", value: "EQUALS" },
        { label: "Is not equal to", value: "NOTEQUALS" },
        // {label: 'Starts with', value: 'STARTS'},
        // {label: 'Ends with', value: 'ENDS'},
        { label: "Contains", value: "CONTAIN" },
        { label: "Does not Contain", value: "NOTCONTAIN" },
        { label: "Has File", value: "hasfile" },
      ],
      select_show: [
        { label: "Show", value: "SHOWSTYLE" },
        { label: "Hide", value: "HIDESTYLE" },
      ],
      select_num: [
        { label: "All", value: "ALLVALUE" },
        { label: "Any", value: "ANYVALUE" },
      ],
    };
    this.state = {
      data: this.props.data,
      type: this.props.type,
      index: this.props.index,
      // can_select:this.props.condition_select,
      all_conditional: [
        {
          label: "PLEASE SELECT",
          value: "none",
          name: "please_select",
          index: -1,
          selected: true,
          disabled: false,
        },
      ],
      select_object: {},
    };
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.checkTheType = this.checkTheType.bind(this);
    this.handleText = this.handleText.bind(this);
    this.handleProps = this.handleProps.bind(this);
    this.handleSelectCondition = this.handleSelectCondition.bind(this);
  }
  componentDidMount() {
    let items = [...this.state.all_conditional];
    let data = [...this.props.data];
    data.map((element, index) => {
      if (index < this.props.index) {
        const val = {
          label: element.setting.label,
          value: element.setting.id,
          name: element.setting.id,
          index: this.props.data.length,
          selected: true,
          option_values: [],
          type: "text/num",
          disabled: false,
        };
        if (!element.selected) {
          val.disabled = true;
        }
        if (
          element.name == "Dropdown" ||
          element.name == "Checkbox" ||
          element.name == "Radio Buttons" ||
          element.name == "Buttons" ||
          element.name == "Image Swatches" ||
          element.name == "Color Swatches"
        ) {
          let option_values = [{ label: "Please Select", value: "none" }];

          element.setting.option_values.map((element) => {
            option_values.push({ label: element.value, value: element.value });
          });
          val.option_values = option_values;
          val.type = "select/swatch";
        }
        if (element.name != "Paragraph") {
          items.push(val);
        }
      }
    });

    let stateObject = { ...this.state.select_object };
    items.map((element) => {
      if (element.type == "select/swatch") {
        stateObject[element.value] = element.option_values;
      }
    });
    this.state.select_object = stateObject;
    this.state.all_conditional = items;
    this.setState({
      select_object: stateObject,
      all_conditional: items,
    });
  }
  componentDidUpdate() {}
  handleText(value, id) {
    var new_id = id;
    new_id = new_id.split("_");
    const index = parseInt(new_id[1]);
    let allData = [...this.props.data];
    let data_arr = { ...allData[this.state.index] };
    let conditions = { ...data_arr.conditions };
    let whens = [...conditions.whens];
    let whenItem = { ...whens[index] };
    let val = value;
    if (val.trim() == "") {
      whenItem.value = val.trim();
    } else {
      whenItem.value = val;
    }
    whens[index] = whenItem;
    conditions.whens = whens;
    data_arr.conditions = conditions;
    allData[this.state.index] = data_arr;
    this.state.data = allData;
    this.props.saveAllData(allData);
    this.setState({
      data: allData,
    });
  }
  handleSelectChange(value, id) {
    var newId = id;
    newId = newId.split("_");
    const index = parseInt(newId[1]);
    let allData = [...this.props.data];
    let data_arr = { ...allData[this.state.index] };
    let conditions = { ...data_arr.conditions };
    let whens = { ...conditions.whens[index] };
    let cheker = value.split("_");
    if (newId[0] == "select") {
      if (whens.select == "none") {
        whens.value = "";
      }
      if (cheker[0] == "none") {
        whens.value = "null";
      } else if (cheker[0] == "file") {
        whens.value = "file";
        whens.where = "hasfile";
      }

      whens.select = value;
      whens.oldValue = "";
      let result = this.state.all_conditional.filter(
        (element) => element.name == value
      );
    } else if (newId[0] == "where") {
      whens.where = value;
      if (value == "hasfile") {
        whens.value = "file";
      } else if (value == "hasnofile") {
        whens.value = "no file";
      }
    } else if (newId[0] == "val") {
      whens.value = value;
    }
    conditions.whens[index] = whens;
    data_arr.conditions = conditions;
    allData[this.state.index] = data_arr;
    this.state.data = allData;
    this.props.saveAllData(allData);
    this.setState({
      data: allData,
    });
  }
  handleProps(value, id) {
    let items = [...this.props.data];
    let checkItem = { ...items[this.state.index] };
    let conditions = { ...checkItem.conditions };
    if (id == "show") {
      conditions.display = value;
      conditions.oldSTYLE = value;
      if (value == "SHOWSTYLE") {
        checkItem.style = { display: "none" };
      } else if (value == "HIDESTYLE") {
        checkItem.style = { display: "block" };
      }
    } else if (id == "toall") {
      conditions.match = value;
    }
    checkItem.conditions = conditions;
    items[this.state.index] = checkItem;
    this.state.data = items;
    this.props.saveAllData(items);
    this.setState({
      data: items,
    });
  }
  handleClick(id) {
    var new_id = id;
    new_id = new_id.split("_");
    let allData = [...this.props.data];
    let data_arr = { ...allData[this.state.index] };
    let conditions = { ...data_arr.conditions };
    let data_whens = [...conditions.whens];
    if (new_id[0] == "addMore") {
      if (this.state.all_conditional.length > 1) {
        const obj = {
          select: "none",
          where: "EQUALS",
          value: "null",
          oldValue: "",
        };
        data_whens.push(obj);
      } else {
        this.props.handleValid("Conditions can't be added");
      }
    } else if (new_id[0] == "delete") {
      const index = parseInt(new_id[1]);
      data_whens.splice(index, 1);
    }
    conditions.whens = data_whens;
    data_arr.conditions = conditions;
    allData[this.state.index] = data_arr;
    this.state.data = allData;
    this.props.saveAllData(allData);
    this.setState({
      data: allData,
    });
  }
  checkTheType(val, where, index) {
    const id = val.split("_");
    if (id[0] == "text") {
      return (
        <Select
          id={"where_" + index}
          options={this.options.text}
          onChange={this.handleSelectChange}
          value={where}
        />
      );
    } else if (id[0] == "number") {
      return (
        <Select
          id={"where_" + index}
          options={this.options.number}
          onChange={this.handleSelectChange}
          value={where}
        />
      );
    } else if (
      id[0] == "dropdown" ||
      id[0] == "image" ||
      id[0] == "buttons" ||
      id[0] == "color" ||
      id[0] == "radio"
    ) {
      return (
        <Select
          id={"where_" + index}
          options={this.options.selects}
          onChange={this.handleSelectChange}
          value={where}
        />
      );
    } else if (id[0] == "datetime") {
      return (
        <Select
          id={"where_" + index}
          options={this.options.datetime}
          onChange={this.handleSelectChange}
          value={where}
        />
      );
    } else if (id[0] == "file") {
      return (
        <Select
          id={"where_" + index}
          options={this.options.file}
          onChange={this.handleSelectChange}
          value={where}
        />
      );
    } else if (id[0] == "checkbox") {
      return (
        <Select
          id={"where_" + index}
          options={this.options.checkbox}
          onChange={this.handleSelectChange}
          value={where}
        />
      );
    }
  }
  handleSelectCondition(val, where, index, value) {
    const id = val.split("_");

    if (id[0] == "text" || id[0] == "number") {
      return (
        <TextField
          min={1}
          type={id[0]}
          placeholder="none"
          className="condition_text_feild"
          id={"val_" + index}
          value={value}
          onChange={this.handleText}
        />
      );
    } else if (
      id[0] == "dropdown" ||
      id[0] == "image" ||
      id[0] == "buttons" ||
      id[0] == "color" ||
      id[0] == "radio" ||
      id[0] == "checkbox"
    ) {
      return (
        <Select
          id={"val_" + index}
          options={this.state.select_object[val]}
          onChange={this.handleSelectChange}
          value={value}
        />
      );
    } else if (id[0] == "datetime") {
      let dateTimeOptions = {
        dateFormat: "Y-m-d",
        defaultDate: value,
      };
      return (
        <Flatpickr
          onChange={(str) => {
            let id = "val_" + index;
            function convert(str) {
              var date = new Date(str),
                mnth = ("0" + (date.getMonth() + 1)).slice(-2),
                day = ("0" + date.getDate()).slice(-2);
              return [date.getFullYear(), mnth, day].join("-");
            }
            let date = convert(str[0]);
            // console.log(date);
            this.handleSelectChange(date, id);
          }}
          options={dateTimeOptions}
        />
      );
    } else if (id[0] == "file") {
      return <div></div>;
    } else {
      return <div></div>;
    }
  }
  render() {
    // console.log(this.state.data[this.state.index].conditions.whens);
    return (
      <div>
        <HorizontalStack spacing="loose">
          <Select
            id="show"
            options={this.options.select_show}
            onChange={this.handleProps}
            value={this.state.data[this.state.index].conditions.display}
          />
          <Text variation="strong"> this feild if </Text>
          <Select
            id="toall"
            options={this.options.select_num}
            onChange={this.handleProps}
            value={this.state.data[this.state.index].conditions.match}
          />
          <Text variation="strong"> of following :-</Text>
        </HorizontalStack>
        {this.state.data[this.state.index].conditions.whens.map(
          (elem, index) => {
            return (
              <div
                key={index}
                style={{
                  display: elem.style,
                  marginTop: "5px",
                  marginBottom: "5px",
                }}
                className="conditional_set"
              >
                <HorizontalStack>
                  <Select
                    id={"select_" + index}
                    options={this.state.all_conditional}
                    onChange={this.handleSelectChange}
                    value={elem.select}
                  />
                  {this.checkTheType(elem.select, elem.where, index)}
                  {this.handleSelectCondition(
                    elem.select,
                    elem.where,
                    index,
                    elem.value
                  )}
                  <Button
                    icon={DeleteMajor}
                    onClick={(e) => {
                      let id = e.target.id;
                      if (id == "") {
                        id = e.target.parentNode.id;
                        if (id == "") {
                          id = e.target.parentNode.parentNode.id;
                          if (id == "") {
                            id = e.target.parentNode.parentNode.parentNode.id;
                            if (id == "") {
                              id =
                                e.target.parentNode.parentNode.parentNode
                                  .parentNode.id;
                              if (id == "") {
                                id =
                                  e.target.parentNode.parentNode.parentNode
                                    .parentNode.parentNode.id;
                              }
                            }
                          }
                        }
                      }
                      this.handleClick(id);
                    }}
                    id={"delete_" + index}
                  ></Button>
                </HorizontalStack>
              </div>
            );
          }
        )}
        <ButtonGroup segmented>
          <Button
            id={"addMore_" + 0}
            onClick={(e) => {
              this.handleClick(e.target.id);
            }}
          >
            <span id={"addMore_" + 0}>Add More Condition</span>
          </Button>
        </ButtonGroup>
      </div>
    );
  }
}
