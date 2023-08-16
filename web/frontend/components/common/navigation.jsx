import React, { useCallback } from "react";
import {
  Navigation,
  Icon,
} from "@shopify/polaris";
import {
  FollowUpEmailMajor,
  HomeMajor,
  OrdersMajor,
  SectionMajor,
  CircleInformationMajor,
  SettingsMinor,
} from "@shopify/polaris-icons";
import { useLocation } from "react-router-dom";
import { useNavigate } from "@shopify/app-bridge-react";
export default function NavigationHeader(props) {
  const navigate = useNavigate();
  const router = useLocation();

  const sideNav = [
    { name: "Dashboard", icon: HomeMajor, url: "/" },
    { name: "Option Set", icon: OrdersMajor, url: "/option-sets" },
    { name: "Settings", icon: SettingsMinor, url: "/settings" },
  ];

  const subNav = [
    { name: "Widget Position", icon: SectionMajor, url: "/widget-position" },
    { name: "Contact Us", icon: FollowUpEmailMajor, url: "/contactus" },
    { name: "Instruction", icon: CircleInformationMajor, url: "/instructions" },
  ];

  const subNav2 = [
    { name: "Contact Us", icon: FollowUpEmailMajor, url: "/contactUs" },
    { name: "Instruction", icon: CircleInformationMajor, url: "/instructions" },
  ];

  const handleClick = useCallback(() => {
    navigate("/");
  });
  
  return (
    <div className="sd-navigation">
      <Navigation location="/">
        <div className="sd-navigation1">
          <ul className="Polaris-Navigation__Section Polaris-Navigation__Section--withSeparator">
            <li className="Polaris-Navigation__SectionHeading">
              <span className="Polaris-Navigation__Text">Main Menu</span>
            </li>
            {sideNav.map((sideNav, index) => {
              return (
                <li
                  key={index}
                  className={
                    router.pathname != sideNav.url
                      ? "Polaris-Navigation__ListItem"
                      : "Polaris-Navigation__ListItem active"
                  }
                  onClick={() => {
                    navigate(sideNav.url);
                  }}
                >
                  <div className="Polaris-Navigation__Icon">
                    <Icon source={sideNav.icon} color="base" />
                  </div>
                  <span className="Polaris-Navigation__Text">
                    {sideNav.name}
                  </span>
                  {/* </Link> */}
                </li>
              );
            })}
          </ul>
          <ul className="Polaris-Navigation__Section Polaris-Navigation__Section--withSeparator">
            <li className="Polaris-Navigation__SectionHeading">
              <span className="Polaris-Navigation__Text">Help & FAQ</span>
            </li>

            {props.data.theme_type == "vintage"
              ? subNav2.map((subNav, index) => {
                  return (
                    <li
                      key={index}
                      className={
                        router.pathname != subNav.url
                          ? "Polaris-Navigation__ListItem"
                          : "Polaris-Navigation__ListItem active"
                      }
                      onClick={() => {
                        navigate(subNav.url);
                      }}
                    >
                      <div className="Polaris-Navigation__Icon">
                        <Icon source={subNav.icon} color="base" />
                      </div>
                      <span className="Polaris-Navigation__Text">
                        {subNav.name}
                      </span>
                      {/* </Link> */}
                    </li>
                  );
                })
              : subNav.map((subNav, index) => {
                  return (
                    <li
                      key={index}
                      className={
                        router.pathname != subNav.url
                          ? "Polaris-Navigation__ListItem"
                          : "Polaris-Navigation__ListItem active"
                      }
                      onClick={() => {
                        navigate(subNav.url);
                      }}
                    >
                      <div className="Polaris-Navigation__Icon">
                        <Icon source={subNav.icon} color="base" />
                      </div>
                      <span className="Polaris-Navigation__Text">
                        {subNav.name}
                      </span>
                    </li>
                  );
                })}
          </ul>
        </div>
      </Navigation>
    </div>
  );
}
