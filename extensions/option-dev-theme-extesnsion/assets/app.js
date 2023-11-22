const server = "https://sink-class-traffic-classification.trycloudflare.com";
let genieBlock = document.getElementsByClassName("genie-options-block-outer");
if (_sd_pageType == "cart") {
  checkCartOnLoad();
}
if (_sd_pageType == "product") {
  getAllData();

  cartButton();
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
        genieOption(data);
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
}
let addOnArray = [];
let valdationArr = [];
function TextArea(el, optionsDiv, optionIndex) {
  // console.log("textArea",el)

  valdationArr.push({ required: false });
  addOnArray.push([]);
  addOnArray[optionIndex] = 0;
  let productForm = document.querySelector('form[action="/cart/add"]');
  let textAreaLabelDiv = document.createElement("div");
  optionsDiv.append(textAreaLabelDiv);
  textAreaLabelDiv.className = "sd-genie-text-Area-container";

  let textAreaLabel = document.createElement("label");
  if (el.setting.hidden_label == false) {
    textAreaLabel.innerText = el.setting.label;
  } else {
    textAreaLabel.innerText = "";
  }
  textAreaLabelDiv.append(textAreaLabel);
  textAreaLabel.style.color = el.setting.css.label_color;
  textAreaLabel.style.fontSize = el.setting.css.label_font_size + "px";
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
    let value = el.setting.addon;
    let newPrice = showAmountWithCurrency(value);

    addOnPrice.innerHTML = `(+${newPrice})`;
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
  formInput.hidden = true;
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
      formInput.value = e.target.value;
      addOnPrice.style.display = "block";
      productForm.append(formInput);
      addOnArray[optionIndex] = Number(el.setting.addon);
    } else {
      addOnPrice.style.display = "none";
      formInput.remove();
      addOnArray[optionIndex] = 0;
    }
  });

  if (el.setting.helptext.length > 0) {
    let helpText = document.createElement("span");
    helpText.className = "sd-genie-option-helpText";
    optionsDiv.append(helpText);
    helpText.innerText = el.setting.helptext;
    helpText.style.color = el.setting.css.help_text_color;
    helpText.style.fontSize = el.setting.css.help_font_size + "px";
  }
}
function Text(el, optionsDiv, optionIndex) {
  console.log("text", el);
  valdationArr.push({ required: false });

  addOnArray.push([]);
  addOnArray[optionIndex] = 0;

  let productForm = document.querySelector('form[action="/cart/add"]');

  let textLabelDiv = document.createElement("div");
  optionsDiv.append(textLabelDiv);
  textLabelDiv.className = "sd-genie-text-container";
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
  let addOnPrice = document.createElement("span");
  if (el.setting.addon !== 0 || el.setting.addon !== "") {
    textLabelDiv.append(addOnPrice);
    let value = el.setting.addon;
    let newPrice = showAmountWithCurrency(value);

    addOnPrice.innerHTML = `(+${newPrice})`;
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
  formInput.name = `properties[${el.setting.label}]`;

  Text.addEventListener("change", (e) => {
    if (el.setting.required == true) {
      valdationArr[optionIndex] = {
        required: true,
        class: el.setting.id,
        value: e.target.value,
      };
    }
    if (e.target.value.length > 0) {
      formInput.value = e.target.value;
      addOnPrice.style.display = "block";
      productForm.append(formInput);
      addOnArray[optionIndex] = Number(el.setting.addon);
    } else {
      formInput.remove();
      addOnPrice.style.display = "none";
      addOnArray[optionIndex] = 0;
    }
  });
  if (el.setting.helptext.length > 0) {
    let helpText = document.createElement("span");
    helpText.className = "sd-genie-option-helpText";
    optionsDiv.append(helpText);
    helpText.innerText = el.setting.helptext;
    helpText.style.color = el.setting.css.help_text_color;
    helpText.style.fontSize = el.setting.css.help_font_size + "px";
  }
}
function numberInput(el, optionsDiv, optionIndex) {
  // console.log("Number")
  valdationArr.push({ required: false });

  addOnArray.push([]);
  addOnArray[optionIndex] = 0;

  let productForm = document.querySelector('form[action="/cart/add"]');
  let numberLabelDiv = document.createElement("div");
  optionsDiv.append(numberLabelDiv);
  numberLabelDiv.className = "sd-genie-number-container";
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
  if (el.setting.addon !== 0 || el.setting.addon !== "") {
    numberLabelDiv.append(addOnPrice);
    let value = el.setting.addon;
    let newPrice = showAmountWithCurrency(value);

    addOnPrice.innerHTML = `(+${newPrice})`;
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
  formInput.name = `properties[${el.setting.label}]`;

  number.addEventListener("change", (e) => {
    if (el.setting.required == true) {
      valdationArr[optionIndex] = {
        required: true,
        class: el.setting.id,
        value: e.target.value,
      };
    }
    if (e.target.value.length > 0 && !(e.target.value == 0)) {
      formInput.value = e.target.value;
      addOnPrice.style.display = "block";
      productForm.append(formInput);
      addOnArray[optionIndex] = Number(el.setting.addon);
    } else {
      addOnPrice.style.display = "none";
      formInput.remove();
      addOnArray[optionIndex] = 0;
    }
  });
  if (el.setting.helptext.length > 0) {
    let helpText = document.createElement("span");
    helpText.className = "sd-genie-option-helpText";
    optionsDiv.append(helpText);
    helpText.innerText = el.setting.helptext;
    helpText.style.color = el.setting.css.help_text_color;
    helpText.style.fontSize = el.setting.css.help_font_size + "px";
  }
}
function Dropdown(el, optionsDiv, optionIndex) {
  // console.log("Dropdown",optionIndex)
  valdationArr.push({ required: false });

  addOnArray.push([]);
  addOnArray[optionIndex] = 0;

  let productForm = document.querySelector('form[action="/cart/add"]');
  let dropdownLabelDiv = document.createElement("div");
  optionsDiv.append(dropdownLabelDiv);
  dropdownLabelDiv.className = "sd-genie-dropdown-container";
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
  formInput.name = `properties[${el.setting.label}]`;

  dropdown.addEventListener("change", () => {
    formInput.value = dropdown.value;
    if (el.setting.required == true) {
      valdationArr[optionIndex] = {
        required: true,
        class: el.setting.id,
        value: formInput.value,
      };
    }
    productForm.append(formInput);
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
      let newPrice = showAmountWithCurrency(value);

      addOnPrice.innerHTML = `(+${newPrice})`;
      addOnPrice.style.display = "block";
    }
  });

  if (el.setting.helptext.length > 0) {
    let helpText = document.createElement("span");
    helpText.className = "sd-genie-option-helpText";
    optionsDiv.append(helpText);
    helpText.innerText = el.setting.helptext;
    helpText.style.color = el.setting.css.help_text_color;
    helpText.style.fontSize = el.setting.css.help_font_size + "px";
  }
}
function Checkbox(el, optionsDiv, optionIndex) {
  // console.log("checkbox")
  valdationArr.push({ required: false });

  addOnArray.push([]);
  addOnArray[optionIndex] = 0;

  let totalCheckSum = [];
  let productForm = document.querySelector('form[action="/cart/add"]');

  let CheckBoxLabelDiv = document.createElement("div");
  optionsDiv.append(CheckBoxLabelDiv);
  CheckBoxLabelDiv.className = "sd-genie-checkbox-container";
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
    formInput.name = `properties[${el.setting.label}]`;

    checkbox.addEventListener("change", (e) => {
      const checkboxIndex = e.target.getAttribute("index");

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
        if (
          el.setting.option_values[checkboxIndex].addon.length &&
          el.setting.option_values[checkboxIndex].addon.length !== "0"
        ) {
          let value = el.setting.option_values[checkboxIndex].addon;
          let newPrice = showAmountWithCurrency(value);

          addOnPrice.innerHTML = `(+${newPrice})`;
        }
        parentElement.append(addOnPrice);
      } else {
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
        productForm.append(formInput);
      } else {
        formInput.remove();
      }
    });
  });
}
function RadioButton(el, optionsDiv, optionIndex) {
  // console.log("radiobtn")
  valdationArr.push({ required: false });

  addOnArray.push([]);
  addOnArray[optionIndex] = 0;

  let productForm = document.querySelector('form[action="/cart/add"]');

  let radioLabelDiv = document.createElement("div");
  optionsDiv.append(radioLabelDiv);
  radioLabelDiv.className = "sd-genie-radio-container";
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
  formInput.name = `properties[${el.setting.label}]`;

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
    let radioValue = document.createElement("label");
    radioValue.setAttribute("for", el.setting.id + index);
    radioValue.innerText = ele.value;
    radioBoxDiv.append(radioInput, radioValue);

    radioInput.addEventListener("change", (e) => {
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
        productForm.append(formInput);
        let addOnPrice = document.createElement("span");
        addOnPrice.style.float = "right";
        if (
          el.setting.option_values[radioIndex].addon.length &&
          el.setting.option_values[radioIndex].addon.length !== "0"
        ) {
          let value = el.setting.option_values[radioIndex].addon;
          let newPrice = showAmountWithCurrency(value);

          addOnPrice.innerHTML = `(+${newPrice})`;
        }
        parentElement.append(addOnPrice);
      }
    });
  });

  if (el.setting.helptext.length > 0) {
    let helpText = document.createElement("div");
    helpText.className = "sd-genie-option-helpText";
    optionsDiv.append(helpText);
    helpText.innerText = el.setting.helptext;
    helpText.style.color = el.setting.css.help_text_color;
    helpText.style.fontSize = el.setting.css.help_font_size + "px";
  }
}
function ImageSwatches(el, optionsDiv, optionIndex) {
  // console.log("imgSwatches",el)
  valdationArr.push({ required: false });

  addOnArray.push([]);
  addOnArray[optionIndex] = 0;

  let productForm = document.querySelector('form[action="/cart/add"]');
  let imageSwatchesLabelDiv = document.createElement("div");
  optionsDiv.append(imageSwatchesLabelDiv);
  imageSwatchesLabelDiv.className = "sd-genie-image-swatches-container";
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
  let addOnPrice = document.createElement("span");
  imageSwatchesLabelDiv.append(addOnPrice);

  let imgSwatchDiv = document.createElement("div");
  imgSwatchDiv.className = "sd-genie-option-img-swatch-box";
  optionsDiv.append(imgSwatchDiv);
  el.setting.option_values.forEach((ele, index) => {
    let imgBox = document.createElement("div");
    imgBox.className = "sd-genie-img-box";
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
      // innerImageBox.style.background = el.setting.css.swatch_hover;
      innerImageBox.style.boxShadow =
        "0px 0px 19px 1px" + el.setting.css.swatch_hover;
      // imgSw.style.width = "45px"
      // imgSw.style.height = "45px"
      let previewDiv = document.createElement("div");
      imgBox.append(previewDiv);
      previewDiv.className = "sd-genie-option-img-swatch-preview";
      let imgPreview = document.createElement("img");
      previewDiv.append(imgPreview);
      imgPreview.setAttribute("src", ele.url);
    });
    imgLabel.addEventListener("mouseout", () => {
      innerImageBox.style.boxShadow = "";
      //    imgSw.style.width = ""
      // imgSw.style.height = ""
      imgBox.lastChild.remove();
    });

    let formInput = document.createElement("input");
    formInput.hidden = true;
    formInput.name = `properties[${el.setting.label}]`;

    innerImageBox.addEventListener("change", () => {
      if (el.setting.required == true) {
        valdationArr[optionIndex] = {
          required: true,
          class: el.setting.id,
          value: true,
        };
      }

      document.getElementsByName(el.setting.label).forEach((e) => {
        if (e.checked == true) {
          formInput.value = e.value;
          productForm.append(formInput);
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
            let newPrice = showAmountWithCurrency(value);

            addOnPrice.innerHTML = `(+${newPrice})`;
          }
        } else {
          e.parentElement.style.background = "";
        }
      });
    });
  });

  if (el.setting.helptext.length > 0) {
    let helpText = document.createElement("span");
    helpText.className = "sd-genie-option-helpText";
    optionsDiv.append(helpText);
    helpText.innerText = el.setting.helptext;
    helpText.style.color = el.setting.css.help_text_color;
    helpText.style.fontSize = el.setting.css.help_font_size + "px";
  }
}
function ColorSwatches(el, optionsDiv, optionIndex) {
  valdationArr.push({ required: false });

  addOnArray.push([]);
  addOnArray[optionIndex] = 0;

  let productForm = document.querySelector('form[action="/cart/add"]');
  // console.log("colorSwatches",el)
  let colorSwatchesLabelDiv = document.createElement("div");
  optionsDiv.append(colorSwatchesLabelDiv);
  colorSwatchesLabelDiv.className = "sd-genie-color-swatches-container";
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
  let addOnPrice = document.createElement("span");
  colorSwatchesLabelDiv.append(addOnPrice);

  let colorSwatchDiv = document.createElement("div");
  colorSwatchDiv.className = "sd-genie-option-color-swatch-box";
  optionsDiv.append(colorSwatchDiv);
  el.setting.option_values.forEach((ele, index) => {
    let colorBox = document.createElement("div");
    colorBox.className = "sd-genie-color-box";
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
    colorInput.value = ele.value;
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
      // innerColorBox.style.background = el.setting.css.swatch_hover;
      innerColorBox.style.boxShadow =
        "0px 0px 19px 1px" + el.setting.css.swatch_hover;
    });
    colorLabel.addEventListener("mouseout", () => {
      innerColorBox.style.boxShadow = "";
    });

    let formInput = document.createElement("input");
    formInput.hidden = true;
    formInput.name = `properties[${el.setting.label}]`;

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
          formInput.value = e.value;
          productForm.append(formInput);
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
            let newPrice = showAmountWithCurrency(value);

            addOnPrice.innerHTML = `(+${newPrice})`;
          } else {
            addOnPrice.innerHTML = "";
          }
        } else {
          e.parentElement.style.background = "";
        }
      });
    });
  });

  if (el.setting.helptext.length > 0) {
    let helpText = document.createElement("span");
    helpText.className = "sd-genie-option-helpText";
    optionsDiv.append(helpText);
    helpText.innerText = el.setting.helptext;
    helpText.style.color = el.setting.css.help_text_color;
    helpText.style.fontSize = el.setting.css.help_font_size + "px";
  }
}
function Paragraph(el, optionsDiv, optionIndex) {
  // console.log("paragraph",el)
  valdationArr.push({ required: false });
  addOnArray.push([]);
  addOnArray[optionIndex] = 0;
  let paragraphDiv = document.createElement("div");
  optionsDiv.append(paragraphDiv);
  paragraphDiv.innerHTML = el.setting.text;
}
function FileUpload(el, optionsDiv, optionIndex) {
  // console.log("FileUpload")
  valdationArr.push({ required: false });
  addOnArray.push([]);
  addOnArray[optionIndex] = 0;
  let productForm = document.querySelector('form[action="/cart/add"]');
  let fileUploadLabelDiv = document.createElement("div");
  optionsDiv.append(fileUploadLabelDiv);
  fileUploadLabelDiv.className = "sd-genie-file-upload-container";
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
  imageUploadDiv.className = "sd-genie-option-upload-box";
  optionsDiv.append(imageUploadDiv);
  let uploadForm = document.createElement("form");
  uploadForm.className = "sd-genie-upload-form";
  uploadForm.enctype = "multipart/form-data";
  uploadForm.method = "POST";
  imageUploadDiv.append(uploadForm);
  let uploadFileInput = document.createElement("input");
  uploadForm.append(uploadFileInput);
  uploadFileInput.className = "sd-upload";
  uploadFileInput.type = "file";
  uploadFileInput.accept = el.setting.allowed_extensions.join(",");
  uploadFileInput.style.width = `${el.setting.css.columnWidth}%`;
  uploadFileInput.style.background = el.setting.css.input_back_color;
  let formInput = document.createElement("input");
  formInput.hidden = true;
  formInput.name = `properties[${el.setting.label}]`;
  uploadFileInput.addEventListener("change", async function (event) {
    const file = uploadFileInput.files[0]; // Get the selected file

    const size = (file.size / 1024 / 1024).toFixed(2);
    console.log(size);
    if (size > 2) {
      alert("File must be between the size of 2-4 MB");
      uploadFileInput.value = "";
    } else {
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
            productForm.append(formInput);
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
    let helpText = document.createElement("span");
    helpText.className = "sd-genie-option-helpText";
    optionsDiv.append(helpText);
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
    .querySelectorAll("#genie-required-error")
    ?.forEach((e) => e.remove());
  const check = valdationArr.forEach((el) => {
    if (el.required == true) {
      if (el.value == "" || el.value === false) {
        hasErrors = true;
        let errParentDiv = document.getElementsByClassName(
          `sd-genie-${el.class}`
        );
        let errorDiv = document.createElement("div");
        errorDiv.id = "genie-required-error";
        errParentDiv[0].append(errorDiv);
        errorDiv.innerText = "Please fill the required field.";
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
        e.stopPropagation();
        let check = checkValidate();
        cartProductUniqueNumber = generateProductCartNumber();
        let productForm = document.querySelector('form[action="/cart/add"]');
        let formInput = document.createElement("input");
        productForm.append(formInput);
        formInput.name = "properties[_unique_id]";
        formInput.hidden = true;
        formInput.value = cartProductUniqueNumber;

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
            let productQuantity =
              document.getElementsByName("quantity")[0].value;
            let data = {
              shop: Shopify.shop,
              title: `Option of ${productJson.title} `,
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
                      return response.json();
                    })
                    .then((response) => {
                      // console.log("resp",response)
                      btnSpinner.remove();
                      newButton.textContent = "Add to cart";
                      hiddenBtn.click();
                    })
                    .catch((err) => {
                      console.log(err.message);
                    });
                }
              })
              .catch((err) => {
                console.log(err.message);
              });
          } else {
            btnSpinner.remove();
            newButton.textContent = "Add to cart";
            hiddenBtn.click();
          }
        } else {
          let myElement = document.getElementById("genie-required-error");
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
  fetch(window.Shopify.routes.root + "cart.js", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((res) => {
      const arr = res.items;

      // console.log('res',arr)

      plusMinusBtn(arr)
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
  let cartDeleteAnchors = document.querySelectorAll('a[href*="/cart/change?"]');
  cartDeleteAnchors.forEach((el) => {
    el.addEventListener("click", () => {
      var getHref = el.getAttribute("href");
      var dataLine = el.getAttribute("data-line");
      // console.log(dataLine)
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
          // console.log('resooo',result)
          result.map((el) => {
            filteringDataLine.map((ele) => {
              if (el.properties._unique_id == ele.properties._unique_id) {
                getSelectionVarId = el.key;
              }
            });
          });

          if (getSelectionVarId !== null) {
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

function plusMinusBtn(arr){
  let btns = document.querySelectorAll('.quantity__button,input[name="plus"],input[name="minus"],button[name="minus"],button[name="plus"],button[data-line]');
  btns.forEach((el)=>{
   el.addEventListener('click',()=>{
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
  }).then(response=>  response.json()
         ).then((response)=>{
       
   let selectedItemLine =  response.items[el.getAttribute("data-line")-1]
      
  const result = response.items.filter((item, index, array) => {
            return (
              array.findIndex(
                (element) =>
                  element.properties._unique_id === item.properties._unique_id
              ) !== index
            );
          });
                
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

            var requestData = "id=" + result[0].id + "&quantity=" + selectedItemLine.quantity ;
            xhr.send(requestData);
            location.reload(false);
          }, 500);
                
  
         }).catch((err)=>{
                console.log(err.message)
         })
        
      }, 500);
        
      }
    });

   })
  })
}
