import React, { useState } from "react";
import { Modal, Form, Upload, message, Input } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";

import { save } from "../../../services/localStorage";

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};

const beforeUpload = (file) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};

const Profile = ({ visible, onCancel, user }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isloadImg, setIsLoadImg] = useState(false);
  const [form] = Form.useForm();
  const [image, setImage] = useState(user.avatar);

  const onOk = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      form
        .validateFields()
        .then((values) => {
          form.resetFields();
          console.log(values);
          save("verified", {
            ...user,
            avatar: image,
            email: values.email,
            phone: values.phone,
            favorite: values.favorite,
          });
          onCancel();
        })
        .catch((info) => {
          console.log("Validate Failed:", info);
        });
    }, 1000);
  };

  const handleChangeImg = (info) => {
    if (info.file.status === "uploading") {
      setIsLoadImg(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (imageUrl) => {
        setImage(imageUrl);
        setIsLoadImg(false);
      });
    }
  };

  const uploadButton = (
    <div>
      {isloadImg ? <LoadingOutlined /> : <PlusOutlined />}
      <div className="ant-upload-text">Upload</div>
    </div>
  );

  return (
    <Modal
      title={user.username}
      visible={visible}
      onCancel={onCancel}
      okText="Save"
      confirmLoading={isLoading}
      onOk={onOk}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{
          email: user.email,
          phone: user.phone,
          favorite: user.favorite,
        }}
      >
        <div style={{ display: "flex" }}>
          <Form.Item
            name="avatar"
            valuePropName="handleChangeImg"
            style={{ display: "inline" }}
          >
            <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              beforeUpload={beforeUpload}
              onChange={handleChangeImg}
            >
              {image ? (
                <img src={image} alt="avatar" style={{ width: "100%" }} />
              ) : (
                uploadButton
              )}
            </Upload>
          </Form.Item>
          <div>
            <Form.Item
              name="email"
              label="E-mail"
              rules={[
                {
                  type: "email",
                  message: "The input is not valid E-mail!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item name="phone" label="Phone Number">
              <Input initialvalues={user.phone} />
            </Form.Item>
          </div>
        </div>
        <Form.Item name="favorite" label="Favorite">
          <Input.TextArea initialvalues={user.favorite} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default Profile;
