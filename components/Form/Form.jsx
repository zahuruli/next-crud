"use client";
import { Button, Form, Input } from "antd";
import axios from "axios";
import Toast from "react-hot-toast";

const FormComponent = ({ handleOk, getAllData }) => {
  const [form1] = Form.useForm();
  //handle form
  const onFinish = async (values) => {
    try {
      const { data } = await axios.post(
        `api/topics`,
        { ...values },
        {
          cache: "no-store",
        }
      );
      if (data.success) {
        form1.resetFields();
        Toast.success(data.message);
        getAllData();
        handleOk();
      } else {
        console.log(data.message);
        Toast.error(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Form
      name="basic"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      form={form1}
      autoComplete="off"
    >
      <Form.Item
        label="Title"
        name="title"
        rules={[
          {
            required: true,
            message: "Please input your Title!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Description"
        name="desc"
        rules={[
          {
            required: true,
            message: "Please input your Description!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button htmlType="submit">Add Topics</Button>
      </Form.Item>
    </Form>
  );
};
export default FormComponent;
