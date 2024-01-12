import React, { useEffect, useState } from "react";

export default function CustomSwatch(props) {
  useEffect(() => {
    // console.log("render");
  }, []);
  // console.log(props.correctswatch)
  // const [imgurl, setimgurl] = useState("")
  const mouseInEvent = (e) => {
    var type = e.target.dataset.active;
    // console.log(type);
    if (type == "color") {
      var value = e.target.dataset.col;
      var id = e.target.className;
      var check_id = id;
      check_id = check_id.split("_");
      if (check_id[0] == "outer") {
        e.target.style.boxShadow = "1px 1px 8px 2px " + value + "";
      } else {
        e.target.parentNode.style.boxShadow = "1px 1px 8px 2px " + value + "";
      }
    } else if (type == "image") {
      var value = e.target.dataset.col;
      var id = e.target.className;
      var check_id = id;
      check_id = check_id.split("_");
      if (check_id[0] == "outer") {
        e.target.style.boxShadow = "1px 1px 8px 2px " + value + "";
      } else {
        e.target.parentNode.style.boxShadow = "1px 1px 8px 2px " + value + "";
      }
    }
    var allSwatch = document.getElementsByClassName("main_div");
    for (var i = 0; i < allSwatch.length; i++) {
      allSwatch[i].style.boxShadow = "";
    }
  };
  const mouseOutEvent = (e) => {
    e.target.parentNode.parentNode.style.boxShadow = "";
    e.target.parentNode.style.boxShadow = "";
    e.target.style.boxShadow = "";
  };
  const checkLayout = () => {
    let required = <sup></sup>;
    let border = "";
    let hidden_label = "block";
    let labeldiv = {
      color: "",
      fontSize: "",
      display: "",
    };
    let displayDiv = props.checkDisplay;
    let outerDiv = {
      display: "inline-block",
      marginBottom: "8px",
      marginRight: "8px",
      borderRadius: "",
      border: "1px solid #ddd",
      width: "32px",
      height: "32px",
      cursor:"pointer"
    };
    let maindiv = {
      marginLeft: "0px",
      // marginTop: "10px",
      display: displayDiv,
      marginTop: "10px",
      textAlign: "",
      width: "0px",
    };
    let helpStyle = {
      fontSize: "0px",
      color: "",
    };
    if (props.mainLayout) {
      if (props.data.hidden_label) {
        hidden_label = "none";
      }
      if (props.generalLayout.border == "classic") {
        border = "0px";
      } else if (props.generalLayout.border == "rounded_border") {
        border = "40px";
      }
      if (props.data.required) {
        required = (
          <sup style={{ color: props.colorLayout.required_char_color }}>*</sup>
        );
      }
      helpStyle.fontSize = props.typoLayout.help_font_size + "px";
      helpStyle.color = props.colorLayout.help_text_color;
      maindiv.textAlign = props.generalLayout.alignment;
      maindiv.width = props.data.css.columnWidth + "%";
      labeldiv.color = props.colorLayout.label_color;
      labeldiv.fontSize = props.typoLayout.label_font_size + "px";
      outerDiv.borderRadius = border;
      labeldiv.display = hidden_label;
    } else {
      if (props.data.hidden_label) {
        hidden_label = "none";
      }
      if (props.data.css.type == "classic") {
        border = "0px";
      } else if (props.data.css.type == "rounded_border") {
        border = "40px";
      }
      if (props.data.required) {
        required = (
          <sup style={{ color: props.data.css.required_char_color }}>*</sup>
        );
      }
      helpStyle.fontSize = props.data.css.help_font_size + "px";
      helpStyle.color = props.data.css.help_text_color;
      maindiv.textAlign = props.data.css.alignment;
      maindiv.width = props.data.css.columnWidth + "%";
      labeldiv.fontSize = props.data.css.label_font_size + "px";
      labeldiv.color = props.data.css.label_color;
      outerDiv.borderRadius = border;
      labeldiv.display = hidden_label;
    }
    return (
      <div>
        {checkWhichType(
          outerDiv,
          maindiv,
          helpStyle,
          labeldiv,
          border,
          required
        )}
      </div>
    );
  };
  const checkWhichType = (
    outerDiv,
    maindiv,
    helpStyle,
    labeldiv,
    border,
    required
  ) => {
    if (props.type == "Color Swatches") {
      return (
        <div style={maindiv}>
          <div>
            <label className="sd-ado-output-check" style={labeldiv}>
              {props.data.label} {required}
            </label>
          </div>
          <div className="main_image_swatch">
            {props.data.option_values.map((elem, index) => {
              console.log(elem,"uiuui")
              if (elem.color_type == "one-color") {
                var innerdiv = {
                  backgroundColor: elem.color1,
                  width: "100%",
                  height: "100%",
                  borderRadius: border,
                };
              } else if (elem.color_type == "two-color") {
                var innerdiv = {
                  width: "100%",
                  height: "100%",
                  backgroundColor: "#6b0101",
                  backgroundImage:
                    "-webkit-linear-gradient(315deg, " +
                    elem.color1 +
                    " 50%, " +
                    elem.color2 +
                    " 50%)",
                  borderRadius: border,
                };
              }
              // props.mainLayout
              //   ? console.log(props.colorLayout.swatch_active)
              //   : console.log(props.data.css.swatch_active);

              return (
                <div
                  key={index}
                  data-click={
                    props.mainLayout
                      ? props.colorLayout.swatch_active
                      : props.data.css.swatch_active
                  }
                  data-col={
                    props.mainLayout
                      ? props.colorLayout.swatch_hover
                      : props.data.css.swatch_hover
                  }
                  data-parent={
                    props.mainLayout
                      ? props.colorLayout.swatch_active
                      : props.data.css.swatch_active
                  }
                  data-active="color"
                  onMouseOver={mouseInEvent}
                  onClick={(e) => {
                    console.log("dbaya",e.target.dataset.click);
                    let id = e.target.id;
                    let active = e.target.dataset.click;
                    let hover = e.target.dataset.col;
                    let check_id = id.split("_");
                    if (check_id[0] == "label") {
                      e.target.style.boxShadow = "1px 1px 8px 2px " + hover;
                    }
                    let children = e.target.parentNode.parentNode.children;

                    console.log(active, "active ef");
                    for (var i = 0; i < children.length; i++) {
                      children[i].firstChild.style.border = "";
                    }
                    e.target.style.border = `3px solid ${active}`;
                  }}
                  onMouseLeave={mouseOutEvent}
                  className={`outer_div_${elem.count} wowoption-colorswatch_outer`}
                  style={outerDiv}
                >
                  <div
                    data-click={
                      props.mainLayout
                        ? props.colorLayout.swatch_active
                        : props.data.css.swatch_active
                    }
                    data-val={elem.value}
                    id={props.data.id}
                    data-active="color"
                    data-col={
                      props.mainLayout
                        ? props.colorLayout.swatch_hover
                        : props.data.css.swatch_hover
                    }
                    data-parent={
                      props.mainLayout
                        ? props.colorLayout.swatch_active
                        : props.data.css.swatch_active
                    }
                    className={"inner_div_" + elem.count}
                    style={innerdiv}
                    onClick={(e) => {
                      // console.log("clickeed");
                      let id = e.target.id;
                      let active = e.target.dataset.click;
                      let children = e.target.parentNode.parentNode.children;
                      // console.log(children);

                      for (var i = 0; i < children.length; i++) {
                        children[i].firstChild.style.border = "";
                      }
                      console.log(e.target.style);

                      e.target.style.border = "1px solid" + active;
                      let value = e.target.dataset.val;
                      props.handleAllChanges(id, value);
                    }}
                  ></div>
                </div>
              );
            })}
          </div>
          <small style={helpStyle}>{props.data.helptext}</small>
        </div>
      );
    } else if (props.type == "Image Swatches") {
      return (
        <div style={maindiv}>
          <div>
            <label className="sd-ado-output-check" style={labeldiv}>
              {props.data.label} {required}
            </label>
          </div>
          <div className="main_image_swatch">
            {props.data.option_values.map((elem, index) => {
              // console.log(elem);

              var innerDiv = {
                // backgroundImage: "url(" + props.showimage + ")",///privious check all and remove
                backgroundImage: "url(" + elem.url + ")",
                width: "100%",
                height: "100%",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                borderRadius: border,
              };
              return (
                <div
                  key={index}
                  data-val={elem.value}
                  // onClick={()=>{props.handleAllChanges();console.log("hellooooo1")}}
                  id={props.data.id}
                  data-click={
                    props.mainLayout
                      ? props.colorLayout.swatch_active
                      : props.data.css.swatch_active
                  }
                  data-col={
                    props.mainLayout
                      ? props.colorLayout.swatch_hover
                      : props.data.css.swatch_hover
                  }
                  data-parent={
                    props.mainLayout
                      ? props.colorLayout.swatch_active
                      : props.data.css.swatch_active
                  }
                  data-active="image"
                  onMouseOver={mouseInEvent}
                  onClick={(e) => {
                    console.log("byeeeee");
                    let id = e.target.id;
                    let hover = e.target.dataset.col;
                    let check_id = id.split("_");
                    if (check_id[0] == "label") {
                      e.target.style.boxShadow = "1px 1px 8px 2px " + hover;
                    }
                  }}
                  onMouseLeave={mouseOutEvent}
                  className={`outer_div_${elem.count} wowoption-imageswatch_outer`}
                  style={outerDiv}
                >
                  <div
                    data-val={elem.value}
                    onClick={(e) => {
                      let id = e.target.id;
                      let active = e.target.dataset.click;
                      let children = e.target.parentNode.parentNode.children;
                      for (var i = 0; i < children.length; i++) {
                        children[i].firstChild.style.border = "";
                      }
                      e.target.style.border = "1.5px solid" + active;
                      let value = e.target.dataset.val;
                      props.handleAllChanges(id, value);
                    }}
                    id={props.data.id}
                    data-click={props.data.css.swatch_active}
                    data-active="image"
                    data-col={
                      props.mainLayout
                        ? props.colorLayout.swatch_hover
                        : props.data.css.swatch_hover
                    }
                    data-parent={
                      props.mainLayout
                        ? props.colorLayout.swatch_active
                        : props.data.css.swatch_active
                    }
                    className={"inner_div_" + elem.count}
                    style={innerDiv}
                  ></div>
                </div>
              );
            })}
          </div>
          <div>
            <small style={helpStyle}>{props.data.helptext}</small>
          </div>
        </div>
      );
    }
  };
  // console.log(props.data)
  return <div>{checkLayout()}</div>;
}
