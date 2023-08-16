import React from "react";
import {
  LegacyCard,
  Text,
  List,
  Tabs,
} from "@shopify/polaris";
import { useState, useCallback } from "react";
import optionSetimg from "../assets/images/optionSet.png";

const Instructions = () => {
  const [selected, setSelected] = useState(0);
  const [Instructions, setInstructions] = useState(
    <div>
      <List type="number">
        <List.Item>
          From your Shopify admin, go to{" "}
          <Text variation="strong">Online Store &#62; Themes.</Text>{" "}
        </List.Item>
        <List.Item>
          Find the theme that you want to edit, and then click{" "}
          <Text variation="strong"> Customize.</Text>
        </List.Item>
        <List.Item>
          Click the <Text variation="strong">App embeds tab.</Text>
        </List.Item>

        <List.Item>
          Click the Select the app embed that you want to activate or click the
          Search bar and enter a{" "}
          <Text variation="strong">search </Text> term to search
          through your installed apps.
        </List.Item>
        <List.Item>
          Click the Beside the app embed that you want to activate,{" "}
          <Text variation="strong">
            {" "}
            click the toggle to activate it
          </Text>
        </List.Item>
        <List.Item>
          And <Text variation="strong"> click the Save button </Text>{" "}
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
              <Text variation="strong">
                Online Store &#62; Themes.
              </Text>{" "}
            </List.Item>
            <List.Item>
              Find the theme that you want to edit, and then click{" "}
              <Text variation="strong"> Customize.</Text>
            </List.Item>
            <List.Item>
              Click the{" "}
              <Text variation="strong">App embeds tab.</Text>
            </List.Item>

            <List.Item>
              Click the Select the app embed that you want to activate or click
              the Search bar and enter a{" "}
              <Text variation="strong">search </Text> term to search
              through your installed apps.
            </List.Item>
            <List.Item>
              Click the Beside the app embed that you want to activate,{" "}
              <Text variation="strong">
                {" "}
                click the toggle to activate it
              </Text>
            </List.Item>
            <List.Item>
              And{" "}
              <Text variation="strong"> click the Save button </Text>{" "}
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
                <Text variation="strong">option set</Text> menu.
              </List.Item>
              <List.Item>
                Click the
                <Text variation="strong">
                  {" "}
                  Create new option set{" "}
                </Text>
                Button.
              </List.Item>
              <List.Item>
                Enter the name in the{" "}
                <Text variation="strong">optionset name field.</Text>
              </List.Item>

              <List.Item>
                click the
                <Text variation="strong"> Add Element Button</Text> to
                add element to your OptionSet.{" "}
              </List.Item>
              <List.Item>
                Select the <Text variation="strong"> Element.</Text>
              </List.Item>
              <List.Item>
                Add and edit{" "}
                <Text variation="strong">
                  {" "}
                  Setting and Appearence{" "}
                </Text>{" "}
                according to you.{" "}
              </List.Item>
              <List.Item>
                Go to <Text variation="strong"> Products.</Text>
              </List.Item>
              <List.Item>
                Select <Text variation="strong"> Product.</Text>
              </List.Item>
              <List.Item>
                Go to <Text variation="strong">Layout.</Text>
              </List.Item>
              <List.Item>
                Enable <Text variation="strong">Global layout</Text>{" "}
                and adjust the Layout{" "}
              </List.Item>
              <List.Item>
                click the{" "}
                <Text variation="strong">Save Button {""}</Text>
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
              <Text variation="strong">
                Clear Duplicate Products:{" "}
              </Text>{" "}
              Whenever customers purchased a product that have applied options
              then app create a draft product (makes many copies of products) in
              Shopify Admin products. To avoid this user have to clear it time
              to time. This will not affect anything in the store.
            </List.Item>
            <List.Item>
              <Text variation="strong">
                {" "}
                Product page translation:{" "}
              </Text>
              There user can add some labels and addon.
            </List.Item>
            <List.Item>
              <Text variation="strong">Cart page: </Text>
              There user can change label on cart page.
            </List.Item>

            <List.Item>
              <Text variation="strong">Option set widget: </Text>
              There user can choose the position on the OptionSet.
            </List.Item>
            <List.Item>
              <Text variation="strong">Allowed extensions: </Text>
              There user can choose the format of the file.
            </List.Item>
            <List.Item>
              <Text variation="strong">
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
      id: "sd-dashboard",
      content: "Dashboard",
    },
    {
      id: "sd-optionSet",
      content: "How to Create Option Set?",
    },
    {
      id: "sd-setting",
      content: "Settings",
    },
  ];

return (
    <LegacyCard>
      <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange}>
        <LegacyCard.Section title={tabs[selected].content}>
          <p>{Instructions}</p>
        </LegacyCard.Section>
      </Tabs>
    </LegacyCard>
  );
};

export default Instructions;
