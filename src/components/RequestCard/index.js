import React, { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchRequestStart,
  setRequest,
} from "./../../redux/Requests/requests.actions";
import Button from "./../forms/Button";
import "./styles.scss";
import Request from "./../Request";
import { getUserEmail } from "../../firebase/utils";

const mapState = (state) => ({
  currentUser: state.user.currentUser,
  request: state.requestsData.request,
});

const RequestCard = ({}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { requestID } = useParams();
  const { request, currentUser } = useSelector(mapState);

  const {
    requestThumbnail,
    requestName,
    requestPrice,
    requestDesc,
    requestDetails,
    productAdminUserUID,
  } = request;

  useEffect(() => {
    dispatch(fetchRequestStart(requestID));
    return () => {
      dispatch(setRequest({}));
    };
  }, []);

  const handleClick = async () => {
    try {
      const email = await getUserEmail(productAdminUserUID);
      console.log(email);
    } catch (err) {
      // console.log(err);
    }
  };

  return (
    <div className="productCard ">
      <div className="mainSection requestSection">
        <div className="row w-100">
          <div className="thumbnail ">
            <img src={requestThumbnail} alt="No thumbnail found" />
          </div>
          <div className="requestDetails ">
            <ul className="">
              <div className="requestTitle">
                <li className="requestName">
                  <h1>{requestName}</h1>
                </li>
                <li className="requestPrice">
                  <span>Budget: ${requestPrice}</span>
                </li>
              </div>
              <li className="requestInfo">
                {/* <span
                  className="desc"
                  // dangerouslySetInnerHTML={{ _html: productDesc }}
                /> */}
                <p>
                  {requestDesc === "" ? "No description given" : requestDesc}
                </p>
              </li>
              <li>
                <Button onClick={() => handleClick()}>Contact Buyer</Button>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="detailsSection requestSection">
        <h1>Specification/Details</h1>
        {requestDesc === "" ? (
          <span className="requestdetails">
            <p>No details given</p>
          </span>
        ) : (
          <span
            className="requestdetails"
            dangerouslySetInnerHTML={{ __html: requestDetails }}
          ></span>
        )}
      </div>
      <div className="requestSection recommendationSection">
        <h1>You might also like</h1>
        <div className="recList">
          <Request {...request} />
          <Request {...request} />
          <Request {...request} />
        </div>
      </div>
    </div>
  );
};

export default RequestCard;
