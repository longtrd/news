import React, { useState } from "react";
import { Modal, Form, Input } from "antd";

import { get, save } from "../../../services/localStorage";

const Register = ({ visible, onCancel }) => {
  const [form] = Form.useForm();

  const [isLoading, setIsLoading] = useState(false);

  const onOk = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      form
        .validateFields()
        .then((values) => {
          form.resetFields();
          console.log(values);
          let users = get("users");

          if (users === undefined) {
            save("users", [values]);
          } else {
            save("users", [...users, values]);
          }

          onCancel();
        })
        .catch((info) => {
          console.log("Validate Failed:", info);
        });
    }, 1000);
  };

  return (
    <Modal
      title="Register"
      visible={visible}
      onCancel={onCancel}
      confirmLoading={isLoading}
      onOk={onOk}
      okText="Register"
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{
          modifier: "public",
        }}
      >
        <Form.Item
          name="username"
          label="Username"
          rules={[
            {
              required: true,
              message: "Please input the title of collection!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  "The two passwords that you entered do not match!"
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default Register;
