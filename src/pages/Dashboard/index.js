import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getUserOrderHistory } from "./../../redux/Orders/orders.actions";
import OrderHistory from "./../../components/OrderHistory";
import UserManageProducts from "./../../components/ManageProducts/User";
import UserManageRequests from "./../../components/ManageRequests/User";
import "./styles.scss";

const mapState = ({ user, ordersData }) => ({
  currentUser: user.currentUser,
  orderHistory: ordersData.orderHistory.data,
});

const Dashboard = (props) => {
  const { listType } = useParams();
  const dispatch = useDispatch();
  const { currentUser, orderHistory } = useSelector(mapState);

  useEffect(() => {
    dispatch(getUserOrderHistory(currentUser.id));
  }, []);

  return (
    <div>
      <h1>Wallet: ${currentUser.wallet}</h1>
      {listType === "requests" ? (
        <UserManageRequests />
      ) : listType === "products" ? (
        <UserManageProducts />
      ) : (
        <div>
          <h1>Order History</h1>
          <OrderHistory orders={orderHistory} />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
