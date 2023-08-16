import { useState } from "react";
import { Button, Card, Form, Input, notification } from "antd";
import { useAPI } from "../store/Getshop";
import { DynamicApi } from "../components/common/DynamicAxios";
import { getBridge } from "../store/GetAppBridge";

const ContactUs = () => {
  const { app } = getBridge();
  const [form] = Form.useForm();
  const { getShop } = useAPI();
  const [sending, setSending] = useState(false);
  const [sendBtn, setSendBtn] = useState("Send Mail");


  const handleSubmit = async (value) => {
    setSending(true);
    setSendBtn("Sending");
    const data = {
      shop: getShop,
      uname: value.user.name,
      umail: value.user.email,
      message: value.user.message,
      storePassword: value.user.storePassword,
    };
    let response = await DynamicApi("/api/contact", data, "POST", app);
    console.log("response", response);
    if (response) {
      setSending(false);
      setSendBtn("Send Mail");
      notification.success({
        message: response.data.msg,
        duration: 2,
        placement: "bottom",
      });
      form.resetFields();
    } else {
      setSending(false);
      notification.error({
        message: "Mail not sent! Please try again",
        duration: 2,
        placement: "bottom",
      });
    }

    console.log("value", value);
  };
  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "${label} is not a valid email!",
    },
  };
  return (
    <>
      <Card
        title="For any query mail us"
        headStyle={{ textAlign: "center" }}
        className="contact-card"
      >
        <Form
          name="nest-messages"
          onFinish={handleSubmit}
          validateMessages={validateMessages}
          layout="vertical"
          className="contact-form"
          form={form}
        >
          <Form.Item
            name={["user", "name"]}
            label="Name"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input type="text" placeholder="Enter Your Name Here" />
          </Form.Item>
          <Form.Item
            name={["user", "email"]}
            label="Email"
            rules={[
              {
                type: "email",
                required: true,
              },
            ]}
          >
            <Input type="email" placeholder="Enter Your Email Address" />
          </Form.Item>
          <Form.Item
            name={["user", "store"]}
            initialValue={getShop}
            label="Store URL"
          >
            <Input type="text" disabled />
          </Form.Item>
          <Form.Item
            name={["user", "storePassword"]}
            label="Store Password"
            extra="Please enter your store front password if your store is password protected"
            requiredMark="optional"
          >
            <Input type="text" />
          </Form.Item>
          <Form.Item
            name={["user", "message"]}
            label="Message"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input.TextArea placeholder="Enter Your Message Here" />
          </Form.Item>
          <Form.Item className="contact-btn-submit">
            <Button type="primary" htmlType="submit" loading={sending}>
              {sendBtn}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </>
  );
};
export default ContactUs;
