import React, { useState, useEffect } from "react";
import {
  Navigation,
  TopBar,
  Icon,
  Modal,
  Button,
  TextField,
  Text,
  ButtonGroup,
  Select,
  HorizontalStack,
} from "@shopify/polaris";
import {
  DesktopMajor,
  MobileMajor,
  ArrowLeftMinor,
} from "@shopify/polaris-icons";
import { element } from "prop-types";
// import { useRouter } from "next/router";
// import { useNavigate } from "react-router-dom";
import { useNavigate } from "@shopify/app-bridge-react";
import { Fullscreen } from "@shopify/app-bridge/actions";
import { useAppBridge } from "@shopify/app-bridge-react";
export default function Header(props) {
  //   const router = useRouter();
  const navigate = useNavigate();
  const app = useAppBridge();
  const fullscreen = Fullscreen.create(app);
  const [backModal, setBackModal] = useState(false);
  const [checkInstall, setCheckInstall] = useState(props.checkInstall);
  const [error_status, setErrorStatus] = useState(false);
  const [fullSc, setFullsc] = useState(true);
  // const [saveBool, setSaveBool] = useState(props.buttonBool);
  // const [namedSet, setNamedSet] = useState(props.name);
  const options = [
    { label: "Draft", value: "set_draft" },
    { label: "Active", value: "set_active" },
  ];
  // console.log(typeof props.status);
  // console.log(props.status);
  const handleSelect = (value) => {
    // console.log(value);
    // console.log(props.allChecked);
    // console.log(props.selectedProductRules);
    let allProductData = props.allChecked;
    let checkProduct = props.selectedProductRules.product_added;
    let check = true;
    if (value != "set_draft") {
      // console.log("jjjjjjjjj");
      /** PRODUCT BASED CONDITION START [MANUAL / ALL / AUTO(FUTURE SCOPE] ) */
      if (props.selectedProductRules.type == "manual") {
        for (var k = 0; k < checkProduct.length; k++) {
          allProductData.map((element) => {
            if (element.type == "manual" && element.status == true) {
              if (element.id != props.updateId) {
                element.product_added.map((elem) => {
                  if (elem.title == checkProduct[k].title) {
                    check = false;
                  }
                });
              }
            }
          });
        }
      } else if (props.selectedProductRules.type == "all") {
        allProductData.map((element) => {
          if (element.type == "all" && element.status != false) {
            if (element.id != props.updateId) {
              check = false;
            }
          }
        });
      }
    }
    if (!check) {
      props.toastErrorSucessState(
        true,
        "Can't publish the option set. Similar products exits in other option set",
        true
      );
    } else {
      props.handleStatus(value);
    }
  };
  const userMenuMarkup = () => {
    let errorBlock = Object.keys(props.labelError).length;
    if (props.action_perform) {
      if (errorBlock === 0) {
        return (
          <div className="Polaris-TopBar__userMenuMarkup">
            <div className="Polaris-Select_outer">
              <Select
                options={options}
                onChange={handleSelect}
                value={props.status}
              />
            </div>
            <Button onClick={saveAllData} primary>
              {" "}
              Save{" "}
            </Button>
          </div>
        );
      } else {
        return (
          <div className="Polaris-TopBar__userMenuMarkup">
            <div className="Polaris-Select_outer">
              <Select
                options={options}
                onChange={handleSelect}
                value={props.status}
              />
            </div>
            <Button disabled={true} onClick={() => {}} primary>
              {" "}
              Save{" "}
            </Button>
          </div>
        );
      }
    } else {
      return (
        <div className="Polaris-TopBar__userMenuMarkup">
          <div className="Polaris-Select_outer">
            <Select
              options={options}
              onChange={handleSelect}
              value={props.status}
            />
          </div>
          <Button disabled={true} onClick={() => {}} primary>
            {" "}
            Save{" "}
          </Button>
        </div>
      );
    }
  };
  const saveAllData = () => {
    let name = props.name;
    // console.log(props.allNames);
    if (name.trim() != "") {
      let allName = props.allNames.filter(
        (element) =>
          element.name.trim().toLowerCase() == name.trim().toLowerCase() &&
          element.id != props.updateId
      );
      if (allName.length == 0) {
        setErrorStatus(false);
        props.saveOptionSetData();
      } else {
        props.toastErrorSucessState(
          true,
          "A similar option set is there. Please choose another name.",
          true
        );
        setErrorStatus(true);
      }
    } else {
      props.toastErrorSucessState(true, "Please name the option set!", true);
      setErrorStatus(true);
    }
  };
  const navigationMarkup = () => {
    if (props.checkTab == "no_layout") {
      if (props.step == 1) {
        return (
          <div className="sd-ado-leftnav">
            <Navigation>{checkInstallNavigation("Back to list")}</Navigation>
          </div>
        );
      } else if (props.step == 2) {
        return (
          <div className="sd-ado-leftnav">
            <Navigation location="/">
              <Navigation.Section
                items={[
                  {
                    label: "Add option set",
                    icon: ArrowLeftMinor,
                    onClick: () => {
                      const inc = false;
                      props.getBack(inc);
                    },
                  },
                ]}
              />
            </Navigation>
          </div>
        );
      } else if (props.step == 3) {
        return (
          <div className="sd-ado-leftnav">
            <Navigation location="/">
              <Navigation.Section
                items={[
                  {
                    label: props.optionSetData[props.index - 1].setting.label,
                    icon: ArrowLeftMinor,
                    onClick: () => {
                      let label =
                        props.optionSetData[props.index - 1].setting.label;
                      let id = props.optionSetData[props.index - 1].setting.id;
                      let obj = {};
                      if (
                        props.optionSetData[
                          props.index - 1
                        ].setting.label.trim() == ""
                      ) {
                        props.toastErrorSucessState(
                          true,
                          "Label field can't be empty",
                          true
                        );
                      } else {
                        let checkLabel = [];
                        props.optionSetData.map((element, index) => {
                          if (index != props.index - 1) {
                            if (element.setting.label == label) {
                              checkLabel.push(true);
                            }
                          }
                        });
                        if (checkLabel.length > 0) {
                          props.toastErrorSucessState(
                            true,
                            "Same label name already exits",
                            true
                          );
                        } else {
                          if (
                            props.optionSetData[props.index - 1]
                              .conditionalField
                          ) {
                            let check = [];
                            let newCheck = false;
                            if (props.optionSetData[0].name == "Paragraph") {
                              if (props.index - 1 == 1) {
                                newCheck = true;
                              }
                            }
                            if (!newCheck) {
                              props.optionSetData[
                                props.index - 1
                              ].conditions.whens.map((element) => {
                                if (element.value != "") {
                                  check.push(true);
                                } else {
                                  check.push(false);
                                }
                              });
                            }
                            let result = check.every(
                              (val, i, arr) => val === true
                            );
                            if (result) {
                              props.checkFunc("first", props.optionSetData);
                            } else {
                              props.toastErrorSucessState(
                                true,
                                "Please complete conditional feild",
                                true
                              );
                            }
                          } else {
                            let errorBlock = Object.keys(
                              props.labelError
                            ).length;
                            if (errorBlock == 0) {
                              props.checkFunc("first", props.optionSetData);
                            }
                          }
                        }
                      }
                    },
                  },
                ]}
              />
            </Navigation>
          </div>
        );
      }
    } else {
      return (
        <div className="sd-ado-leftnav">
          <Navigation location="/">
            <Navigation.Section
              items={[
                {
                  label: "Back to Elements",
                  icon: ArrowLeftMinor,
                  onClick: () => {
                    props.changeLayout("no_layout");
                  },
                },
              ]}
            />
          </Navigation>
        </div>
      );
    }
  };
  useEffect(() => {
    // history.pushState(null, null, location.href);
    // window.onpopstate = function () {
    //   history.go(1);
    // };
    fullscreen.dispatch(Fullscreen.Action.ENTER);
  }, []);
  const handleExitFullScrren = () => {
    // fullscreen.dispatch(Fullscreen.Action.EXIT);
    if (props.action_perform) {
      setBackModal({ open: true });
    } else {
      changeMainState();
      navigate("/option-sets");
    }
  };
  const checkInstallNavigation = (val) => {
    if (checkInstall) {
      return <div></div>;
    } else {
      return (
        <Navigation.Section
          items={[
            {
              label: val,
              icon: ArrowLeftMinor,
              // onClick: () => {
              //   if (props.action_perform) {
              //     setBackModal({ open: true });
              //   } else {
              //     changeMainState();
              //     navigate("/option-sets");
              //   }
              onClick: () => {
                handleExitFullScrren();
              },
            },
          ]}
        />
      );
    }
  };
  const handleName = (value, id) => {
    let names = [];
    if (props.updateId != 0) {
      names = props.allNames.filter(
        (element) =>
          element.name.trim().toLowerCase() == value.trim().toLowerCase() &&
          element.id != props.updateId
      );
    } else {
      names = props.allNames.filter(
        (element) =>
          element.name.trim().toLowerCase() == value.trim().toLowerCase()
      );
    }
    if (value.trim() != "") {
      if (names.length > 0) {
        props.toastErrorSucessState(
          true,
          "Same Name Already Exists. Please Choose a different Name!",
          true
        );
        setErrorStatus(true);
      } else {
        setErrorStatus(false);
      }
    } else {
      props.toastErrorSucessState(
        true,
        // "Same Name Already Exists. Please Choose a different Name!",
        "Enter a valid name!",
        true
      );
      setErrorStatus(true);
    }
    props.handleOptionSetName(value);
  };
  const searchFieldMarkup = () => {
    return (
      <div className="sd-search-header-Outer">
        <div className="sd-optionSet-name-input">
          <TextField
            id="enter_option_name"
            value={props.name}
            placeholder="Enter optionset name "
            onChange={handleName}
            error={error_status}
            maxLength={120}
            showCharacterCount
          />
        </div>
        <div className="sd-desktop-mobile-view">
          <div
            className="sd-mobile-view"
            onClick={() => {
              props.responsiveViewChange("mobile_view");
              document
                .getElementsByClassName("sd-mobile-view")[0]
                .classList.add("mobile-active");
              document
                .getElementsByClassName("sd-desktop-view")[0]
                .classList.remove("desktop-active");
            }}
          >
            <Icon source={MobileMajor}></Icon>
          </div>
          <div
            className="sd-desktop-view"
            onClick={() => {
              props.responsiveViewChange("desktop_view");
              document
                .getElementsByClassName("sd-desktop-view")[0]
                .classList.add("desktop-active");
              document
                .getElementsByClassName("sd-mobile-view")[0]
                .classList.remove("mobile-active");
            }}
          >
            <Icon source={DesktopMajor}></Icon>
          </div>
        </div>
      </div>
    );
  };
  const changeMainState = () => {
    props.decrementStep();
  };
  return (
    <div className="sd-adotopnav">
      {navigationMarkup()}
      <div className="sd-ado-rightnav">
        {/* <TopBar userMenu={userMenuMarkup()} searchField={searchFieldMarkup()} /> */}
        <TopBar userMenu={userMenuMarkup()} searchField={searchFieldMarkup()} />
      </div>
      <Modal
        instant
        open={backModal}
        onClose={() => {
          setBackModal(false);
        }}
        title={"Are you Sure"}
        primaryAction={{
          content: "Yes",
          onAction: () => {
            changeMainState();
            // router.push({
            //   pathname: "/option-sets",
            // });
            navigate("/option-sets");
          },
        }}
        secondaryActions={[
          {
            content: "No",
            onAction: () => {
              setBackModal(false);
            },
          },
        ]}
      >
        <Modal.Section>
          <Text>
            All your changes may not be saved. Do you want to continue ?
          </Text>
        </Modal.Section>
      </Modal>
    </div>
  );
}
