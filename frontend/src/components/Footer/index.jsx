import React from "react";

const Footer = () => {
  return (
    <div className="footer-nav-area" id="footerNav">
      <div className="container px-0">
        <div className="footer-nav position-relative">
          <ul className="h-100 d-flex align-items-center justify-content-between ps-0">
            <li className="active">
              <a href="page-home.html">
                <i className="bi bi-house"></i>
                <span>Home</span>
              </a>
            </li>

            <li>
              <a href="pages.html">
                <i className="bi bi-collection"></i>
                <span>Pages</span>
              </a>
            </li>

            <li>
              <a href="elements.html">
                <i className="bi bi-folder2-open"></i>
                <span>Elements</span>
              </a>
            </li>

            <li>
              <a href="page-chat-users.html">
                <i className="bi bi-chat-dots"></i>
                <span>Chat</span>
              </a>
            </li>

            <li>
              <a href="settings.html">
                <i className="bi bi-gear"></i>
                <span>Settings</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
