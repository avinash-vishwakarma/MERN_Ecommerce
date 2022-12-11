import React from "react";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { useState } from "react";
import ReactDOM from "react-dom";

const NavBar = () => {
  const [showNav, setShowNav] = useState(false);

  return (
    <>
      <div className="header-area" id="headerArea">
        <div className="container">
          <div className="header-content header-style-five position-relative d-flex align-items-center justify-content-between">
            <div className="logo-wrapper">
              <Link>
                <img src="img/core-img/logo.png" alt="" />
              </Link>
            </div>

            <div
              className="navbar--toggler"
              onClick={setShowNav.bind(null, (old) => !old)}
            >
              <span className="d-block"></span>
              <span className="d-block"></span>
              <span className="d-block"></span>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`offcanvas offcanvas-start ${showNav ? "show" : "hiding"}`}
      >
        <button
          className="btn-close btn-close-white text-reset"
          type="button"
        ></button>

        <div className="offcanvas-body p-0">
          <div className="sidenav-wrapper">
            <div className="sidenav-profile bg-gradient">
              <div className="sidenav-style1"></div>

              <div className="user-profile">
                <img src="img/bg-img/2.jpg" alt="" />
              </div>

              <div className="user-info">
                <h6 className="user-name mb-0">Affan Islam</h6>
                <span>CEO, Designing World</span>
              </div>
            </div>

            <ul className="sidenav-nav ps-0">
              <li>
                <Link>
                  <i className="bi bi-house-door"></i> Home
                </Link>
              </li>
              <li>
                <Link to="/login">
                  <Icon icon="material-symbols:login" /> Login / Singup
                </Link>
              </li>
              <li>
                <Link>
                  <i className="bi bi-collection"></i> Pages
                  <span className="badge bg-success rounded-pill ms-2">
                    100+
                  </span>
                </Link>
              </li>
              <li>
                <Link>
                  <i className="bi bi-cart-check"></i> Shop
                </Link>
                <ul>
                  <li>
                    <Link> Shop Grid</Link>
                  </li>
                  <li>
                    <Link> Shop List</Link>
                  </li>
                  <li>
                    <Link> Shop Details</Link>
                  </li>
                  <li>
                    <Link> Cart</Link>
                  </li>
                  <li>
                    <Link> Checkout</Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link>
                  <i className="bi bi-gear"></i> Settings
                </Link>
              </li>
              <li>
                <div className="night-mode-nav">
                  <i className="bi bi-moon"></i> Night Mode
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input form-check-success"
                      id="darkSwitch"
                      type="checkbox"
                    />
                  </div>
                </div>
              </li>
              <li>
                <Link>
                  <i className="bi bi-box-arrow-right"></i> Logout
                </Link>
              </li>
            </ul>

            <div className="social-info-wrap">
              <Link>
                <i className="bi bi-facebook"></i>
              </Link>
              <Link>
                <i className="bi bi-twitter"></i>
              </Link>
              <Link>
                <i className="bi bi-linkedin"></i>
              </Link>
            </div>

            <div className="copyright-info">
              <p>
                <span id="copyrightYear"></span>
                &copy; Made by <Link>Designing World</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      {showNav &&
        ReactDOM.createPortal(
          <div
            className="offcanvas-backdrop fade show"
            onClick={setShowNav.bind(null, false)}
          ></div>,
          document.getElementById("backDrop")
        )}
    </>
  );
};

export default NavBar;
