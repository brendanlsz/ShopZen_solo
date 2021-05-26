import React from "react";
import "./styles.scss";
import logo from "./../../assets/logo-mono.png";
import { Link } from "react-router-dom";
import { auth } from "./../../firebase/utils";

const Header = (props) => {
  const { currentUser } = props;

  return (
    <div className="fixed-top main-nav">
      <nav className="navbar navbar-expand-lg navbar-dark py-1 ">
        <div className="container-fluid ">
          <div>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
              <li className="nav-item mx-2">
                <Link class="btn btn-sm btn-light mt-2 " to="/login">
                  Register/Login
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <header className="py-1 mb-4 border-bottom">
        <div className="container d-flex flex-wrap justify-content-start">
          <div className="navbar-brand col-xs">
            <Link to="/">
              <img id="logo" src={logo} alt="..." />
            </Link>
          </div>
          <form className="col-md my-auto">
            <input
              type="search"
              className="form-control"
              placeholder="Search..."
              aria-label="Search"
            />
          </form>
        </div>
      </header>
    </div>
    /* <header className="py-1 mb-4 border-bottom">
          <div className="container d-flex flex-wrap justify-content-start">
            <div className="navbar-brand col-xs">
              <Link to="/">
                <img id="logo" src={logo} alt="..." />
              </Link>
            </div>
            <form className="col-md my-auto">
              <input
                type="search"
                className="form-control"
                placeholder="Search..."
                aria-label="Search"
              />
            </form>
          </div>
        </header>
      </div>
      <header className="header">
        <div className="wrap">
          <div className="logo">
            <Link to="/">
              <img src={Logo} alt="ShopZen logo"></img>
            </Link>
          </div>

          <div className="callToActions">
            {currentUser && (
              <ul>
                <li>
                    <Link onClick={()=>auth.signOut()}>
                        Logout
                    </Link>
                </li>
              </ul>
            )}
            {!currentUser && (
              <ul>
                <li>
                  <Link to="/registration">Register</Link>
                </li>
                <li>
                  <Link to="/login">Login</Link>
                </li>
              </ul>
            )}
          </div>
        </div>
      </header> */
  );
};

Header.defaultProps = {
  currentUser: null,
};

export default Header;
