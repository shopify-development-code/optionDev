import React, { Component } from "react";
import { TextField, Button, ButtonGroup, Select, Icon, DataTable, Text } from "@shopify/polaris";
import { DeleteMajor } from "@shopify/polaris-icons";

export default class Swatches extends Component {
  constructor(props) {
    super(props);
    this.state = {
      optionValues: this.props.data[this.props.index].setting.option_values,
      count: 1,
      type: this.props.type,
    };
    this.options = [
      { label: "One Color", value: "one-color" },
      { label: "Two Color", value: "two-color" },
    ];

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.deleteOrAddElement = this.deleteOrAddElement.bind(this);
    this.handleColorInput = this.handleColorInput.bind(this);
    this.setColor = this.setColor.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }
  // componentDidUpdate() {}

  handleChange(value, id) {
    let items = [...this.state.optionValues];
    var new_id = id.split(" ");
    var index = new_id[2].split("_");
    index = parseInt(index[1]);
    let pos = this.state.optionValues
      .map(function (element) {
        return element.count;
      })
      .indexOf(index);
    let item = { ...items[pos] };
    let val = value;
    if (new_id[0] == "addon") {
      if (value == "") {
        item.addon = val;
      } else {
        if (!val.includes("e")) {
          val = parseInt(val);
          if (value >= 0) {
            item.addon = val.toString();
          }
        }
      }
    } else if (new_id[0] == "value") {
      let result = [];
      items.map((element, checkIndex) => {
        if (checkIndex != pos) {
          if (element.value.trim().toLowerCase() == val.trim().toLowerCase()) {
            result.push(val);
          }
        }
      });
      if (val.trim() != "") {
        if (result.length > 0) {
          item.value = val;
          item.error = true;
          this.props.toastErrorSucessState("Option Name can't be same", true);
        } else {
          item.error = false;
          item.value = value;
        }
      } else {
        item.value = val.trim();
        item.error = true;
        this.props.toastErrorSucessState("Option Name can't be empty", true);
      }
    }
    let checkResult = [];
    items[pos] = item;
    for (var i = 0; i < items.length; i++) {
      if (items[i].value.trim() == "") {
        checkResult.push(false);
      } else {
        for (var j = 0; j < items.length; j++) {
          if (
            items[i].value.trim().toLowerCase() ==
            items[j].value.trim().toLowerCase()
          ) {
            if (i != j) {
              checkResult.push(false);
            }
          }
        }
      }
    }
    if (checkResult.length > 0) {
      this.props.handleError(
        true,
        this.props.data[this.props.index].setting.label,
        this.props.data[this.props.index].setting.id
      );
    } else {
      this.props.handleError(
        false,
        this.props.data[this.props.index].setting.label,
        this.props.data[this.props.index].setting.id
      );
      let newItems = [...items];
      for (var k = 0; k < newItems.length; k++) {
        newItems[k].error = false;
      }
      items = newItems;
    }
    this.state.optionValues = items;
    this.props.saveData(this.state.optionValues);
    this.setState({
      optionValues: items,
    });
  }

  handleSelect(value, id) {
    var new_id = id.split(" ");
    var index = parseInt(new_id[1]);
    let pos = this.state.optionValues
      .map(function (element) {
        return element.count;
      })
      .indexOf(index);
    let items = [...this.state.optionValues];
    let item = { ...items[pos] };
    if (new_id[0] == "select_type") {
      if (value == "one-color") {
        item.color_type = value;
        item.style = { display: "none" };
      } else if (value == "two-color") {
        item.color_type = value;
        item.style = { display: "inline" };
      }
    }
    items[pos] = item;
    this.state.optionValues = items;
    this.props.saveData(this.state.optionValues);
    this.setState({
      optionValues: items,
    });
  }

  handleClick(e) {
    console.log("eeeee");
    var val = e.target.id;
    val = val.split(" ");
    let pos = -1;
    if (val[0] == "delete") {
      var whichElement = val[2].split("_");
      pos = this.state.optionValues
        .map(function (element) {
          return element.count;
        })
        .indexOf(parseInt(whichElement[1]));
      this.deleteOrAddElement(true, pos);
    } else if (val[0] == "addMore") {
      this.setState({
        count: this.state.count + 1,
      });
      this.deleteOrAddElement(false, 0);
    }
  }

  deleteOrAddElement(inc, index) {
    let items = [...this.state.optionValues];
    let date = new Date();
    if (inc) {
      if (index > -1) {
        items.splice(index, 1);
      }
    } else {
      let value = "Color_1";
      let pos = items
        .map((element) => {
          return element.value;
        })
        .indexOf(value);
      let counter = 1;
      while (pos != -1) {
        value = "Color_" + counter;
        pos = items
          .map((element) => {
            return element.value;
          })
          .indexOf(value);
        counter += 1;
      }
      let item = {
        id: 0,
        addon: 0,
        count: date.getTime(),
        style: { display: "none" },
        color1: "#ffffff",
        color2: "#000000",
        value: value,
        color_type: "one-color",
        error: false,
      };
      items.push(item);
    }
    let checkResult = [];
    for (var i = 0; i < items.length; i++) {
      if (items[i].value.trim() == "") {
        checkResult.push(false);
      } else {
        for (var j = 0; j < items.length; j++) {
          if (
            items[i].value.trim().toLowerCase() ==
            items[j].value.trim().toLowerCase()
          ) {
            if (i != j) {
              checkResult.push(i);
            }
          }
        }
      }
    }
    if (checkResult.length > 0) {
      this.props.handleError(
        true,
        this.props.data[this.props.index].setting.label,
        this.props.data[this.props.index].setting.id
      );
    } else {
      this.props.handleError(
        false,
        this.props.data[this.props.index].setting.label,
        this.props.data[this.props.index].setting.id
      );
      let newItems = [...items];
      for (var k = 0; k < newItems.length; k++) {
        newItems[k].error = false;
      }
      items = newItems;
    }
    this.state.optionValues = items;
    this.props.saveData(this.state.optionValues);
    this.setState({
      optionValues: items,
    });
  }

  handleColorInput(value, id) {
    let items = [...this.state.optionValues];
    id = id.split(" ");

    const num = parseInt(id[1]);
    let pos = this.state.optionValues
      .map(function (element) {
        return element.count;
      })
      .indexOf(num);
    let item = { ...items[pos] };

    if (id[0] == "input_color1") {
      item.color1 = value;
    } else if (id[0] == "input_color2") {
      item.color2 = value;
    }
    items[pos] = item;
    this.state.optionValues = items;
    this.props.saveData(this.state.optionValues);
    this.setState({
      optionValues: items,
    });
  }
  setColor(e) {
    // console.log(this.state.optionValues)
    let items = [...this.state.optionValues];
    var value = e.target.value;
    var id = e.target.id;
    id = id.split(" ");
    // console.log(id);
    const num = parseInt(id[1]);
    let pos = this.state.optionValues
      .map(function (element) {
        return element.count;
      })
      .indexOf(num);
    let item = { ...items[pos] };
    if (id[0] == "button_color1") {
      item.color1 = value;
    } else if (id[0] == "button_color2") {
      item.color2 = value;
    }
    items[pos] = item;
    this.state.optionValues = items;
    this.props.saveData(this.state.optionValues);
    this.setState({
      optionValues: items,
    });
  }
  render() {
    return (
      <div className="more_options">
              <DataTable
              columnContentTypes={["text", ""]}
              headings={[
                <Text fontWeight="medium">Option name</Text>,
                <Text fontWeight="medium">Add on price</Text>,
               
              ]}
              rows={[]}
              totals={""}
            />
        {this.state.optionValues.map((elem, index) => {
          return (
            <div key={index} className="select_swatches">
              <TextField
                type="number"
                value={elem.addon}
                min={1}
                placeholder="Price"
                onChange={this.handleChange}
                id={"addon " + this.state.type + "_" + elem.count}
                connectedLeft={
                  <TextField
                    type="text"
                    value={elem.value}
                    error={elem.error}
                    onChange={this.handleChange}
                    id={"value " + this.state.type + "_" + elem.count}
                  />
                }
                connectedRight={
                  // <Button
                  //   id={"delete " + this.state.type + "_" + elem.count}
                  //   onClick={this.handleClick}
                  //   icon={DeleteMajor}
                  // >
                  //    <span id={"delete " + this.state.type + "_" + elem.count}>
                  //     {/* <Icon
                  //       source={DeleteMajor}
                  //     /> */}
                  //        {/* {<DeleteMajor} */}
                  //   </span>
                  // </Button>
                  <Button
                    id={"delete " + this.state.type + "_" + elem.count}
                    onClick={this.handleClick}
                  >
                    {
                      <DeleteMajor
                        id={"delete " + this.state.type + "_" + elem.count}
                      />
                    }
                  </Button>
                }
              />
              <div
                className={
                  elem.color_type == "two-color"
                    ? "color_1 wow-swatches-color-box wow-color-box"
                    : "color_1 wow-swatches-color-box "
                }
              >
                <TextField
                  type="text"
                  value={elem.color1}
                  onChange={this.handleColorInput}
                  id={"input_color1 " + elem.count}
                  connectedLeft={
                    <Select
                      options={this.options}
                      id={"select_type " + elem.count}
                      onChange={this.handleSelect}
                      value={elem.color_type}
                    />
                  }
                  suffix={
                    <Button id="button_color_1">
                      <input
                        id={"button_color1 " + elem.count}
                        type="color"
                        value={elem.color1}
                        onChange={this.setColor}
                      />
                    </Button>
                  }
                  connectedRight={
                    // <div style={elem.style} className="color_2">
                    elem.color_type == "two-color" && (
                      <TextField
                        type="text"
                        value={elem.color2}
                        onChange={this.handleColorInput}
                        id={"input_color2 " + elem.count}
                        suffix={
                          <Button id="button_color_2">
                            <input
                              id={"button_color2 " + elem.count}
                              type="color"
                              value={elem.color2}
                              onChange={this.setColor}
                            />
                          </Button>
                        }
                      />
                    )
                    // </div>
                  }
                />
              </div>
            </div>
          );
        })}

        <ButtonGroup segmented>
          <Button id={"addMore " + this.state.type} onClick={this.handleClick}>
            <span id={"addMore " + this.state.type}>Add More Options</span>
          </Button>
        </ButtonGroup>
      </div>
    );
  }
}
