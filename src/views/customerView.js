import "../style/item-view.scss";
import React, { useCallback, useEffect, useState } from "react";
import Modal from '../components/modal.js';
import Loading from "./misc/loadingView.js";
import { TextField, SelectField, NumberField } from '../components/formField.js';
import { errorToast, successUpdate, successAdd } from "../services/toastsServices";
import { Customer } from "../classes/models/customer.js";
import { Link } from "react-router-dom";

import { getCustomerById, updateCustomer, createCustomer } from '../services/customerServices.js'
import { getAllCountries } from "../services/countryServices.js";
/**
 * Customer view
 * @category Views
 * @param {props} props
 * @returns The JSX code for the customer view
 */
export default function CustomerView(props) {

    const { removeModal, type, itemId } = props;

    // Data state
    const [customer, setCustomer] = useState({});
    const [loading, setLoading] = useState(true);
    const [countries, setCountries] = useState([]);

    // Get customer
    const getData = useCallback(async () => {
        // Get countries
        setCountries(await getAllCountries(500, "", 1));
        if (type === "adding") {
            setCustomer(Customer.empty());
            setLoading(false);
            return;
        }
        setCustomer(await getCustomerById(itemId));
        setLoading(false);
    }, [itemId, type]);

    useEffect(() => {
        const fetchData = async () => {
            await getData();
        };

        fetchData();
    }, [getData]);

    // Add customer
    async function addCustomer() {
        var nCustomer = customer;
        nCustomer.creation_date = new Date().toISOString().slice(0, 10); // Format : YYYY-MM-DD
        nCustomer.id = 0;
        const errors = Customer.getErrors(customer);

        if (errors.length > 0) {
            errors.forEach(error => errorToast(error));
            return;
        }

        createCustomer(nCustomer).then(
            (response) => {
                if (response.status === 201) {
                    successAdd();
                    removeModal(true);
                } else {
                    errorToast("An error occured while adding the customer");
                }
            }
        )
    }

    // Modify customer
    async function modifyCustomer() {
        var nCustomer = customer;
        nCustomer.id = customer.id;

        const errors = Customer.getErrors(customer);

        if (errors.length > 0) {
            errors.forEach(error => errorToast(error));
            return;
        }

        updateCustomer(nCustomer).then(
            (response) => {
                if (response.status === 204) {
                    successUpdate();
                    removeModal(true);
                } else {
                    errorToast("An error occured while updating the customer");
                }
            }
        )
    }

    return (
        <Modal>
            <div
                id="black-back"
                onClick={() => {
                    removeModal(false);
                }}
            />

            <div id="modify-view">
                {
                    loading ? <Loading /> :
                        <>
                            <h1 id="section-title">{type === "adding" ? "Add a customer" : "Customer n°" + customer.id} </h1>
                            
                            <h2 className="subtitle-itemview">Orders</h2>

                            {type === "adding" &&
                                <div style={{ overflow: 'hidden' }}>

                                    <div className="field-line">
                                        <TextField
                                            for="name"
                                            label="Name"
                                            value={customer.name}
                                            tooltip={<>Name of the customer. <br></br> Can't be empty</>}
                                            onChange={(e) => {
                                                setCustomer(prevState => ({
                                                    ...prevState,
                                                    name: e.target.value
                                                }))
                                            }}
                                        />
                                        <TextField
                                            for="phone"
                                            label="Phone"
                                            value={customer.phone}
                                            tooltip={<>Phone number <br></br>Must be less than 15 characters long</>}
                                            onChange={(e) => {
                                                setCustomer(prevState => ({
                                                    ...prevState,
                                                    phone: e.target.value
                                                }))
                                            }}
                                        />
                                        <TextField
                                            for="mail"
                                            label="Mail"
                                            value={customer.mail}
                                            tooltip={<>Email <br></br>Must be in the good email format</>}
                                            onChange={(e) => {
                                                setCustomer(prevState => ({
                                                    ...prevState,
                                                    mail: e.target.value
                                                }))
                                            }}
                                        />
                                    </div>

                                    <div className="field-line">
                                        <TextField
                                            for="address"
                                            label="Address"
                                            value={customer.address}
                                            tooltip={<>Address (street number and street name) of the customer<br></br>Must be less than 50 characters long</>}
                                            onChange={(e) => {
                                                setCustomer(prevState => ({
                                                    ...prevState,
                                                    address: e.target.value
                                                }))
                                            }}
                                        />
                                    </div>

                                    <div className="field-line">
                                        <TextField
                                            for="zip"
                                            label="Zip Code"
                                            value={customer.zipCode}
                                            tooltip={<>Zip Code of the customer's address<br></br>Must be less than 9 characters long</>}
                                            onChange={(e) => {
                                                setCustomer(prevState => ({
                                                    ...prevState,
                                                    zipCode: e.target.value
                                                }))
                                            }}
                                        />
                                        <TextField
                                            for="city"
                                            label="City"
                                            value={customer.city}
                                            tooltip={<>City of the customer's address<br></br>Must be less than 10 characters long</>}
                                            onChange={(e) => {
                                                setCustomer(prevState => ({
                                                    ...prevState,
                                                    city: e.target.value
                                                }))
                                            }}
                                        />
                                        <SelectField
                                            for="country"
                                            label="Country"
                                            value={customer.country_id}
                                            options={countries.map((country) => {
                                                return {
                                                    value: country.name,
                                                    id: country.id
                                                }
                                            })
                                            }
                                            tooltip={<>Country of the customer's address<br></br>To add a country, go to the <Link className="link" to='/countries'>countries</Link> page</>}
                                            onChange={(e) => {
                                                setCustomer(prevState => ({
                                                    ...prevState,
                                                    country_id: e.target.value
                                                }))
                                            }}
                                        />
                                    </div>

                                    <div className="field-line">
                                        <NumberField
                                            for="credit"
                                            label="Credit"
                                            value={customer.credit}
                                            tooltip={<>The actual credit of the customer<br></br>Must be a positive number with two decimals</>}
                                            min="0"
                                            step="0.01"
                                            max="9999999"
                                            regex={/\d+\.\d{2}/}
                                            onChange={(e) => {
                                                setCustomer(prevState => ({
                                                    ...prevState,
                                                    credit: e.target.value
                                                }))
                                            }}
                                        />

                                        <NumberField
                                            for="credit_limit"
                                            label="Credit limit"
                                            value={customer.credit_limit}
                                            tooltip={<>The credit limit of the customer<br></br>Must be a positive number with two decimals</>}
                                            min="0"
                                            step="0.01"
                                            max="9999999"
                                            regex={/\d+\.\d{2}/}
                                            onChange={(e) => {
                                                setCustomer(prevState => ({
                                                    ...prevState,
                                                    credit_limit: e.target.value
                                                }))
                                            }}
                                        />
                                    </div>
                                </div>
                            }
                            
                            <div className="modify-buttons-list">

                                <button className="modify-button save-button" onClick={() => {
                                    if (type === "adding") {
                                        if (window.confirm("Are you sure you want to add this customer ?")) {
                                            addCustomer()
                                        }
                                    } else {
                                        if (window.confirm("Are you sure you want to save changes ?")) {
                                            modifyCustomer()
                                        }
                                    }
                                }}>{type === "adding" ? "Add customer" : "Save changes"}</button>

                                {type === "adding" &&
                                    <button className="modify-button cancel-button" onClick={() => {
                                        if (window.confirm("Are you sure you want to cancel ?")) {
                                            removeModal(false)
                                        }
                                    }}>Cancel</button>
                                }

                            </div>
                        </>
                }
            </div>
        </Modal>
    );
}