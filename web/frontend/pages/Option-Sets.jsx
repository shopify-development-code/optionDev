import React, { useEffect, useState, useCallback } from "react";
import { getBridge } from "../store/GetAppBridge";
import { Fullscreen } from "@shopify/app-bridge/actions";
import { useAPI } from "../store/Getshop";
import {
  Card,
  VerticalStack ,
  Button,
  Layout,
  SkeletonBodyText,
  SkeletonDisplayText,
  SkeletonPage,
  Toast,
  Modal,
  EmptyState,
  Icon,
  Loading,
} from "@shopify/polaris";
import {
  EditMajor,
  DuplicateMinor,
  DeleteMajor,
  SearchMinor,
  ChevronLeftMinor,
  ChevronRightMinor,
} from "@shopify/polaris-icons";
import { Col, Row, Spin } from "antd";
import { DynamicApi } from "../components/common/DynamicAxios";
import { useNavigate } from "@shopify/app-bridge-react";
import noresult from "../assets/images/noresult.jpg";
import noimage from "../assets/images/noimage.png";

export default function FrameExample(props) {
  const { app } = getBridge();

  const { getShop } = useAPI();
  // const [shopName, setShopName] = useState(getshop());  //getshop() is used instead of state
  const [productids, setproductids] = useState([]); // used to store product id to compare when we are changing sactive or draft status from card option
  // const [allproductids, setallproductids] = useState([]); /// get all ids of added products
  const [searchdataempty, setsearchdataempty] = useState(false); // to give no page found
  const [IsLoad, setIsLoad] = useState(true); // to shoe the loader skeleton
  const [totaldocs, settotaldocs] = useState(0); // total documents coming from db
  const [page, setpage] = useState(0); // pagination page number
  // const [collectionModal, setCollectionModal] = useState({ open: false });
  // const [productModal, setProductModal] = useState({ open: false });
  const [reCheck, setReCheck] = useState(false);
  const [errorFound, setErrorFound] = useState(false);
  const toggleActive = useCallback(
    () => setErrorFound((errorFound) => !errorFound),
    []
  );
  const [isLoading, setIsLoading] = useState(false);
  // const [allCheckedProduct, setAllCheckedProduct] = useState([]);
  const [fileName, setFileName] = useState(new Date().valueOf());
  const [disabledButton, setDisabledButton] = useState(false);
  const [contentMsg, setContentMsg] = useState("");
  const [deleteId, setDeleteId] = useState("");
  const [searchForm, setSearchForm] = useState("");
  // const [needResource, setNeedResource] = useState(false);
  // const [whichResource, setWhichResource] = useState("");
  // const [productsAdded, setProductsAdded] = useState([]);
  // const [autoProduct, setAutoProduct] = useState([]);
  // const [collectionCopy, setCollectionCopy] = useState({});
  // const [activeCollectionId, setActiveCollectionId] = useState("");
  const [step, setStep] = useState(0);
  const [pageCount, setpageCount] = useState(1);
  const [TableData, setTableData] = useState([]);
  const [editoptionid, seteditoptionid] = useState("");
  const [fullres, setfullres] = useState();
  const [toasterror, settoasterror] = useState(false);
  const navigate = useNavigate();

  const fullscreen = Fullscreen.create(app);

  useEffect(() => {
    fullscreen.dispatch(Fullscreen.Action.EXIT);
    getFormListData();
  }, []);

  async function getFormListData(pages) {
    // let ttt = await axios.post("/api/makedir", { shop: getShop });
    setsearchdataempty(false);
    setIsLoading(true);

    // const id = pages ?? pageCount;
    const id =  pageCount;
    let params = { shop: getShop, id: id };
    // let url = "/getformlist";
    // let res = await axios.post(url, params);
    await DynamicApi("/api/getformlist", params, "POST", app)
      .then((res) => {
        setfullres(res.data);
        setTableData(res.data.returnData);
        setpage(res.data.n), settotaldocs(res.data.total);
        setIsLoading(false);
        setIsLoad(false);
        setsearchdataempty(false);
      })
      .catch(() => console.log("something went wrong "));
  }
  const handleReCheckClose = () => {
    setReCheck(false);
    setDeleteId("");
  };

  async function deleteData(params) {
    setIsLoading(true);
    let response = await DynamicApi(
      "/api/deleteOptionSetByID",
      params,
      "POST",
      app
    );
    if (response != "" && response != undefined) {
      setDisabledButton(false);
      setContentMsg(response.data.data);
      setErrorFound(response.data);
      settoasterror(response.data.status);
    }
    setIsLoading(false);
    getFormListData(1);
    setpageCount(1);
    setSearchForm("");
  }

  async function copyElement(params) {
    let response = await DynamicApi("/api/copyOptionSet", params, "POST", app);

    // console.log(response.data.mesg)

    if (response != "" && response != undefined) {
      if (response.data != "") {
        setDisabledButton(false);
        setContentMsg(response.data.mesg);
        setErrorFound(response.data);
        settoasterror(response.data.status);
      }
    }
    setFileName(new Date().valueOf());
    getFormListData(1);
    setpageCount(1);
  }

  async function handleClick(id, val) {
    if (id == "edit") {
      seteditoptionid(val);
      setStep(1);
    } else if (id == "delete") {
      setDisabledButton(true);
      let params = {
        id: val,
        shop: getShop,
      };
      deleteData(params);
      setReCheck(false);
    } else if (id == "copy_set") {
      setDisabledButton(true);
      let response = await DynamicApi(
        "/api/getFormNames",
        { shop: getShop },
        "POST",
        app
      );

      let objectToBe = response.data.names.filter(
        (element) => element._id == val
      );
      let copySetArray = response.data.names.filter(
        (element) => element.name == objectToBe[0].name
      );
      let len = copySetArray.length;
      let name = objectToBe[0].name + " (" + len + ")";
      let checkAgain = response.data.names.filter(
        (element) =>
          element.name.trim().toLowerCase() === name.trim().toLowerCase()
      );
      while (checkAgain.length != 0) {
        len = len + 1;
        name = objectToBe[0].name + " (" + len + ")";
        checkAgain = response.data.names.filter(
          (element) =>
            element.name.trim().toLowerCase() === name.trim().toLowerCase()
        );
      }
      let params = {
        id: val,
        fileName: fileName,
        shop: getShop,
        name_length: len,
      };
      copyElement(params);
    } else if (id == "check_products") {
      const result = TableData.filter((elem) => elem._id == val);
      // setSelectedOptionSet(val);
      let productData = result[0].option_set.products;
      let type = productData.type;
      let productArray = [];
      if (type == "manual") {
        productData.product_added.map((element) => {
          productArray.push({
            title: element.title,
            index: parseInt(element.image),
          });
        });
      } else if (type == "auto") {
        productData.conditions.map((element) => {
          let str = "";
          if (
            element.product_type == "product_title" ||
            element.product_type == "product_vendor" ||
            element.product_type == "product_typo"
          ) {
            if (element.product_type == "product_title") {
              str = str + "Product Title ";
            } else if (element.product_type == "product_vendor") {
              str = str + "Product Vendor ";
            } else if (element.product_type == "product_typo") {
              str = str + "Product Type ";
            }
            if (element.validator == "EQUALS") {
              str = str + " equals to " + element.value;
            } else if (element.validator == "NOTEQUALS") {
              str = str + " not equals to " + element.value;
            } else if (element.validator == "STARTS") {
              str = str + " starts with " + element.value;
            } else if (element.validator == "ENDS") {
              str = str + " ends with " + element.value;
            } else if (element.validator == "CONTAIN") {
              str = str + " contains " + element.value;
            } else if (element.validator == "NOTCONTAIN") {
              str = str + " does not contain " + element.value;
            }
          } else if (element.product_type == "product_price") {
            str = str + "Product price ";
            if (element.validator == "EQUALS") {
              str = str + " equals to " + element.value;
            } else if (element.validator == "NOTEQUALS") {
              str = str + " not equals to " + element.value;
            } else if (element.validator == "GREATER") {
              str = str + " greater than " + element.value;
            } else if (element.validator == "NOTGREATER") {
              str = str + " less than " + element.value;
            }
          } else if (
            element.product_type == "product_tag" ||
            element.product_type == "collections"
          ) {
            if (element.product_type == "product_tag") {
              str = str + "Product tag ";
              if (element.validator == "EQUALS") {
                str = str + " equals to " + element.value;
              } else if (element.validator == "NOTEQUALS") {
                str = str + " not equals to " + element.value;
              }
            } else if (element.product_type == "collections") {
              str = str + "Collection Name ";
              if (element.validator == "EQUALS") {
                str = str + " equals to " + element.collection_items[0].title;
              } else if (element.validator == "NOTEQUALS") {
                str =
                  str + " not equals to " + element.collection_items[0].title;
              }
            }
          }
          productArray.push({ title: str, index: element.index });
        });
      } else if (type == "all") {
        productArray.push({ title: "All products", index: 0 });
      }
      // setSelectedProducts(productArray);
    }
  }

  async function getFormBySearch(find_val, page) {
    setsearchdataempty(false);
    setIsLoading(true);
    const search_val = {
      find: find_val,
      value: page ?? pageCount,
      shop: getShop,
    };
    let data = await DynamicApi(`/api/searchByName`, search_val, "POST", app);

    if (data.status === 200) {
      if (data.data.data.length < 1) {
        setsearchdataempty(true);
      } else {
        setTableData(data.data.data);
      }
      settotaldocs(data.data.total_data);
      setIsLoading(false);
    }
  }

  const handleNextPage = () => {
    // console.log(searchForm);
    if (searchForm.length < 1) {
      setpageCount(pageCount + 1);
      getFormListData(pageCount + 1);
    } else {
      setpageCount(pageCount + 1);

      getFormBySearch(searchForm, pageCount + 1);
    }
  };
  const handlePrevPage = () => {
    if (searchForm.length < 1) {
      setpageCount(pageCount - 1);
      getFormListData(pageCount - 1);
    } else {
      setpageCount(pageCount - 1);
      getFormBySearch(searchForm, pageCount - 1);
    }
  };
  const handleSearchForm = async (e) => {
    setpageCount(1);
    const search_val = e.target.value;
    setSearchForm(e.target.value);
    // console.log(search_val.length);
    if (search_val.length >= 1) {
      // console.log("helllooooooo length badi hai");
      getFormBySearch(search_val);
    } else {
      // console.log("helllooooooo length nahi hai");

      getFormListData();
    }
  };


  const setformstatus = async (e, data) => {
    setIsLoading(true);
    setSearchForm("");
    setproductids([]);
    let ab = data.option_set.products.product_added;
    let bc = [];
    ab.map((data) => {
      bc.push(data.product_id);
      setproductids(bc);
    });
    const response = await DynamicApi(
      "/api/setformstatus",
      {
        productids: bc,
        shop: getShop,
        currentstatus: e.target.value,
        key: data._id,
        type: data.option_set.products.type,
      },
      "POST",
      app
    );

    setIsLoading(false);
    setContentMsg(response.data.data);
    setErrorFound(response.data);
    settoasterror(response.data.status);
    getFormListData();
  };

  function renderPage() {
    if (TableData.length > 0) {
      return (
        <>
          <Spin tip="Please Wait..." spinning={isLoading}>
            <div className="home-section">
              <div className="serachInput">
                <Icon source={SearchMinor} color="base" />

                <input
                  type="search"
                  onChange={handleSearchForm}
                  value={searchForm}
                  placeholder="Search here.."
                />
              </div>
              <Row gutter={[16, 16]}>
                {searchdataempty ? (
                  <div className="noresult">
                    <img src={noresult} />
                  </div>
                ) : (
                  TableData.map((data, index) => (
                    <React.Fragment key={data._id}>
                      <Col className="gutter-row " span={6}>
                        <div
                          className={
                            data.status ? "home_page active-card" : "home_page"
                          }
                        >
                          <div className="formData">
                            <div className="actionBtns">
                              <p>
                                {data.option_set.products.type == "all"
                                  ? "All products"
                                  : data.option_set.products.type
                                      .charAt(0)
                                      .toUpperCase() +
                                    data.option_set.products.type.slice(1)}
                              </p>
                              <div className="action_edit_icon">
                                <a
                                  className={
                                    disabledButton ? "anchorclick" : ""
                                  }
                                  id={data._id}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleClick("edit", e.currentTarget.id);
                                  }}
                                >
                                  <Icon source={EditMajor} color="success" />
                                </a>
                                <a
                                  className={
                                    disabledButton ? "anchorclick" : ""
                                  }
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleClick("copy_set", e.currentTarget.id);
                                  }}
                                  id={data._id}
                                >
                                  <Icon
                                    source={DuplicateMinor}
                                    color="success"
                                  />
                                </a>
                                <a
                                  className={
                                    disabledButton ? "anchorclick" : ""
                                  }
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    let id = e.currentTarget.id;
                                    setReCheck(true);
                                    setDeleteId(id);
                                  }}
                                  id={data._id}
                                >
                                  <Icon source={DeleteMajor} color="critical" />
                                </a>
                              </div>
                            </div>
                            <div className="formProducts" id="products">
                              <h3>
                                <strong id="cardheading">{data.name}</strong>
                              </h3>
                              {data.option_set.products.type == "manual" ? (
                                <div style={{ display: "flex" }}>
                                  {data.option_set.products.product_added.map(
                                    (productsAdded, index) => (
                                      <div
                                        className="sd-advanced-option-Tag"
                                        data-id={productsAdded.product_id}
                                        key={productsAdded.product_id}
                                      >
                                        {index < 4 ? (
                                          <>
                                            <img
                                              src={
                                                productsAdded.originalSrc
                                                  .length != 0
                                                  ? productsAdded.originalSrc
                                                  : noimage
                                              }
                                              height="25"
                                              width="25"
                                              style={{
                                                borderRadius: "50%",
                                                marginRight: "5px",
                                              }}
                                            ></img>
                                          </>
                                        ) : index == 4 ? (
                                          <a
                                            className="moreproduct"
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              handleClick("edit", data._id);
                                            }}
                                          >
                                            ...More
                                          </a>
                                        ) : (
                                          ""
                                        )}
                                      </div>
                                    )
                                  )}
                                </div>
                              ) : (
                                ""
                              )}
                              <div
                                className={
                                  data.status == true
                                    ? "statusBtns activeBtn"
                                    : "statusBtns"
                                }
                              >
                                <select
                                  id="activedraft"
                                  value={data.status}
                                  onChange={(e) => setformstatus(e, data)}
                                >
                                  <option value="false">Draft</option>
                                  <option value="true">Active</option>
                                </select>
                              </div>
                            </div>
                          </div>

                          {/* <div className="actionBtns">
                            <div className="action_edit_icon">
                              <a
                                className={disabledButton ? "anchorclick" : ""}
                                id={data._id}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleClick("edit", e.currentTarget.id);
                                }}
                              >
                                <Icon source={EditMajor} color="success" />
                              </a>
                              <a
                                className={disabledButton ? "anchorclick" : ""}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleClick("copy_set", e.currentTarget.id);
                                }}
                                id={data._id}
                              >
                                <Icon source={DuplicateMinor} color="success" />
                              </a>
                            </div>
                            <div>
                              <a
                                className={disabledButton ? "anchorclick" : ""}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  let id = e.currentTarget.id;
                                  setReCheck(true);
                                  setDeleteId(id);
                                }}
                                id={data._id}
                              >
                                <Icon source={DeleteMajor} color="critical" />
                              </a>
                            </div>
                          </div> */}
                        </div>
                      </Col>
                    </React.Fragment>
                  ))
                )}
              </Row>
            </div>
            {fullres.wholedata > page ? (
              <div className="next_prev_btns">
                <Button
                  onClick={handlePrevPage}
                  disabled={pageCount == 1 ? true : false}
                >
                  <Icon source={ChevronLeftMinor} />
                </Button>

                <Button
                  onClick={handleNextPage}
                  disabled={totaldocs <= page && true}
                >
                  <Icon source={ChevronRightMinor} />
                </Button>
              </div>
            ) : (
              ""
            )}
            <div className="sd-ultimate-option-AlertModal">
              <Modal
                open={reCheck}
                onClose={handleReCheckClose}
                title={"Delete Option Set?"}
                primaryAction={{
                  content: "Delete",
                  onAction: () => {
                    handleClick("delete", deleteId);
                  },
                }}
                secondaryActions={[
                  {
                    content: "Cancel",
                    onAction: () => {
                      setReCheck(false);
                      setDeleteId("");
                    },
                  },
                ]}
              >
                <Modal.Section>
                  <VerticalStack gap={5}>
                    <p>
                      Are you sure you want to delete the option set? This can't
                      be restored.
                    </p>
                  </VerticalStack >
                </Modal.Section>
              </Modal>
            </div>
          </Spin>
        </>
      );
    } else {
      return (
        <EmptyState
          heading="Let's create your first option set"
          action={{
            content: "Create",
            onAction: () => {
              setStep(1);
            },
          }}
          image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
        ></EmptyState>
      );
    }
  }
  // const handleSelectChange = (value, id) => {
  //   let newId = id.split("_");
  //   let index = parseInt(newId[1]);
  //   let items = [...autoProduct];
  //   let pos = items
  //     .map((element) => {
  //       return element.index;
  //     })
  //     .indexOf(index);
  //   let item = { ...items[pos] };
  //   if (newId[0] == "product") {
  //     if (value == "collections") {
  //       item.value = "null";
  //     } else {
  //       item.value = item.oldVal;
  //     }
  //     item.product_type = value;
  //   } else if (newId[0] == "validator") {
  //     item.validator = value;
  //   } else if (newId[0] == "addon") {
  //     item.value = value;
  //     item.oldVal = value;
  //   } else if (newId[0] == "value") {
  //     item.collection_items = value;
  //   }
  //   items[pos] = item;
  //   setAutoProduct(items);
  // };

  // const Checking = (editoptionid) => {
  //   navigate(`/option-sets/createoptions/${editoptionid}`);
  // };
  function handlefullScreen() {
    fullscreen.dispatch(Fullscreen.Action.ENTER);
    navigate(`/option-sets/createoptions`);
  }

  const actualPageMarkup = (
    <div className="sd-option-wrapper">
      {/* <Layout>
        <Layout.Section> */}
      <div className="CreateHeaderScreen">
        <h2>Option sets</h2>
        <div className="createNewbtn" onClick={handlefullScreen}>
          <span className="btnIcon">+</span>
          <span className="btnLabel">Create new option set </span>
        </div>
      </div>
      <div className="box-wrapper">
        {/* <Card sectioned> */}
        {renderPage()}
        {/* </Card> */}
      </div>
      {/* </Layout.Section>
      </Layout> */}
    </div>
  );

  // const resourcePickFunc = () => {
  //   // console.log(whichResource);
  //   if (needResource) {
  //     if (whichResource == "product") {
  //       return (
  //         <ResourcePicker
  //           resourceType="Product"
  //           open={productModal.open}
  //           initialQuery=""
  //           onCancel={() => {
  //             setNeedResource(false);
  //             setWhichResource("");
  //             setProductModal({ open: false });
  //           }}
  //           showVariants={false}
  //           initialSelectionIds={productsAdded}
  //           onSelection={(resources) => {
  //             // let result = [];
  //             let data = [];
  //             resources.selection.map((element) => {
  //               let productImage = element.images
  //                 ? element.images[0].originalSrc
  //                 : "no-image";

  //               let product_id = element.id.split("/");
  //               product_id = product_id[product_id.length - 1];
  //               data.push({
  //                 id: element.id,
  //                 product_id: product_id,
  //                 title: element.title,
  //                 originalSrc: productImage,
  //               });
  //               console.log(data);
  //             });
  //             setProductsAdded(data);
  //             setNeedResource(false);
  //             setWhichResource("");
  //           }}
  //         />
  //       );
  //     } else {
  //       return (
  //         <ResourcePicker
  //           resourceType="Collection"
  //           open={collectionModal.open}
  //           onCancel={() => {
  //             setNeedResource(false);
  //             setWhichResource("");
  //             setCollectionModal({ open: false });
  //           }}
  //           selectMultiple={false}
  //           showVariants={false}
  //           initialSelectionIds={collectionCopy[activeCollectionId]}
  //           onSelection={(resources) => {
  //             let result = [];
  //             let data = [];
  //             resources.selection.map((element) => {
  //               result.push({ id: element.id });
  //               let product_id = element.id.split("/");
  //               product_id = product_id[product_id.length - 1];
  //               data.push({ id: product_id, image: "", title: element.title });
  //             });
  //             let items = { ...collectionCopy };
  //             items[activeCollectionId] = result;
  //             setCollectionCopy(items);
  //             setCollectionModal({ open: false });
  //             setNeedResource(false);
  //             setWhichResource("");
  //             handleSelectChange(data, activeCollectionId);
  //           }}
  //         />
  //       );
  //     }
  //   } else {
  //     return <div></div>;
  //   }
  // };

  const loadingPageMarkup = (
    <>
      <SkeletonPage>
        <Layout>
          <Layout.Section>
            <Card sectioned>
              <VerticalStack gap={5}>
                <SkeletonDisplayText size="small" />
                <SkeletonBodyText lines={10} />
              </VerticalStack >
            </Card>
          </Layout.Section>
        </Layout>
      </SkeletonPage>
      <Loading />
    </>
  );

  const pageMarkup = IsLoad ? loadingPageMarkup : actualPageMarkup;

  const toastMarkup = () => {
    if (errorFound) {
      return (
        <Toast
          content={contentMsg}
          error={!toasterror}
          onDismiss={toggleActive}
          duration={4000}
        />
      );
    }
  };

  function chageUserInterface() {
    if (step == 0) {
      return pageMarkup;
    } else {
      navigate(`/option-sets/createoptions/${editoptionid}`);
    }
  }
  return (
    <div style={{ height: "500px" }}>
      {chageUserInterface()}
      {toastMarkup()}
    </div>
  );
}
