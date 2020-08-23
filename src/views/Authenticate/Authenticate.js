import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { message } from "antd";

import { LoginForm, Register } from "./components";
import { get, save } from "../../services/localStorage";

const Authenticate = () => {
  const history = useHistory();

  const [isLoading, setIsLoading] = useState(false);
  const [visibleRegister, setVisibleRegister] = useState(false);

  useEffect(() => {
    document.title = "Login";
  });

  const handleSubmitLoginForm = (e) => {
    setIsLoading(true);
    setTimeout(() => {
      try {
        const users = get("users");
        const i = get("users").findIndex((user) => {
          return user.username === e.username;
        });
        if (users[i]) {
          if (users[i].password === e.password) {
            save("verified", { ...users[i], id: i });
            history.push("/");
          } else {
            message.error("Incorrect password");
          }
        } else {
          message.error("This user was not found");
        }
      } catch (error) {
        message.error("No account is created");
      }

      setIsLoading(false);
    }, 1000);
  };

  return (
    <div
      style={{
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        height: "100vh",
      }}
    >
      <LoginForm
        handleSubmitLoginForm={(e) => handleSubmitLoginForm(e)}
        isLoading={isLoading}
        setVisible={() => setVisibleRegister(true)}
      />
      <Register
        visible={visibleRegister}
        onCancel={() => setVisibleRegister(false)}
      />
    </div>
  );
};

export default Authenticate;
