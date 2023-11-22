import React, { Component } from "react";
import {
  Button,
  TextField,
  Icon,
  ButtonGroup,
  DataTable,
  Text,
} from "@shopify/polaris";
import { ImageMajor, DeleteMajor } from "@shopify/polaris-icons";
import ImageSwatch from "./ImageSwatch";

export default class AllSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      optionValues: this.props.data[this.props.index].setting.option_values,
      count: 1,
      type: this.props.type,
      rows: [],
      selectedFile: {},
      imageURL: "",
      totalimages: [],
      active: false,
      loading: false,
      listofimages: [],
      currentimage: "",
    };
  }

  handleClick = (val) => {
    val = val.split(" ");
    var deletingIndex = val[0];
    var whichElement = [];
    let pos = -1;
    if (deletingIndex == "delete") {
      if (
        this.state.type != "Radio Buttons" &&
        this.state.type != "Image Swatches"
      ) {
        whichElement = val[1].split("_");
        whichElement = parseInt(whichElement[1]);
        pos = this.state.optionValues
          .map(function (element) {
            return element.count;
          })
          .indexOf(whichElement);
      } else {
        whichElement = val[2].split("_");
        whichElement = parseInt(whichElement[1]);
        pos = this.state.optionValues
          .map(function (element) {
            return element.count;
          })
          .indexOf(whichElement);
      }
      this.deleteOrAddElement(true, pos);
    } else if (deletingIndex == "addMore") {
      this.setState({
        count: this.state.count + 1,
      });
      this.deleteOrAddElement(false, 0);
    }
  };
  deleteOrAddElement = (inc, index) => {
    let items = [...this.state.optionValues];
    let date = new Date();
    if (inc) {
      if (index > -1) {
        items.splice(index, 1);
      }
    } else {
      let value = this.state.type + "_1";
      let pos = items
        .map((element) => {
          return element.value;
        })
        .indexOf(value);
      let counter = 1;
      while (pos != -1) {
        value = this.state.type + "_" + counter;
        pos = items
          .map((element) => {
            return element.value;
          })
          .indexOf(value);
        counter += 1;
      }
      var item = {};
      if (this.state.type == "Image Swatches") {
        item = {
          id: 0,
          value: value,
          addon: 0,
          name: date.getTime(),
          url: "",
          count: date.getTime(),
          error: false,
        };
      } else {
        item = {
          id: 0,
          value: value,
          addon: 0,
          count: date.getTime(),
          error: false,
        };
      }
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
  };
  handleChange = (value, id) => {
    var val = "";
    var index = "";
    var editingVal = "";
    if (
      this.state.type != "Radio Buttons" &&
      this.state.type != "Image Swatches"
    ) {
      val = value;
      index = id;
      index = index.split(" ");
      editingVal = index[0];
      index = index[1].split("_");
      index = parseInt(index[1]);
    } else if (
      this.state.type == "Radio Buttons" ||
      this.state.type == "Image Swatches"
    ) {
      val = value;
      index = id;
      index = index.split(" ");
      editingVal = index[0];
      index = index[2].split("_");
      index = parseInt(index[1]);
    }
    let pos = this.state.optionValues
      .map(function (element) {
        return element.count;
      })
      .indexOf(index);
    if (editingVal == "name") {
      let items = [...this.state.optionValues];
      let result = [];
      items.map((element, checkIndex) => {
        if (checkIndex != pos) {
          if (element.value.trim().toLowerCase() == val.trim().toLowerCase()) {
            result.push(val);
          }
        }
      });
      let item = { ...items[pos] };
      let error_val = "";
      if (val.trim() != "") {
        if (result.length > 0) {
          item.error = true;
          item.value = val;
          error_val = "Option Name can't be same";
          this.props.toastErrorSucessState(error_val, true);
        } else {
          item.error = false;
          item.value = val;
        }
      } else {
        item.error = true;
        item.value = val.trim();
        error_val = "Option Name can't be empty";
        this.props.toastErrorSucessState(error_val, true);
      }
      items[pos] = item;
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
      this.props.saveData(items);
      this.setState({
        optionValues: items,
      });
    } else if (editingVal == "addon") {
      let items = [...this.state.optionValues];
      let item = { ...items[pos] };
      if (val == "") {
        item.addon = val;
      } else {
        if (!val.includes("e")) {
          val = parseInt(val);
          if (value >= 0) {
            item.addon = val.toString();
          }
        }
      }
      items[pos] = item;

      this.state.optionValues = items;
      this.props.saveData(this.state.optionValues);
      this.setState({
        optionValues: items,
      });
    }
  };
  selectedimage = (name, uid) => {
    // console.log(name, this.state.currentimage);
    let items = [...this.state.optionValues];

    let pos = this.state.optionValues
      .map(function (element) {
        return element.count;
      })
      .indexOf(parseInt(this.state.currentimage));

    let item = { ...items[pos] };
    item.url = name;

    // console.log(item.url);
    items[pos] = item;
    this.state.optionValues = items;
    this.props.saveData(this.state.optionValues);
    this.setState({
      optionValues: items,
    });

    this.showimagedrop();
  };

  renderImage = (url, id) => {
    if (url != "") {
      var innerDiv;
      innerDiv = {
        backgroundImage: "url(" + url + ")",
        width: "30px",
        height: "30px",
        backgroundSize: "100%",
        backgroundRepeat: "no-repeat",
      };

      var outerDiv = {
        border: "2px solid #ddd",
        width: "35px",
        display: "inline-block",
      };
      return (
        <div style={outerDiv}>
          <div className={`show${id}`} style={innerDiv}></div>
        </div>
      );
    } else {
      return <Icon source={ImageMajor}></Icon>;
    }
  };
  showimagedrop = (t, count) => {
    this.setState({ active: t });
    this.setState({ currentimage: count });
  };
  handleload = (v) => {
    this.setState({ loading: v });
  };

  fileButton(url, count) {
    if (this.state.type == "Image Swatches") {
      return (
        <label className="filebutton">
          <div
            className="add_file_div"
            onClick={() => this.showimagedrop(true, count)}
          >
            <b>+</b>
            {this.renderImage(url, count)}
          </div>
          {this.state.active ? (
            <ImageSwatch
              count={count}
              showimagedrop={this.showimagedrop}
              selectedimage={this.selectedimage}
            />
          ) : (
            ""
          )}
        </label>
      );
    } else {
      return <div></div>;
    }
  }

  render() {
    // console.log(this.state.loading);
    return (
      <>
        <div className="more_options">
            <DataTable
              columnContentTypes={["text", "", "", "", ""]}
              headings={[
                <Text fontWeight="medium">Option name</Text>,
                <Text fontWeight="medium">Add on price</Text>,
                " ",
                " ",
                " ",
              ]}
              rows={this.state.rows}
              totals={""}
            />
          {this.state.optionValues.map((elem, index) => {
            return (
              <div key={index} className="select">
                <TextField
                  type="number"
                  placeholder="Price"
                  value={elem.addon}
                  min={0}
                  onChange={this.handleChange}
                  id={"addon " + this.state.type + "_" + elem.count}
                  connectedLeft={
                    <div className="Polaris-Connected">
                      {this.fileButton(elem.url, elem.count)}
                      <TextField
                        type="text"
                        value={elem.value}
                        error={elem.error}
                        id={"name " + this.state.type + "_" + elem.count}
                        onChange={this.handleChange}
                      />
                    </div>
                  }
                  connectedRight={
                    <Button
                      icon={DeleteMajor}
                      id={"delete " + this.state.type + "_" + elem.count}
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
                    >
                      <span
                        id={"delete " + this.state.type + "_" + elem.count}
                      ></span>
                    </Button>
                  }
                />
              </div>
            );
          })}
          <ButtonGroup segmented>
            <Button
              id="addMore dropdown"
              onClick={(e) => {
                this.handleClick(e.target.id);
              }}
            >
              <span id={"addMore dropdown"}>Add more options</span>
            </Button>
          </ButtonGroup>
        </div>
      </>
    );
  }
}
