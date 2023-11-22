import React, { useState, useCallback } from "react";
import { Button, Text, Card } from "@shopify/polaris";

export default function ColorLayout(props) {
  const [inputText, setInputText] = useState(props.data.input_text_color);
  const [inputBack, setInputBack] = useState(props.data.input_back_color);
  const [dropdownText, setDropdownText] = useState(
    props.data.dropdown_text_color
  );
  const [dropdownBack, setDropdownBack] = useState(
    props.data.dropdown_back_color
  );
  const [checkText, setCheckText] = useState(props.data.check_button_text);
  const [checkTextHover, setCheckTextHover] = useState(
    props.data.check_text_hover
  );
  const [checkTextActive, setCheckTextActive] = useState(
    props.data.check_text_active
  );
  const [checkButtonHover, setCheckButtonhover] = useState(
    props.data.check_button_hover
  );
  const [checkButtonActive, setCheckButtonActive] = useState(
    props.data.check_button_active
  );
  const [swatchHover, setSwatchHover] = useState(props.data.swatch_hover);
  const [swatchActive, setSwatchActive] = useState(props.data.swatch_active);
  const [buttonBack, setButtonBack] = useState(props.data.input_text_color);
  const [buttonBackActive, setButtonBackActive] = useState(
    props.data.button_back_active
  );
  const [buttonBackHover, setButtonBackHover] = useState(
    props.data.button_back_hover
  );
  const [buttonTextActive, setButtonTextActive] = useState(
    props.data.button_text_active
  );
  const [buttonTextHover, setButtonTextHover] = useState(
    props.data.button_text_hover
  );
  const [buttonText, setButtonText] = useState(props.data.button_text);
  const setColor = (e) => {
    let id = e.target.id;
    let value = e.target.value;
    props.handleFunc(id, value);
    // console.log(id, value);
  };
  return (
    <Card>
        <div className="color_picker">
          <div className="sd-ado-apprearence-color required_color">
            <Text variation="subdued">App background </Text>
            <Button id="required_color_1">
              <input
                id="app_color_i"
                type="color"
                value={props.data.app_background_color}
                onChange={setColor}
              />
              {props.data.app_background_color}
            </Button>
          </div>
          <div className="sd-ado-apprearence-color help_color">
            <Text variation="subdued">Helptext </Text>
            <Button id="help_color_1">
              <input
                id="help_color_i"
                type="color"
                value={props.data.help_text_color}
                onChange={setColor}
              />
              {props.data.help_text_color}
            </Button>
          </div>
          <div className="sd-ado-apprearence-color label_color">
            <Text variation="subdued">Label text </Text>
            <Button id="label_color_1">
              <input
                id="label_color_i"
                type="color"
                value={props.data.label_color}
                onChange={setColor}
              />
              {props.data.label_color}
            </Button>
          </div>
          <div className="sd-ado-apprearence-color required_color">
            <Text variation="subdued">Required character </Text>
            <Button id="required_color_1">
              <input
                id="reqd_color_i"
                type="color"
                value={props.data.required_char_color}
                onChange={setColor}
              />
              {props.data.required_char_color}
            </Button>
          </div>
        </div>
        <div className="color_picker">
          <div className="sd-ado-apprearence-color input_text_color">
            <Text variation="subdued">Input text color </Text>
            <Button id="input_text_1">
              <input
                id="input_text_1"
                type="color"
                value={props.data.input_text_color}
                onChange={setColor}
              />
              {props.data.input_text_color}
            </Button>
          </div>
          <div className="sd-ado-apprearence-color input_background_color">
            <Text variation="subdued">Input background color </Text>
            <Button id="input_back_1">
              <input
                id="input_back_1"
                type="color"
                value={props.data.input_back_color}
                onChange={setColor}
              />
              {props.data.input_back_color}
            </Button>
          </div>
        </div>
        <div className="color_picker">
          <div className="sd-ado-apprearence-color select_text_color">
            <Text variation="subdued">Dropdown text color</Text>
            <Button id="select_text_1">
              <input
                id="select_text_1"
                type="color"
                value={props.data.dropdown_text_color}
                onChange={setColor}
              />
              {props.data.dropdown_text_color}
            </Button>
          </div>
          <div className="sd-ado-apprearence-color select_background_color">
            <Text variation="subdued">Dropdown background color</Text>
            <Button id="select_back_1">
              <input
                id="select_back_1"
                type="color"
                value={props.data.dropdown_back_color}
                onChange={setColor}
              />
              {props.data.dropdown_back_color}
            </Button>
          </div>
          <div className="sd-ado-apprearence-color button_text_div">
            <Text variation="subdued">
              Checkbox & Radio button text
            </Text>
            <Button id="checkbox_text">
              <input
                id="checkbox_text"
                type="color"
                value={props.data.check_button_text}
                onChange={setColor}
              />
              {props.data.check_button_text}
            </Button>
          </div>
          <div className="sd-ado-apprearence-color text_hover_div">
            <Text variation="subdued">
              Checkbox & Radio button text hover
            </Text>
            <Button id="checkbox_text_hover">
              <input
                id="checkbox_text_hover"
                type="color"
                value={props.data.check_text_hover}
                onChange={setColor}
              />
              {props.data.check_text_hover}
            </Button>
          </div>
          {/* <div className="sd-ado-apprearence-color text_active_div">
            <Text variation="subdued">
              Checkbox & Radio Button text active
            </Text>
            <Button id="checkbox_text_active">
              <input
                id="checkbox_text_active"
                type="color"
                value={props.data.check_text_active}
                onChange={setColor}
              />
              {props.data.check_text_active}
            </Button>
          </div> */}
          {/* <div className="sd-ado-apprearence-color button_hover_div">
            <Text variation="subdued">
              Checkbox & Radio Button hover
            </Text>
            <Button id="checkbox_button_hover">
              <input
                id="checkbox_button_hover"
                type="color"
                value={props.data.check_button_hover}
                onChange={setColor}
              />
              {props.data.check_button_hover}
            </Button>
          </div> */}
          <div className="sd-ado-apprearence-color button_active_div">
            <Text variation="subdued">
              Checkbox & Radio button active
            </Text>
            <Button id="checkbox_button_active">
              <input
                id="checkbox_button_active"
                type="color"
                value={props.data.check_button_active}
                onChange={setColor}
              />
              {props.data.check_button_active}
            </Button>
          </div>
        </div>
        <div className="color_picker">
          <div className="sd-ado-apprearence-color button_text_div">
            <Text variation="subdued">Swatch hover</Text>
            <Button id="swatch_hover">
              <input
                id="swatch_hover"
                type="color"
                value={props.data.swatch_hover}
                onChange={setColor}
              />
              {props.data.swatch_hover}
            </Button>
          </div>

          <div className="sd-ado-apprearence-color text_hover_div">
            <Text variation="subdued">Swatch background active</Text>
            <Button id="swatch_back_active">
              <input
                id="swatch_back_active"
                type="color"
                value={props.data.swatch_active}
                onChange={setColor}
              />
              {props.data.swatch_active}
            </Button>
          </div>
        </div>
        {/* <div className="sd-ado-apprearence-color button_text_div">
          <Text variation="subdued">Button Background</Text>
          <Button id="button_back">
            <input
              id="button_back"
              type="color"
              value={props.data.button_back}
              onChange={setColor}
            />
          </Button>
        </div>
        <div className="sd-ado-apprearence-color text_hover_div">
          <Text variation="subdued">Button Background Active</Text>
          <Button id="button_back_active">
            <input
              id="button_back_active"
              type="color"
              value={props.data.button_back_active}
              onChange={setColor}
            />
          </Button>
        </div>
        <div className="sd-ado-apprearence-color text_active_div">
          <Text variation="subdued">Button Background Hover</Text>
          <Button id="button_back_hover">
            <input
              id="button_back_hover"
              type="color"
              value={props.data.button_back_hover}
              onChange={setColor}
            />
          </Button>
        </div>
        <div className="sd-ado-apprearence-color button_hover_div">
          <Text variation="subdued">Button Text Active</Text>
          <Button id="button_text_active">
            <input
              id="button_text_active"
              type="color"
              value={props.data.button_text_active}
              onChange={setColor}
            />
          </Button>
        </div>
        <div className="sd-ado-apprearence-color button_active_div">
          <Text variation="subdued">Button Text Hover</Text>
          <Button id="button_text_hover">
            <input
              id="button_text_hover"
              type="color"
              value={props.data.button_text_hover}
              onChange={setColor}
            />
          </Button>
        </div>
        <div className="sd-ado-apprearence-color button_active_div">
          <Text variation="subdued">Button Text</Text>
          <Button id="button_text">
            <input
              id="button_text"
              type="color"
              value={props.data.button_text}
              onChange={setColor}
            />
          </Button>
        </div> */}
    </Card>
  );
}
