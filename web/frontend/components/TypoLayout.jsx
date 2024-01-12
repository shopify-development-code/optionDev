import React from "react";
import { TextField } from "@shopify/polaris";
export default function TypoLayout(props) {

  const handleChange = (value, id) => {
    props.handleFunc(id, value);
  };

  return (
    <div className="typo-layout">
      <div className="sd-ado-layout-item input_font">
        {/* <Checkbox
                    label="Custom font family"
                    // checked={checked}
                    // onChange={handleChange}
                /> */}
        <TextField
          label="Input font size"
          id="input_font_size"
          type="number"
          value={props.data.input_font_size}
          onChange={handleChange}
        />
      </div>
      <div className="sd-ado-layout-item helptext_font">
        {/* <Checkbox
                    label="Custom font family"
                    // checked={checked}
                    // onChange={handleChange}
                /> */}
        <TextField
          label="Helptext font size"
          id="help_font_size"
          type="number"
          value={props.data.help_font_size}
          onChange={handleChange}
        />
      </div>
      <div className="sd-ado-layout-item label_font">
        {/* <Checkbox
                    label="Custom font family"
                    // checked={checked}
                    // onChange={handleChange}
                /> */}
        <TextField
          label="Label font size"
          id="label_font_size"
          type="number"
          value={props.data.label_font_size}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}
