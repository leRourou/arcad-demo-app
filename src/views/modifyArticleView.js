import "../style/item-view.scss";
import { TextField, NumberField, SelectField } from '../components/FormField.js';
import Modal from '../components/modal.js';

export default function ModifyArticleView(props) {

  const { data, removeItemView, categories } = props;

  return (
    <Modal>
      <div id="modify-view">
        <h1 id="section-title">Modify article</h1>

        <div
          id="black-back"
          onClick={() => {
            removeItemView();
          }}
        >
        </div>

        <div className='fields'>


          <TextField
            for="description"
            label="Description"
            value={data.description}
            tooltip="Can't be empty"
          />

          <NumberField
            for="sold_price"
            label="Sold price"
            value={data.sold_price}
            tooltip="Must be a positive number with two decimals <span> example: 12.34 </span>"
            min="0"
            step="0.01"
            max="9999999"
            regex={/\d+\.\d{2}/}
          />

          <NumberField
            for="production_price"
            label="Production price"
            value={data.production_cost}
            tooltip="Must be a positive number with two decimals <span> example: 12.34 </span>"
            min="0"
            step="0.01"
            max="9999999"
            regex={/\d+\.\d{2}/}
          />

          <SelectField
            for="family"
            label="Family"
            value={data.family}
            options={categories}
            tooltip="To add a family, go to the Family page"
          />

          <NumberField
            for="stock"
            label="Quantity in stock"
            value={data.stock}
            tooltip="Must be a positive or null integer"
            min="0"
            step="1"
            regex={/^\+?(0|[1-9]\d*)$/}
          />

          <NumberField
            for="quantity_min"
            label="Quantity minimum to order"
            value={data.quantity_min}
            tooltip="Must be a positive or null integer"
            min="0"
            step="1"
            regex={/^\+?(0|[1-9]\d*)$/}
          />

          <NumberField
            for="quantity_provided"
            label="Quantity provided"
            value={data.quantity_provided}
            tooltip="Must be a positive or null integer"
            min="0"
            step="1"
            regex={/^\+?(0|[1-9]\d*)$/}
          />

          <SelectField
            for="tax_id"
            label="Tax"
            value={data.tax_id}
            options={categories}
            tooltip="To add a tax, go to the Tax page"
          />

        </div>
        <button id="save-button">Save changes</button>
      </div>
    </Modal>
  );
}
