import React from "react";
export default function CustomSelect(props) {
  const checkLayoutType = () => {
    // console.log(props.colorLayout);
    var border = "";
    let displayDiv = props.checkDisplay;
    let hidden_label = "block";
    let required = <sup></sup>;
    var labelStyle = {
      color: "",
      fontSize: "0px",
      display: "",
    };
    var helpStyle = {
      fontSize: "0px",
      color: "",
    };
    var alignment = {
      textAlign: "",
      marginTop: "10px",
      display: displayDiv,
    };
    if (props.mainLayout) {
      if (props.generalLayout.border == "classic") {
        border = "5px";
      } else if (props.generalLayout.border == "rounded_border") {
        border = "20px";
      }
      if (props.data.hidden_label) {
        hidden_label = "none";
      }
      if (props.data.required) {
        required = (
          <sup style={{ color: props.colorLayout.required_char_color }}>*</sup>
        );
      }
      alignment.textAlign = props.generalLayout.alignment;
      helpStyle.fontSize = props.typoLayout.help_font_size + "px";
      helpStyle.color = props.colorLayout.help_text_color;
      labelStyle.color = props.colorLayout.label_color;
      labelStyle.fontSize = props.typoLayout.label_font_size + "px";
      labelStyle.display = hidden_label;
    } else {
      if (props.data.css.type == "classic") {
        border = "5px";
      } else if (props.data.css.type == "rounded_border") {
        border = "20px";
      }
      if (props.data.hidden_label) {
        hidden_label = "none";
      }
      if (props.data.required) {
        required = (
          <sup style={{ color: props.data.css.required_char_color }}>*</sup>
        );
      }
      alignment.textAlign = props.data.css.alignment;
      helpStyle.fontSize = props.data.css.help_font_size + "px";
      helpStyle.color = props.data.css.help_text_color;
      labelStyle.color = props.data.css.label_color;
      labelStyle.fontSize = props.data.css.label_font_size + "px";
      labelStyle.display = hidden_label;
    }
    return (
      <div>
        {checkWhichType(alignment, helpStyle, labelStyle, required, border)}
      </div>
    );
  };
  const checkWhichType = (
    alignment,
    helpStyle,
    labelStyle,
    required,
    border
  ) => {
    if (props.type == "Dropdown") {
      var styleDropdown = {
        backgroundColor: props.mainLayout
          ? props.colorLayout.dropdown_back_color
          : props.data.css.dropdown_back_color,
        width: props.data.css.columnWidth + "%",
        fontSize: props.mainLayout
          ? props.typoLayout.input_font_size + "px"
          : props.data.css.input_font_size,
        color: props.mainLayout
          ? props.colorLayout.dropdown_text_color
          : props.data.css.dropdown_text_color,
        borderRadius: border,
        // padding: "3px",
        border: "1px solid #DCDCDC",
        padding: "10px 15px",
      };
      return (
        <div style={alignment}>
          <label>
            <p className="sd-ado-output-check" style={labelStyle}>
              {props.data.label} {required}
            </p>
            <select
              defaultValue={"DEFAULT-SD-MAIN"}
              onChange={(e) => {
                let id = e.target.id;
                let value = e.target.value;
                props.handleAllChanges(id, value);
              }}
              id={props.data.id}
              style={styleDropdown}
            >
              <option value="DEFAULT-SD-MAIN" disabled>
                Select
              </option>
              {props.data.option_values.map((elem, index) => {
                return (
                  <option key={index} value={elem.value}>
                    {elem.value}
                  </option>
                );
              })}
            </select>
          </label>
          <div>
            <small style={helpStyle}>{props.data.helptext}</small>
          </div>
        </div>
      );
    } else if (props.type == "Checkbox") {
      var chekbox_label = {
        display: "block",
        position: "relative",
        cursor: "pointer",
        fontSize: props.mainLayout
          ? props.typoLayout.input_font_size + "px"
          : props.data.css.input_font_size + "px",
        color: props.mainLayout
          ? props.colorLayout.check_button_text
          : props.data.css.button_text,
        // color: props.data.css.button_text,
      };
      let checkBox_input = {
        position: "absolute",
        opacity: "0",
        cursor: "pointer",
        height: "0",
        width: "0",
      };
      let checkmark = {
        // position: "absolute",
        // top: "4px",
        // left: 0,
        display: "inline-block",
        marginRight: "8px",
        height: props.mainLayout
          ? props.typoLayout.input_font_size + "px"
          : props.data.css.input_font_size + "px",
        width: props.mainLayout
          ? props.typoLayout.input_font_size + "px"
          : props.data.css.input_font_size + "px",
        backgroundColor: "#ddd",
        border: "1px solid black",
        verticalAlign: "middle",
      };
      return (
        <div style={alignment}>
          <label className="sd-ado-output-check" style={labelStyle}>
            {props.data.label} {required}
          </label>
          <div className="wowoption-checkboxes-outer" id={props.data.id}>
            {props.data.option_values.map((elem, index) => {
              return (
                <div key={index}>
                  <label
                    id="label_div_check"
                    data-buttonhover={
                      props.mainLayout
                        ? props.colorLayout.check_button_hover
                        : props.data.css.button_hover
                    }
                    data-texthover={
                      props.mainLayout
                        ? props.colorLayout.check_text_hover
                        : props.data.css.text_hover
                    }
                    data-color={
                      props.mainLayout
                        ? props.colorLayout.check_button_text
                        : props.data.css.button_text
                    }
                    data-buttonactive={
                      props.mainLayout
                        ? props.colorLayout.check_button_active
                        : props.data.css.button_active
                    }
                    data-textactive={
                      props.mainLayout
                        ? props.colorLayout.check_text_active
                        : props.data.css.text_active
                    }
                    data-select="false"
                    onMouseLeave={(e) => {
                      let id = e.target.id;
                      let parent = undefined;
                      if (e.target.id != "label_div_check") {
                        id = e.target.parentNode.id;
                        if (id != "label_div_check") {
                        } else {
                          parent = e.target.parentNode;
                        }
                      } else {
                        parent = e.target;
                      }
                      let color = parent.dataset.color;
                      parent.style.color = color;
                      if (parent.dataset.select == "true") {
                        parent.style.color = parent.dataset.textactive;
                        parent.children[1].style.backgroundColor =
                          parent.dataset.buttonactive;
                      }
                    }}
                    onMouseEnter={(e) => {
                      let id = e.target.id;
                      let parent = undefined;
                      if (e.target.id != "label_div_check") {
                        id = e.target.parentNode.id;
                        if (id != "label_div_check") {
                        } else {
                          parent = e.target.parentNode;
                        }
                      } else {
                        parent = e.target;
                      }
                      let color = parent.dataset.texthover;
                      let spanColor = parent.dataset.button_hover;
                      parent.style.color = color;
                      parent.children[1].style.boxShadow =
                        "0px ​0px 4px 2px " + spanColor;
                    }}
                    key={index.toString()}
                    style={chekbox_label}
                    className="checkbox_container"
                  >
                    <input
                      id={props.data.id}
                      data-color={
                        props.mainLayout
                          ? props.colorLayout.check_button_text
                          : props.data.css.button_text
                      }
                      data-buttonactive={
                        props.mainLayout
                          ? props.colorLayout.check_button_active
                          : props.data.css.button_active
                      }
                      data-textactive={
                        props.mainLayout
                          ? props.colorLayout.check_text_active
                          : props.data.css.text_active
                      }
                      data-clo={elem.value}
                      data-select="false"
                      onChange={(e) => {
                        let buttonActive = e.target.dataset.buttonactive;
                        let buttontext = e.target.dataset.textactive;
                        let text = e.target.dataset.color;
                        let arr = [];
                        if (e.target.dataset.select == "true") {
                          e.target.dataset.select = "false";
                          e.target.parentNode.dataset.select = "false";
                          e.target.parentNode.children[1].style.backgroundColor =
                            "#ddd";
                          // e.target.parentNode.style.color = text;
                        } else {
                          e.target.dataset.select = "true";
                          // e.target.parentNode.dataset.select = "true";
                          e.target.parentNode.children[1].style.backgroundColor =
                            buttonActive;
                          // e.target.parentNode.style.color = buttontext;
                        }
                        let value = e.target.dataset.clo;
                        let id = e.target.id;
                        props.changeCondition(id, value);
                      }}
                      style={checkBox_input}
                      type="checkbox"
                      checked="checked"
                    ></input>
                    <span
                      style={checkmark}
                      className="checkbox_checkmark"
                    ></span>
                    {elem.value}
                  </label>
                </div>
              );
            })}
          </div>
          <div>
            <small style={helpStyle}>{props.data.helptext}</small>
          </div>
        </div>
      );
    } else if (props.type == "Radio Buttons") {
      let container = {
        display: "block",
        position: "relative",
        cursor: "pointer",
        fontSize: props.mainLayout
          ? props.typoLayout.help_font_size + "px"
          : props.data.css.input_font_size + "px",
        color: props.mainLayout
          ? props.colorLayout.check_button_text
          : props.data.css.button_text,
      };
      let radio_contain_Input = {
        position: "absolute",
        opacity: "0",
        cursor: "pointer",
      };
      let checkmark = {
        // position: "absolute",
        // top: "4px",
        // left: 0,
        display: "inline-block",
        marginRight: "8px",
        height: props.data.css.input_font_size + "px",
        width: props.data.css.input_font_size + "px",
        backgroundColor: "#ddd",
        verticalAlign: "middle",
        borderRadius: "50%",
        border: "1px solid black",
      };
      return (
        <div style={alignment}>
          <label className="sd-ado-output-check" style={labelStyle}>
            {props.data.label} {required}
          </label>
          <div className="all_options">
            {props.data.option_values.map((elem, index) => {
              return (
                <label
                  style={container}
                  id="label_div_check"
                  // data-buttonhover={props.data.css.button_hover}
                  // data-texthover={props.data.css.text_hover}
                  // data-buttonactive={props.data.css.button_active}
                  // data-color={props.data.css.button_text}
                  // data-textactive={props.data.css.text_active}

                  data-buttonhover={
                    props.mainLayout
                      ? props.colorLayout.check_button_hover
                      : props.data.css.button_hover
                  }
                  data-texthover={
                    props.mainLayout
                      ? props.colorLayout.check_text_hover
                      : props.data.css.text_hover
                  }
                  data-color={
                    props.mainLayout
                      ? props.colorLayout.check_button_text
                      : props.data.css.button_text
                  }
                  data-buttonactive={
                    props.mainLayout
                      ? props.colorLayout.check_button_active
                      : props.data.css.button_active
                  }
                  data-textactive={
                    props.mainLayout
                      ? props.colorLayout.check_text_active
                      : props.data.css.text_active
                  }
                  data-select="false"
                  onMouseLeave={(e) => {
                    let id = e.target.id;
                    let parent = undefined;
                    if (e.target.id != "label_div_check") {
                      id = e.target.parentNode.id;
                      if (id != "label_div_check") {
                      } else {
                        parent = e.target.parentNode;
                      }
                    } else {
                      parent = e.target;
                    }
                    let color = parent.dataset.color;
                    parent.style.color = color;
                    if (parent.dataset.select == "true") {
                      parent.style.color = parent.dataset.textactive;
                      parent.children[1].style.backgroundColor =
                        parent.dataset.buttonactive;
                    }
                  }}
                  onMouseEnter={(e) => {
                    let id = e.target.id;
                    let parent = undefined;
                    if (e.target.id != "label_div_check") {
                      id = e.target.parentNode.id;
                      if (id != "label_div_check") {
                      } else {
                        parent = e.target.parentNode;
                      }
                    } else {
                      parent = e.target;
                    }
                    let color = parent.dataset.texthover;
                    let spanColor = parent.dataset.button_hover;
                    parent.style.color = color;
                    parent.children[1].style.boxShadow =
                      "0px ​0px 4px 2px " + spanColor;
                  }}
                  key={index.toString()}
                  className="checkbox_container"
                >
                  <input
                    id={props.data.id}
                    // data-buttonactive={props.data.css.button_active}
                    // data-color={props.data.css.button_text}
                    // data-textactive={props.data.css.text_active}
                    data-color={
                      props.mainLayout
                        ? props.colorLayout.check_button_text
                        : props.data.css.button_text
                    }
                    data-buttonactive={
                      props.mainLayout
                        ? props.colorLayout.check_button_active
                        : props.data.css.button_active
                    }
                    data-textactive={
                      props.mainLayout
                        ? props.colorLayout.check_text_active
                        : props.data.css.text_active
                    }
                    data-clo={elem.value}
                    data-select="false"
                    onChange={(e) => {
                      let buttonActive = e.target.dataset.buttonactive;
                      let buttontext = e.target.dataset.textactive;
                      let text = e.target.dataset.color;
                      let parent = e.target.parentNode.parentNode.children;
                      for (var i = 0; i < parent.length; i++) {
                        parent[i].children[1].style.backgroundColor = "#eee";
                        parent[i].style.color = text;
                        parent[i].children[1].dataset.select = "false";
                        parent[i].dataset.select = "false";
                      }
                      e.target.dataset.select = "true";
                      e.target.nextSibling.style.backgroundColor = buttonActive;
                      e.target.parentNode.style.color = buttontext;
                      let value = e.target.dataset.clo;
                      let id = e.target.id;
                      props.changeCondition(id, value);
                    }}
                    style={radio_contain_Input}
                    type="checkbox"
                    checked="checked"
                  ></input>
                  <span style={checkmark} className="checkbox_checkmark"></span>
                  {elem.value}
                </label>
              );
            })}
          </div>
          <div>
            <small style={helpStyle}>{props.data.helptext}</small>
          </div>
        </div>
      );
    } else if (props.type == "Buttons") {
      var styleButton = {
        backgroundColor: props.mainLayout
          ? props.colorLayout.button_back
          : props.data.css.button_back,
        fontSize: props.mainLayout
          ? props.typoLayout.input_font_size + "px"
          : props.data.css.input_font_size,
        color: props.mainLayout
          ? props.colorLayout.button_text
          : props.data.css.button_text,
        borderRadius: border,
        padding: "5px",
        paddingLeft: "8px",
        paddingRight: "8px",
        border: "none",
        marginLeft: "5px",
      };
      return (
        <div style={alignment}>
          <label className="sd-ado-output-check" style={labelStyle}>
            {props.data.label} {required}
          </label>
          <div style={{ marginLeft: "-5px", marginTop: "10px" }}>
            {props.data.option_values.map((element, index) => {
              return (
                <button
                  onMouseEnter={(e) => {
                    let textHover = e.target.dataset.texthover;
                    let buttonHover = e.target.dataset.backhover;
                    e.target.style.boxShadow =
                      "1px 1px 8px 2px " + buttonHover + "";
                    if (e.target.dataset.active == "no") {
                      e.target.style.color = textHover;
                    }
                  }}
                  onMouseLeave={(e) => {
                    let buttonColor = e.target.dataset.buttontext;
                    if (e.target.dataset.active == "no") {
                      e.target.style.color = buttonColor;
                    }
                    e.target.style.boxShadow = "";
                  }}
                  key={index}
                  onClick={(e) => {
                    let id = e.target.className;
                    let parent = e.target.parentNode.children;

                    let buttonActive = e.target.dataset.backactive;
                    let textActive = e.target.dataset.textactive;
                    let buttonBack = e.target.dataset.buttonback;
                    let buttontext = e.target.dataset.buttontext;

                    for (var i = 0; i < parent.length; i++) {
                      if (parent[i].className == id) {
                        parent[i].style.backgroundColor = buttonActive;
                        parent[i].style.color = textActive;
                      } else {
                        parent[i].style.backgroundColor = buttonBack;
                        parent[i].style.color = buttontext;
                      }
                    }
                    e.target.dataset.active = "yes";
                    let value = e.target.innerHTML;
                    let cls = e.target.id;
                    props.handleAllChanges(cls, value);
                  }}
                  data-buttonback={
                    props.mainLayout
                      ? props.colorLayout.button_back
                      : props.data.css.button_back
                  }
                  data-buttontext={
                    props.mainLayout
                      ? props.colorLayout.button_text
                      : props.data.css.button_text
                  }
                  data-backactive={
                    props.mainLayout
                      ? props.colorLayout.button_back_active
                      : props.data.css.button_back_active
                  }
                  data-backhover={
                    props.mainLayout
                      ? props.colorLayout.button_back_hover
                      : props.data.css.button_back_hover
                  }
                  data-textactive={
                    props.mainLayout
                      ? props.colorLayout.button_text_active
                      : props.data.css.button_text_active
                  }
                  data-texthover={
                    props.mainLayout
                      ? props.colorLayout.button_text_hover
                      : props.data.css.button_text_hover
                  }
                  data-active={"no"}
                  id={props.data.id}
                  data-clo={index}
                  style={styleButton}
                  className={"button_" + element.count}
                  type="button"
                >
                  {element.value}
                </button>
              );
            })}
          </div>
          <small style={helpStyle}>{props.data.helptext}</small>
        </div>
      );
    }
  };
  return <div>{checkLayoutType()}</div>;
}
