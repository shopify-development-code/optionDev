import React, { Component } from "react";
import {
  Button,
  SkeletonThumbnail,
  SkeletonDisplayText,
  SkeletonBodyText,
} from "@shopify/polaris";
import CustomInput from "./CustomInput";
import CustomSelect from "./CustomSelect";
import CustomSwatch from "./CustomSwatch";

import dummy from "../assets/images/dummy.jpg";

export default class AllElements extends Component {
  // export default function AllElementsPage() {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data,
      conditionsArray: [],
      counter: {},
      allElements: {},
      name: this.props.name,
      saveBool: this.props.buttonBool,
      key: this.props.keyValue,
    };
    this.allData = this.allData.bind(this);
    this.handleAllChanges = this.handleAllChanges.bind(this);
    this.conditionsFunc = this.conditionsFunc.bind(this);
    this.checkParent = this.checkParent.bind(this);
  }
  // componentDidMount ()  {
  //   const element1 = document.querySelector(`[id^="color_swatches"]`);
  //   console.log(element1);
  //       console.log("element1");

  // }
  handleAllChanges(id, value) {
    let type = id.split("_");
    if (
      type[0] == "number" ||
      type[0] == "text" ||
      type[0] == "dropdown" ||
      type[0] == "datetime"
    ) {
      let val = value;
      if (type[0] == "number") {
        val = val.replace(/[e,+,-]/g, "");
      }
      this.props.changeCondition(id, val);
    } else if (
      type[0] == "color" ||
      type[0] == "buttons" ||
      type[0] == "image"
    ) {
      let val = "";
      if (type[0] == "color" || type[0] == "image") {
        val = value;
      } else if (type[0] == "buttons") {
        val = value;
      }
      this.props.changeCondition(id, val);
    } else if (type[0] == "file") {
      let val = "";
      if (value != undefined) {
        val = "file";
      } else {
        val = "no file";
      }
      this.props.changeCondition(id, val);
    }
  }
  checkParent(conditions) {
    let result = [];
    let parents = conditions.whens;
    let obj = this.conditionsFunc(conditions);
    if (conditions.match == "ANYVALUE") {
    } else if (conditions.match == "ALLVALUE") {
      for (var i = 0; i < parents.length; i++) {
        let pos = this.props.data
          .map(function (element) {
            return element.setting.id;
          })
          .indexOf(parents[i].select);
        let output = { display: null };
        if (pos != -1) {
          if (this.props.data[pos].conditions != undefined) {
            if (this.props.data[pos].conditions.whens != undefined) {
              let data = this.props.data[pos].conditions;
              output = this.checkParent(data);
            }
          }
        }
        result.push(output);
      }
    }
    // console.log(result);
    var bool = result.every(
      (val) => val.display == "block" || val.display == null
    );
    if (conditions.display == "SHOWSTYLE") {
      if (!bool) {
        obj.display = "none";
      }
    } else if (conditions.display == "HIDESTYLE") {
      if (!bool) {
        obj.display = "block";
      }
    }
    return obj;
  }
  conditionsFunc(conditions) {
    let result = [];
    let displayDiv = "";
    if (conditions.match == "ANYVALUE") {
      for (let j = 0; j < conditions.whens.length; j++) {
        if (
          conditions.whens[0].select != "PLEASESELECT" &&
          conditions.whens[j].value != "null"
        ) {
          let pos = this.props.data
            .map(function (element) {
              return element.setting.id;
            })
            .indexOf(conditions.whens[j].select);
          if (pos != -1) {
            let new_id = conditions.whens[j].select;
            new_id = new_id.split("_");
            if (new_id[0] == "text") {
              if (conditions.whens[j].where == "EQUALS") {
                if (this.props.data[pos].value != null) {
                  if (this.props.data[pos].value.trim() != "") {
                    if (
                      this.props.data[pos].value.trim().toLowerCase() ==
                      conditions.whens[j].value.trim().toLowerCase()
                    ) {
                      result.push(true);
                    } else {
                      result.push(false);
                    }
                  } else {
                    result.push(false);
                  }
                } else {
                  result.push(false);
                }
              } else if (conditions.whens[j].where == "NOTEQUALS") {
                if (this.props.data[pos].value != null) {
                  if (this.props.data[pos].value.trim() != "") {
                    if (
                      this.props.data[pos].value.trim().toLowerCase() !=
                      conditions.whens[j].value.trim().toLowerCase()
                    ) {
                      result.push(true);
                    } else {
                      result.push(false);
                    }
                  } else {
                    result.push(false);
                  }
                } else {
                  result.push(false);
                }
              } else if (conditions.whens[j].where == "STARTS") {
                if (this.props.data[pos].value != null) {
                  if (this.props.data[pos].value.trim() != "") {
                    let checkVal = this.props.data[pos].value
                      .trim()
                      .toLowerCase();
                    let checkArr = checkVal.split(" ");
                    if (
                      checkArr[0].includes(
                        conditions.whens[j].value.trim().toLowerCase()
                      )
                    ) {
                      result.push(true);
                    } else {
                      result.push(false);
                    }
                  } else {
                    result.push(false);
                  }
                } else {
                  result.push(false);
                }
              } else if (conditions.whens[j].where == "ENDS") {
                if (this.props.data[pos].value != null) {
                  if (this.props.data[pos].value.trim() != "") {
                    let checkVal = this.props.data[pos].value
                      .trim()
                      .toLowerCase();
                    let checkArr = checkVal.split(" ");
                    if (
                      checkArr[checkArr.length - 1].includes(
                        conditions.whens[j].value.trim().toLowerCase()
                      )
                    ) {
                      result.push(true);
                    } else {
                      result.push(false);
                    }
                  } else {
                    result.push(false);
                  }
                } else {
                  result.push(false);
                }
              } else if (conditions.whens[j].where == "CONTAIN") {
                if (this.props.data[pos].value != null) {
                  if (this.props.data[pos].value.trim() != "") {
                    let checkVal = this.props.data[pos].value
                      .trim()
                      .toLowerCase();
                    if (
                      checkVal.includes(
                        conditions.whens[j].value.trim().toLowerCase()
                      )
                    ) {
                      result.push(true);
                    } else {
                      result.push(false);
                    }
                  } else {
                    result.push(false);
                  }
                } else {
                  result.push(false);
                }
              } else if (conditions.whens[j].where == "DOESNOTCONTAIN") {
                if (this.props.data[pos].value != null) {
                  if (this.props.data[pos].value != "") {
                    let checkVal = this.props.data[pos].value
                      .trim()
                      .toLowerCase();
                    if (
                      !checkVal.includes(
                        conditions.whens[j].value.trim().toLowerCase()
                      )
                    ) {
                      result.push(true);
                    } else {
                      result.push(false);
                    }
                  } else {
                    result.push(false);
                  }
                } else {
                  result.push(false);
                }
              }
            } else if (new_id[0] == "number") {
              if (conditions.whens[j].where == "EQUALS") {
                if (this.props.data[pos].value != null) {
                  if (this.props.data[pos].value != "") {
                    let checkVal = this.props.data[pos].value;
                    checkVal = parseInt(checkVal);
                    let value = parseInt(conditions.whens[j].value);
                    if (checkVal == value) {
                      result.push(true);
                    } else {
                      result.push(false);
                    }
                  } else {
                    result.push(false);
                  }
                } else {
                  result.push(false);
                }
              } else if (conditions.whens[j].where == "NOTEQUALS") {
                let checkVal = this.props.data[pos].value;
                checkVal = parseInt(checkVal);
                let value = parseInt(conditions.whens[j].value);
                if (checkVal != null) {
                  if (checkVal != "") {
                    if (this.props.data[pos].value != value) {
                      result.push(true);
                    } else {
                      result.push(false);
                    }
                  } else {
                    result.push(false);
                  }
                } else {
                  result.push(false);
                }
              } else if (conditions.whens[j].where == "GREATER") {
                let checkVal = this.props.data[pos].value;
                checkVal = parseInt(checkVal);
                let value = parseInt(conditions.whens[j].value);
                if (checkVal != null) {
                  if (checkVal != "") {
                    if (checkVal > value) {
                      result.push(true);
                    } else {
                      result.push(false);
                    }
                  } else {
                    result.push(false);
                  }
                } else {
                  result.push(false);
                }
              } else if (conditions.whens[j].where == "NOTGREATER") {
                if (this.props.data[pos].value != null) {
                  let checkVal = this.props.data[pos].value;
                  checkVal = parseInt(checkVal);
                  let value = parseInt(conditions.whens[j].value);
                  if (checkVal != "") {
                    if (checkVal < value) {
                      result.push(true);
                    } else {
                      result.push(false);
                    }
                  } else {
                    result.push(false);
                  }
                } else {
                  result.push(false);
                }
              }
            } else if (
              new_id[0] == "dropdown" ||
              new_id[0] == "radio" ||
              new_id[0] == "color" ||
              new_id[0] == "buttons" ||
              new_id[0] == "image"
            ) {
              if (conditions.whens[j].where == "EQUALS") {
                if (this.props.data[pos].value != null) {
                  if (this.props.data[pos].value.trim() != "") {
                    if (
                      this.props.data[pos].value == conditions.whens[j].value
                    ) {
                      result.push(true);
                    } else {
                      result.push(false);
                    }
                  } else {
                    result.push(false);
                  }
                } else {
                  result.push(false);
                }
              } else if (conditions.whens[j].where == "NOTEQUALS") {
                if (this.props.data[pos].value != null) {
                  if (this.props.data[pos].value.trim() != "") {
                    if (
                      this.props.data[pos].value != conditions.whens[j].value
                    ) {
                      result.push(true);
                    } else {
                      result.push(false);
                    }
                  } else {
                    result.push(false);
                  }
                } else {
                  result.push(false);
                }
              }
            } else if (new_id[0] == "checkbox") {
              if (
                conditions.whens[j].where == "EQUALS" ||
                conditions.whens[j].where == "CONTAIN"
              ) {
                if (this.props.data[pos].value.length != 0) {
                  if (
                    this.props.data[pos].value.includes(
                      conditions.whens[j].value
                    )
                  ) {
                    result.push(true);
                  } else {
                    result.push(false);
                  }
                } else {
                  result.push(false);
                }
              } else if (
                conditions.whens[j].where == "NOTEQUALS" ||
                conditions.whens[j].where == "DOESNOTCONTAIN"
              ) {
                if (this.props.data[pos].value.length != 0) {
                  if (
                    !this.props.data[pos].value.includes(
                      conditions.whens[j].value
                    )
                  ) {
                    result.push(true);
                  } else {
                    result.push(false);
                  }
                } else {
                  result.push(false);
                }
              }
            } else if (new_id[0] == "file") {
              if (conditions.whens[j].where == "hasfile") {
                if (this.props.data[pos].value != null) {
                  if (this.props.data[pos].value == "file") {
                    result.push(true);
                  } else {
                    result.push(false);
                  }
                } else {
                  result.push(false);
                }
              } else if (conditions.whens[j].where == "hasnofile") {
                if (this.props.data[pos].value != null) {
                  if (this.props.data[pos].value == "no file") {
                    result.push(true);
                  } else {
                    result.push(false);
                  }
                } else {
                  result.push(false);
                }
              }
            } else if (new_id[0] == "datetime") {
              if (conditions.whens[j].where == "EQUALS") {
                if (this.props.data[pos].value != null) {
                  if (this.props.data[pos].value != "") {
                    if (
                      this.props.data[pos].value == conditions.whens[j].value
                    ) {
                      result.push(true);
                    } else {
                      result.push(false);
                    }
                  } else {
                    result.push(false);
                  }
                } else {
                  result.push(false);
                }
              } else if (conditions.whens[j].where == "NOTEQUALS") {
                if (this.props.data[pos].value != null) {
                  if (this.props.data[pos].value != "") {
                    if (
                      this.props.data[pos].value != conditions.whens[j].value
                    ) {
                      result.push(true);
                    } else {
                      result.push(false);
                    }
                  } else {
                    result.push(false);
                  }
                } else {
                  result.push(false);
                }
              }
            }
          }
        }
      }
      if (result.includes(true)) {
        if (conditions.display == "SHOWSTYLE") {
          displayDiv = "block";
        } else if (conditions.display == "HIDESTYLE") {
          displayDiv = "none";
        }
      } else {
        if (conditions.display == "SHOWSTYLE") {
          displayDiv = "none";
        } else if (conditions.display == "HIDESTYLE") {
          displayDiv = "block";
        }
      }
    } else if (conditions.match == "ALLVALUE") {
      for (let j = 0; j < conditions.whens.length; j++) {
        if (
          conditions.whens[j].select != "PLEASESELECT" &&
          conditions.whens[j].value != "null"
        ) {
          let pos = this.props.data
            .map(function (element) {
              return element.setting.id;
            })
            .indexOf(conditions.whens[j].select);
          if (pos != -1) {
            let new_id = conditions.whens[j].select;
            new_id = new_id.split("_");
            if (new_id[0] == "text") {
              if (conditions.whens[j].where == "EQUALS") {
                if (this.props.data[pos].value != null) {
                  if (this.props.data[pos].value.trim() != "") {
                    if (
                      this.props.data[pos].value.trim().toLowerCase() ==
                      conditions.whens[j].value.trim().toLowerCase()
                    ) {
                      result.push(true);
                    } else {
                      result.push(false);
                    }
                  } else {
                    result.push(false);
                  }
                } else {
                  result.push(false);
                }
              } else if (conditions.whens[j].where == "NOTEQUALS") {
                if (this.props.data[pos].value != null) {
                  if (this.props.data[pos].value.trim() != "") {
                    if (
                      this.props.data[pos].value.trim().toLowerCase() !=
                      conditions.whens[j].value.trim().toLowerCase()
                    ) {
                      result.push(true);
                    } else {
                      result.push(false);
                    }
                  } else {
                    result.push(false);
                  }
                } else {
                  result.push(false);
                }
              } else if (conditions.whens[j].where == "STARTS") {
                if (this.props.data[pos].value != null) {
                  if (this.props.data[pos].value.trim() != "") {
                    let checkVal = this.props.data[pos].value
                      .trim()
                      .toLowerCase();
                    let checkArr = checkVal.split(" ");
                    let whichToCheck = checkArr[0];
                    whichToCheck = whichToCheck.split("");
                    let length = conditions.whens[j].value.length;
                    let checkingValue = "";

                    for (var m = 0; m < length; m++) {
                      checkingValue = checkingValue + whichToCheck[m];
                    }

                    if (
                      checkingValue.trim().toLowerCase() ==
                      conditions.whens[j].value.trim().toLowerCase()
                    ) {
                      result.push(true);
                    } else {
                      result.push(false);
                    }
                  } else {
                    result.push(false);
                  }
                } else {
                  result.push(false);
                }
              } else if (conditions.whens[j].where == "ENDS") {
                if (this.props.data[pos].value != null) {
                  if (this.props.data[pos].value.trim() != "") {
                    let checkVal = this.props.data[pos].value
                      .trim()
                      .toLowerCase();
                    let checkArr = checkVal.split(" ");
                    let whichToCheck = checkArr[checkArr.length - 1];
                    whichToCheck = whichToCheck.split("");
                    let length = conditions.whens[j].value.length;
                    let checkingValue = "";

                    for (
                      var m = whichToCheck.length - length;
                      m < length;
                      m--
                    ) {
                      checkingValue = checkingValue + whichToCheck[m];
                    }
                    if (
                      checkingValue.trim().toLowerCase() ==
                      conditions.whens[j].value.trim().toLowerCase()
                    ) {
                      result.push(true);
                    } else {
                      result.push(false);
                    }
                  } else {
                    result.push(false);
                  }
                } else {
                  result.push(false);
                }
              } else if (conditions.whens[j].where == "CONTAIN") {
                if (this.props.data[pos].value != null) {
                  if (this.props.data[pos].value.trim() != "") {
                    let checkVal = this.props.data[pos].value
                      .trim()
                      .toLowerCase();
                    if (
                      checkVal.includes(
                        conditions.whens[j].value.trim().toLowerCase()
                      )
                    ) {
                      result.push(true);
                    } else {
                      result.push(false);
                    }
                  } else {
                    result.push(false);
                  }
                } else {
                  result.push(false);
                }
              } else if (conditions.whens[j].where == "DOESNOTCONTAIN") {
                if (this.props.data[pos].value != null) {
                  if (this.props.data[pos].value.trim() != "") {
                    let checkVal = this.props.data[pos].value
                      .trim()
                      .toLowerCase();
                    if (
                      !checkVal.includes(
                        conditions.whens[j].value.trim().toLowerCase()
                      )
                    ) {
                      result.push(true);
                    } else {
                      result.push(false);
                    }
                  } else {
                    result.push(false);
                  }
                } else {
                  result.push(false);
                }
              }
            } else if (new_id[0] == "number") {
              if (conditions.whens[j].where == "EQUALS") {
                if (this.props.data[pos].value != null) {
                  if (this.props.data[pos].value != "") {
                    let checkVal = this.props.data[pos].value;
                    checkVal = parseInt(checkVal);
                    let value = parseInt(conditions.whens[j].value);
                    if (checkVal == value) {
                      result.push(true);
                    } else {
                      result.push(false);
                    }
                  } else {
                    result.push(false);
                  }
                } else {
                  result.push(false);
                }
              } else if (conditions.whens[j].where == "NOTEQUALS") {
                let checkVal = this.props.data[pos].value;
                checkVal = parseInt(checkVal);
                let value = parseInt(conditions.whens[j].value);
                if (checkVal != null) {
                  if (checkVal != "") {
                    if (this.props.data[pos].value != value) {
                      result.push(true);
                    } else {
                      result.push(false);
                    }
                  } else {
                    result.push(false);
                  }
                } else {
                  result.push(false);
                }
              } else if (conditions.whens[j].where == "GREATER") {
                let checkVal = this.props.data[pos].value;
                checkVal = parseInt(checkVal);
                let value = parseInt(conditions.whens[j].value);
                if (checkVal != null) {
                  if (checkVal != "") {
                    if (checkVal > value) {
                      result.push(true);
                    } else {
                      result.push(false);
                    }
                  } else {
                    result.push(false);
                  }
                } else {
                  result.push(false);
                }
              } else if (conditions.whens[j].where == "NOTGREATER") {
                if (this.props.data[pos].value != null) {
                  let checkVal = this.props.data[pos].value;
                  checkVal = parseInt(checkVal);
                  let value = parseInt(conditions.whens[j].value);
                  if (checkVal != "") {
                    if (checkVal < value) {
                      result.push(true);
                    } else {
                      result.push(false);
                    }
                  } else {
                    result.push(false);
                  }
                } else {
                  result.push(false);
                }
              }
            } else if (
              new_id[0] == "dropdown" ||
              new_id[0] == "radio" ||
              new_id[0] == "color" ||
              new_id[0] == "buttons" ||
              new_id[0] == "image"
            ) {
              if (conditions.whens[j].where == "EQUALS") {
                if (this.props.data[pos].value != null) {
                  if (this.props.data[pos].value.trim() != "") {
                    if (
                      this.props.data[pos].value == conditions.whens[j].value
                    ) {
                      result.push(true);
                    } else {
                      result.push(false);
                    }
                  } else {
                    result.push(false);
                  }
                } else {
                  result.push(false);
                }
              } else if (conditions.whens[j].where == "NOTEQUALS") {
                if (this.props.data[pos].value != null) {
                  if (this.props.data[pos].value.trim() != "") {
                    if (
                      this.props.data[pos].value != conditions.whens[j].value
                    ) {
                      result.push(true);
                    } else {
                      result.push(false);
                    }
                  } else {
                    result.push(false);
                  }
                } else {
                  result.push(false);
                }
              }
            } else if (new_id[0] == "checkbox") {
              if (
                conditions.whens[j].where == "EQUALS" ||
                conditions.whens[j].where == "CONTAIN"
              ) {
                if (this.props.data[pos].value.length != 0) {
                  if (
                    this.props.data[pos].value.includes(
                      conditions.whens[j].value
                    )
                  ) {
                    result.push(true);
                  } else {
                    result.push(false);
                  }
                } else {
                  result.push(false);
                }
              } else if (
                conditions.whens[j].where == "NOTEQUALS" ||
                conditions.whens[j].where == "DOESNOTCONTAIN"
              ) {
                if (this.props.data[pos].value.length != 0) {
                  if (
                    !this.props.data[pos].value.includes(
                      conditions.whens[j].value
                    )
                  ) {
                    result.push(true);
                  } else {
                    result.push(false);
                  }
                } else {
                  result.push(false);
                }
              }
            } else if (new_id[0] == "file") {
              if (conditions.whens[j].where == "hasfile") {
                if (this.props.data[pos].value != null) {
                  if (this.props.data[pos].value == "file") {
                    result.push(true);
                  } else {
                    result.push(false);
                  }
                } else {
                  result.push(false);
                }
              } else if (conditions.whens[j].where == "hasnofile") {
                if (this.props.data[pos].value != null) {
                  if (this.props.data[pos].value == "no file") {
                    result.push(true);
                  } else {
                    result.push(false);
                  }
                } else {
                  result.push(false);
                }
              }
            } else if (new_id[0] == "datetime") {
              if (conditions.whens[j].where == "EQUALS") {
                if (this.props.data[pos].value != null) {
                  if (this.props.data[pos].value != "") {
                    if (
                      this.props.data[pos].value == conditions.whens[j].value
                    ) {
                      result.push(true);
                    } else {
                      result.push(false);
                    }
                  } else {
                    result.push(false);
                  }
                } else {
                  result.push(false);
                }
              } else if (conditions.whens[j].where == "NOTEQUALS") {
                if (this.props.data[pos].value != null) {
                  if (this.props.data[pos].value != "") {
                    if (
                      this.props.data[pos].value != conditions.whens[j].value
                    ) {
                      result.push(true);
                    } else {
                      result.push(false);
                    }
                  } else {
                    result.push(false);
                  }
                } else {
                  result.push(false);
                }
              }
            }
          }
        }
      }
      var bool = result.every((val) => val == true);
      if (bool) {
        if (conditions.display == "SHOWSTYLE") {
          displayDiv = "block";
        } else if (conditions.display == "HIDESTYLE") {
          displayDiv = "none";
        }
      } else {
        if (conditions.display == "SHOWSTYLE") {
          displayDiv = "none";
        } else if (conditions.display == "HIDESTYLE") {
          displayDiv = "block";
        }
      }
    }
    let obj = { display: displayDiv, type: conditions.display };
    return obj;
  }
  allData(type, data, selected, conditions, value) {
    if (selected) {
      let displayDiv = "";
      if (conditions != undefined) {
        if (conditions.display != undefined) {
          let obj = this.checkParent(conditions);
          displayDiv = obj.display;
        } else {
          displayDiv = "block";
        }
      }
      if (
        type == "Text Area" ||
        type == "Number" ||
        type == "Text" ||
        type == "Datetime" ||
        type == "File"
      ) {
        return (
          <CustomInput
            colorLayout={this.props.colorLayout}
            layout={this.props.layout}
            generalLayout={this.props.generalLayout}
            typoLayout={this.props.typoLayout}
            mainLayout={this.props.mainLayout}
            handleAllChanges={this.handleAllChanges}
            checkDisplay={displayDiv}
            changeCondition={this.props.changeCondition}
            data={data}
            type={type}
            value={value}
          />
        );
      } else if (
        type == "Dropdown" ||
        type == "Checkbox" ||
        type == "Radio Buttons" ||
        type == "Buttons"
      ) {
        return (
          <CustomSelect
            colorLayout={this.props.colorLayout}
            generalLayout={this.props.generalLayout}
            mainLayout={this.props.mainLayout}
            typoLayout={this.props.typoLayout}
            changeCondition={this.props.changeCondition}
            handleAllChanges={this.handleAllChanges}
            checkDisplay={displayDiv}
            data={data}
            type={type}
            value={value}
          />
        );
      } else if (type == "Color Swatches" || type == "Image Swatches") {
        return (
          <CustomSwatch
            correctswatch={this.props.correctswatch}
            colorLayout={this.props.colorLayout}
            generalLayout={this.props.generalLayout}
            mainLayout={this.props.mainLayout}
            typoLayout={this.props.typoLayout}
            changeCondition={this.props.changeCondition}
            handleAllChanges={this.handleAllChanges}
            checkDisplay={displayDiv}
            data={data}
            type={type}
            value={value}
            // showimage={this.props.showimage}
            // imageURL={this.props.imageURL}
          />
        );
      } else if (type == "Paragraph") {
        // console.log(data);
        return (
          <div
            id="my-metafeild_1"
            style={{ marginTop: "10px", display: displayDiv }}
          >
            <div
              style={{ textAlign: this.props.generalLayout.alignment }}
              className="sd-para"
              dangerouslySetInnerHTML={{ __html: data.text }}
            ></div>
          </div>
        );
      }
    } else {
      return <div></div>;
    }
  }

  allElementBody = () => {
    return (
      <div className="all_elements_layout" spacing={0}>
        <div className="left_appearence">
          {/* <SkeletonThumbnail size="medium" /> */}
          <img src={dummy} />
        </div>
        <div className="right_appearence">
          {/* <SkeletonBodyText />
          <div style={{ marginTop: "20px" }}>
            <SkeletonDisplayText size="medium" />
          </div> */}
          {this.props.data.map((elem, index) => {
            return (
              <div key={index}>
                {this.allData(
                  elem.name,
                  elem.setting,
                  elem.selected,
                  elem.conditions,
                  elem.value
                )}
              </div>
            );
          })}
          <Button id="add_to_cart" fullWidth>
            Add To Cart
          </Button>
        </div>
      </div>
    );
  };
  render() {
    // console.log(this.props.layout);
    return (
      <div className="all_elements_layout_outer">{this.allElementBody()}</div>
    );
  }
}
