import React, { useCallback, useState } from "react";
import {
  Popover,
  ActionList,
  Button,
  Card,
  OptionList,
} from "@shopify/polaris";

export default function PopoverWithActionListExample(props) {
  const [popoverActive, setPopoverActive] = useState(false);
  const togglePopoverActive = useCallback(
    () => setPopoverActive((popoverActive) => !popoverActive),
    []
  );
  const activator = (
    <Button onClick={togglePopoverActive} disclosure>
      Select Type
    </Button>
  );
  const [selected, setSelected] = useState(props.extension);

  return (
    <div
      style={{ marginTop: "25px", textAlign: "initial", marginBottom: "10px" }}
    >
      <Popover
        active={popoverActive}
        activator={activator}
        onClose={togglePopoverActive}
      >
        <Card>
          <OptionList
            title="Select File Type"
            onChange={(value) => {
              setSelected(value);
              props.saveFileData(value, "file_extension");
            }}
            options={[
              { value: "image/png", label: "PNG" },
              { value: "image/jpg", label: "JPG" },
              { value: "image/jpeg", label: "JPEG" },
            ]}
            selected={selected}
            allowMultiple
          />
        </Card>
      </Popover>
    </div>
  );
}
