import React from "react";
import { Link } from "react-router-dom";
import ShopMen from "./../../assets/shopMens.jpg";
import ShopWomen from "./../../assets/shopWomens.jpg";
import "./styles.scss";

const Directory = (props) => {
  return (
    <div className="directory">
      <div className="wrap">
        <div
          className="item"
          style={{
            backgroundImage: `url(${ShopWomen})`,
          }}
        >
          <Link className="btn btn-lg" to="/search/others">
            Shop Others
          </Link>
        </div>
        <div
          className="item"
          style={{
            backgroundImage: `url(${ShopMen})`,
          }}
        >
          <Link to="/search/electronics">Shop Electronics</Link>
        </div>
      </div>
    </div>
  );
};

export default Directory;
