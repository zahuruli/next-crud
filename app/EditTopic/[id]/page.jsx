"use client";
import Layout from "@/components/Layout/Layout";
import React, { useEffect, useState } from "react";
import { Button, Form, Input } from "antd";
import axios from "axios";
import Toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const Page = ({ params }) => {
  const router = useRouter();
  const { id } = params;
  const [form1] = Form.useForm();

  //get single data:
  const getAllData = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:3000/api/topics/${id}`
      );

      if (data.success) {
        form1.setFieldsValue({
          title: data.topics.title,
          desc: data.topics.desc,
        });
        console.log(data.topics);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getAllData();
  }, []);

  //form controll

  //handle form
  const onFinish = async (values) => {
    try {
      const { data } = await axios.put(
        `http://localhost:3000/api/topics/${id}`,
        { ...values },
        {
          cache: "no-store",
        }
      );
      if (data.success) {
        form1.resetFields();
        Toast.success(data.message);
        router.push("/");
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
    <>
      <Layout>
        <div className="w-2/4  mx-auto mt-20 p-10  border-4">
          <Form
            name="basic"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            form={form1}
            autoComplete="off"
          >
            <Form.Item
              name="title"
              label="Title"
              rules={[
                {
                  required: true,
                  message: "",
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
              <Button htmlType="submit">Update Topics</Button>
            </Form.Item>
          </Form>
        </div>
      </Layout>
    </>
  );
};

export default Page;
