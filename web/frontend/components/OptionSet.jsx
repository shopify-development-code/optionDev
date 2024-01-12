import React from "react";
import { Navigation } from "@shopify/polaris";
import {
  TextBlockMajor,
  TextMajor,
  DropdownMinor,
  TimelineAttachmentMajor,
  ChecklistMajor,
  ImagesMajor,
  ColorsMajor,
  TypeMajor,
  CircleTickMajor,
  HashtagMajor,
} from "@shopify/polaris-icons";

function optionSet(props) {
  function updateClientData(e) {
    props.saveOptionSetData(e);
    // props.changeKey();
  }

  const Arr = [
    {
      title: "Input",
      items: [
        {
          label: "Text area",
          icon: TextBlockMajor,
          onClick: () => {
            const data = "Text Area";
            updateClientData(data);
          },
        },
        {
          label: "Text",
          icon: TextMajor,
          onClick: () => {
            const data = "Text";
            updateClientData(data);
          },
        },
        {
          label: "Number",
          icon: HashtagMajor,
          onClick: () => {
            const data = "Number";
            updateClientData(data);
          },
        },
        // {
        //     label: 'Datetime',
        //     icon: CalendarMinor,
        //     onClick:() => {
        //         const data = "Datetime"
        //         updateClientData(data)
        //     },
        // },
        {
          label: "File",
          icon: TimelineAttachmentMajor,
          onClick: () => {
            const data = "File";
            updateClientData(data);
          },
        },
      ],
    },
    {
      title: "Select",
      items: [
        {
          label: "Dropdown",
          icon: DropdownMinor,
          onClick: () => {
            const data = "Dropdown";
            updateClientData(data);
          },
        },
        {
          label: "Checkbox",
          icon: ChecklistMajor,
          onClick: () => {
            const data = "Checkbox";
            updateClientData(data);
          },
        },
        {
          label: "Radio buttons",
          icon: CircleTickMajor,
          onClick: () => {
            const data = "Radio Buttons";
            updateClientData(data);
          },
        },
      ],
    },
    {
      title: "Swatches",
      items: [
        {
          label: "Image swatches",
          icon: ImagesMajor,
          onClick: () => {
            const data = "Image Swatches";
            updateClientData(data);
          },
        },
        {
          label: "Color swatches",
          icon: ColorsMajor,
          onClick: () => {
            const data = "Color Swatches";
            updateClientData(data);
          },
        },
      ],
    },
    {
      title: "Meta fields",
      items: [
        {
          label: "Paragraph",
          icon: TypeMajor,
          onClick: () => {
            const data = "Paragraph";
            updateClientData(data);
          },
        },
      ],
    },
  ];

  const navigationMarkup = (
    <Navigation location="/">
      {Arr.map((elem, index) => {
        return (
          <div className="allelements-category">
            <Navigation.Section
              separator
              title={elem.title}
              items={elem.items}
              key={index}
            />
          </div>
        );
      })}
    </Navigation>
  );

  return <div className="tabdata all-elements">{navigationMarkup}</div>;
}

export default optionSet;
