import "../style/item-view.scss";
import React, { useState } from "react";
import { TextField, NumberField, SelectField } from '../components/formField.js';
import Modal from '../components/modal.js';
import { Link } from "react-router-dom";
import { updateArticle, createArticle } from "../services/articleServices";
import { successDelete, errorToast, successUpdate, successAdd } from "../services/toastsServices";
import { Article } from "../classes/models/article.js";


/**
 * Article view
 * @category Views
 * @param {props} props
 * @returns The JSX code for the article view
 */
export default function ArticleView(props) {

  const { removeModal, categories, type, data } = props;

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

  // Add article
  async function addArticle() {
    var nArticle = article;
    nArticle.description = nArticle.description.trim()
    nArticle.creation_date = new Date().toISOString().slice(0, 10); // Format : YYYY-MM-DD
    nArticle.id = "000000";

    const errors = Article.getErrors(article);

    if (errors.length > 0) {
      errors.forEach(error => errorToast(error));
      return;
    }


    createArticle(nArticle).then(
      (response) => {

        removeModal();

        switch (response.status) {
          case 201:
            successAdd();
            break;
          case 400:
            errorToast("An error occured while adding the article");
            break;
          default:
            errorToast("An error occured while adding the article");
            break;
        }
      }
    )
  }

  // Modify article
  async function modifyArticle() {
    var nArticle = article;
    nArticle.description = nArticle.description.trim()
    nArticle.id = data.id;

    const errors = Article.getErrors(article);

    if (errors.length > 0) {
      errors.forEach(error => errorToast(error));
      return;
    }

    updateArticle(nArticle).then(
      (response) => {
        removeModal();

        switch (response.status) {
          case 204:
            successUpdate();
            break;
          case 400:
            errorToast("An error occured while updating the article");
            break;
          default:
            errorToast("An error occured while updating the article");
            break;
        }
      }
    )

  }


  // Delete article
  function deleteArticle() {
    removeModal();
    successDelete();
  }

  return (
    <Modal>
      <div id="modify-view">
        <h1 id="section-title">{type === "adding" ? "Add" : "Modify"} article</h1>

        <div
          id="black-back"
          onClick={() => {
            removeModal();
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
                }))
              }}
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
                }))
              }}
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
                }))
              }}
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
                }))
              }}
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
                }))
              }}
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
                }))
              }}
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
                }))
              }}
            />
          </div>
        </div>

        <div className="modify-buttons-list">

          <button className="modify-button save-button" onClick={() => {
            if (type === "adding") {
              if (window.confirm("Are you sure you want to add this article ?")) {
                addArticle()
              }
            } else {
              if (window.confirm("Are you sure you want to save changes ?")) {
                modifyArticle()
              }
            }
          }}>{type === "adding" ? "Add article" : "Save changes"}</button>

          {type === "adding" ?
            <button className="modify-button cancel-button" onClick={() => {
              if (window.confirm("Are you sure you want to cancel ?")) {
                removeModal()
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