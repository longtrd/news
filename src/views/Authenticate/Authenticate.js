import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { LoginForm } from "./components";

const Authenticate = () => {
  const history = useHistory();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    document.title = "Login";
  });

  const handleSubmitLoginForm = (e) => {
    setIsLoading(true);
    setTimeout(() => {
      if (e.username === "user" && e.password === "123456") {
        localStorage.setItem("verified", true);
        history.push("/");
      } else {
        setError("Invalid login");
      }
      setIsLoading(false);
    }, 1000);
  };

  const response = (e) => {
    if (e.accessToken) {
      localStorage.setItem("verified", true);
      history.push("/");
    } else {
      setError("Invalid login");
    }
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
        response={(e) => response(e)}
        isLoading={isLoading}
        error={error}
      />
    </div>
  );
};

export default Authenticate;
