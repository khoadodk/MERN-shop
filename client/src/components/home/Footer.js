import React from "react";
import {
  FacebookOutlined,
  InstagramOutlined,
  TwitterOutlined,
} from "@ant-design/icons";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__logo col-md-3 column">
        <h4 style={{ color: "white" }}>WOODECOR</h4>
        <p>(098) 123-4567</p>
        <p>sale@woodecor.com</p>
      </div>
      <div className="footer__social_media col-md-3 column">
        <h4 style={{ color: "white" }}>Follow Us</h4>
        <div className="pt-2">
          <FacebookOutlined style={{ height: "16px" }} />
          <InstagramOutlined style={{ height: "16px", margin: "0 20px" }} />
          <TwitterOutlined style={{ height: "16px" }} />
        </div>
      </div>
      <div className="footer__policy col-md-3 column">
        <p>Return</p>
        <p>Privacy Policy</p>
        <p>Term of Use</p>
      </div>
      <div className="footer__copy-right col-md-3 column">
        <p>Copyright @ 2021 Khoa Do</p>
        <p>All Rights Reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
