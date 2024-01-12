import React, { Component } from "react";
import { Button, Text, TextField, Select } from "@shopify/polaris";
export default class Appearence extends Component {
  constructor(props) {
    super(props);
    // console.log(this.props.data[this.props.index].setting.css);
    // console.log(this.props.type);
    // console.log(this.props.index);
    this.state = {
      data: this.props.data[this.props.index].setting.css,
      type: this.props.type,
      index: this.props.index,
    };
    this.optionType = [
      { label: "Classic", value: "0" },
      { label: "Rounded border", value: "rounded_border" },
    ];
    this.alignment = [
      { label: "Left", value: "left" },
      { label: "Center", value: "center" },
      { label: "Right", value: "right" },
    ];

    this.width = [
      { label: "33%", value: 33 },
      { label: "50%", value: 50 },
      // { label: "66", value: 66 },
      { label: "100%", value: 100 },
    ];
    // this.handleChange = this.handleChange.bind(this);
    // this.checkType = this.checkType.bind(this);
    // this.extraSettings = this.extraSettings.bind(this);
    // this.setColor = this.setColor.bind(this);
    // this.handleSelectChange = this.handleSelectChange.bind(this);
    // this.handleFontSizes = this.handleFontSizes.bind(this);
    // this.checkCollumnType = this.checkCollumnType.bind(this);
    // this.checkBorderType = this.checkBorderType.bind(this);
  }
  // handleChange(value, id) {
  //   let item = { ...this.state.data };
  //   if (id == "input_font_size") {
  //     item.input_font_size = value;
  //   } else if (id == "help_font_size") {
  //     item.help_font_size = value;
  //   } else if (id == "label_font_size") {
  //     item.label_font_size = value;
  //   }
  //   this.state.data = item;
  //   this.props.saveData(this.state.data);
  //   this.setState({
  //     data: item,
  //   });
  // }
  handleChange = (value, id) => {
    console.log(value, id, "hhhhhh");
    this.setState((prevState) => {
      const updatedData = { ...prevState.data };

      if (id === "input_font_size") {
        updatedData.input_font_size = value;
      } else if (id === "help_font_size") {
        updatedData.help_font_size = value;
      } else if (id === "label_font_size") {
        updatedData.label_font_size = value;
      }

      // Uncomment the following line if you want to log the updated state
      // console.log(updatedData);

      // Uncomment the following line to save data using props
      this.props.saveData(updatedData);

      return { data: updatedData };
    });
  };

  setColor = (e) => {
    let item = { ...this.state.data };
    const value = e.target.value;
    const id = e.target.id;
    if (id == "help_color_i") {
      item.help_text_color = value;
    } else if (id == "label_color_i") {
      item.label_color = value;
    } else if (id == "reqd_color_i") {
      item.required_char_color = value;
    }
    if (this.state.type === "Dropdown") {
      if (id === "select_text_1") {
        item.dropdown_text_color = value;
      } else if (id == "select_back_1") {
        item.dropdown_back_color = value;
      }
    } else if (
      this.state.type == "Text Area" ||
      this.state.type == "Text" ||
      this.state.type == "Datetime" ||
      this.state.type == "File" ||
      this.state.type == "Number"
    ) {
      if (id == "input_text_1") {
        item.input_text_color = value;
      } else if (id == "input_back_1") {
        item.input_back_color = value;
      }
    } else if (
      this.state.type === "Checkbox" ||
      this.state.type == "Radio Buttons"
    ) {
      if (id == "checkbox_text") {
        item.button_text = value;
      } else if (id == "checkbox_text_hover") {
        item.text_hover = value;
      } else if (id == "checkbox_text_active") {
        item.text_active = value;
      } else if (id == "checkbox_button_hover") {
        item.button_hover = value;
      } else if (id == "checkbox_button_active") {
        item.button_active = value;
      }
    } else if (this.state.type == "Buttons") {
      if (id == "button_back") {
        item.button_back = value;
      } else if (id == "button_back_active") {
        item.button_back_active = value;
      } else if (id == "button_back_hover") {
        item.button_back_hover = value;
      } else if (id == "button_text_active") {
        item.button_text_active = value;
      } else if (id == "button_text_hover") {
        item.button_text_hover = value;
      } else if (id == "button_text") {
        item.button_text = value;
      }
    } else if (
      this.state.type == "Color Swatches" ||
      this.state.type == "Image Swatches"
    ) {
      if (id == "swatch_hover") {
        item.swatch_hover = value;
      } else if (id == "swatch_back_active") {
        item.swatch_active = value;
      }
    }
    this.state.data = item;
    this.props.saveData(this.state.data);
    this.setState({
      data: item,
    });
  };
  extraSettings = () => {
    if (
      this.state.type == "Text Area" ||
      this.state.type == "Number" ||
      this.state.type == "Text" ||
      this.state.type == "Datetime" ||
      this.state.type === "File"
    ) {
      return (
        <div>
          <div className="sd-ado-feild input_text_color">
            <Text variation="subdued">Input text color </Text>
            <Button id="input_text_1">
              <input
                id="input_text_1"
                type="color"
                value={this.state.data.input_text_color}
                onChange={this.setColor}
              />
            </Button>
          </div>
          <div className="sd-ado-feild input_background_color">
            <Text variation="subdued">Input background color</Text>
            <Button id="input_back_1">
              <input
                id="input_back_1"
                type="color"
                value={this.state.data.input_back_color}
                onChange={this.setColor}
              />
            </Button>
          </div>
        </div>
      );
    } else if (this.state.type === "Dropdown") {
      return (
        <div>
          <div className="sd-ado-feild select_text_color">
            <Text variation="subdued">Dropdown text color</Text>
            <Button id="select_text_1">
              <input
                id="select_text_1"
                type="color"
                value={this.state.data.dropdown_text_color}
                onChange={this.setColor}
              />
            </Button>
          </div>
          <div className="sd-ado-feild select_background_color">
            <Text variation="subdued">Dropdown background color</Text>
            <Button id="select_back_1">
              <input
                id="select_back_1"
                type="color"
                value={this.state.data.dropdown_back_color}
                onChange={this.setColor}
              />
            </Button>
          </div>
        </div>
      );
    } else if (
      this.state.type === "Checkbox" ||
      this.state.type == "Radio Buttons"
    ) {
      return (
        <div>
          <div className="sd-ado-feild button_text_div">
            <Text variation="subdued">{this.state.type + " text"}</Text>
            <Button id="checkbox_text">
              <input
                id="checkbox_text"
                type="color"
                value={this.state.data.button_text}
                onChange={this.setColor}
              />
            </Button>
          </div>
          <div className="sd-ado-feild text_hover_div">
            <Text variation="subdued">{this.state.type + " text hover"}</Text>
            <Button id="checkbox_text_hover">
              <input
                id="checkbox_text_hover"
                type="color"
                value={this.state.data.text_hover}
                onChange={this.setColor}
              />
            </Button>
          </div>
          {/* <div className="sd-ado-feild text_active_div">
            <Text variation="subdued">
              {this.state.type + " on text active"}
            </Text>
            <Button id="checkbox_text_active">
              <input
                id="checkbox_text_active"
                type="color"
                value={this.state.data.text_active}
                onChange={this.setColor}
              />
            </Button>
          </div> */}
          {/* <div className="sd-ado-feild button_hover_div">
            <Text variation="subdued">
              {this.state.type + " on Button hover"}
            </Text>
            <Button id="checkbox_button_hover">
              <input
                id="checkbox_button_hover"
                type="color"
                value={this.state.data.button_hover}
                onChange={this.setColor}
              />
            </Button>
          </div> */}
          <div className="sd-ado-feild button_active_div">
            <Text variation="subdued">{this.state.type + " on active"}</Text>
            <Button id="checkbox_button_active">
              <input
                id="checkbox_button_active"
                type="color"
                value={this.state.data.button_active}
                onChange={this.setColor}
              />
            </Button>
          </div>
        </div>
      );
    } else if (
      this.state.type === "Image Swatches" ||
      this.state.type === "Color Swatches"
    ) {
      return (
        <div>
          <div className="sd-ado-feild button_text_div">
            <Text variation="subdued">Swatch hover</Text>
            <Button id="swatch_hover">
              <input
                id="swatch_hover"
                type="color"
                value={this.state.data.swatch_hover}
                onChange={this.setColor}
              />
            </Button>
          </div>
          <div className="sd-ado-feild text_hover_div">
            <Text variation="subdued">Swatch background active</Text>
            <Button id="swatch_back_active">
              <input
                id="swatch_back_active"
                type="color"
                value={this.state.data.swatch_active}
                onChange={this.setColor}
              />
            </Button>
          </div>
        </div>
      );
    } else if (this.state.type === "Buttons") {
      return (
        <div>
          <div className="sd-ado-feild button_text_div">
            <Text variation="subdued">Button background</Text>
            <Button id="button_back">
              <input
                id="button_back"
                type="color"
                value={this.state.data.button_back}
                onChange={this.setColor}
              />
            </Button>
          </div>
          <div className="sd-ado-feild text_hover_div">
            <Text variation="subdued">Button background active</Text>
            <Button id="button_back_active">
              <input
                id="button_back_active"
                type="color"
                value={this.state.data.button_back_active}
                onChange={this.setColor}
              />
            </Button>
          </div>
          <div className="sd-ado-feild text_active_div">
            <Text variation="subdued">Button background hover</Text>
            <Button id="button_back_hover">
              <input
                id="button_back_hover"
                type="color"
                value={this.state.data.button_back_hover}
                onChange={this.setColor}
              />
            </Button>
          </div>
          <div className="sd-ado-feild button_hover_div">
            <Text variation="subdued">Button text active</Text>
            <Button id="button_text_active">
              <input
                id="button_text_active"
                type="color"
                value={this.state.data.button_text_active}
                onChange={this.setColor}
              />
            </Button>
          </div>
          <div className="sd-ado-feild button_active_div">
            <Text variation="subdued">Button text hover</Text>
            <Button id="button_text_hover">
              <input
                id="button_text_hover"
                type="color"
                value={this.state.data.button_text_hover}
                onChange={this.setColor}
              />
            </Button>
          </div>

          <div className="sd-ado-feild button_active_div">
            <Text variation="subdued">Button text</Text>
            <Button id="button_text">
              <input
                id="button_text"
                type="color"
                value={this.state.data.button_text}
                onChange={this.setColor}
              />
            </Button>
          </div>
        </div>
      );
    } else if (this.state.type === "Paragraph") {
      <div></div>;
    }
  };
  handleSelectChange = (value, id) => {
    let item = { ...this.state.data };
    if (id == "border_type") {
      item.type = value;
    } else if (id == "alignment_type") {
      item.alignment = value;
    } else if (id == "column_width") {
      item.columnWidth = parseInt(value);
    }
    this.state.data = item;
    this.props.saveData(this.state.data);
    this.setState({
      data: item,
    });
  };
  checkBorderType = () => {
    if (this.state.type == "Checkbox" || this.state.type == "Radio Buttons") {
      return <div></div>;
    } else {
      return (
        <div className="sd-ado-feild input_border">
          <Text>Type</Text>

          <Select
            // label="Type"
            id="border_type"
            options={this.optionType}
            onChange={this.handleSelectChange}
            value={this.state.data.type}
          />
        </div>
      );
    }
  };
  checkCollumnType = () => {
    if (this.state.type == "Checkbox" || this.state.type == "Radio Buttons") {
      return <div></div>;
    } else {
      return (
        <div className="sd-ado-feild column_width">
          <Text>Column width</Text>

          <Select
            id="column_width"
            // label="Column width"
            options={this.width}
            onChange={this.handleSelectChange}
            value={this.state.data.columnWidth}
          />
        </div>
      );
    }
  };
  checkType = () => {
    return (
      <div>
        {this.checkBorderType()}
        <div className="sd-ado-feild alignment_type">
          <Text>Alignment</Text>

          <Select
            id="alignment_type"
            // label="Alignment"
            options={this.alignment}
            onChange={this.handleSelectChange}
            value={this.state.data.alignment}
          />
        </div>

        <div className="sd-ado-feild help_color">
          <Text variation="subdued">Helptext color </Text>
          <Button id="help_color_1">
            <input
              id="help_color_i"
              type="color"
              value={this.state.data.help_text_color}
              onChange={this.setColor}
            />
          </Button>
        </div>
        <div className="sd-ado-feild label_color">
          <Text variation="subdued">Label color </Text>
          <Button id="label_color_1">
            <input
              id="label_color_i"
              type="color"
              value={this.state.data.label_color}
              onChange={this.setColor}
            />
          </Button>
        </div>
        <div className="sd-ado-feild required_color">
          <Text variation="subdued">Error message color </Text>
          <Button id="required_color_1">
            <input
              id="reqd_color_i"
              type="color"
              value={this.state.data.required_char_color}
              onChange={this.setColor}
            />
          </Button>
        </div>
        {this.handleFontSizes()}
        {this.checkCollumnType()}
        {this.extraSettings()}
      </div>
    );
  };
  handleFontSizes = () => {
    if (
      this.state.type == "Text Area" ||
      this.state.type == "Number" ||
      this.state.type == "Text" ||
      this.state.type == "Datetime"
    ) {
      return (
        <div>
          <div className="sd-ado-feild input_font">
            <Text>Input font size</Text>
            <TextField
              // label="Input font size"
              id="input_font_size"
              type="number"
              value={this.state.data.input_font_size}
              onChange={this.handleChange}
            />
          </div>
          <div className="sd-ado-feild helptext_font">
            <Text>Helptext font size</Text>

            <TextField
              // label="Helptext font size"
              id="help_font_size"
              type="number"
              value={this.state.data.help_font_size}
              onChange={this.handleChange}
            />
          </div>
          <div className="sd-ado-feild label_font">
            <Text>Label font size</Text>

            <TextField
              // label="Label font size"
              id="label_font_size"
              type="number"
              value={this.state.data.label_font_size}
              onChange={this.handleChange}
            />
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <div className="sd-ado-feild helptext_font">
            <Text>Helptext font size</Text>

            <TextField
              // label="Helptext font size"
              id="help_font_size"
              type="number"
              value={this.state.data.help_font_size}
              onChange={this.handleChange}
            />
          </div>
          <div className="sd-ado-feild label_font">
            <Text>Label font size</Text>

            <TextField
              // label="Label font size"
              id="label_font_size"
              type="number"
              value={this.state.data.label_font_size}
              onChange={this.handleChange}
            />
          </div>
        </div>
      );
    }
  };
  render() {
    return <div className="all_apperence">{this.checkType()}</div>;
  }
}
