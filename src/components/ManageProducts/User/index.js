import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserProducts,
  deleteProductStart,
} from "../../../redux/Products/products.actions";

import LoadMore from "../../LoadMore";
import Button from "../../forms/Button";

const mapState = ({ productsData, user }) => ({
  products: productsData.userProducts,
  userID: user.currentUser.id,
});

const ManageProducts = () => {
  const { products, userID } = useSelector(mapState);
  const { data, queryDoc, isLastPage } = products;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserProducts({ userID }));
  }, []);

  const handleLoadMore = () => {
    dispatch(
      fetchUserProducts({
        userID,
        startAfterDoc: queryDoc,
        persistProducts: data,
      })
    );
  };

  const configLoadMore = {
    onLoadMoreEvt: handleLoadMore,
  };
  return (
    <div className="manageProducts">
      <table border="0" cellPadding="0" cellSpacing="0">
        <tbody>
          <tr>
            <th>
              <h1>Manage Products</h1>
            </th>
          </tr>
          <tr>
            <td>
              <table
                className="results"
                border="0"
                cellPadding="10"
                cellSpacing="0"
              >
                <tbody>
                  {Array.isArray(data) &&
                    data.length > 0 &&
                    data.map((product, index) => {
                      const {
                        productName,
                        productThumbnail,
                        productPrice,
                        documentID,
                      } = product;

                      return (
                        <tr key={index}>
                          <td>
                            <img
                              className="thumb"
                              src={productThumbnail}
                              alt="nothumbnail"
                            />
                          </td>
                          <td>{productName}</td>
                          <td>${productPrice}</td>
                          <td>
                            <Button
                              onClick={() =>
                                dispatch(deleteProductStart(documentID))
                              }
                            >
                              Delete
                            </Button>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </td>
          </tr>
          <tr>
            <td></td>
          </tr>
          <tr>
            <td>
              <table border="0" cellPadding="10" cellSpacing="0">
                <tbody>
                  <tr>
                    <td>{!isLastPage && <LoadMore {...configLoadMore} />}</td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ManageProducts;
