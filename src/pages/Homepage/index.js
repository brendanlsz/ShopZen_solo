import React from "react";
import { Link } from "react-router-dom";
// import Directory from "./../../components/Directory";
import "./styles.scss";

import ShopWomen from "./../../assets/shopWomens.jpg";
import ShopMen from "./../../assets/shopMens.jpg";

const Homepage = (props) => {
  return (
    <section className="homepage">
      <div className="main-block row  position-relative overflow-hidden text-center">
        <div
          className="d-flex align-items-center col-md-6 p-lg-5 mx-auto buyer-block"
          style={{
            backgroundImage: `url(${ShopWomen})`,
          }}
        >
          <div>
            <h1 className="display-1 fw-normal">For Buyers</h1>
            <p className="lead fw-normal">
              Have you ever tried to buy a product online but it is not
              available? With Shopzen, not only can you shop for items, you will
              also be able to post buy request for items
            </p>
            <Link className="btn btn-dark mt-2" to="/shoppingcart">
              Start Shopping Now
            </Link>
          </div>
        </div>
        <div
          className="d-flex align-items-center col-md-6 p-lg-5 mx-auto seller-block"
          style={{
            backgroundImage: `url(${ShopMen})`,
          }}
        >
          <div>
            <h1 className="display-1 fw-normal">For Shoppers</h1>
            <p className="lead fw-normal">
              Have you ever tried to sell a product but can't find anyone
              willing ti buy it? With Shopzen, you can look for potential buyers
              instead
            </p>
            <Link className="btn btn-dark mt-2" to="/shoppingcart">
              Start Shopping Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Homepage;
