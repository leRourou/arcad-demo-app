import React, { useState } from 'react';
import "../style/product-view.scss";
import { TextField, NumberField, SelectField } from '../components/FormField.js';

function ProductView(props) {
  
  const {data, removeProductView, categories } = props;

  console.log(categories)

  return (
    <div id='modify-container'>
      <div id="modify-view">
        <h1>Product n°{data.id}</h1>
        <div className='fields'>

          <div 
            id="black-back"
            onClick={() => {
              removeProductView();
            }}
            >
          </div>

          <TextField
            for="product-name"
            label="Product name"
            value={data.Product}
            tooltip="Can't be empty"
          />

          <NumberField
            for="price"
            label="Price"
            value={data.Price}
            tooltip="Must be a positive number with two decimals <span> example: 12.34 </span>"
          />

          <TextField
            for="description"
            label="Description"
            value={data.Description}
          />

          <SelectField
            for="category"
            label="Category"
            value={data.Category}
            options={categories}
            tooltip="To add a category, go to the Categories page"
          />

        </div>
        <button id="save-button">Save changes</button>
      </div>
    </div>
  );
}

export default ProductView;

