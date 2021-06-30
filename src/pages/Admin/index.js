import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProductStart } from "./../../redux/Products/products.actions";
import { addRequestStart } from "./../../redux/Requests/requests.actions";
import Modal from "./../../components/Modal";
import FormInput from "./../../components/forms/FormInput";
import FormSelect from "./../../components/forms/FormSelect";
import Button from "./../../components/forms/Button";
import { storage } from "./../../firebase/upload";

import CKEditor from "ckeditor4-react";

import "./styles.scss";

const Admin = (props) => {
  const dispatch = useDispatch();
  const [hideProductModal, setHideProductModal] = useState(true);
  const [hideRequestModal, setHideRequestModal] = useState(true);
  const [productCategory, setProductCategory] = useState("");
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const [productDesc, setProductDesc] = useState("");
  const [productDetails, setProductDetails] = useState("");
  const [productImage, setProductImage] = useState(null);
  const [requestCategory, setRequestCategory] = useState("");
  const [requestName, setRequestName] = useState("");
  const [requestPrice, setRequestPrice] = useState(0);
  const [requestDesc, setRequestDesc] = useState("");
  const [requestDetails, setRequestDetails] = useState("");
  const [requestImage, setRequestImage] = useState(null);
  const [progress, setProgress] = useState(0);

  const toggleProductModal = () => setHideProductModal(!hideProductModal);

  const configProductModal = {
    hideModal: hideProductModal,
    toggleModal: toggleProductModal,
  };

  const toggleRequestModal = () => setHideRequestModal(!hideRequestModal);

  const configRequestModal = {
    hideModal: hideRequestModal,
    toggleModal: toggleRequestModal,
  };

  const resetForm = () => {
    setHideProductModal(true);
    setHideRequestModal(true);
    setProductCategory("");
    setProductName("");
    setProductPrice(0);
    setProductDesc("");
    setProductDetails("");
    setRequestCategory("");
    setRequestName("");
    setRequestPrice(0);
    setRequestDesc("");
    setRequestDetails("");
    setRequestImage(null);
    setProductImage(null);
  };

  const handleProductSubmit = (e) => {
    e.preventDefault();
    if (productCategory !== "") {
      const uploadTask = storage
        .ref(`images/${productImage.name}`)
        .put(productImage);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progress);
        },
        (error) => {
          console.log(error);
        },
        () => {
          storage
            .ref("images")
            .child(productImage.name)
            .getDownloadURL()
            .then((url) => {
              dispatch(
                addProductStart({
                  productCategory,
                  productName,
                  productThumbnail: url,
                  productPrice,
                  productDesc,
                  productDetails,
                  lowerCaseName: productName.toLowerCase(),
                  imageName: productImage.name,
                })
              );
              resetForm();
            });
        }
      );
    } else {
      alert("Please choose a category");
    }
  };

  const handleRequestSubmit = (e) => {
    e.preventDefault();
    if (requestCategory !== "") {
      const uploadTask = storage
        .ref(`images/${requestImage.name}`)
        .put(requestImage);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progress);
        },
        (error) => {
          console.log(error);
        },
        () => {
          storage
            .ref("images")
            .child(requestImage.name)
            .getDownloadURL()
            .then((url) => {
              dispatch(
                addRequestStart({
                  requestCategory,
                  requestName,
                  requestThumbnail: url,
                  requestPrice,
                  requestDesc,
                  requestDetails,
                  lowerCaseName: requestName.toLowerCase(),
                  imageName: requestImage.name,
                })
              );
              resetForm();
            });
        }
      );
    } else {
      alert("Please choose a category");
    }
  };

  const handleProductImageChange = (e) => {
    if (e.target.files[0]) {
      setProductImage(e.target.files[0]);
    }
  };

  const handleRequestImageChange = (e) => {
    if (e.target.files[0]) {
      setRequestImage(e.target.files[0]);
    }
  };

  return (
    <div className="admin">
      <div className="callToActions">
        <ul>
          <li key={0}>
            <Button onClick={() => toggleProductModal()}>
              Add new product
            </Button>
          </li>
          <li key={1}>
            <Button onClick={() => toggleRequestModal()}>
              Make a new request
            </Button>
          </li>
        </ul>
      </div>

      <Modal {...configProductModal}>
        <div className="addNewForm">
          <form onSubmit={handleProductSubmit}>
            <h2>Add new product</h2>
            <FormInput
              label="Name"
              placeholder="Name of Item"
              required
              type="text"
              value={productName}
              handleChange={(e) => setProductName(e.target.value)}
            />
            <FormInput
              label="Main image upload"
              type="file"
              accept=".jpg,.jpeg"
              onChange={handleProductImageChange}
            />
            <FormInput
              label="Price"
              type="number"
              min="0.00"
              max="10000.00"
              step="0.01"
              placeholder="Price of item"
              value={productPrice}
              required
              handleChange={(e) => setProductPrice(e.target.value)}
            />
            <FormSelect
              label="Category"
              className="category"
              required
              options={[
                {
                  value: "electronics",
                  name: "Electronics",
                },
                {
                  value: "others",
                  name: "Others",
                },
              ]}
              handleChange={(e) => setProductCategory(e.target.value)}
            />
            <FormInput
              label="Description"
              type="description"
              required
              handleChange={(evt) => setProductDesc(evt.target.value)}
              placeholder="Short description of item"
            />
            {/* <FormInput
              label="Details"
              type="text"
              placeholder="Include any details or specification of item"
              handleChange={(e) => setProductDetails(e.target.value)} />*/}
            <label>Details/Specifications(Optional)</label>
            <CKEditor
              onChange={(evt) => setProductDetails(evt.editor.getData())}
            />
            <br />
            <Button type="submit">Add product</Button>
          </form>
        </div>
      </Modal>

      <Modal {...configRequestModal}>
        <div className="addNewForm">
          <form onSubmit={handleRequestSubmit}>
            <h2>Add new request</h2>
            <FormInput
              label="Name"
              placeholder="Name of Item Requested"
              required
              type="text"
              value={requestName}
              handleChange={(e) => setRequestName(e.target.value)}
            />
            <FormInput
              label="Request image upload"
              type="file"
              accept=".jpg,.jpeg"
              onChange={handleRequestImageChange}
            />
            <FormInput
              label="Price"
              type="number"
              min="0.00"
              max="10000.00"
              step="0.01"
              placeholder="Amount Willing to pay"
              value={requestPrice}
              required
              handleChange={(e) => setRequestPrice(e.target.value)}
            />
            <FormSelect
              label="Category"
              className="category"
              required
              options={[
                {
                  value: "electronics",
                  name: "Electronics",
                },
                {
                  value: "others",
                  name: "Others",
                },
              ]}
              handleChange={(e) => setRequestCategory(e.target.value)}
            />
            <FormInput
              label="Description"
              type="description"
              required
              handleChange={(evt) => setRequestDesc(evt.target.value)}
              placeholder="Short description of item requested"
            />
            <label>Details/Specifications(Optional)</label>
            <CKEditor
              onChange={(evt) => setRequestDetails(evt.editor.getData())}
            />

            <br />
            <Button type="submit">Add request</Button>
          </form>
        </div>
      </Modal>

      <div className="content">{props.children}</div>
    </div>
  );
};

export default Admin;
