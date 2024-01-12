import React, { useState } from "react";
import { Select } from "@shopify/polaris";

export default function GeneralLayout(props) {
  const [optionType, setOptionType] = useState([
    { label: "Classic", value: "classic" },
    { label: "Rounded border", value: "rounded_border" },
  ]);
  const [alignment, setAlignment] = useState([
    { label: "Left", value: "left" },
    { label: "Center", value: "center" },
    { label: "Right", value: "right" },
  ]);
  const handleSelectChange = (value, id) => {
    props.handleFunc(id, value);
  };
  return (
    <div className="general-layout">
      <div className="sd-ado-layout-item input_border">
      <Text>Type</Text>

        <Select
          // label="Type"
          id="border_type"
          options={optionType}
          onChange={handleSelectChange}
          value={props.data.border}
        />
      </div>
      <div className="sd-ado-layout-item alignment_type">
      <Text>Alignment</Text>

        <Select
          id="alignment_type"
          // label="Alignment"
          options={alignment}
          onChange={handleSelectChange}
          value={props.data.alignment}
        />
      </div>
    </div>
  );
}
