import React, { useEffect, useState } from "react";
import Flatpickr from "react-flatpickr";
export default function CustomText(props) {
  const checkLayoutType = () => {
    let required = <sup></sup>;
    let border = "";
    let displayDiv = props.checkDisplay;
    let hidden_label = "block";
    let labelStyle = {
      color: "",
      fontSize: "0px",
      display: "",
    };
    let styleInput = {
      backgroundColor: "",
      width: "0%",
      fontSize: "0px",
      color: "",
      borderRadius: "0px",
      border: "1px solid #DCDCDC",
      padding: "10px 15px",
    };
    let helpStyle = {
      fontSize: "0px",
      color: "",
    };
    let alignment = {
      textAlign: "",
      marginTop: "10px",
      display: displayDiv,
    };
    if (props.mainLayout) {
      // console.log("enter when main layout is enable");
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
      styleInput.backgroundColor = props.colorLayout.input_back_color;
      styleInput.width = props.data.css.columnWidth + "%";
      styleInput.borderRadius = border;
      styleInput.fontSize = props.typoLayout.input_font_size + "px";
      styleInput.color = props.colorLayout.input_text_color;
      labelStyle.color = props.colorLayout.label_color;
      // labelStyle.color = props.data.css.label_color;

      labelStyle.fontSize = props.typoLayout.label_font_size + "px";
      labelStyle.display = hidden_label;
    } else {
      // console.log("enter when main layout is disable");
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
      styleInput.backgroundColor = props.data.css.input_back_color;
      styleInput.width = props.data.css.columnWidth + "%";
      styleInput.borderRadius = border;
      styleInput.fontSize = props.data.css.input_font_size + "px";
      styleInput.color = props.data.css.input_text_color;
      labelStyle.color = props.data.css.label_color;
      labelStyle.fontSize = props.data.css.label_font_size + "px";
      labelStyle.display = hidden_label;
    }
    return (
      <div>
        {checkWhichType(alignment, helpStyle, labelStyle, required, styleInput)}
      </div>
    );
  };
  const checkWhichType = (
    alignment,
    helpStyle,
    labelStyle,
    required,
    styleInput
  ) => {
    let accept = "";
    if (props.type == "File") {
      accept = "image/x-png,image/gif,image/jpeg";
      return (
        <div style={alignment}>
          <label>
            <p className="sd-ado-output-check" style={labelStyle}>
              {props.data.label} {required}
            </p>
            <input
              data-allowed={props.data.allowed_extensions.toString()}
              data-callid={props.data.id}
              placeholder={props.data.placeholder}
              onChange={(e) => {
                let file = e.target.files[0];
                let allowed = e.target.dataset.allowed;
                let call_id = e.target.dataset.call_id;
                if (file != undefined) {
                  if (allowed.includes(file.type)) {
                  } else {
                    alert("Please add a valid File!");
                    e.target.value = "";
                  }
                }
                let id = e.target.id;
                let value = e.target.files[0];
                props.handleAllChanges(id, value);
              }}
              id={props.data.id}
              style={styleInput}
              accept={accept}
              type={props.type}
              name="date"
              className="shine_date"
            ></input>
            <div>
              <small style={helpStyle}>{props.data.helptext}</small>
            </div>
          </label>
        </div>
      );
    } else if (props.type == "Number" || props.type == "Text") {
      return (
        <div style={alignment}>
          <label>
            <p className="sd-ado-output-check" style={labelStyle}>
              {props.data.label} {required}
            </p>
            <input
              value={props.value}
              placeholder={props.data.placeholder}
              onChange={(e) => {
                let id = e.target.id;
                let value = e.target.value;
                props.handleAllChanges(id, value);
              }}
              id={props.data.id}
              style={styleInput}
              type={props.type}
              name="date"
              className="shine_date"
            ></input>
            <div>
              <small style={helpStyle}>{props.data.helptext}</small>
            </div>
          </label>
        </div>
      );
    } else if (props.type == "Text Area") {
      return (
        <div style={alignment}>
          <label>
            <p className="sd-ado-output-check" style={labelStyle}>
              {props.data.label} {required}
            </p>
            <textarea
              value={props.value}
              placeholder={props.data.placeholder}
              onChange={(e) => {
                let id = e.target.id;
                let value = e.target.value;
                props.handleAllChanges(id, value);
              }}
              id={props.data.id}
              style={styleInput}
              type={props.type}
              name="date"
              className="shine_date"
            ></textarea>
            <div>
              <small style={helpStyle}>{props.data.helptext}</small>
            </div>
          </label>
        </div>
      );
    } else if (props.type == "Datetime") {
      let minDate = "";
      let keyState = "a";
      if (props.data.disablePastDates) {
        minDate = "today";
      }
      let disabledDatesArr = [];
      if (props.data.isLimitDate) {
        if (
          props.data.limitDateDOWEnabled &&
          props.data.limitDateRangeEnabled
        ) {
          let daysEnabled = [];
          keyState = "b1";
          props.data.limitDateDOWDates.map((element) => {
            if (element == "x-sat") {
              daysEnabled.push(6);
            } else if (element == "x-sun") {
              daysEnabled.push(0);
            } else if (element == "x-mon") {
              daysEnabled.push(1);
            } else if (element == "x-tue") {
              daysEnabled.push(2);
            } else if (element == "x-wed") {
              daysEnabled.push(3);
            } else if (element == "x-thu") {
              daysEnabled.push(4);
            } else if (element == "x-fri") {
              daysEnabled.push(5);
            }
          });
          const getDates = function (start, end) {
            for (
              var arr = [], dt = new Date(start);
              dt <= end;
              dt.setDate(dt.getDate() + 1)
            ) {
              arr.push(new Date(dt));
            }
            return arr;
          };
          let allDates = getDates(
            new Date(props.data.rangeDate.from),
            new Date(props.data.rangeDate.to)
          );
          for (var i = 0; i < allDates.length; i++) {
            if (daysEnabled.includes(allDates[i].getDay())) {
              disabledDatesArr.push(allDates[i]);
            }
          }
          let time = "";
          let time_24hr = false;
          let dateId = "";
          if (props.data.time_format == "12HR") {
            time = " h:i K";
            keyState = "b4";
          } else if (props.data.time_format == "24HR") {
            time = " H:i";
            time_24hr = true;
            keyState = "b5";
          }
          let optionsDate = {
            minDate: minDate,
            dateFormat: props.data.date_format + time,
            enableTime: true,
            noCalendar: false,
            time_24hr: time_24hr,
            defaultValue: props.value,
          };
          if (props.data.limitDateType == "disablingDates") {
            dateId = "disablingDates";
            keyState = "b6";
            optionsDate.disable = disabledDatesArr;
          } else if (props.data.limitDateType == "enablingDates") {
            dateId = "enablingDates";
            keyState = "b7";
            optionsDate.enable = disabledDatesArr;
          }
          return (
            <div style={alignment}>
              <div>
                <p className="sd-ado-output-check" style={labelStyle}>
                  {props.data.label} {required}
                </p>
              </div>
              <Flatpickr
                id={dateId}
                key={keyState}
                style={styleInput}
                onChange={(str) => {
                  let id = props.data.id;
                  function convert(str) {
                    var date = new Date(str),
                      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
                      day = ("0" + date.getDate()).slice(-2);
                    return [date.getFullYear(), mnth, day].join("-");
                  }
                  let date = convert(str[0]);
                  props.changeCondition(id, date);
                }}
                options={optionsDate}
              />
              <div>
                <small style={helpStyle}>{props.data.helptext}</small>
              </div>
            </div>
          );
        } else {
          if (props.data.limitDateRangeEnabled) {
            keyState = "b2";
            disabledDatesArr.push(props.data.rangeDate);
          }
          if (props.data.limitDateDOWEnabled) {
            keyState = "b3";
            props.data.limitDateDOWDates.map((element) => {
              if (element == "x-sat") {
                disabledDatesArr.push(function (date) {
                  return date.getDay() === 6;
                });
              } else if (element == "x-sun") {
                disabledDatesArr.push(function (date) {
                  return date.getDay() === 0;
                });
              } else if (element == "x-mon") {
                disabledDatesArr.push(function (date) {
                  return date.getDay() === 1;
                });
              } else if (element == "x-tue") {
                disabledDatesArr.push(function (date) {
                  return date.getDay() === 2;
                });
              } else if (element == "x-wed") {
                disabledDatesArr.push(function (date) {
                  return date.getDay() === 3;
                });
              } else if (element == "x-thu") {
                disabledDatesArr.push(function (date) {
                  return date.getDay() === 4;
                });
              } else if (element == "x-fri") {
                disabledDatesArr.push(function (date) {
                  return date.getDay() === 5;
                });
              }
            });
          }
          let time = "";
          let time_24hr = false;
          let dateId = "";
          if (props.data.time_format == "12HR") {
            time = " h:i K";
            keyState = "b8";
          } else if (props.data.time_format == "24HR") {
            time = " H:i";
            time_24hr = true;
            keyState = "b9";
          }
          let optionsDate = {
            minDate: minDate,
            dateFormat: props.data.date_format + time,
            enableTime: false,
            noCalendar: false,
            defaultValue: props.value,
          };
          if (props.data.limitDateType == "disablingDates") {
            dateId = "disablingDates";
            optionsDate.disable = disabledDatesArr;
            keyState = "b10";
          } else if (props.data.limitDateType == "enablingDates") {
            dateId = "enablingDates";
            optionsDate.enable = disabledDatesArr;
            keyState = "b11";
          }
          return (
            <div style={alignment}>
              <div>
                <p className="sd-ado-output-check" style={labelStyle}>
                  {props.data.label} {required}
                </p>
              </div>
              <Flatpickr
                id={dateId}
                key={keyState}
                style={styleInput}
                onChange={(str) => {
                  let id = props.data.id;
                  function convert(str) {
                    var date = new Date(str),
                      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
                      day = ("0" + date.getDate()).slice(-2);
                    return [date.getFullYear(), mnth, day].join("-");
                  }
                  let date = convert(str[0]);
                  props.changeCondition(id, date);
                }}
                options={optionsDate}
              />
              <div>
                <small style={helpStyle}>{props.data.helptext}</small>
              </div>
            </div>
          );
        }
      } else {
        let time = "";
        let time_24hr = false;
        let dateId = "";
        let datekey = 0;
        if (props.data.time_format == "12HR") {
          time = " h:i K";
          datekey = 2;
        } else if (props.data.time_format == "24HR") {
          time = " H:i";
          time_24hr = true;
          datekey = 3;
        }
        return (
          <div style={alignment}>
            <div>
              <p className="sd-ado-output-check" style={labelStyle}>
                {props.data.label} {required}
              </p>
            </div>
            <Flatpickr
              key={datekey}
              style={styleInput}
              onChange={(str) => {
                let id = props.data.id;
                function convert(str) {
                  var date = new Date(str),
                    mnth = ("0" + (date.getMonth() + 1)).slice(-2),
                    day = ("0" + date.getDate()).slice(-2);
                  return [date.getFullYear(), mnth, day].join("-");
                }
                let date = convert(str[0]);
                props.changeCondition(id, date);
              }}
              options={{
                disable: disabledDatesArr,
                minDate: minDate,
                dateFormat: props.data.date_format,
                enableTime: false,
                time_24hr: time_24hr,
                noCalendar: false,
                defaultValue: props.value,
              }}
            />
            <div>
              <small style={helpStyle}>{props.data.helptext}</small>
            </div>
          </div>
        );
      }
    }
  };
  // console.log(props.data);
  return <div>{checkLayoutType()}</div>;
}
