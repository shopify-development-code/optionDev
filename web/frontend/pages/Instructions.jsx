import React from "react";
import {
  Text,
  List,
} from "@shopify/polaris";
import { Card } from "antd";
import { useState, useCallback } from "react";
import optionSetimg from "../assets/images/optionSet.png";

const Instructions = () => {
  const [selected, setSelected] = useState(0);
  const [Instructions, setInstructions] = useState(
    <div>
      <List type="number">
        <List.Item>
          From your Shopify admin, go to{" "}
          <Text variant="bold" as="span">Online Store &#62; Themes.</Text>{" "}
        </List.Item>
        <List.Item>
          Find the theme that you want to edit, and then click{" "}
          <Text variant="bold" as="span"> Customize.</Text>
        </List.Item>
        <List.Item>
          Click the <Text variant="bold" as="span">App embeds tab.</Text>
        </List.Item>

        <List.Item>
          Click the Select the app embed that you want to activate or click the
          Search bar and enter a{" "}
          <Text variant="bold" as="span">search </Text> term to search
          through your installed apps.
        </List.Item>
        <List.Item>
          Click the Beside the app embed that you want to activate,{" "}
          <Text variant="bold" as="span">
            {" "}
            click the toggle to activate it
          </Text>
        </List.Item>
        <List.Item>
          And <Text variant="bold" as="span"> click the Save button </Text>{" "}
          to save it.
        </List.Item>
      </List>
    </div>
  );
  const handleTabChange = useCallback((selectedTabIndex) => {
    setSelected(selectedTabIndex);
    if (selectedTabIndex === 0) {
      setInstructions(
        <div>
          <List type="number">
            <List.Item>
              From your Shopify admin, go to{" "}
              <Text variant="bold" as="span">
                Online Store &#62; Themes.
              </Text>{" "}
            </List.Item>
            <List.Item>
              Find the theme that you want to edit, and then click{" "}
              <Text variant="bold" as="span"> Customize.</Text>
            </List.Item>
            <List.Item>
              Click the{" "}
              <Text variant="bold" as="span">App embeds tab.</Text>
            </List.Item>

            <List.Item>
              Click the Select the app embed that you want to activate or click
              the Search bar and enter a{" "}
              <Text variant="bold" as="span">search </Text> term to search
              through your installed apps.
            </List.Item>
            <List.Item>
              Click the Beside the app embed that you want to activate,{" "}
              <Text variant="bold" as="span">
                {" "}
                click the toggle to activate it
              </Text>
            </List.Item>
            <List.Item>
              And{" "}
              <Text variant="bold" as="span"> click the Save button </Text>{" "}
              to save it.
            </List.Item>
          </List>
        </div>
      );
    } else if (selectedTabIndex === 1) {
      setInstructions(
        <div>
          <div>
            <List type="number">
              <List.Item>
                Go to {""}
                <Text variant="bold" as="span">option set</Text> menu.
              </List.Item>
              <List.Item>
                Click the
                <Text variant="bold" as="span">
                  {" "}
                  Create new option set{" "}
                </Text>
                Button.
              </List.Item>
              <List.Item>
                Enter the name in the{" "}
                <Text variant="bold" as="span">optionset name field.</Text>
              </List.Item>

              <List.Item>
                click the
                <Text variant="bold" as="span"> Add Element Button</Text> to
                add element to your OptionSet.{" "}
              </List.Item>
              <List.Item>
                Select the <Text variant="bold" as="span"> Element.</Text>
              </List.Item>
              <List.Item>
                Add and edit{" "}
                <Text variant="bold" as="span">
                  {" "}
                  Setting and Appearence{" "}
                </Text>{" "}
                according to you.{" "}
              </List.Item>
              <List.Item>
                Go to <Text variant="bold" as="span"> Products.</Text>
              </List.Item>
              <List.Item>
                Select <Text variant="bold" as="span"> Product.</Text>
              </List.Item>
              <List.Item>
                Go to <Text variant="bold" as="span">Layout.</Text>
              </List.Item>
              <List.Item>
                Enable <Text variant="bold" as="span">Global layout</Text>{" "}
                and adjust the Layout{" "}
              </List.Item>
              <List.Item>
                click the{" "}
                <Text variant="bold" as="span">Save Button {""}</Text>
                to save the process.
              </List.Item>
            </List>
          </div>
          <div>
            <img
              style={{ width: "100%" }}
              src={optionSetimg}
              alt="option Set image"
            />
          </div>
        </div>
      );
    } else if (selectedTabIndex === 2) {
      setInstructions(
        <div>
          <List type="number">
            <List.Item>
              <Text variant="bold" as="span">
                Clear Duplicate Products:{" "}
              </Text>{" "}
              Whenever customers purchased a product that have applied options
              then app create a draft product (makes many copies of products) in
              Shopify Admin products. To avoid this user have to clear it time
              to time. This will not affect anything in the store.
            </List.Item>
            <List.Item>
              <Text variant="bold" as="span">
                {" "}
                Product page translation:{" "}
              </Text>
              There user can add some labels and addon.
            </List.Item>
            <List.Item>
              <Text variant="bold" as="span">Cart page: </Text>
              There user can change label on cart page.
            </List.Item>

            <List.Item>
              <Text variant="bold" as="span">Option set widget: </Text>
              There user can choose the position on the OptionSet.
            </List.Item>
            <List.Item>
              <Text variant="bold" as="span">Allowed extensions: </Text>
              There user can choose the format of the file.
            </List.Item>
            <List.Item>
              <Text variant="bold" as="span">
                Error messages translations{" "}
              </Text>{" "}
              There user can make his own error message.
            </List.Item>
          </List>
        </div>
      );
    }
  }, []);

  const tabs = [
    {
      key: 0,
      tab: "Dashboard",
    },
    {
      key: 1,
      tab: "How to Create Option Set?",
    },
    {
      key: 2,
      tab: "Settings",
    },
  ];

return (
    <Card tabIndex={selected} onTabChange={handleTabChange} tabList={tabs}>
       <p>{Instructions}</p>
    </Card>
  );
};

export default Instructions;
