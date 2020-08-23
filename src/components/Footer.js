import React from "react";
import { Layout } from "antd";
const Footer = () => {
  return (
    <Layout.Footer style={{ textAlign: "center" }}>
      <ul className="Footer_list">
        <li>longtran071098@gmail.com</li>
        <li>•</li>
        <li>
          <a
            href="https://newsapi.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            API Documentation
          </a>
        </li>
      </ul>
    </Layout.Footer>
  );
};

export default Footer;
