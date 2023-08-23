import { useState } from "react";

import { useAPI } from "../store/Getshop";
import { getSessionToken } from "@shopify/app-bridge-utils";
import { getBridge } from "../store/GetAppBridge";
import { Button, Modal, Spin, Table, message } from "antd";
import { CheckCircleTwoTone, CloseCircleOutlined, EyeOutlined } from '@ant-design/icons';
import axios from 'axios'

const updateProductsWebhook = () => {
  const {getShop} = useAPI();
  const {app} = getBridge();
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [status, setStatus] = useState([]);
  const [view, setView] = useState([]);
  const [open, setOpen] = useState(false);
  const [clickedIndex, setClickedIndex] = useState("");

  const columns = [
    {
      title: 'Sr. No.',
      dataIndex: 'Sr. no',
      key: 'sr number',
      align : "center",
      render : (_, _id, i) => (
         <span key={_id}>{i + 1}</span>
      )
    },
    {
      title: 'ID',
      dataIndex: '_id',
      key: '_id',
      align : "center",
    },
    {
      title: 'shop',
      dataIndex: 'shop',
      key: 'shop',
      align : "center",
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      align : "center",
      render : (_, {shop, accessToken, webhook_status}) => {
        return(
        <Button key={shop} type="primary" onClick={()=> handleUpdateWebhook(shop , accessToken)} disabled={webhook_status == true ? true : false} loading={clickedIndex == shop ? true : false}>Update Webhooks</Button>
      )}
    },
    {
      title: 'Status',
      dataIndex: 'webhook_status',
      key: 'webhook_status',
      align : "center",
      render : (_, {webhook_status}, i) => (
         <span key={i}>{webhook_status == true ? <CheckCircleTwoTone twoToneColor="#52c41a" /> :  <CloseCircleOutlined twoToneColor="#e1137b" /> }</span>
      )
    },
    {
      title: 'View',
      dataIndex: 'webhook_status',
      key: 'webhook_status',
      align : "center",
      render : (_, {shop, accessToken}, i) => (
        <EyeOutlined onClick={()=> handleView(shop, accessToken)}/>
      )
    },
  ];


  console.log(data, "dataaaa", view)

  const handleView = async(shop, token) => {
     setOpen(true)
     const sessionToken = await getSessionToken(app);
     await axios.post("/api/show_webhooks", {shop, token}, {headers : { Authorization: `Bearer ${sessionToken}`}}).then((response)=> {
        setView(response.data.data)
        console.log(response.data.data)
     }).catch((err)=> {
       message.error("Something went wrong!!! Please try again");
     })
  }

   const handleLoadData = async() => {
    setLoader(true);
    const sessionToken = await getSessionToken(app);
    await axios.post("/api/getWebhooks", {}, {headers : { Authorization: `Bearer ${sessionToken}`}}).then((response)=> {
       message.success("Fetched Successfully!!!");
       setData(response.data.data)
       const status_data = [];
       response.data.data.forEach((data)=> {
         status_data.push(data.webhook_status)
       })
       setStatus(status_data)
       setLoader(false);
    }).catch((err)=> {
      setLoader(false);
      message.error("Something went wrong!!! Please try again");
    })
   }


   const handleUpdateWebhook = async(shop , token) => {
     setClickedIndex(shop);
      const sessionToken = await getSessionToken(app);
      await axios.post("/api/updateWebhooks", {shop, token}, {headers : { Authorization: `Bearer ${sessionToken}`}}).then((response)=> {
        message.success(response.data.msg);
        console.log(response.data, "status update");
        setLoader(false);
        setClickedIndex("")
        setData(response.data.fetchData)
     }).catch((err)=> {
       setLoader(false);
       setClickedIndex("")
       message.error("Either Store is closed or Something went wrong!!! Please try again");
     })  
   }

    return(
        <>
          <div style={{marginRight : "10px"}}>
            <Button onClick={handleLoadData}>Load Shop Data</Button> 
          </div>
          <br/>
          <Spin spinning = {loader} tip= "loading...">
             <Table dataSource={data} columns={columns} pagination={{
                position : ["bottomCenter"],
                pageSize : 100
             }}/>
          </Spin>
          <Modal
             open = {open}
             onCancel={()=>setOpen(false)}
             title="Webhook Details"
             footer={null}
           >
            <Spin spinning={view.length ? false : true}>
              {view.map((data, i)=> {
                  return (
                    <div key={i} style={
                        i % 2 ? {backgroundColor : "#ffffff"} : {backgroundColor : "#f1f1f1"}
                    }>
                        <li> Address : {data.address}</li>
                        <li> topic : {data.topic}</li>
                    </div>
                  )
              })} 
            </Spin>
          </Modal>
        </>
    )
}


export default updateProductsWebhook;