import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const mapState = (state) => ({
  currentUser: state.user.currentUser,
});

const Request = (request, props) => {
  const {
    documentID,
    productThumbnail,
    productName,
    productPrice,
    productDesc,
  } = request;
  if (
    !documentID ||
    !productThumbnail ||
    !productName ||
    typeof productPrice === "undefined"
  )
    return null;

  return (
    <div className="product" {...props}>
      <div className="thumb">
        <Link to={`/product/${documentID}`}>
          <img src={productThumbnail} alt={productName} />
        </Link>
      </div>

      <div className="details">
        <ul>
          <li>
            <span className="name">
              <Link to={`/product/${documentID}`}>{productName}</Link>
            </span>
          </li>
          <li>
            <span className="price">${productPrice}</span>
          </li>
          <li>
            <div>
              <span className="desc">{productDesc}</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Request;
