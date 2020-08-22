import React from "react";
import { Form, Input, Button } from "antd";
import { GoogleOutlined, FacebookOutlined } from "@ant-design/icons";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { GoogleLogin } from "react-google-login";

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
          <Button type="primary" htmlType="submit" loading={props.isLoading}>
            Login
          </Button>
        </Form.Item>
      </div>
      <div style={{ marginTop: -15, textAlign: "center", marginBottom: 15 }}>
        <span>Login with:</span>
        <FacebookLogin
          appId="575722943079735"
          fields="name,email,picture"
          render={(renderProps) => (
            <FacebookOutlined
              onClick={renderProps.onClick}
              className="login-icon"
            />
          )}
          callback={props.response}
        />
        <GoogleLogin
          clientId="758534345117-21ik6mvlb7lfg4saipb6345coao6100t.apps.googleusercontent.com"
          render={(renderProps) => (
            <GoogleOutlined
              className="login-icon"
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
            />
          )}
          buttonText="Login"
          onSuccess={props.response}
        />
      </div>
    </Form>
  );
};

export default LoginForm;
