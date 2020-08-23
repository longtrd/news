import React from "react";
import { Form, Input, Button } from "antd";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

const LoginForm = (props) => {
  const onFinish = (values) => {
    props.handleSubmitLoginForm(values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      {...layout}
      name="basic"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      className="login-form"
    >
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <img className="logo" src={require("../img/logo-mini.jpg")} alt="" />
      </div>

      <Form.Item
        label="Username"
        name="username"
        rules={[
          {
            required: true,
            message: "Please input your username!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>
      {props.error && (
        <p
          style={{ color: "red", fontWeight: "bold", margin: "-10.91px 103px" }}
        >
          {props.error}
        </p>
      )}
      <div style={{ textAlign: "right" }}>
        <Form.Item {...tailLayout}>
          <Button
            style={{ marginRight: 5 }}
            type="outline"
            onClick={props.setVisible}
          >
            Register
          </Button>
          <Button type="primary" htmlType="submit" loading={props.isLoading}>
            Login
          </Button>
        </Form.Item>
      </div>
    </Form>
  );
};

export default LoginForm;
