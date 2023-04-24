import "../style/item-view.scss";
import { TextField, DateField } from '../components/FormField.js';
import Modal from '../components/modal.js';

export default function Customer(props) {

  const { data, removeItemView, } = props;

  return (
    <Modal>
      <div id="modify-view">
        <h1 id="section-title">Modify customer</h1>
        <div className='fields'>

          <div
            id="black-back"
            onClick={() => {
              removeItemView();
            }}
          >
          </div>

          <TextField
            for="customer-name"
            label="Customer name"
            value={data.name}
            tooltip="Can't be empty"
          />

          <DateField
            for="age"
            label="Birth date"
            value={data.date_of_birth}
            tooltip="Must be a valid date"
          />

        </div>
        <button id="save-button">Save changes</button>
      </div>
    </Modal>
  );
}
