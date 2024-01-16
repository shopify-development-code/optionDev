const server = "https://recruitment-library-listed-unto.trycloudflare.com";
console.log("eeeee");
let requiredText = "Please fill the required field."
let optionProductName = "{{product_title}}-Selections"
let addOnPriceformat = "(+ {{addon}})"
let totalSelectionText = "Selection will add {{totalprice}} to the price"
let allowedExtensions=[]
let genieBlock = document.getElementsByClassName("genie-options-block-outer");
if (_sd_pageType == "cart") {
  // var newDiv = document.createElement('div');
  // newDiv.id = 'loaderContainer';
  // newDiv.classList.add("loader-container")
  // newDiv.innerHTML = '<div class="loader"></div>';

  // // Append the div to the body
  // document.body.appendChild(newDiv);
  checkCartOnLoad();
}

if (_sd_pageType == "product") {
  getAllData();

  cartButton();
  HideBuyButton();
}

function HideBuyButton() {
  const elements = document.querySelectorAll(
    ".shopify-payment-button__more-options, .shopify-payment-button, .shopify-payment-button__button"
  );

  // Hide each element
  elements.forEach((element) => {
    element.style.display = "none";
  });
}
let cartProductUniqueNumber;
async function getAllData() {
  let spinner = document.createElement("div");
  spinner.className = "sd-genie-spinner";
  genieBlock[0].appendChild(spinner);
  await fetch(`${server}/api/store/getOptions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      shop: Shopify.shop,
      productId: _sd_product_id,
    }),
  })
    .then((response) => response.json())
    .then((response) => {
      spinner.remove();
      let data = response.data;
      if (response.status == 1) {
        requiredText = data[0].settings.error_mssg.required
        if (data[0].settings.translations.custom_product_name.trim().length > 0)
        {
          optionProductName=data[0].settings.translations.custom_product_name
        } else {
          optionProductName="{{product_title}}-Selections"
        }
        if (data[0].settings.general.label_addonprice_format.trim().length > 0)
        {
          addOnPriceformat=data[0].settings.general.label_addonprice_format
        } else {
          addOnPriceformat="(+ {{addon}})"
        }
        if (data[0].settings.translations.selection_addon.trim().length > 0)
        {
          totalSelectionText=data[0].settings.translations.selection_addon
        } else {
          totalSelectionText="Selection will add {{totalprice}} to the price"
        }

        allowedExtensions=data[0].settings.allowed_extensions
        console.log(data[0].settings.allowed_extensions,"koko")
        genieOption(data);
        let waterMarkWrapper = document.createElement("div")
        waterMarkWrapper.classList.add("genie-options-watermark")

        let waterMark = document.createElement("span")
        waterMark.innerHTML = `Powered by <a class="sd-watermark-link" href="https://shinedezigninfonet.com/">Shine Dezign Infonet</a>.`
        waterMarkWrapper.append(waterMark)
        genieBlock[0].append(waterMarkWrapper)

        

      } else {
        console.log("no data found");
      }
    })
    .catch((err) => {
      console.log(err.message);
    });
}
function genieOption(data) {
  // console.log(data)
  data.forEach((el) => {
    let genieOptionMainDiv = document.createElement("div");
    genieBlock[0].append(genieOptionMainDiv);
    genieOptionMainDiv.className = "sd-genie-option-main-div";
    createOption(el, genieOptionMainDiv);
  });
}

// let TotalPriceSpan = document.createElement("span");
// TotalPriceSpan.classList.add("rev-selection-total")
// TotalPriceSpan.style.display="none"
let totalArr = []
function TotalSelectionPrice() {
  let sum = 0;

// calculate sum using forEach() method
totalArr.forEach( num => {
  sum += num;
})
  let totalselection = document.getElementById("sd-genie-total")
  const replacedString = totalSelectionText.replace("{{totalprice}}",`<span class="sd-total-price">${showAmountWithCurrency(parseFloat(sum).toFixed(2))}</span>`);
  totalselection.innerHTML = replacedString
  if (sum == 0) {
    totalselection.style.display="none"
  } else {
    totalselection.style.display="block"

  }
}
function createOption(data, mainDiv) {
  // console.log(data)
  // cartProductUniqueNumber = generateProductCartNumber()
  //   let productForm = document.querySelector('form[action="/cart/add"]')
  //  let formInput =  document.createElement('input');
  //  productForm.append(formInput)
  //   formInput.name = 'properties[_unique_id]'
  //  formInput.hidden = true
  //  formInput.value = cartProductUniqueNumber

  data.option_set.elements.forEach((el, optionIndex) => {
    // console.log(el)
    let options = document.createElement("div");
    mainDiv.append(options);
    options.className = "sd-genie-options";
    options.classList.add(`sd-genie-${el.setting.id}`);
    switch (el.name) {
      case "Text Area":
        TextArea(el, options, optionIndex);
        break;
      case "Text":
        Text(el, options, optionIndex);
        break;
      case "Number":
        numberInput(el, options, optionIndex);
        break;
      case "Dropdown":
        Dropdown(el, options, optionIndex);
        break;
      case "Checkbox":
        Checkbox(el, options, optionIndex);
        break;
      case "Radio Buttons":
        RadioButton(el, options, optionIndex);
        break;
      case "Image Swatches":
        ImageSwatches(el, options, optionIndex);
        break;
      case "Color Swatches":
        ColorSwatches(el, options, optionIndex);
        break;
      case "Paragraph":
        Paragraph(el, options, optionIndex);
        break;
      case "File":
        FileUpload(el, options, optionIndex);
        break;
      default:
      // code block
    }
  });
   console.log("total",totalArr)
  // TotalPriceSpan.innerHTML = `Selections will add ${totalPrice} to price`;
  // mainDiv.append(TotalPriceSpan);

  let test = document.createElement("div")
  test.id = "sd-genie-total"
  test.classList.add("sd-genie-options")
  mainDiv.append(test);
}

let addOnArray = [];
let valdationArr = [];
let totalPrice = 0;

function TextArea(el, optionsDiv, optionIndex) {
  console.log("textArea", el);
  totalArr.push(0)
  valdationArr.push({ required: false });
  addOnArray.push([]);
  addOnArray[optionIndex] = 0;
  let productForm = document.querySelectorAll('form[action="/cart/add"]');
  let textAreaLabelDiv = document.createElement("div");
  optionsDiv.append(textAreaLabelDiv);
  textAreaLabelDiv.className = "sd-genie-text-Area-container";
  optionsDiv.style.display = "flex";
  optionsDiv.style.flexDirection = "column";

  let position = el.setting.css.alignment;
  if (position == "right") {
    optionsDiv.style.alignItems = "end";
  } else if (position == "center") {
    optionsDiv.style.alignItems = "center";
  }

  let textAreaLabel = document.createElement("label");
  if (el.setting.hidden_label == false) {
    textAreaLabel.innerText = el.setting.label;
  } else {
    textAreaLabel.innerText = "";
  }
  textAreaLabelDiv.append(textAreaLabel);
  textAreaLabel.style.color = el.setting.css.label_color;
  textAreaLabel.style.fontSize = el.setting.css.label_font_size + "px";
  let value=0
  if (el.setting.required == true) {
    valdationArr[optionIndex] = {
      required: true,
      class: el.setting.id,
      value: "",
    };
    if (el.setting.hidden_label == false) {
      let requiredField = document.createElement("sup");
      requiredField.innerText = "*";
      textAreaLabel.append(requiredField);
    }
  }
  let addOnPrice = document.createElement("span");
  if (el.setting.addon.length && el.setting.addon !== "0") {
    // console.log("insert")
    textAreaLabelDiv.append(addOnPrice);
    value = el.setting.addon;
    let newPrice = showAmountWithCurrency(parseFloat(value).toFixed(2));
    console.log(newPrice, "op");
    const replacedString = addOnPriceformat.replace("{{addon}}", newPrice);
;
;
    addOnPrice.innerHTML = replacedString;
    addOnPrice.style.display = "none";
  }
  let TextArea = document.createElement("textarea");
  optionsDiv.append(TextArea);
  TextArea.name = `properties[${el.setting.label}]`;
  TextArea.className = "sd-genie-option-text-area";
  TextArea.setAttribute("class", "sd-genie-input");
  TextArea.setAttribute("placeholder", el.setting.placeholder);
  TextArea.style.width = el.setting.css.columnWidth + "%";
  let inputBorderRadius = el.setting.css.type == "classic" ? "0px" : "20px";
  TextArea.style.borderRadius = inputBorderRadius;
  TextArea.style.backgroundColor = el.setting.css.input_back_color;
  TextArea.style.color = el.setting.css.input_text_color;
  let formInput = document.createElement("input");
  formInput.type = "text";
  formInput.hidden = true;
  formInput.setAttribute("name", `properties[${el.setting.label}]`);
  let check = false;
  let checkValLength;
  TextArea.addEventListener("change", (e) => {
    checkValLength = e.target.value;
    if (el.setting.required == true) {
      valdationArr[optionIndex] = {
        required: true,
        class: el.setting.id,
        value: checkValLength,
      };
    }
    if (e.target.value.length > 0) {
      // console.log("inn");
      
      formInput.setAttribute("value", e.target.value);
      // console.log(formInput);
      addOnPrice.style.display = "block";
      // console.log(value, "lalal");
      totalArr[optionIndex] = Number(value);
      TotalSelectionPrice()
      console.log("totalArr",totalArr)
      // if (!check) {
      //   totalPrice = totalPrice + Number(value);
      //   console.log(totalPrice, "loo")
        
      //   TotalPriceSpan.innerHTML = `Selections will add ${totalPrice} to price`;
      // }
      // check = true;

      // console.log("product", productForm);
      productForm.forEach((item) => {
        // console.log(item, "ittt");
        item.append(formInput);
      });

      addOnArray[optionIndex] = Number(el.setting.addon);
    } else {
      totalArr[optionIndex] = 0;
      TotalSelectionPrice()

      // check = false;
      addOnPrice.style.display = "none";
      // totalPrice = totalPrice - Number(value);
      // TotalPriceSpan.innerHTML = `Selections will add ${totalPrice} to price`;
      formInput.remove();
      addOnArray[optionIndex] = 0;
    }
  });

  if (el.setting.helptext.length > 0) {
    let helpTextOuterDiv = document.createElement("div");
    helpTextOuterDiv.style.textAlign = el.setting.css.alignment;
    let helpText = document.createElement("span");
    helpTextOuterDiv.append(helpText);
    helpText.className = "sd-genie-option-helpText";
    optionsDiv.append(helpTextOuterDiv);
    helpText.innerText = el.setting.helptext;
    helpText.style.color = el.setting.css.help_text_color;
    helpText.style.fontSize = el.setting.css.help_font_size + "px";
  }
}
function Text(el, optionsDiv, optionIndex) {
  console.log("text", el);
  totalArr.push(0)

  valdationArr.push({ required: false });

  addOnArray.push([]);
  addOnArray[optionIndex] = 0;

  let productForm = document.querySelectorAll('form[action="/cart/add"]');

  let textLabelDiv = document.createElement("div");
  optionsDiv.append(textLabelDiv);
  textLabelDiv.className = "sd-genie-text-container";
  optionsDiv.style.display = "flex";
  optionsDiv.style.flexDirection = "column";

  let position = el.setting.css.alignment;
  if (position == "right") {
    optionsDiv.style.alignItems = "end";
  } else if (position == "center") {
    optionsDiv.style.alignItems = "center";
  }
  let textLabel = document.createElement("label");
  if (el.setting.hidden_label == false) {
    textLabel.innerText = el.setting.label;
  } else {
    textLabel.innerText = "";
  }

  textLabelDiv.append(textLabel);
  textLabel.style.color = el.setting.css.label_color;
  textLabel.style.fontSize = el.setting.css.label_font_size + "px";
  if (el.setting.required == true) {
    valdationArr[optionIndex] = {
      required: true,
      class: el.setting.id,
      value: "",
    };
    if (el.setting.hidden_label == false) {
      let requiredField = document.createElement("sup");
      requiredField.innerText = "*";
      textLabel.append(requiredField);
    }
  }
  let value=0
  let addOnPrice = document.createElement("span");
  if (el.setting.addon !== 0 && el.setting.addon !== "") {
    textLabelDiv.append(addOnPrice);
    value = el.setting.addon;
    let newPrice = showAmountWithCurrency(parseFloat(value).toFixed(2));
    const replacedString = addOnPriceformat.replace("{{addon}}", newPrice);
;
;

    addOnPrice.innerHTML = replacedString;
    addOnPrice.style.display = "none";
  }
  let Text = document.createElement("input");
  optionsDiv.append(Text);
  Text.className = "sd-genie-option-text-area";
  Text.setAttribute("class", "sd-genie-input");
  Text.setAttribute("placeholder", el.setting.placeholder);
  Text.setAttribute("type", "text");
  Text.style.width = el.setting.css.columnWidth + "%";
  let inputBorderRadius = el.setting.css.type == "classic" ? "0px" : "20px";
  Text.style.borderRadius = inputBorderRadius;
  Text.style.backgroundColor = el.setting.css.input_back_color;
  Text.style.color = el.setting.css.input_text_color;
  let formInput = document.createElement("input");
  formInput.hidden = true;
  formInput.setAttribute("name", `properties[${el.setting.label}]`);
// let check=false
  Text.addEventListener("change", (e) => {
    if (el.setting.required == true) {
      valdationArr[optionIndex] = {
        required: true,
        class: el.setting.id,
        value: e.target.value,
      };
    }
    if (e.target.value.length > 0) {
      totalArr[optionIndex] = Number(el.setting.addon);
      TotalSelectionPrice()
      console.log("totalArr",totalArr)

      formInput.setAttribute("value", e.target.value);
      addOnPrice.style.display = "block";
      // if (!check) {
      //   totalPrice = totalPrice + Number(value);
      //   console.log(totalPrice,"loo")
      //   TotalPriceSpan.innerHTML = `Selections will add ${totalPrice} to price`;
      // }
      // check = true;

      productForm.forEach((item) => {
        item.append(formInput);
      });

      addOnArray[optionIndex] = Number(el.setting.addon);
    } else {
      totalArr[optionIndex] = 0;
      TotalSelectionPrice()

      // check=false
      formInput.remove();
      addOnPrice.style.display = "none";
      // totalPrice = totalPrice - Number(value);
      // TotalPriceSpan.innerHTML = `Selections will add ${totalPrice} to price`;

      addOnArray[optionIndex] = 0;
    }
  });
  if (el.setting.helptext.length > 0) {
    let helpTextOuterDiv = document.createElement("div");
    helpTextOuterDiv.style.textAlign = el.setting.css.alignment;
    let helpText = document.createElement("span");
    helpTextOuterDiv.append(helpText);
    helpText.className = "sd-genie-option-helpText";
    optionsDiv.append(helpTextOuterDiv);
    helpText.innerText = el.setting.helptext;
    helpText.style.color = el.setting.css.help_text_color;
    helpText.style.fontSize = el.setting.css.help_font_size + "px";
  }
}
function numberInput(el, optionsDiv, optionIndex) {
  totalArr.push(0)
  // console.log("Number")
  valdationArr.push({ required: false });

  addOnArray.push([]);
  addOnArray[optionIndex] = 0;

  let productForm = document.querySelectorAll('form[action="/cart/add"]');
  let numberLabelDiv = document.createElement("div");
  optionsDiv.append(numberLabelDiv);
  numberLabelDiv.className = "sd-genie-number-container";
  optionsDiv.style.display = "flex";
  optionsDiv.style.flexDirection = "column";

  let position = el.setting.css.alignment;
  if (position == "right") {
    optionsDiv.style.alignItems = "end";
  } else if (position == "center") {
    optionsDiv.style.alignItems = "center";
  }
  let numberLabel = document.createElement("label");
  if (el.setting.hidden_label == false) {
    numberLabel.innerText = el.setting.label;
  } else {
    numberLabel.innerText = "";
  }

  numberLabelDiv.append(numberLabel);
  numberLabel.style.color = el.setting.css.label_color;
  numberLabel.style.fontSize = el.setting.css.label_font_size + "px";
  if (el.setting.required == true) {
    valdationArr[optionIndex] = {
      required: true,
      class: el.setting.id,
      value: "",
    };
    if (el.setting.hidden_label == false) {
      let requiredField = document.createElement("sup");
      requiredField.innerText = "*";
      numberLabel.append(requiredField);
    }
  }
  let addOnPrice = document.createElement("span");
  if (el.setting.addon !== 0 && el.setting.addon !== "") {
    numberLabelDiv.append(addOnPrice);
    let value = el.setting.addon;
    let newPrice = showAmountWithCurrency(parseFloat(value).toFixed(2));
    // totalPrice = totalPrice + Number(value);
    const replacedString = addOnPriceformat.replace("{{addon}}", newPrice);
;
;

    addOnPrice.innerHTML = replacedString;
    addOnPrice.style.display = "none";
  }
  let number = document.createElement("input");
  optionsDiv.append(number);
  number.className = "sd-genie-option-text-area";
  number.setAttribute("class", "sd-genie-input");
  number.setAttribute("placeholder", el.setting.placeholder);
  number.setAttribute("type", "number");
  number.style.width = el.setting.css.columnWidth + "%";
  let inputBorderRadius = el.setting.css.type == "classic" ? "0px" : "20px";
  number.style.borderRadius = inputBorderRadius;
  number.style.backgroundColor = el.setting.css.input_back_color;
  number.style.color = el.setting.css.input_text_color;
  let formInput = document.createElement("input");
  formInput.hidden = true;
  formInput.setAttribute("name", `properties[${el.setting.label}]`);
let check= false
  number.addEventListener("change", (e) => {
    if (el.setting.required == true) {
      valdationArr[optionIndex] = {
        required: true,
        class: el.setting.id,
        value: e.target.value,
      };
    }
    if (e.target.value.length > 0 && !(e.target.value == 0)) {
      totalArr[optionIndex] = Number(el.setting.addon);
      TotalSelectionPrice()
      console.log("totalArr",totalArr)

      formInput.value = e.target.value;
      addOnPrice.style.display = "block";
      // if (!check) {
      //   totalPrice = totalPrice + Number(value);
      //   console.log(totalPrice,"loo")
      //   TotalPriceSpan.innerHTML = `Selections will add ${totalPrice} to price`;
      // }
      // check = true;
      productForm.forEach((item) => {
        item.append(formInput);
      });
      addOnArray[optionIndex] = Number(el.setting.addon);
    } else {
      totalArr[optionIndex] = 0;
      TotalSelectionPrice()

      check=false
      addOnPrice.style.display = "none";

      formInput.remove();
      addOnArray[optionIndex] = 0;
    }
  });
  if (el.setting.helptext.length > 0) {
    let helpTextOuterDiv = document.createElement("div");
    helpTextOuterDiv.style.textAlign = el.setting.css.alignment;
    let helpText = document.createElement("span");
    helpTextOuterDiv.append(helpText);
    helpText.className = "sd-genie-option-helpText";
    optionsDiv.append(helpTextOuterDiv);
    helpText.innerText = el.setting.helptext;
    helpText.style.color = el.setting.css.help_text_color;
    helpText.style.fontSize = el.setting.css.help_font_size + "px";
  }
}
function Dropdown(el, optionsDiv, optionIndex) {
  // console.log("Dropdown",optionIndex)
  totalArr.push(0)

  valdationArr.push({ required: false });

  addOnArray.push([]);
  addOnArray[optionIndex] = 0;

  let productForm = document.querySelectorAll('form[action="/cart/add"]');
  let dropdownLabelDiv = document.createElement("div");
  optionsDiv.append(dropdownLabelDiv);
  dropdownLabelDiv.className = "sd-genie-dropdown-container";
  optionsDiv.style.display = "flex";
  optionsDiv.style.flexDirection = "column";

  let position = el.setting.css.alignment;
  if (position == "right") {
    optionsDiv.style.alignItems = "end";
  } else if (position == "center") {
    optionsDiv.style.alignItems = "center";
  }
  let dropdownLabel = document.createElement("label");
  if (el.setting.hidden_label == false) {
    dropdownLabel.innerText = el.setting.label;
  } else {
    dropdownLabel.innerText = "";
  }

  dropdownLabelDiv.append(dropdownLabel);
  dropdownLabel.style.color = el.setting.css.label_color;
  dropdownLabel.style.fontSize = el.setting.css.label_font_size + "px";
  if (el.setting.required == true) {
    valdationArr[optionIndex] = {
      required: true,
      class: el.setting.id,
      value: "",
    };
    if (el.setting.hidden_label == false) {
      let requiredField = document.createElement("sup");
      requiredField.innerText = "*";
      dropdownLabel.append(requiredField);
    }
  }

  let dropdown = document.createElement("select");
  optionsDiv.append(dropdown);
  dropdown.className = "sd-genie-option-dropdown-area";
  dropdown.setAttribute("class", "sd-genie-input");
  dropdown.style.width = el.setting.css.columnWidth + "%";
  let inputBorderRadius = el.setting.css.type == "classic" ? "0px" : "20px";
  dropdown.style.borderRadius = inputBorderRadius;
  dropdown.style.backgroundColor = el.setting.css.input_back_color;
  dropdown.style.color = el.setting.css.input_text_color;

  let defaultdropdownOption = document.createElement("option");
  dropdown.append(defaultdropdownOption);
  defaultdropdownOption.value = "select";
  defaultdropdownOption.innerText = "select";
  defaultdropdownOption.setAttribute("disabled", "disabled");
  defaultdropdownOption.selected = true;
  defaultdropdownOption.hidden = true;

  el.setting.option_values.forEach((ele, index) => {
    let dropdownOption = document.createElement("option");
    dropdown.append(dropdownOption);
    dropdownOption.className = "sd-genie-dropdown-option";
    dropdownOption.value = ele.value;
    dropdownOption.innerText = ele.value;
    dropdownOption.setAttribute("index", index);
    let addOnPrice = document.createElement("span");
  });

  let addOnPrice = document.createElement("span");
  addOnPrice.style.display = "none";

  let formInput = document.createElement("input");
  formInput.hidden = true;
  formInput.setAttribute("name", `properties[${el.setting.label}]`);
let check=false
  dropdown.addEventListener("change", () => {
    
    formInput.value = dropdown.value;
    if (el.setting.required == true) {
      valdationArr[optionIndex] = {
        required: true,
        class: el.setting.id,
        value: formInput.value,
      };
    }
    productForm.forEach((item) => {
      item.append(formInput);
    });
    const selectedOption = dropdown.options[dropdown.selectedIndex];
    let dropdownIndex = selectedOption.getAttribute("index");
    addOnArray[optionIndex] = Number(
      el.setting.option_values[dropdownIndex].addon
    );
    // console.log(el.setting.option_values[dropdownIndex].addon)
    if (
      el.setting.option_values[dropdownIndex].addon !== "0" ||
      el.setting.option_values[dropdownIndex].addon.length
    ) {
      dropdownLabelDiv.append(addOnPrice);
      let value = el.setting.option_values[dropdownIndex].addon;
      totalArr[optionIndex] = Number(value);
      TotalSelectionPrice()
      console.log("totalArr",totalArr)
      let newPrice = showAmountWithCurrency(parseFloat(value).toFixed(2));
      // if (!check) {
      //   totalPrice = totalPrice + Number(value);
      //   console.log(totalPrice,"loo")
      //   TotalPriceSpan.innerHTML = `Selections will add ${totalPrice} to price`;
      // }
      // check = true;
      const replacedString = addOnPriceformat.replace("{{addon}}", newPrice);
;
;

      addOnPrice.innerHTML = replacedString;
      addOnPrice.style.display = "block";
    }
  });

  if (el.setting.helptext.length > 0) {
    let helpTextOuterDiv = document.createElement("div");
    helpTextOuterDiv.style.textAlign = el.setting.css.alignment;
    let helpText = document.createElement("span");
    helpTextOuterDiv.append(helpText);
    helpText.className = "sd-genie-option-helpText";
    optionsDiv.append(helpTextOuterDiv);
    helpText.innerText = el.setting.helptext;
    helpText.style.color = el.setting.css.help_text_color;
    helpText.style.fontSize = el.setting.css.help_font_size + "px";
  }
}
function Checkbox(el, optionsDiv, optionIndex) {
  // console.log("checkbox")
  totalArr.push(0)

  valdationArr.push({ required: false });

  addOnArray.push([]);
  addOnArray[optionIndex] = 0;

  let totalCheckSum = [];
  let productForm = document.querySelectorAll('form[action="/cart/add"]');

  let CheckBoxLabelDiv = document.createElement("div");
  optionsDiv.append(CheckBoxLabelDiv);
  CheckBoxLabelDiv.className = "sd-genie-checkbox-container";
  optionsDiv.style.display = "flex";
  optionsDiv.style.flexDirection = "column";

  let position = el.setting.css.alignment;
  if (position == "right") {
    optionsDiv.style.alignItems = "end";
  } else if (position == "center") {
    optionsDiv.style.alignItems = "center";
  }

  let checkboxLabel = document.createElement("label");
  if (el.setting.hidden_label == false) {
    checkboxLabel.innerText = el.setting.label;
  } else {
    checkboxLabel.innerText = "";
  }
  CheckBoxLabelDiv.append(checkboxLabel);
  checkboxLabel.style.color = el.setting.css.label_color;
  checkboxLabel.style.fontSize = el.setting.css.label_font_size + "px";
  if (el.setting.required == true) {
    valdationArr[optionIndex] = {
      required: true,
      class: el.setting.id,
      value: "",
    };
    if (el.setting.hidden_label == false) {
      let requiredField = document.createElement("sup");
      requiredField.innerText = "*";
      checkboxLabel.append(requiredField);
    }
  }
  let checkArr = [];
  let dropValuePrice=0
  el.setting.option_values.forEach((ele, index) => {
    let checkboxDiv = document.createElement("div");
    checkboxDiv.className = "sd-genie-checkbox-box";
    optionsDiv.append(checkboxDiv);
    let checkboxValue = document.createElement("label");
    checkboxValue.className = "sd-genie-checkbox-label";
    checkboxValue.setAttribute("for", el.setting.id + index);
    checkboxValue.innerText = ele.value;
    let checkbox = document.createElement("input");
    checkbox.className = "sd-genie-option-checkbox";
    checkbox.value = ele.value;
    checkbox.id = el.setting.id + index;
    checkbox.type = "checkbox";
    // checkbox.setAttribute("index",index)
    checkboxDiv.append(checkbox, checkboxValue);
    checkbox.setAttribute("index", index);

    let formInput = document.createElement("input");
    formInput.hidden = true;
    formInput.setAttribute("name", `properties[${el.setting.label}]`);
    let check = false
    
    checkbox.addEventListener("change", (e) => {
      // console.log(e,"loooooo")
      const checkboxIndex = e.target.getAttribute("index");
      // totalPrice = totalPrice - Number(dropValuePrice);
      dropValuePrice=0
      // console.log("newww",totalPrice)
      // TotalPriceSpan.innerHTML = `Selections will add ${totalPrice} to price`;
      // check = false
      // console.log(e.target.checked)
      if (e.target.checked == true) {
        if (el.setting.required == true) {
          valdationArr[optionIndex] = {
            required: true,
            class: el.setting.id,
            value: true,
          };
        }
        totalCheckSum.push(el.setting.option_values[checkboxIndex].addon);

        checkArr.push(e.target.value);
        const numbers = totalCheckSum.map(Number);

        // Add the numbers in the array
        const sum = numbers.reduce((a, b) => a + b, 0);
        addOnArray[optionIndex] = sum;

        let addOnPrice = document.createElement("span");
        addOnPrice.style.float = "right";
        let parentElement = e.target.parentElement;
        console.log("herers")
        if (
          el.setting.option_values[checkboxIndex].addon.length &&
          el.setting.option_values[checkboxIndex].addon.length !== "0"
        ) {
          value = el.setting.option_values[checkboxIndex].addon;
          totalArr[optionIndex] += Number(value)
          TotalSelectionPrice()
          console.log("totalArr",totalArr)



          let newPrice = showAmountWithCurrency(parseFloat(value).toFixed(2));
          dropValuePrice=value
          // if (!check) {
          //   totalPrice = totalPrice + Number(dropValuePrice);
          //   console.log(totalPrice,"loo")
          //   TotalPriceSpan.innerHTML = `Selections will add ${totalPrice} to price`;
          //   check = true;
          // }
          console.log(addOnPriceformat, "chcekbox")
          console.log(newPrice,"chcekbox")
          
          const replacedString = addOnPriceformat.replace("{{addon}}", newPrice);


          addOnPrice.innerHTML = replacedString;
        } else 
          {
            value = el.setting.option_values[checkboxIndex].addon;
            totalArr[optionIndex] = 0
            TotalSelectionPrice()
          }
        
        parentElement.append(addOnPrice);
      } else {
        if (
          el.setting.option_values[checkboxIndex].addon.length &&
          el.setting.option_values[checkboxIndex].addon.length !== "0"
        ) {
          let value = el.setting.option_values[checkboxIndex].addon;
          console.log("dd", value)
          totalArr[optionIndex] -= Number(value);
          TotalSelectionPrice()
          console.log("totalArr", totalArr)
        }
        console.log("not selected")
        // check = false
        // totalPrice = totalPrice - Number(value);
        // TotalPriceSpan.innerHTML = `Selections will add ${totalPrice} to price`;
        if (el.setting.required == true) {
          valdationArr[optionIndex] = {
            required: true,
            class: el.setting.id,
            value: false,
          };
        }
        let totalCheckSumIndex = totalCheckSum.indexOf(
          el.setting.option_values[checkboxIndex].addon
        );
        totalCheckSum.splice(totalCheckSumIndex, 1);
        const numbers = totalCheckSum.map(Number);
        const sum = numbers.reduce((a, b) => a + b, 0);
        addOnArray[optionIndex] = sum;
        let checkIndex = checkArr.indexOf(e.target.value);

        checkArr.splice(checkIndex, 1);

        let parentElement = e.target.parentElement;

        parentElement.querySelector("span").remove();
      }

      if (checkArr.length) {
        formInput.value = checkArr.join(",");
        productForm.forEach((item) => {
          item.append(formInput);
        });
      } else {
        formInput.remove();
      }
    });
  });
  if (el.setting.helptext.length > 0) {
    let helpTextOuterDiv = document.createElement("div");
    helpTextOuterDiv.style.textAlign = el.setting.css.alignment;
    let helpText = document.createElement("div");
    helpTextOuterDiv.append(helpText);
    helpText.className = "sd-genie-option-helpText";
    optionsDiv.append(helpTextOuterDiv);
    helpText.innerText = el.setting.helptext;
    helpText.style.color = el.setting.css.help_text_color;
    helpText.style.fontSize = el.setting.css.help_font_size + "px";
  }
}
function RadioButton(el, optionsDiv, optionIndex) {
  // console.log("radiobtn")
  totalArr.push(0)

  valdationArr.push({ required: false });

  addOnArray.push([]);
  addOnArray[optionIndex] = 0;

  let productForm = document.querySelectorAll('form[action="/cart/add"]');

  let radioLabelDiv = document.createElement("div");
  optionsDiv.append(radioLabelDiv);
  radioLabelDiv.className = "sd-genie-radio-container";
  optionsDiv.style.display = "flex";
  optionsDiv.style.flexDirection = "column";

  let position = el.setting.css.alignment;
  if (position == "right") {
    optionsDiv.style.alignItems = "end";
  } else if (position == "center") {
    optionsDiv.style.alignItems = "center";
  }
  let radioLabel = document.createElement("label");
  if (el.setting.hidden_label == false) {
    radioLabel.innerText = el.setting.label;
  } else {
    radioLabel.innerText = "";
  }
  radioLabelDiv.append(radioLabel);
  radioLabel.style.color = el.setting.css.label_color;
  radioLabel.style.fontSize = el.setting.css.label_font_size + "px";
  if (el.setting.required == true) {
    valdationArr[optionIndex] = {
      required: true,
      class: el.setting.id,
      value: "",
    };
    if (el.setting.hidden_label == false) {
      let requiredField = document.createElement("sup");
      requiredField.innerText = "*";
      radioLabel.append(requiredField);
    }
  }
  let formInput = document.createElement("input");
  formInput.hidden = true;
  formInput.setAttribute("name", `properties[${el.setting.label}]`);
  let dropValuePrice =0
  el.setting.option_values.forEach((ele, index) => {
    let radioBoxDiv = document.createElement("div");
    radioBoxDiv.className = "sd-genie-radio-box";
    optionsDiv.append(radioBoxDiv);
    let radioInput = document.createElement("input");
    radioInput.id = el.setting.id + index;
    radioInput.className = "sd-genie-option-radio";
    radioInput.type = "radio";
    radioInput.name = el.setting.label;
    radioInput.value = ele.value;
    radioInput.setAttribute("index", index);
    radioInput.setAttribute("data-addon", ele.addon);
    let radioValue = document.createElement("label");
    radioValue.setAttribute("for", el.setting.id + index);
    radioValue.innerText = ele.value;
    radioBoxDiv.append(radioInput, radioValue);
    let check = false
    
    radioInput.addEventListener("change", (e) => {
    
        // totalPrice = totalPrice - Number(dropValuePrice);
        // dropValuePrice=0
        // console.log("newww",totalPrice)
        // TotalPriceSpan.innerHTML = `Selections will add ${totalPrice} to price`;
        check = false

      console.log(el,"which")
      optionsDiv.querySelectorAll("span")?.forEach((remove) => {
        remove?.remove();
      });
      if (el.setting.required == true) {
        valdationArr[optionIndex] = {
          required: true,
          class: el.setting.id,
          value: true,
        };
      }
      const radioIndex = e.target.getAttribute("index");
      addOnArray[optionIndex] = Number(
        el.setting.option_values[radioIndex].addon
      );

      let parentElement = e.target.parentElement;
      if (e.target.checked == true) {
        formInput.value = e.target.value;
        productForm.forEach((item) => {
          item.append(formInput);
        });
        let addOnPrice = document.createElement("span");
        addOnPrice.style.float = "right";
        if (
          el.setting.option_values[radioIndex].addon.length &&
          el.setting.option_values[radioIndex].addon.length !== "0"
        ) {
          
          value = el.setting.option_values[radioIndex].addon;
          totalArr[optionIndex] = Number(value);
          TotalSelectionPrice()
          // console.log("totalArr",totalArr)
          let newPrice = showAmountWithCurrency(parseFloat(value).toFixed(2));
          //  dropValuePrice = value
          // if (!check) {
          //   totalPrice = totalPrice + Number(dropValuePrice);
          //   console.log(totalPrice,"loo")
          //   TotalPriceSpan.innerHTML = `Selections will add ${totalPrice} to price`;
          //   check = true;
          // }
          const replacedString = addOnPriceformat.replace("{{addon}}", newPrice);
          addOnPrice.innerHTML = replacedString;
        } else {
          value = el.setting.option_values[radioIndex].addon;
          totalArr[optionIndex] = 0
          TotalSelectionPrice()
        }
        parentElement.append(addOnPrice);
      }
      // else {
      //   console.log("enteredddd");
      //   let addonValue = e.target.getAttribute("data-addon"); // Get the addon value from data attribute
      //   totalPrice = totalPrice - Number(addonValue);
      //   TotalPriceSpan.innerHTML = `Selections will add ${totalPrice} to price`;
      //   check = false;
        
      // }
    });
  });

  if (el.setting.helptext.length > 0) {
    let helpTextOuterDiv = document.createElement("div");
    helpTextOuterDiv.style.textAlign = el.setting.css.alignment;
    let helpText = document.createElement("div");
    helpTextOuterDiv.append(helpText);
    helpText.className = "sd-genie-option-helpText";
    optionsDiv.append(helpTextOuterDiv);
    helpText.innerText = el.setting.helptext;
    helpText.style.color = el.setting.css.help_text_color;
    helpText.style.fontSize = el.setting.css.help_font_size + "px";
  }
}
function ImageSwatches(el, optionsDiv, optionIndex) {
  console.log("imgSwatches", el);
  totalArr.push(0)

  valdationArr.push({ required: false });

  addOnArray.push([]);
  addOnArray[optionIndex] = 0;

  let productForm = document.querySelectorAll('form[action="/cart/add"]');
  let imageSwatchesLabelDiv = document.createElement("div");
  optionsDiv.append(imageSwatchesLabelDiv);
  imageSwatchesLabelDiv.className = "sd-genie-image-swatches-container";
  optionsDiv.style.display = "flex";
  optionsDiv.style.flexDirection = "column";

  let position = el.setting.css.alignment;
  if (position == "right") {
    optionsDiv.style.alignItems = "end";
  } else if (position == "center") {
    optionsDiv.style.alignItems = "center";
  }
  let imageSwatchesLabel = document.createElement("label");
  if (el.setting.hidden_label == false) {
    imageSwatchesLabel.innerText = el.setting.label;
  } else {
    imageSwatchesLabel.innerText = "";
  }
  imageSwatchesLabelDiv.append(imageSwatchesLabel);
  imageSwatchesLabel.style.color = el.setting.css.label_color;
  imageSwatchesLabel.style.fontSize = el.setting.css.label_font_size + "px";
  if (el.setting.required == true) {
    valdationArr[optionIndex] = {
      required: true,
      class: el.setting.id,
      value: "",
    };
    if (el.setting.hidden_label == false) {
      let requiredField = document.createElement("sup");
      requiredField.innerText = "*";
      imageSwatchesLabel.append(requiredField);
    }
  }
  let imageSwatchValueDiv = document.createElement("span");
  imageSwatchesLabelDiv.append(imageSwatchValueDiv);
  let addOnPrice = document.createElement("span");
  imageSwatchesLabelDiv.append(addOnPrice);

  let imgSwatchDiv = document.createElement("div");
  imgSwatchDiv.className = "sd-genie-option-img-swatch-box";
  optionsDiv.append(imgSwatchDiv);
  el.setting.option_values.forEach((ele, index) => {

    let imgBox = document.createElement("div");
    // let tooltip1 = document.createElement("div");
    // tooltip1.textContent = ele.value;
    // tooltip1.style.display = "none"; // Initially hide the tooltip1
    // tooltip1.style.position = "fixed"; // Use fixed positioning
    // tooltip1.style.backgroundColor = "#000000bf";
    // tooltip1.style.color = "white";
    // tooltip1.style.padding = "5px 10px";
    // // tooltip1.style.border = "1px solid #ccc";
    // tooltip1.style.borderRadius = "6px";
    // tooltip1.style.fontSize = "13px";
    // tooltip1.style.lineHeight = "normal";
    // tooltip1.style.textTransform = "capitalize";
    // document.body.appendChild(tooltip1);
    // tooltip1.classList.add("sd-options-tooltip")
    let ImageSwatchOptionName = document.createElement("p");
    ImageSwatchOptionName.innerHTML = ele.value;
    imgBox.className = "sd-genie-img-box";

    ////////////////////



    //////////////////



    imgSwatchDiv.append(imgBox);
    let innerImageBox = document.createElement("div");
    innerImageBox.className = "sd-genie-img-inner-box";
    if (el.setting.css.type == "classic") {
      innerImageBox.style.borderRadius = "0px";
    } else {
      innerImageBox.style.borderRadius = "40px";
    }

    imgBox.append(innerImageBox);

    let imgInput = document.createElement("input");
    imgInput.className = "sd-genie-img-input";
    imgInput.type = "radio";
    imgInput.id = el.setting.id + index;
    imgInput.name = el.setting.label;
    imgInput.hidden = true;
    imgInput.value = ele.value;
    imgInput.setAttribute("index", index);
    let imgLabel = document.createElement("label");
    imgLabel.setAttribute("for", el.setting.id + index);
    let imgSw = document.createElement("img");
    imgLabel.append(imgSw);
    imgSw.setAttribute("src", ele.url);
    innerImageBox.append(imgInput, imgLabel);
    if (el.setting.css.type == "classic") {
      imgSw.style.borderRadius = "0px";
    } else {
      imgSw.style.borderRadius = "40px";
    }
    imgLabel.addEventListener("mouseover", () => {
      let rect = imgBox.getBoundingClientRect();

      // Position the tooltip below innerColorBox
      // tooltip1.style.top = rect.bottom + "10px";
      // tooltip1.style.left = rect.left + "px";

      // Show the tooltip
      // tooltip1.style.display = "block";
      // innerImageBox.style.background = el.setting.css.swatch_hover;
      innerImageBox.style.boxShadow =
        "0px 0px 19px 1px" + el.setting.css.swatch_hover;
      // imgSw.style.width = "45px"
      // imgSw.style.height = "45px"
      let previewDiv = document.createElement("div");
      imgBox.append(previewDiv);
      previewDiv.className = "sd-genie-option-img-swatch-preview";
      let imgPreview = document.createElement("img");
      let tooltipSpan = document.createElement("span");
      tooltipSpan.classList.add("sd-image-swatch-tooltip")
      tooltipSpan.innerText = ele.value
      previewDiv.append(tooltipSpan)
      previewDiv.append(imgPreview);
      imgPreview.setAttribute("src", ele.url);
    });
    imgLabel.addEventListener("mouseout", () => {
      // tooltip1.style.display = "none";

      innerImageBox.style.boxShadow = "";
      //    imgSw.style.width = ""
      // imgSw.style.height = ""
      imgBox.lastChild.remove();
    });

    let formInput = document.createElement("input");
    formInput.hidden = true;
    formInput.setAttribute("name", `properties[${el.setting.label}]`);
let check = false
    innerImageBox.addEventListener("change", () => {
      console.log("image click");
      if (el.setting.required == true) {
        valdationArr[optionIndex] = {
          required: true,
          class: el.setting.id,
          value: true,
        };
      }

      document.getElementsByName(el.setting.label).forEach((e) => {
        if (e.checked == true) {
          imageSwatchValueDiv.innerHTML = `(${e.value})`;

          formInput.value = e.value;
          productForm.forEach((item) => {
            item.append(formInput);
          });
          let imgIndex = e.getAttribute("index");
          addOnArray[optionIndex] = Number(
            el.setting.option_values[imgIndex].addon
          );
          e.parentElement.style.background = el.setting.css.swatch_active;
          // addOnPrice.style.float = "right"

          if (
            el.setting.option_values[imgIndex].addon.length &&
            el.setting.option_values[imgIndex].addon.length !== "0"
          ) {
            let value = el.setting.option_values[imgIndex].addon;
            totalArr[optionIndex] = Number(value);
            TotalSelectionPrice()
            console.log("totalArr",totalArr)

            let newPrice = showAmountWithCurrency(parseFloat(value).toFixed(2));
            // if (!check) {
            //   totalPrice = totalPrice + Number(value);
            //   console.log(totalPrice,"loo")
            //   TotalPriceSpan.innerHTML = `Selections will add ${totalPrice} to price`;
            // }
            // check = true;
            const replacedString = addOnPriceformat.replace("{{addon}}", newPrice);
;
;

            addOnPrice.innerHTML = replacedString;
          } else {
            value = el.setting.option_values[imgIndex].addon;
            totalArr[optionIndex] = 0
            TotalSelectionPrice()
          }
        } else {
          e.parentElement.style.background = "";
        }
      });
    });
  });

  if (el.setting.helptext.length > 0) {
    let helpTextOuterDiv = document.createElement("div");
    helpTextOuterDiv.style.textAlign = el.setting.css.alignment;
    let helpText = document.createElement("span");
    helpTextOuterDiv.append(helpText);
    helpText.className = "sd-genie-option-helpText";
    optionsDiv.append(helpTextOuterDiv);
    helpText.innerText = el.setting.helptext;
    helpText.style.color = el.setting.css.help_text_color;
    helpText.style.fontSize = el.setting.css.help_font_size + "px";
  }
}
function ColorSwatches(el, optionsDiv, optionIndex) {
  totalArr.push(0)
  valdationArr.push({ required: false });

  addOnArray.push([]);
  addOnArray[optionIndex] = 0;

  let productForm = document.querySelectorAll('form[action="/cart/add"]');
  // console.log("colorSwatches",el)
  let colorSwatchesLabelDiv = document.createElement("div");
  optionsDiv.append(colorSwatchesLabelDiv);
  colorSwatchesLabelDiv.className = "sd-genie-color-swatches-container";
  optionsDiv.style.display = "flex";
  optionsDiv.style.flexDirection = "column";

  let position = el.setting.css.alignment;
  if (position == "right") {
    optionsDiv.style.alignItems = "end";
  } else if (position == "center") {
    optionsDiv.style.alignItems = "center";
  }
  let colorSwatchesLabel = document.createElement("label");
  if (el.setting.hidden_label == false) {
    colorSwatchesLabel.innerText = el.setting.label;
  } else {
    colorSwatchesLabel.innerText = "";
  }

  colorSwatchesLabelDiv.append(colorSwatchesLabel);
  colorSwatchesLabel.style.color = el.setting.css.label_color;
  colorSwatchesLabel.style.fontSize = el.setting.css.label_font_size + "px";
  if (el.setting.required == true) {
    valdationArr[optionIndex] = {
      required: true,
      class: el.setting.id,
      value: "",
    };
    if (el.setting.hidden_label == false) {
      let requiredField = document.createElement("sup");
      requiredField.innerText = "*";
      colorSwatchesLabel.append(requiredField);
    }
  }
  let colorSwatcheValueDiv = document.createElement("span");
  colorSwatchesLabelDiv.append(colorSwatcheValueDiv);
  let addOnPrice = document.createElement("span");
  colorSwatchesLabelDiv.append(addOnPrice);

  let colorSwatchDiv = document.createElement("div");
  colorSwatchDiv.className = "sd-genie-option-color-swatch-box";
  optionsDiv.append(colorSwatchDiv);
  el.setting.option_values.forEach((ele, index) => {
    console.log(ele, "colorswatchdata");

    let colorBox = document.createElement("div");
    // let tooltip = document.createElement("div");
    // tooltip.textContent = ele.value;
    // tooltip.style.display = "none"; // Initially hide the tooltip
    // tooltip.style.position = "fixed"; // Use fixed positioning
    // tooltip.style.backgroundColor = "#000000bf";
    // tooltip.style.color = "white";
    // tooltip.style.padding = "5px 10px";
    // tooltip.style.borderRadius = "6px";
    // tooltip.style.fontSize = "13px";
    // tooltip.style.lineHeight = "normal";
    // tooltip.style.marginTop = "8px";
    // tooltip.style.marginLeft = "-5px";
    // tooltip.style.textTransform = "capitalize";
    // document.body.appendChild(tooltip);

    // colorBox.setAttribute("title", ele.value);
    colorBox.className = "sd-genie-color-box";


    let newTooltip = document.createElement("span")
    newTooltip.classList.add("tooltiptext")
    newTooltip.textContent = ele.value;
    if(ele.value.length > 0){
      
      colorBox.append(newTooltip)
    }
    
    colorSwatchDiv.append(colorBox);
    let innerColorBox = document.createElement("div");
    innerColorBox.className = "sd-genie-color-inner-box";
    colorBox.append(innerColorBox);
    if (el.setting.css.type == "rounded_border") {
      innerColorBox.style.borderRadius = "40px";
    } else {
      innerColorBox.style.borderRadius = "0";
    }
    let colorInput = document.createElement("input");
    colorInput.className = "sd-genie-color-input";
    colorInput.type = "radio";
    colorInput.id = el.setting.id + index;
    colorInput.name = el.setting.label;
    colorInput.hidden = true;
    // colorInput.value = ele.value;
    colorInput.setAttribute("value", ele.value);
    colorInput.setAttribute("index", index);
    let colorLabel = document.createElement("label");
    colorLabel.setAttribute("for", el.setting.id + index);
    let color = document.createElement("div");
    colorLabel.append(color);
    color.className = "sd-genie-color";
    if (ele.color_type == "one-color") {
      color.style.background = ele.color1;
    } else {
      color.style.backgroundImage = `linear-gradient(315deg, ${ele.color1} 50%, ${ele.color2} 50%)`;
    }
    if (el.setting.css.type == "rounded_border") {
      color.style.borderRadius = "40px";
    } else {
      color.style.borderRadius = "0";
    }
    innerColorBox.append(colorInput, colorLabel);

    colorLabel.addEventListener("mouseover", () => {
      let rect = colorLabel.getBoundingClientRect();

      // Position the tooltip below innerColorBox
      // tooltip.style.top = rect.bottom + "10px";
      // tooltip.style.left = rect.left + "px";

      // Show the tooltip
      // tooltip.style.display = "block";
      // innerColorBox.style.background = el.setting.css.swatch_hover;
      innerColorBox.style.boxShadow =
        "0px 0px 19px 1px" + el.setting.css.swatch_hover;
    });
    colorLabel.addEventListener("mouseout", () => {
      // tooltip.style.display = "none";

      innerColorBox.style.boxShadow = "";
    });

    let formInput = document.createElement("input");
    formInput.hidden = true;
    formInput.setAttribute("name", `properties[${el.setting.label}]`);
let check = false
    innerColorBox.addEventListener("change", () => {
      if (el.setting.required == true) {
        valdationArr[optionIndex] = {
          required: true,
          class: el.setting.id,
          value: true,
        };
      }
      document.getElementsByName(el.setting.label).forEach((e) => {
        if (e.checked == true) {
          console.log(e, "pol");
          colorSwatcheValueDiv.innerHTML = `(${e.value})`;
          formInput.value = e.value;
          productForm.forEach((item) => {
            item.append(formInput);
          });
          let colorIndex = e.getAttribute("index");
          addOnArray[optionIndex] = Number(
            el.setting.option_values[colorIndex].addon
          );
          e.parentElement.style.background = el.setting.css.swatch_active;
          // addOnPrice.style.float = "right"

          if (
            el.setting.option_values[colorIndex].addon.length &&
            el.setting.option_values[colorIndex].addon.length !== "0"
          ) {
            let value = el.setting.option_values[colorIndex].addon;
            totalArr[optionIndex] = Number(value);
            TotalSelectionPrice()
            console.log("totalArr",totalArr)

            let newPrice = showAmountWithCurrency(parseFloat(value).toFixed(2));
            // if (!check) {
            //   totalPrice = totalPrice + Number(value);
            //   console.log(totalPrice,"loo")
            //   TotalPriceSpan.innerHTML = `Selections will add ${totalPrice} to price`;
            // }
            check = true;
            const replacedString = addOnPriceformat.replace("{{addon}}", newPrice); 

            addOnPrice.innerHTML = replacedString;
          } else {

              value = el.setting.option_values[colorIndex].addon;
              totalArr[optionIndex] = 0
              TotalSelectionPrice()
            addOnPrice.innerHTML = "";

          }
        } else {
          e.parentElement.style.background = "";
        }
      });
    });
  });

  if (el.setting.helptext.length > 0) {
    let helpTextOuterDiv = document.createElement("div");
    helpTextOuterDiv.style.textAlign = el.setting.css.alignment;
    let helpText = document.createElement("span");
    helpTextOuterDiv.append(helpText);
    helpText.className = "sd-genie-option-helpText";
    optionsDiv.append(helpTextOuterDiv);
    helpText.innerText = el.setting.helptext;
    helpText.style.color = el.setting.css.help_text_color;
    helpText.style.fontSize = el.setting.css.help_font_size + "px";
  }
}
function Paragraph(el, optionsDiv, optionIndex) {
  totalArr.push(0)
  // console.log("paragraph",el)
  valdationArr.push({ required: false });
  addOnArray.push([]);
  addOnArray[optionIndex] = 0;
  let paragraphDiv = document.createElement("div");
  optionsDiv.append(paragraphDiv);
  console.log(el.setting.text,"oooooo")
  paragraphDiv.innerHTML = el.setting.text;
}
function FileUpload(el, optionsDiv, optionIndex) {
  totalArr.push(0)
  console.log("FileUpload",el)
  valdationArr.push({ required: false });
  addOnArray.push([]);
  addOnArray[optionIndex] = 0;
  let productForm = document.querySelectorAll('form[action="/cart/add"]');
  let fileUploadLabelDiv = document.createElement("div");
  optionsDiv.append(fileUploadLabelDiv);
  fileUploadLabelDiv.className = "sd-genie-file-upload-container";
  optionsDiv.style.display = "flex";
  optionsDiv.style.flexDirection = "column";

  let position = el.setting.css.alignment;
  if (position == "right") {
    optionsDiv.style.alignItems = "end";
  } else if (position == "center") {
    optionsDiv.style.alignItems = "center";
  }
  let fileUploadLabel = document.createElement("label");
  fileUploadLabel.innerText = el.setting.label;
  fileUploadLabelDiv.append(fileUploadLabel);
  fileUploadLabel.style.color = el.setting.css.label_color;
  fileUploadLabel.style.fontSize = el.setting.css.label_font_size + "px";
  if (el.setting.required == true) {
    valdationArr[optionIndex] = {
      required: true,
      class: el.setting.id,
      value: "",
    };
    let requiredField = document.createElement("sup");
    requiredField.innerText = "*";
    fileUploadLabel.append(requiredField);
  }

  let imageUploadDiv = document.createElement("div");
  let errormsg = document.createElement("span");
  imageUploadDiv.className = "sd-genie-option-upload-box";
  optionsDiv.append(imageUploadDiv);
  let uploadForm = document.createElement("form");
  uploadForm.className = "sd-genie-upload-form";
  uploadForm.enctype = "multipart/form-data";
  uploadForm.method = "POST";
  imageUploadDiv.append(uploadForm);
  imageUploadDiv.append(errormsg);

  let uploadFileInput = document.createElement("input");
  uploadForm.append(uploadFileInput);
  uploadFileInput.className = "sd-upload";
  uploadFileInput.type = "file";
  uploadFileInput.accept = el.setting.allowed_extensions.join(",");
  imageUploadDiv.style.width = `${el.setting.css.columnWidth}%`;
  uploadFileInput.style.width = "100%";

  uploadFileInput.style.background = el.setting.css.input_back_color;
  if (el.setting.css.type == "rounded_border") {
    uploadFileInput.style.borderRadius = "40px";
  } else {
    uploadFileInput.style.borderRadius = "0";
  }
  let formInput = document.createElement("input");
  formInput.hidden = true;
  formInput.setAttribute("name", `properties[${el.setting.label}]`);
  uploadFileInput.addEventListener("change", async function (event) {
    errormsg.innerHTML=""
    const file = uploadFileInput.files[0]; // Get the selected file

    const size = (file.size / 1024 / 1024).toFixed(2);
    console.log(size);
    if (size > 2) {
      alert("File size must be smaller than 2 MB");
      uploadFileInput.value = "";
    } else {
      const fileName = file.name;
      const fileExtension = fileName.split('.').pop().toLowerCase();
      if (!allowedExtensions.includes(fileExtension)) {
          // alert("Invalid file type. Allowed file types: " + allowedExtensions.join(', '));
        uploadFileInput.value = "";
        console.log("not aloowed")
        errormsg.classList.add("genie-required-error")
        errormsg.innerText = `Invalid file type. Allowed file types: ${allowedExtensions.join(', ')}`
        errormsg.style.color="red"
          return;
      }


      let uploadLoader = document.createElement("div");
      uploadLoader.className = "sd-upload-loader";
      uploadForm.append(uploadLoader);
      const formData = new FormData(); // Create a FormData object
      formData.append("shop", Shopify.shop);
      formData.append("file", file); // Append the file to the FormData
      await fetch(`${server}/api/store/fileUpload`, {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((response) => {
          console.log(response);
          if (response.status == 1) {
            uploadFileInput.disabled = true;
            let imgUrl = response.url;
            if (el.setting.required == true) {
              valdationArr[optionIndex] = {
                required: true,
                class: el.setting.id,
                value: imgUrl,
              };
            }
            formInput.value = imgUrl;
            productForm.forEach((item) => {
              item.append(formInput);
            });
            let imgPreviewDiv = document.createElement("div");
            imgPreviewDiv.className = "sd-genie-preview-container";
            optionsDiv.append(imgPreviewDiv);
            let fUploadimgPreview = document.createElement("img");
            fUploadimgPreview.className = "sd-genie-img-preview";
            imgPreviewDiv.append(fUploadimgPreview);
            fUploadimgPreview.setAttribute("src", imgUrl);
            let deleteIconDiv = document.createElement("span");
            deleteIconDiv.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="#000000" width="800px" height="800px" viewBox="0 0 24 24" id="cross" data-name="Flat Line" class="icon flat-line"><path id="primary" d="M19,19,5,5M19,5,5,19" style="fill: none; stroke: rgb(0, 0, 0); stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;"/></svg>`;
            uploadForm.append(deleteIconDiv);
            deleteIconDiv.className = "sd-genie-delete-file-icon";
            deleteIconDiv.addEventListener("click", () => {
              console.log("file", uploadFileInput);
              deleteUploadFile(
                response,
                uploadFileInput,
                imgPreviewDiv,
                deleteIconDiv,
                uploadForm,
                formInput,
                optionIndex,
                el
              );
            });
            let storeBody = document.getElementsByTagName("body");
            let PreviewimgModalBackgroundDiv = document.createElement("div");
            PreviewimgModalBackgroundDiv.className =
              "sd-genie-modal-background";
            storeBody[0].append(PreviewimgModalBackgroundDiv);
            PreviewimgModalBackgroundDiv.style.display = "none";
            let PreviewimgModalDiv = document.createElement("div");

            PreviewimgModalDiv.className = "sd-genie-preview-modal-container";
            PreviewimgModalBackgroundDiv.append(PreviewimgModalDiv);
            let previewImgModal = document.createElement("img");
            previewImgModal.setAttribute("src", imgUrl);
            PreviewimgModalDiv.append(previewImgModal);
            let exitModal = document.createElement("span");
            exitModal.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="#000000" width="800px" height="800px" viewBox="0 0 24 24" id="cross" data-name="Flat Line" class="icon flat-line"><path id="primary" d="M19,19,5,5M19,5,5,19" style="fill: none; stroke: rgb(0, 0, 0); stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;"/></svg>`;
            PreviewimgModalDiv.append(exitModal);
            fUploadimgPreview.addEventListener("click", () => {
              PreviewimgModalBackgroundDiv.style.display = "block";
            });
            exitModal.addEventListener("click", () => {
              PreviewimgModalBackgroundDiv.style.display = "none";
            });
          }
        })
        .catch((err) => console.log(err.message));
      uploadLoader.remove();
    }
  });

  if (el.setting.helptext.length > 0) {
    let helpTextOuterDiv = document.createElement("div");
    helpTextOuterDiv.style.textAlign = el.setting.css.alignment;
    let helpText = document.createElement("span");
    helpTextOuterDiv.append(helpText);
    helpText.className = "sd-genie-option-helpText";
    optionsDiv.append(helpTextOuterDiv);
    helpText.innerText = el.setting.helptext;
    helpText.style.color = el.setting.css.help_text_color;
    helpText.style.fontSize = el.setting.css.help_font_size + "px";
  }
  
}

async function deleteUploadFile(
  key,
  uploadFileInput,
  imgPreviewDiv,
  deleteIconDiv,
  uploadForm,
  formInput,
  optionIndex,
  el
) {
  let uploadLoader = document.createElement("div");
  uploadLoader.className = "sd-upload-loader";
  uploadForm.append(uploadLoader);
  await fetch(`${server}/api/store/fileDelete`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      url: key.key,
    }),
  })
    .then((response) => response.json())
    .then((response) => {
      if (response.status == 1) {
        formInput.remove();
        uploadLoader.remove();
        uploadFileInput.value = "";
        uploadFileInput.disabled = false;
        imgPreviewDiv.remove();
        deleteIconDiv.remove();
        if (el.setting.required == true) {
          valdationArr[optionIndex] = {
            required: true,
            class: el.setting.id,
            value: "",
          };
        }
      }
    })
    .catch((err) => {
      console.log(err.message);
      uploadLoader.remove();
    });
}
function checkValidate() {
  let hasErrors = false;
  document
    .querySelectorAll(".genie-required-error")
    ?.forEach((e) => e.remove());
  const check = valdationArr.forEach((el) => {
    if (el.required == true) {
      if (el.value == "" || el.value === false) {
        hasErrors = true;
        let errParentDiv = document.getElementsByClassName(
          `sd-genie-${el.class}`
        );
        let errorDiv = document.createElement("div");
        errorDiv.classList.add("genie-required-error");
        errParentDiv[0].append(errorDiv);
        errorDiv.innerText = requiredText;
        errorDiv.style.color = "red";
        return true;
      }
    }
  });

  return hasErrors;
}
function cartButton() {
  let selectors = {
    addtocart_selector:
      '.product__submit__add,form #AddToCart-product-template, form #AddToCart, form #addToCart-product-template, form .product__add-to-cart-button, form .product-form__cart-submit, form .add-to-cart, form .cart-functions > button, form .productitem--action-atc, form .product-form--atc-button, form .product-menu-button-atc, form .product__add-to-cart, form .product-add, form .add-to-cart-button, form #addToCart, form .product-detail__form__action > button, form .product-form-submit-wrap > input, form .product-form input[type="submit"], form input.submit, form .add_to_cart, form .product-item-quick-shop, form #add-to-cart, form .productForm-submit, form .add-to-cart-btn, form .product-single__add-btn, form .quick-add--add-button, form .product-page--add-to-cart, form .addToCart, form .product-form .form-actions, form .button.add, form button#add, form .addtocart, form .AddtoCart, form .product-add input.add, form button#purchase, form[action*="/cart/add"] button[type="submit"], form .product__form button[type="submit"], form #AddToCart--product-template',
  };
  let cartBtn = document.querySelectorAll(selectors.addtocart_selector);
  if (cartBtn.length) {
    cartBtn.forEach((e) => {
      let productForm = document.querySelector('form[action="/cart/add"]');
      let productVariantId =
        productForm.querySelector('input[name="id"]').value;
      let hiddenBtn = e;
      const newButton = document.createElement("button");
      newButton.textContent = "Add to cart";
      newButton.type = "button";
      newButton.className = "genie-add-to-cart-btn";
      const classList = `${e.className}`.split(" ");
      newButton.classList.add(...classList);
      e.classList.add("hidden");
      e.parentNode.prepend(newButton);

      newButton.addEventListener("click", async (e) => {
        console.log("on click");
        e.stopPropagation();
        console.log("after on click");

        let check = checkValidate();
        cartProductUniqueNumber = generateProductCartNumber();
        let productForm = document.querySelectorAll('form[action="/cart/add"]');
        let formInput = document.createElement("input");
        productForm.forEach((item) => {
          item.append(formInput);
        });
        formInput.name = "properties[_unique_id]";
        formInput.hidden = true;
        // formInput.value = cartProductUniqueNumber;
        formInput.setAttribute("value", cartProductUniqueNumber);

        if (check == false) {
          let sum = 0;
          let btnSpinner = document.createElement("div");
          btnSpinner.className = "genie-cart-btn-loader";
          newButton.textContent = "";
          newButton.append(btnSpinner);
          // Iterate over the array and add each element to the sum variable.
          for (const element of addOnArray) {
            sum += element;
          }

          if (sum !== 0) {
            const replacedString = optionProductName.replace("{{product_title}}", productJson.title);
            let productQuantity =
              document.getElementsByName("quantity")[0].value;
            let data = {
              shop: Shopify.shop,
              title: replacedString,
              price: sum,
              vendor: productJson.vendor,
            };
            await fetch(`${server}/api/store/create-product`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(data),
            })
              .then((response) => response.json())
              .then((response) => {
                // console.log("hideen",hiddenBtn)
                if (response.status == 1) {
                  let formData = {
                    items: [
                      {
                        id: response.data,
                        quantity: productQuantity,
                        properties: {
                          _variant_id: productVariantId,
                          _unique_id: cartProductUniqueNumber,
                        },
                      },
                    ],
                    attributes: { GENIE_PRODUCT_OPTION: "testing" },
                  };
                  fetch(window.Shopify.routes.root + "cart/add.js", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                  })
                    .then((response) => {
                      console.log("resp1", response);

                      return response.json();
                    })
                    .then((response) => {
                      console.log("resp2", response);
                      btnSpinner.remove();
                      newButton.textContent = "Add to cart";
                      hiddenBtn.click();
                    })
                    .catch((err) => {
                      console.log("resp3", err.message);
                    });
                }
              })
              .catch((err) => {
                console.log(err.message);
              });
          } else {
            console.log("not create");
            btnSpinner.remove();
            newButton.textContent = "Add to cart";
            hiddenBtn.click();
          }
        } else {
          let myElement = document.querySelector("genie-required-error");
          myElement.scrollIntoView();
        }
      });
    });
  }
}

function generateProductCartNumber() {
  const min = 10000000;
  const max = 99999999;
  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomNumber.toString().padStart(8, "0");
}

function checkCartOnLoad() {
//  let loaderDiv =  `<div class="loader-container" id="loaderContainer">
//   <div class="loader"></div>
// </div>`
//   document.body.appendChild(loaderDiv);
  

  
  fetch(window.Shopify.routes.root + "cart.js", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((res) => {
      const arr = res.items;
      // newDiv.style.display="none"
      
      // console.log('res',arr)

      plusMinusBtn(arr);
      hideQuantitydeleteBtn(arr);
      deleteOption(arr);
      // console.log("a")
      // onChangeCart(arr)
      // const updatedArr = updateQuantity(arr);
      // console.log("updatedArr",updatedArr);

      // onClickCartUpdate(updatedArr)

      // if(updatedArr.length){

      // updatedArr.map((elem,index)=>{
      //   console.log(index+1,elem.quantity)
      //   let lineIndex = index+1 ;
      //      fetch(window.Shopify.routes.root + "cart/change.js", {
      //          method: "POST",
      //          headers: {
      //            "Content-Type": "application/json",
      //          },
      //        body:JSON.stringify({
      //                       'line':lineIndex,
      //                       'quantity': elem.quantity
      //                             })

      //        }).then((response)=> response.json()).then((response)=>{

      // console.log("change",response)
      //        }).catch((err)=>{
      // console.log(err.message)
      //        })

      //   })

      // }
    });
}

// function updateQuantity(arr) {
//   // Create a dictionary to store objects by their 'id'
//   const idMap = {};

//   // Iterate through the array to group objects by 'id'
//   for (const item of arr) {
//     if (idMap[item.properties._unique_id]) {
//       // If the 'id' is already in the dictionary, update the quantity
//       if (idMap[item.properties._unique_id].quantity !== item.quantity) {
//         // Update both quantities to the last changed quantity
//         item.quantity = idMap[item.properties._unique_id].quantity;
//       }
//     } else {
//       // If the 'id' is not in the dictionary, add it
//       idMap[item.properties._unique_id] = item;
//     }
//   }

//   return arr;
// }

function onClickCartUpdate(updatedArr) {
  document.addEventListener("click", function () {
    let inpValue = [];
    let cartValue = [];
    document.querySelectorAll('input[name="updates[]"]').forEach((e) => {
      inpValue.push(Number(e.value));
    });
    updatedArr.map((item) => {
      cartValue.push(item.quantity);
    });
    console.log(inpValue, cartValue);
    if (inpValue.length && cartValue.length) {
      const differences = findDifferenceAndValue(inpValue, cartValue);

      if (differences.length === 0) {
        console.log("The arrays are identical.");
      } else {
        // console.log("Differences found:");
        differences.forEach((difference) => {
          // console.log(`Index: ${difference.index+1}, Value: ${difference.value}`);
          let lineIndex = difference.index + 1;
          let productId = difference.id;
          fetch(window.Shopify.routes.root + "cart/update.js", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            updates: { productId: lineIndex },
          })
            .then((response) => response.json())
            .then((response) => {
              // console.log("change2",response)
              // if(response){
              //  document.querySelectorAll('input[name="updates[]"]')[lineIndex].value =  difference.value.toString() ;
              // }
              window.location.reload();
            })
            .catch((err) => {
              console.log(err.message);
            });
        });
      }
    }
  });
}

function findDifferenceAndValue(array1, array2) {
  // Initialize an array to store objects containing index and value differences
  const diffValues = [];

  // Iterate through one of the arrays (assuming they have the same length)
  array1.forEach((element, index) => {
    if (element !== array2[index]) {
      // If elements are different, record the index and value

      diffValues.push({ index, value: element });
    }
  });

  return diffValues;
}

function hideQuantitydeleteBtn(arr) {
  try {
    let option_set_line_items = arr.filter((variantData) => {
      if (
        variantData.properties != undefined ||
        variantData.properties != null
      ) {
        return (
          Object.keys(variantData.properties).length > 0 &&
          "_variant_id" in variantData.properties
        );
      }
    });
    // console.log("option set line",option_set_line_items)
    let allids = [];
    arr.map((ele) => {
      allids.push(ele.id);
    });
    arr.map(async (variantData, index) => {
      if (
        Object.keys(variantData.properties).length > 0 &&
        "_variant_id" in variantData.properties
      ) {
        document.getElementsByName("updates[]")[
          index
        ].parentElement.style.display = "none";

        let deleteInput = document.getElementsByTagName("a");
        let hideDelete = [];
        [...deleteInput].forEach((e) => {
          const link = e.href;
          const words = link.split("&");
          const lastWord = words.pop();

          if (lastWord == "quantity=0") {
            // e.parentNode.classList.add("genie-hide")
            hideDelete.push(e.parentNode);
          }
        });
        if (hideDelete.length) {
          hideDelete[index].style.display = "none";
        }
      }
    });
  } catch (error) {
    console.log("error in hideQuantitydeleteBtn function", error.message);
  }
}

function onChangeCart(arr) {
  let quantitySelector = document.querySelectorAll(
    'input[name="updates[]"], .cart-drawer__item-quantity'
  );
  quantitySelector.forEach((el) => {
    el.addEventListener("change", () => {
      window.setTimeout(function () {
        location.reload(false);
      }, 40);
    });
  });
}

function deleteOption(arr) {
  console.log(arr, "arr");
  let cartDeleteAnchors = document.querySelectorAll('a[href*="/cart/change?"]');
  cartDeleteAnchors.forEach((el) => {
    el.addEventListener("click", () => {
      console.log(el, "ipi");
      let parentdiv = el.parentElement;

      var getHref = el.getAttribute("href");
      const dataLineValue = parentdiv.getAttribute("data-line");
      const dataIndexValue = parentdiv.getAttribute("data-index");
      console.log(dataIndexValue, "dataLineValuedsf");
      console.log(dataLineValue, "dataLineValue");

      // var dataLine = el.getAttribute("data-line");
      var dataLine;
      if (dataLineValue !== null && dataLineValue !== undefined) {
        dataLine = dataLineValue;
      } else if (dataIndexValue !== null && dataLineValue !== undefined) {
        dataLine = dataIndexValue;
      }

      console.log(dataLine, "libeee");
      if (getHref.includes("?")) {
        let splitHref = getHref.split("?");
        let findVarId = splitHref[1].split(":");
        let getVarId = findVarId[0].split("=")[1];

        getResponse(arr);
        async function getResponse(arr) {
          let filteringDataLine = arr.filter((item, index) => {
            if (index == dataLine) {
              return item;
            }
          });
          const result = arr.filter((item, index, array) => {
            return (
              array.findIndex(
                (element) =>
                  element.properties._unique_id === item.properties._unique_id
              ) !== index
            );
          });
          let getSelectionVarId;
          console.log("resooo", result);
          console.log("filteringDataLine", filteringDataLine);

          result.map((el) => {
            filteringDataLine.map((ele) => {
              if (el.properties._unique_id == ele.properties._unique_id) {
                getSelectionVarId = el.key;
              }
            });
          });

          if (getSelectionVarId !== null) {
            console.log("enterrr", getSelectionVarId);
            var xhr = new XMLHttpRequest();
            xhr.open("POST", "/cart/change.js", false); // Synchronous request
            xhr.setRequestHeader(
              "Content-Type",
              "application/x-www-form-urlencoded"
            );

            xhr.onreadystatechange = function () {
              if (xhr.readyState === 4 && xhr.status === 200) {
                var data = JSON.parse(xhr.responseText);
              }
            };

            var requestData = "id=" + getSelectionVarId + "&quantity=0";
            xhr.send(requestData);
          }

          window.setTimeout(function () {
            location.reload(false);
          }, 1000);
        }
      } else {
        //     window.setTimeout(function () {
        //   location.reload(false);
        // }, 60);
      }
    });
  });
}

function showAmountWithCurrency(value) {
  // console.log("value",price)
  // let value = (price * shopCurrencyRate).toFixed(2) ;
  let moneyFormat = sdCurrencySymbolCode;
  let sdCurrencyFormatcondition;

  if (moneyFormat.includes("{{amount_no_decimals}}")) {
    sdCurrencyFormatcondition = "amount_no_decimals";
  } else if (moneyFormat.includes("{{amount_with_comma_separator}}")) {
    sdCurrencyFormatcondition = "amount_with_comma_separator";
  } else if (
    moneyFormat.includes("{{amount_no_decimals_with_space_separator}}")
  ) {
    sdCurrencyFormatcondition = "amount_no_decimals_with_space_separator";
  } else if (
    moneyFormat.includes("{{amount_no_decimals_with_comma_separator}}")
  ) {
    sdCurrencyFormatcondition = "amount_no_decimals_with_comma_separator";
  } else if (moneyFormat.includes("{{amount_with_space_separator}}$")) {
    sdCurrencyFormatcondition = "amount_with_space_separator";
  } else {
    sdCurrencyFormatcondition = "amount";
  }

  let sdCurrencyprice;
  switch (sdCurrencyFormatcondition) {
    case "amount":
      sdCurrencyprice = moneyFormat.replace("{{amount}}", value);
      break;
    case "amount_with_comma_separator":
      if (value) {
        let stringValue = value.toString();
        if (stringValue.indexOf(".") > 0) {
          let comma_seperator = stringValue.replace(".", ",");
          sdCurrencyprice = moneyFormat.replace(
            "{{amount_with_comma_separator}}",
            comma_seperator
          );
        } else {
          sdCurrencyprice = moneyFormat.replace(
            "{{amount_with_comma_separator}}",
            value
          );
        }
      } else {
        sdCurrencyprice = moneyFormat.replace(
          "{{amount_with_comma_separator}}",
          value
        );
      }
      break;
    case "amount_no_decimals_with_space_separator":
      let noDecimalwithSpace = parseInt(value);
      sdCurrencyprice = moneyFormat.replace(
        "{{amount_no_decimals_with_space_separator}}",
        noDecimalwithSpace
      );
      break;
    case "amount_no_decimals":
      let noDecimal = parseInt(value);
      sdCurrencyprice = moneyFormat.replace(
        "{{amount_no_decimals}}",
        noDecimal
      );
      break;
    case "amount_no_decimals_with_comma_separator":
      let noDecimalwithComma = parseInt(value);

      sdCurrencyprice = moneyFormat.replace(
        "{{amount_no_decimals_with_comma_separator}}",
        noDecimalwithComma
      );
      break;
    case "amount_with_space_separator":
      if (value) {
        let spaceStringValue = value.toString();
        if (spaceStringValue.indexOf(".") > 0) {
          let Space_comma_seperator = spaceStringValue.replace(".", ",");
          sdCurrencyprice = moneyFormat.replace(
            "{{amount_with_space_separator}}",
            Space_comma_seperator
          );
        } else {
          sdCurrencyprice = moneyFormat.replace(
            "{{amount_with_space_separator}}",
            value
          );
        }
      } else {
        sdCurrencyprice = moneyFormat.replace(
          "{{amount_with_space_separator}}",
          value
        );
      }
      break;
    default:
    // code block
  }

  return sdCurrencyprice;
}

function plusMinusBtn(arr) {
  let btns = document.querySelectorAll(
    '.quantity__button,input[name="plus"],input[name="minus"],button[name="minus"],button[name="plus"],button[data-line]'
  );
  btns.forEach((el) => {
    el.addEventListener("click", () => {
      arr.map(async (variantData, index) => {
        if (
          Object.keys(variantData.properties).length > 0 &&
          "_variant_id" in variantData.properties
        ) {      
          window.setTimeout(function () {
            fetch(window.Shopify.routes.root + "cart.js", {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            })
              .then((response) => response.json())
              .then((response) => {
                let selectedItemLine =
                  response.items[el.getAttribute("data-line") - 1];
                console.log("response", selectedItemLine);

                const result = response.items.filter((item, index, array) => {
                  return (
                    array.findIndex(
                      (element) =>
                        element.properties._unique_id ===
                        item.properties._unique_id
                    ) !== index
                  );
                });
                console.log("result", result);
                window.setTimeout(function () {
                  var xhr = new XMLHttpRequest();
                  xhr.open("POST", "/cart/change.js", false); // Synchronous request
                  xhr.setRequestHeader(
                    "Content-Type",
                    "application/x-www-form-urlencoded"
                  );

                  xhr.onreadystatechange = function () {
                    if (xhr.readyState === 4 && xhr.status === 200) {
                      var data = JSON.parse(xhr.responseText);
                    }
                  };

                  var requestData =
                    "id=" +
                    result[0].id +
                    "&quantity=" +
                    el.parentElement.input.value;
                  xhr.send(requestData);
                  location.reload(false);
                }, 500);
              })
              .catch((err) => {
                console.log(err.message);
              });
          }, 500);
        }
      });
    });
  });
}
