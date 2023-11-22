import React, { useCallback, useState, useEffect } from "react";
import { Tabs } from "antd";
import { List as Lis, Card, Avatar as Ava, Skeleton } from "antd";
import {
  Text,
  Icon,
  Modal,
  Checkbox,
  Layout,
  Tooltip,
  Button,
  TextField,
  Select,
  HorizontalStack,
  Avatar,
  ChoiceList,
  VerticalStack,
  Divider,
} from "@shopify/polaris";
import {
  CirclePlusMajor,
  AddMajor,
  DuplicateMinor,
  DragHandleMinor,
  DeleteMajor,
  ViewMajor,
  HideMinor,
  TextBlockMajor,
  TextMajor,
  DropdownMinor,
  CalendarMinor,
  TimelineAttachmentMajor,
  ChecklistMajor,
  ImagesMajor,
  ColorsMajor,
  TypeMajor,
  CircleTickMajor,
  BuyButtonButtonLayoutMajor,
  HashtagMajor,
  TemplateMajor,
  HomeMajor,
  ProductsMajor,
  Columns3Major,
  MobileHamburgerMajor,
  MobileCancelMajor,
} from "@shopify/polaris-icons";
import { ResourcePicker } from "@shopify/app-bridge-react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import GeneralLayout from "./GeneralLayout";
// import ErrorLayout from "./ErrorLayout";
import TypoLayout from "./TypoLayout";
import ColorLayout from "./ColorLayout";

function AddElement(props) {

  const [mobtoggle, setmobtoggle] = useState(true);
  const [propsItems, setPropsItems] = useState(props.data);
  const [selected, setSelected] = useState(props.tabs);
  const [modal, setModal] = useState({ open: false });
  const [backModal, setBackModal] = useState(false);
  const [collectionModal, setCollectionModal] = useState({ open: false });
  // const [conditionType,setConditionType] = useState(props.products.conditional_type);
  const [conditionType, setConditionType] = useState("");
  const [activeID, setActiveID] = useState("");
  const [checkedAll, setCheckedAll] = useState(false);
  const [checkedAuto, setCheckedAuto] = useState(false);
  const [checkedManual, setCheckedManual] = useState(false);
  const [typeOfSelect, setTypeOfSelect] = useState("none");
  const [productType, setProductType] = useState(props.products.conditions);
  const [checkInstall, setCheckInstall] = useState(props.checkInstall);
  const [whichResource, setWhichResource] = useState("");
  const [needResource, setNeedResource] = useState(false);
  const [productsAdded, setProductsAdded] = useState(
    props.products.product_added
  );
  const [collectionCopy, setCollectionCopy] = useState(
    props.products.all_resources
  );
  const [icons, setIcons] = useState({
    "Text Area": TextBlockMajor,
    Text: TextMajor,
    Number: HashtagMajor,
    Datetime: CalendarMinor,
    File: TimelineAttachmentMajor,
    Dropdown: DropdownMinor,
    Checkbox: ChecklistMajor,
    "Radio Buttons": CircleTickMajor,
    Buttons: BuyButtonButtonLayoutMajor,
    "Image Swatches": ImagesMajor,
    "Color Swatches": ColorsMajor,
    Paragraph: TypeMajor,
  });

  useEffect(() => {
    setSelected(props.tabs);
    setProductsAdded(props.products.product_added);
    if (props.products.type == "none") {
      setCheckedManual(false);
      setCheckedAuto(false);
      setCheckedAll(false);
    } else if (props.products.type == "manual") {
      setCheckedManual(true);
      setCheckedAuto(false);
      setCheckedAll(false);
    } else if (props.products.type == "auto") {
      setCheckedAuto(true);
      setCheckedManual(false);
      setCheckedAll(false);
    } else if (props.products.type == "all") {
      setCheckedAll(true);
      setCheckedManual(false);
      setCheckedAuto(false);
    }
  }, [props.products.product_added]);
  function changeMainState() {
    props.decrementStep();
  }

  const product_type_select = [
    { label: "Product Title", value: "product_title" },
    { label: "Product Vendor", value: "product_vendor" },
    { label: "Product Price", value: "product_price" },
    { label: "Product Tag", value: "product_tag" },
    { label: "Collection", value: "collections" },
    { label: "Product Type", value: "product_typo" },
  ];

  const validator = [
    { label: "Is equal to", value: "EQUALS" },
    { label: "Is not equal to", value: "NOTEQUALS" },
    { label: "Starts with", value: "STARTS" },
    { label: "Ends with", value: "ENDS" },
    { label: "Contains", value: "CONTAIN" },
    { label: "Does not Contain", value: "NOTCONTAIN" },
  ];

  const intValidator = [
    { label: "Is equal to", value: "EQUALS" },
    { label: "Is not equal to", value: "NOTEQUALS" },
    { label: "Is greater than", value: "GREATER" },
    { label: "Is less than", value: "NOTGREATER" },
  ];

  const collectionValidator = [
    { label: "Is equal to", value: "EQUALS" },
    { label: "Is not equal to", value: "NOTEQUALS" },
  ];
  // const onChange = (key) => {
  //   console.log(key);
  // };
  function checkWhichType(val, index, valid) {
    if (
      val == "product_title" ||
      val == "product_vendor" ||
      val == "product_typo"
    ) {
      return (
        <Select
          id={"validator_" + index}
          options={validator}
          onChange={handleSelectChange}
          value={valid}
        />
      );
    } else if (val == "collections" || val == "product_tag") {
      return (
        <Select
          id={"validator_" + index}
          options={collectionValidator}
          onChange={handleSelectChange}
          value={valid}
        />
      );
    } else if (val == "product_price") {
      return (
        <Select
          id={"validator_" + index}
          options={intValidator}
          onChange={handleSelectChange}
          value={valid}
        />
      );
    }
  }
  const handleChange = (value, id) => {
    let newChecked = value;
    let check = "";
    if (id == "manual_products") {
      if (value == true) {
        setCheckedManual(newChecked);
        setCheckedAll(false);
        setCheckedAuto(false);
        check = "manual";
        setTypeOfSelect(check);
      } else {
        setCheckedManual(false);
        setCheckedAll(false);
        setCheckedAuto(false);
      }
    } else if (id == "all_products") {
      // setBackModal(true)
      if (value == true) {
        setCheckedAll(newChecked);
        // setProductsAdded([]);

        setCheckedManual(false);
        setCheckedAuto(false);
        check = "all";
        setTypeOfSelect(check);
      } else {
        setCheckedAll(false);
        setCheckedManual(false);
        setCheckedAuto(false);
      }
    } else if (id == "auto_products") {
      let checkProducts = [...productType];
      setProductType(checkProducts);
      setCheckedAuto(newChecked);
      setCheckedManual(false);
      setCheckedAll(false);
      check = "auto";
      setTypeOfSelect(check);
    }
    handlePropProducts(check, "type");
  };
  // const handleTabChange = useCallback((selectedTabIndex) => {
  //   setSelected(selectedTabIndex);
  //   props.handleTabIndex(selectedTabIndex);
  // }, []);
  // const handleTabChange = (e) => {
  //   setSelected(e);
  //   props.handleTabIndex(e);
  //   // console.log(e)
  // };
  const handleTabChange = (e) => {
    let all = [0, 1, 2];
    let i = all.indexOf(e);
    all.splice(i, 1);
    setSelected(e);
    props.handleTabIndex(e);
    document.getElementsByClassName("tab-item")[e].classList.add("active-tab");
    all.forEach((element) => {
      document
        .getElementsByClassName("tab-item")
        [element].classList.remove("active-tab");
    });
  };

  function changeStep(e) {
    const inc = true;
    var target = e.target.dataset.col;
    if (target != undefined) {
      if (target == "null") {
        props.selectElement(inc);
      } else {
        props.re_editingData(target);
      }
    }
  }

  function hideElement(selected, col) {
    let iconstatus;
    if (selected) {
      iconstatus = (
        <div title="hide">
          <Icon source={ViewMajor} accessibilityLabel="view" />
        </div>
      );
    } else {
      iconstatus = (
        <div title="unhide">
          <Icon source={HideMinor} accessibilityLabel="view" />{" "}
        </div>
      );
    }

    return (
      <div
        data-col={col}
        onClick={() => props.moreSetting(col, "view")}
        id="view"
      >
        {iconstatus}
      </div>
    );
  }

  const handleClick = (e) => {
    let date = new Date();
    let id = e.target.id;
    id = id.split("_");
    let items = [...productType];
    if (id[0] == "addMore") {
      let value = {
        product_type: "product_vendor",
        validator: "EQUALS",
        value: "",
        index: date.getTime(),
        oldVal: "",
      };
      items.push(value);
    } else if (id[0] == "delete") {
      let index = parseInt(id[1]);
      let pos = items
        .map((element) => {
          return element.index;
        })
        .indexOf(index);
      items.splice(pos, 1);
    }
    setProductType(items);
    props.handle(items, "conditions");
  };
  const handleSelectChange = (value, id) => {
    let newId = id.split("_");
    let index = parseInt(newId[1]);

    let items = [...productType];

    let pos = items
      .map((element) => {
        return element.index;
      })
      .indexOf(index);

    let item = { ...items[pos] };
    if (newId[0] == "product") {
      if (value == "collections") {
        item.value = "null";
      } else {
        item.value = item.oldVal;
      }
      item.product_type = value;
    } else if (newId[0] == "validator") {
      item.validator = value;
    } else if (newId[0] == "addon") {
      item.value = value;
      item.oldVal = value;
    } else if (newId[0] == "value") {
      item.collection_items = value;
    }
    items[pos] = item;
    setProductType(items);
    props.handle(items, "conditions");
  };
  const checkResourcePick = (type, value, index) => {
    if (type == "product_price") {
      return (
        <TextField
          type="number"
          value={value}
          onChange={handleSelectChange}
          id={"addon_" + index}
        />
      );
    } else if (type == "collections") {
      return (
        <Button
          id={"value_" + index}
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
                      e.target.parentNode.parentNode.parentNode.parentNode.id;
                    if (id == "") {
                      id =
                        e.target.parentNode.parentNode.parentNode.parentNode
                          .parentNode.id;
                    }
                  }
                }
              }
            }
            let items = { ...collectionCopy };
            if (items.hasOwnProperty(id)) {
            } else {
              items[id] = [];
            }
            props.handle(items, "all_resources");
            setCollectionCopy(items);
            setActiveID(id);
            setNeedResource(true);
            setWhichResource("Collection");
            setCollectionModal({ open: true });
          }}
        >
          Collection
        </Button>
      );
    } else {
      return (
        <TextField
          type="text"
          value={value}
          onChange={handleSelectChange}
          id={"addon_" + index}
        />
      );
    }
  };

  const media = <Avatar customer size="medium" name="Test" />;
  const remove = (i) => {
    let b = productsAdded.filter((obj) => {
      return obj.product_id !== i;
    });
    setProductsAdded(b);
    props.handle(b, "products_added");
    // console.log(productsAdded);
  };
  function getElementProducts() {
    if (checkedAuto) {
      return (
        <div className="choose_products_div">
          <ChoiceList
            title="Products must match"
            choices={[
              { label: "All Condition", value: "all_condn" },
              { label: "Any Condition", value: "any_condn" },
            ]}
            selected={conditionType}
            onChange={(value) => {
              setConditionType(value);
              props.handle(value, "conditional_type");
            }}
          />
          {productType.map((elem) => {
            return (
              <HorizontalStack>
                <Select
                  id={"product_" + elem.index}
                  options={product_type_select}
                  onChange={handleSelectChange}
                  value={elem.product_type}
                />
                {checkWhichType(elem.product_type, elem.index, elem.validator)}
                {checkResourcePick(elem.product_type, elem.value, elem.index)}

                <Button id={"delete_" + elem.index} onClick={handleClick}>
                  <span id={"delete_" + elem.index}>Delete</span>
                </Button>
              </HorizontalStack>
            );
          })}
          <Button id={"addMore"} onClick={handleClick}>
            <span id={"addMore"}>Add More Options</span>
          </Button>
        </div>
      );
    } else if (checkedAuto) {
      return <div></div>;
    } else if (checkedManual) {
      return (
        <div>
          <div className="choose_products_div">
            <Button
              onClick={() => {
                setNeedResource(true);
                setWhichResource("product");
                setModal({ open: true });
              }}
            >
              Choose Products
            </Button>
          </div>

          <Lis
            className="demo-loadmore-list"
            itemLayout="horizontal"
            dataSource={productsAdded}
            renderItem={(item, index) => (
              <Lis.Item
                actions={[
                  <a onClick={() => remove(item.product_id)}>
                    <Icon source={DeleteMajor} color="critical" />
                  </a>,
                ]}
              >
                <Skeleton avatar title={false} loading={false} active>
                  <Lis.Item.Meta
                    avatar={<Ava src={item.originalSrc} />}
                    title={<a>{item.title}</a>}
                  />
                </Skeleton>
              </Lis.Item>
            )}
          />
        </div>
      );
    } else {
      return <div className="choose_products_div"></div>;
    }
  }

  function handlePropProducts(value, check) {
    if (check == "type") {
      props.handle(value, check);
    }
  }

  const resourcePickFunc = () => {
    if (needResource) {
      if (whichResource == "product") {
        return (
          <ResourcePicker
            resourceType="Product"
            open={modal.open}
            initialQuery=""
            onCancel={() => {
              setModal({ open: false });
              setNeedResource(false);
              setWhichResource("");
            }}
            showVariants={false}
            initialSelectionIds={productsAdded}
            onSelection={(resources) => {
              let result = [];
              let data = [];
              resources.selection.map((element) => {
                let productImage = element?.images
                  ? element?.images[0]?.originalSrc ?? ""
                  : "no-image";

                let product_id = element.id.split("/");
                product_id = product_id[product_id.length - 1];
                data.push({
                  id: element.id,
                  product_id: product_id,
                  title: element.title,
                  originalSrc: productImage,
                });
              });
              setProductsAdded(data);
              setModal({ open: false });
              setNeedResource(false);
              setWhichResource("");
              props.handle(data, "products_added");
            }}
          />
        );
      } else {
        return (
          <ResourcePicker
            resourceType="Collection"
            open={collectionModal.open}
            onCancel={() => {
              setCollectionModal({ open: false });
              setNeedResource(false);
              setWhichResource("");
            }}
            selectMultiple={false}
            showVariants={false}
            initialSelectionIds={collectionCopy[activeID]}
            onSelection={(resources) => {
              let result = [];
              let data = [];
              resources.selection.map((element) => {
                result.push({ id: element.id });
                let product_id = element.id.split("/");
                product_id = product_id[product_id.length - 1];
                data.push({ id: product_id, image: "", title: element.title });
              });
              let items = { ...collectionCopy };
              items[activeID] = result;
              props.handle(items, "all_resources");
              setCollectionCopy(items);
              setCollectionModal({ open: false });
              setNeedResource(false);
              setWhichResource("");
              handleSelectChange(data, activeID);
            }}
          />
        );
      }
    } else {
      return <div></div>;
    }
  };

 

  const handleTabs = (val) => {
    if (val == 0) {
      return <List />;
    } else if (val == 1) {
      return (
        <div>
          <div className="select-products">
            <Card title="Select Products">
                <VerticalStack >
                    <Checkbox
                      label="Manual"
                      id="manual_products"
                      checked={checkedManual}
                      onChange={handleChange}
                    />
                    <Checkbox
                      label="All"
                      id="all_products"
                      checked={checkedAll}
                      onChange={handleChange}
                    />
                </VerticalStack>
            </Card>
          </div>
          <div>{getElementProducts()}</div>
        </div>
      );
    } else if (val == 2) {
      return (
        <div className="globallayout-tabs">
          <div>
            <Checkbox
              label="Enable Global Layout"
              id="single_layout"
              checked={props.singleLayout}
              onChange={(value, id) => {
                props.handle(value, id);
              }}
            />
            <p style={{ fontSize: "12px" }}>
              Note : If checked, below settings will work instead of particular
              element appearence.
            </p>
          </div>
          <div className="empty">
            <Tabs defaultActiveKey="1" items={tabItems} />
          </div>
        </div>
      );
    }
  };

  const handleDragEnd = useCallback(({ source, destination }) => {
    if (destination != null) {
      let oldItems = [...propsItems];
      const newItems = oldItems.slice(); // Duplicate
      const [temp] = newItems.splice(source.index, 1);
      newItems.splice(destination.index, 0, temp);
      handleOnDragElements(newItems, source.index, destination.index);
      setPropsItems(newItems);
    }
  }, []);

  function handleOnDragElements(items, indexStart, indexEnd) {
    props.dragElement(items, indexStart, indexEnd);
  }

  function List() {
    return (
      <div>
        <div className="sd-ado-draganddrop">
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="root">
              {(provided) => {
                return (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    {props.data.map((item, index) => {
                      return (
                        <Draggable
                          className="sd-ado-maindnd"
                          key={index}
                          draggableId={item.id}
                          index={index}
                        >
                          {(provided, snapshot) => {
                            return (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                style={
                                  snapshot.isDragging
                                    ? {
                                        background: "",
                                        ...provided.draggableProps.style,
                                      }
                                    : provided.draggableProps.style
                                }
                              >
                                <div
                                  id={item.id}
                                  key={parseInt(index) + 1}
                                  data-col={item.index}
                                  className="inputDatadiv"
                                >
                                  <div data-col={item.index} className="icon">
                                    <Icon
                                      source={icons[item.name]}
                                      accessibilityLabel="lableImage"
                                    />
                                  </div>
                                  <div
                                    data-col={item.index}
                                    id="sd-elements-div"
                                    className={item.id}
                                    onClick={changeStep}
                                  >
                                    <p data-col={item.index}>
                                      {item.setting.label}
                                    </p>
                                  </div>
                                  <div className="icons-box">
                                    <div
                                      title="duplicate"
                                      data-col={item.index}
                                      onClick={() =>
                                        props.moreSetting(
                                          item.index,
                                          "duplicate"
                                        )
                                      }
                                      id="duplicate"
                                    >
                                      <Icon
                                        source={DuplicateMinor}
                                        accessibilityLabel="duplicate"
                                      />
                                    </div>
                                    {hideElement(item.selected, item.index)}
                                    <div
                                      title="delete"
                                      data-col={item.index}
                                      onClick={() =>
                                        props.moreSetting(item.index, "delete")
                                      }
                                      id="delete"
                                    >
                                      <Icon
                                        source={DeleteMajor}
                                        accessibilityLabel="delete"
                                      />
                                    </div>
                                    <div {...provided.dragHandleProps}>
                                      <Tooltip content="Drag to reorder list items">
                                        <Icon
                                          source={DragHandleMinor}
                                          color="inkLightest"
                                        />
                                      </Tooltip>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          }}
                        </Draggable>
                      );
                    })}
                    {provided.placeholder}
                  </div>
                );
              }}
            </Droppable>
          </DragDropContext>
        </div>
        <div
          key={null}
          data-col="null"
          onClick={changeStep}
          className="inputDatadivMain"
        >
          <div data-col="null" className="icon">
            <Icon source={CirclePlusMajor}></Icon>
          </div>
          <div data-col="null" className="add_element" onClick={changeStep}>
            <p data-col="null">Add Element</p>
          </div>
        </div>
      </div>
    );
  }

  const handleTypo = (id, value) => {
    props.handleLayout(id, value, "typo");
  };
  const handleColors = (id, value) => {
    props.handleLayout(id, value, "color");
  };

  const handleGeneral = (id, value) => {
    props.handleLayout(id, value, "general");
  };

  const handleLayoutSection = () => {
    if (props.layoutType == "general_layout") {
      return (
        <GeneralLayout handleFunc={handleGeneral} data={props.general_layout} />
      );
    } else if (props.layoutType == "typo_layout") {
      return <TypoLayout handleFunc={handleTypo} data={props.typo_layout} />;
    } else if (props.layoutType == "color_layout") {
      return (
        <ColorLayout handleFunc={handleColors} data={props.color_layout} />
      );
    }
  };
  const togglemob = () => {
    mobtoggle ? setmobtoggle(false) : setmobtoggle(true);
    mobtoggle
      ? document
          .getElementsByClassName("leftSidebar")[0]
          .classList.add("mob-res")
      : document
          .getElementsByClassName("leftSidebar")[0]
          .classList.remove("mob-res");
  };
  const navigationMarkup = () => {
    if (props.layoutType == "no_layout") {
      return (
        <div className="sd-ado-miantab-panel no_layout">
          {resourcePickFunc()}
          <div className="outertab">
            <div className="toggle-icon" onClick={togglemob}>
              <span className="mob-close">
                <Icon source={MobileCancelMajor} color="base" />
              </span>
              <Icon source={MobileHamburgerMajor} color="base" />
            </div>
            <div
              className="tab-item active-tab"
              onClick={() => handleTabChange(0)}
            >
              <Icon source={HomeMajor} color="base" />
              Elements
            </div>
            <div className="tab-item" onClick={() => handleTabChange(1)}>
              <Icon source={ProductsMajor} color="base" />
              Products
            </div>
            <div className="tab-item" onClick={() => handleTabChange(2)}>
              <Icon source={TemplateMajor} color="base" />
              Layout
            </div>
          </div>
          <div className="tabdata">{handleTabs(selected)}</div>
        </div>
      );
    } else {
      return (
        <div className="sd-ado-miantab-panel layout">
          {resourcePickFunc()}
          {handleLayoutSection()}
        </div>
      );
    }
  };

  const tabItems = [
    {
      key: '1',
      label: <div className="g-layout">
      <Icon source={Columns3Major} color="base" />
      General Layout
    </div>,
      children: <GeneralLayout
      handleFunc={handleGeneral}
      data={props.general_layout}
    />,
    },
    {
      key: '2',
      label: <div className="g-layout">
      <Icon source={TypeMajor} color="base" />
      Typography
    </div>,
      children: <TypoLayout handleFunc={handleTypo} data={props.typo_layout} />,
    },
    {
      key: '3',
      label: <div className="g-layout">
      <Icon source={ColorsMajor} color="base" />
      Colors
    </div>,
      children: <ColorLayout
                  handleFunc={handleColors}
                  data={props.color_layout}
                />,
    },
  ];

  return (
    <div>
      {navigationMarkup()}
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
            setCheckedAll(newChecked);
            setProductsAdded([]);
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
          <Text as="p">All you changes may not be saved.</Text>
        </Modal.Section>
      </Modal>
    </div>
  );
}
export default AddElement;
