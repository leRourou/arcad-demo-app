import "../style/item-view.scss";
import React, { useState } from "react";
import { TextField, NumberField, SelectField } from '../components/formField.js';
import Modal from '../components/modal.js';
import { Link } from "react-router-dom";
import { updateArticle, createArticle } from "../services/articleServices";
import 'react-toastify/dist/ReactToastify.css';
import { successDelete, errorToast, successUpdate } from "../services/toastsServices";

export default function ModifyArticleView(props) {

  const { removeItemView, categories, type, data } = props;

  // Article state
  const [article, setArticle] = useState({
    description: data.description,
    sold_price: data.sold_price,
    wholesale_price: data.wholesale_price,
    family: data.family,
    stock: data.stock,
    quantity_min: data.quantity_min,
    quantity_provided: data.quantity_provided,
    tax_id: data.tax_id
  });

  // TODO :Delete article
  function deleteArticle() {
    removeItemView();
    successDelete();
  }

  // Errors
  function getErrors(description, sold_price, wholesale_price, stock, quantity_min, quantity_provided, tax_id) {

    const errors = [];

    // Description
    if (description === "" || description === null) {
      errors.push("Description can't be empty");
    }

    if (description.length > 50) {
      errors.push("Description can't be longer than 50 characters");
    }

    // Sold price
    if (sold_price === "") {
      errors.push("Sold price can't be empty");
    }

    if (sold_price < 0) {
      errors.push("Sold price can't be negative");
    }

    if (isNaN(sold_price)) {
      errors.push("Sold price must be a number");
    }

    // Wholesale price
    if (wholesale_price === "") {
      errors.push("Wholesale price can't be empty");
    }

    if (wholesale_price < 0) {
      errors.push("Wholesale price can't be negative");
    }

    // Production price
    if (wholesale_price === "") {
      errors.push("Production price can't be empty");
    }

    if (wholesale_price < 0) {
      errors.push("Production price can't be negative");
    }

    // Stock
    if (stock === "") {
      errors.push("Stock can't be empty");
    }

    if (stock < 0) {
      errors.push("Stock can't be negative");
    }

    // Quantity min
    if (quantity_min === "") {
      errors.push("Quantity min can't be empty");
    }

    if (quantity_min < 0) {
      errors.push("Quantity min can't be negative");
    }

    // Quantity provided
    if (quantity_provided === "") {
      errors.push("Quantity provided can't be empty");
    }

    if (quantity_provided < 0) {
      errors.push("Quantity provided can't be negative");
    }

    return errors;
  }

  // Modify article
  function modifyOrCreateArticle() {

    var nArticle = article;

    nArticle.description = nArticle.description.trim();

    if (type === "adding") {
      nArticle.creation_date = new Date().toISOString().slice(0, 10); // Format : YYYY-MM-DD
      nArticle.id = "000000";
    } else {
      nArticle.id = nArticle.id;
    }

    const errors = getErrors();

    // TODO : Make the errors more precise
    if (errors.length > 0) {
      errors.forEach(error => errorToast(error));
    } else {
      type === "adding" ? createArticle(nArticle) : updateArticle(nArticle);
      removeItemView();
      successUpdate();
    }
  }

  return (
    <Modal>
      <div id="modify-view">
        <h1 id="section-title">{type === "adding" ? "Add" : "Modify"} article</h1>

        <div
          id="black-back"
          onClick={() => {
            removeItemView();
          }}
        />

        <div style={{ width: "80%" }}>

          <div className="field-line">

            <TextField
              for="description"
              label="Description"
              value={data.description}
              tooltip={<>A description of the article. <br></br> Can't be empty</>}
              onChange={(e) => {
                setArticle(prevState => ({
                  ...prevState,
                  description: e.target.value
                }))
              }}
            />

            <SelectField
              for="family"
              label="Family"
              value={data.family}
              options={categories}
              tooltip={<>To add a family, go to the <Link className="link" to='/families'>Manage families</Link> page</>}
              onChange={(e) => {
                setArticle(prevState => ({
                  ...prevState,
                  family: e.target.value
                })) }}
            />

          </div>

          <div className="field-line">

            <NumberField
              for="sold_price"
              label="Sold price"
              value={data.sold_price}
              tooltip={<>Must be a positive number with two decimals <b> Example: </b> 12.34</>}
              min="0"
              step="0.01"
              max="9999999"
              regex={/\d+\.\d{2}/}
              onChange={(e) => {
                setArticle(prevState => ({
                  ...prevState,
                  sold_price: e.target.value
                })) }}
            />

            {<NumberField
              for="wholesale_price"
              label="Wholesale price"
              value={data.wholesale_price}
              tooltip={<>Sum of a given product's cost price plus the manufacturer's profit margin<br></br>Must be a positive number with two decimals <b> Example: </b> 12.34</>}
              min="0"
              step="0.01"
              max="9999999"
              regex={/\d+\.\d{2}/}
              onChange={(e) => {
                setArticle(prevState => ({
                  ...prevState,
                  wholesale_price: e.target.value
                })) }}
            />}

            <SelectField
              for="tax_id"
              label="Tax"
              value={data.tax_id}
              options={[{ id: 1, name: "TVA 20%" }, { id: 2, name: "TVA 10%" }]}
              tooltip={<>To add a tax, go to the <Link className="link" to='/taxes'>Manage taxes</Link> page</>}
              onChange={(e) => {
                setArticle(prevState => ({
                  ...prevState,
                  tax_id: e.target.value
                })) }}
            />
          </div>

          <div className="field-line">

            <NumberField
              for="stock"
              label="Quantity in stock"
              value={data.stock}
              tooltip="Must be a positive or null integer"
              min="0"
              step="1"
              regex={/^\+?(0|[1-9]\d*)$/}
              onChange={(e) => {
                setArticle(prevState => ({
                  ...prevState,
                  stock: e.target.value
                })) }}
            />

            <NumberField
              for="quantity_min"
              label="Quantity minimum"
              value={data.quantity_min}
              tooltip={<>The minimum quantity that a customer can order. <br></br> Must be positive or null</>}
              min="0"
              step="1"
              regex={/^\+?(0|[1-9]\d*)$/}
              onChange={(e) => {
                setArticle(prevState => ({
                  ...prevState,
                  quantity_min: e.target.value
                })) }}
            />

            <NumberField
              for="quantity_provided"
              label="Quantity provided"
              value={data.quantity_provided}
              tooltip="Must be a positive or null integer"
              min="0"
              step="1"
              regex={/^\+?(0|[1-9]\d*)$/}
              onChange={(e) => {
                setArticle(prevState => ({
                  ...prevState,
                  quantity_provided: e.target.value
                })) }}
            />
          </div>
        </div>

        <div className="modify-buttons-list">

          <button className="modify-button save-button" onClick={() => {
            if (type === "adding") {
              if (window.confirm("Are you sure you want to add this article ?")) {
                modifyOrCreateArticle()
              }
            } else {
              if (window.confirm("Are you sure you want to save changes ?")) {
                modifyOrCreateArticle()
              }
            }
          }}>{type === "adding" ? "Add article" : "Save changes"}</button>

          {type === "adding" ?
            <button className="modify-button cancel-button" onClick={() => {
              if (window.confirm("Are you sure you want to cancel ?")) {
                removeItemView()
              }
            }}>Cancel</button>
            :
            <button className="modify-button delete-button" onClick={() => {
              if (window.confirm("Are you sure you want to delete this article ?")) {
                deleteArticle()
              }
            }}>Delete article</button>
          }

        </div>

      </div>
    </Modal>
  );
}