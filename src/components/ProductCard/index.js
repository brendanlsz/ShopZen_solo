import React, { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductStart,
  setProduct,
} from "./../../redux/Products/products.actions";
import { addProduct } from "./../../redux/Cart/cart.actions";
import Button from "./../forms/Button";
import "./styles.scss";
import Product from "./../ProductResults/Product/index.js";

const mapState = (state) => ({
  product: state.productsData.product,
});

const ProductCard = ({}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { productID } = useParams();
  const { product } = useSelector(mapState);

  const { productThumbnail, productName, productPrice, productDesc } = product;

  useEffect(() => {
    dispatch(fetchProductStart(productID));

    return () => {
      dispatch(setProduct({}));
    };
  }, []);

  const handleAddToCart = (product) => {
    if (!product) return;
    dispatch(addProduct(product));
    history.push("/cart");
  };

  const configAddToCartBtn = {
    type: "button",
  };

  return (
    <div className="productCard ">
      <div className="mainSection productSection d-flex">
        <div className="row w-100">
          <div className="thumbnail col-4">
            <img src={productThumbnail} alt="No thumbnail found" />
          </div>
          <div className="productDetails col-8">
            <ul className="">
              <div className="productTitle">
                <li className="productName">
                  <h1>{productName}</h1>
                </li>
                <li className="productPrice">
                  <span>${productPrice}</span>
                </li>
              </div>
              <li className="desc">
                <span
                  className="desc"
                  // dangerouslySetInnerHTML={{ _html: productDesc }}
                />
                {productDesc}
              </li>

              <li className="addToCart">
                <div>
                  <Button
                    {...configAddToCartBtn}
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to cart
                  </Button>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="detailsSection productSection">
        <h1>Specification/Details</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam cursus
          ornare orci, sed varius metus tempus a. Sed malesuada purus sed turpis
          laoreet iaculis. Suspendisse potenti. Aenean hendrerit scelerisque
          condimentum. Vestibulum congue mauris quis urna tempus, vel dapibus
          eros malesuada. In eu augue et diam interdum posuere ut eget nibh.
          Maecenas volutpat, nunc non convallis euismod, orci arcu maximus orci,
          non dapibus libero ex porta ipsum. Pellentesque ipsum libero, maximus
          non vehicula vel, faucibus vel purus. Cras venenatis turpis ac odio
          accumsan, ut eleifend arcu maximus. Curabitur in dignissim mi. Nam
          scelerisque mattis nunc, ut cursus risus elementum in. Mauris interdum
          pulvinar dui imperdiet pellentesque. Nulla vulputate tortor in elit
          blandit tristique. Nunc ut augue libero. Donec pretium blandit
          sagittis. Aliquam mollis ipsum nec ante imperdiet aliquet. Duis at
          tellus hendrerit dui fermentum faucibus eget eget nunc. Praesent
          ultrices risus vel sem vulputate pellentesque a eget sapien.
          Suspendisse potenti. Mauris at sem nec dolor blandit suscipit vitae in
          purus. Integer posuere sed dui at vestibulum. Nunc lacinia suscipit
          nunc. Nullam tincidunt mauris eu aliquet maximus. Mauris vestibulum et
          mi eu laoreet. Ut rutrum mattis massa eu tincidunt. Suspendisse
          potenti. Donec luctus ornare gravida. Vestibulum consectetur fringilla
          est, a viverra eros congue imperdiet. Fusce feugiat varius turpis, at
          auctor massa sollicitudin at. Quisque sed orci in sapien varius
          feugiat quis sed orci. Sed tincidunt malesuada pharetra. Quisque
          efficitur, nisi eu aliquam molestie, est ipsum venenatis massa, ut
          tempor purus odio ut diam. Maecenas tristique, elit at tempus
          porttitor, ipsum massa faucibus orci, ac lacinia ipsum metus posuere
          nisl. Suspendisse eleifend felis sed risus aliquam, et placerat odio
          pharetra. Maecenas mollis arcu vel diam faucibus consequat.
        </p>
      </div>
      <div className="productSection recommendationSection">
        <h1>You might also like</h1>
        <div className="recList">
          <Product className="recproduct col-4" {...product} />
          <Product className="recproduct col-4" {...product} />
          <Product className="recproduct col-4" {...product} />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
