import React from "react";
import {
    DollarCircleOutlined,
    BarsOutlined,
    FullscreenOutlined,
    QuestionCircleOutlined,
    HomeOutlined,
  } from "@ant-design/icons";
  import { Layout, Menu } from "antd";
  import { Outlet, Link } from "react-router-dom";
  const { Content, Sider } = Layout;
  import { Button, Image } from "@shopify/polaris";
  import { MobileBackArrowMajor } from "@shopify/polaris-icons";
  import { useNavigate } from "react-router-dom";
  
  function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label,
    };
  }
  
  const items = [
    getItem(<Link to="/">Dashboard</Link>, "0", <HomeOutlined />),
    getItem(<Link to="/createchart/table">SizeChart</Link>, "1"),
    getItem(<Link to="/plans">Plans</Link>, "2"),
    getItem(<Link to="/instructions">Instructions</Link>, "3"),
    getItem(<Link to="/contactus">Help</Link>, "4"),
  ];
  
  const Sidebar = () => {
    const navigate = useNavigate();
  
    const HandlerBack = () => {
      navigate("/sizechart");
    };
    const HandlerSave = () => {
      navigate("/sizechart");
    };
    return (
      <>
        <div className="btn">
          <div className="btnLeft">
            <Button onClick={HandlerBack} icon={MobileBackArrowMajor}>
              {" "}
              Back to Chart Lists
            </Button>
          </div>
          <div className="btnRight">
            <Button onClick={HandlerSave} primary={true}>
              Save
            </Button>
          </div>
        </div>
        <Layout>
          <Sider collapsed="true" className="collapsedSidebar">
            <div className="pandaLogo"></div>
            <Menu
              theme="dark"
              defaultSelectedKeys={["1"]}
              mode="inline"
              items={items}
            />
          </Sider>
          <Layout className="site-layout">
            <Content>
              <div className="site-layout-background">
                <Outlet />
              </div>
            </Content>
          </Layout>
        </Layout>
      </>
    );
  };
  
  export default Sidebar;
  