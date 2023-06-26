import "../style/item-view.scss";
import React, { useCallback, useEffect, useState } from "react";
import Modal from '../components/modal.js';
import Loading from "./misc/loadingView.js";
import { TextField, SelectField, NumberField } from '../components/formField.js';
import { toast } from 'react-toastify';
import { Customer } from "../classes/models/customer.js";
import { Link } from "react-router-dom";
import { useTransition } from "@react-spring/web";
import { animated } from "@react-spring/web";

import { getCustomerById, updateCustomer, createCustomer } from '../services/customerServices.js'
import { getAllCountries } from "../services/countryServices.js";
import { getAllOrders } from "../services/orderServices.js";
import { createOrder } from "../services/orderServices.js";
import Section from "../components/section";

export default function CustomerView(props) {

    const { removeModal, type, itemId } = props;

    // Data state
    const [customer, setCustomer] = useState({});
    const [loading, setLoading] = useState(true);
    const [countries, setCountries] = useState([]);
    const [orders, setOrders] = useState([]);
    const [openInfos, setOpenInfos] = useState(true);
    const [openOrders, setOpenOrders] = useState(false);

    var modified = false;

    const transition = {
        from: { maxHeight: 0 },
        enter: { maxHeight: 350 },
        leave: { maxHeight: 0 }
    }

    function closeAll() {
        setOpenInfos(false);
        setOpenOrders(false);
    }

    document.title = "Edit customer"

    const getData = useCallback(async () => {
        setCountries(await getAllCountries(500, "", 1));
        if (type === "adding") {
            setCustomer(Customer.getEmpty());
            setLoading(false);
            return;
        } else {
            setOrders(await getAllOrders(100, 1, itemId));
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

    async function addOrder() {
        if (!window.confirm("Are you sure you want to add an order for this customer?")) {
            return;
        }
        createOrder(customer.id).then(
            (response) => {
                if (response.status === 201) {
                    getData();
                    toast("Order added successfully", { type: "success" })
                } else {
                    toast("An error occured while adding the order", { type: "error" })
                }
            }
        )
    }

    async function addCustomer() {
        var nCustomer = customer;
        nCustomer.creation_date = new Date().toISOString().slice(0, 10); // Format : YYYY-MM-DD
        nCustomer.id = 0;
        const errors = Customer.getErrors(customer);

        if (errors.length > 0) {
            errors.forEach(error => toast(error, { type: "error" }));
            return;
        }

        createCustomer(nCustomer).then(
            (response) => {
                if (response.status === 201) {
                    toast("Customer added successfully", { type: "success" })

                } else {
                    toast("An error occured while adding the customer", { type: "error" })
                }
            }
        )
    }

    async function modifyCustomer() {
        var nCustomer = customer;
        nCustomer.id = customer.id;

        const errors = Customer.getErrors(customer);

        if (errors.length > 0) {
            errors.forEach(error => toast(error, { type: "error" }));
            return;
        }

        updateCustomer(nCustomer).then(
            (response) => {
                if (response.status === 204) {
                    modified = true;
                    toast("Customer updated successfully", { type: "success" })

                } else {
                    toast("An error occured while updating the customer", { type: "error" })
                }
            }
        )
    }

    function displayOrders() {
        return (
            <>
                <table style={{ marginTop: "10px" }}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Date</th>
                            <th>Closing date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => {
                            return (
                                <tr onClick={() => window.location.pathname = "orders/" + order.id}>
                                    <td key={order.id}>{order.id}</td>
                                    <td key={order.date}>{formatDate(order.date.toString())}</td>
                                    <td key={order.closing_date}>{order.closing_date !== 0 ? formatDate(order.closing_date.toString()) : <i>No closing date</i>}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </>)
    }

    return (
        <Modal closeModal={() => removeModal(modified)}>
            {
                loading ? <Loading /> :
                    <>

                        <h1 id="section-title">{type === "adding" ? "Add a customer" : "Customer n°" + customer.id} </h1>

                        <Section title="Informations" isOpen={openInfos} setIsOpen={setOpenInfos} closeAll={() => closeAll()}>
                            <div className="field-line">
                                <TextField
                                    for="name" label="Name" value={customer.name}
                                    tooltip={<>Name of the customer. <br></br> Can't be empty</>}
                                    onChange={(e) => {
                                        setCustomer(prevState => ({ ...prevState, name: e.target.value }))
                                    }}
                                />
                                <TextField
                                    for="phone" label="Phone" value={customer.phone}
                                    tooltip={<>Phone number <br></br>Must be less than 15 characters long</>}
                                    onChange={(e) => {
                                        setCustomer(prevState => ({ ...prevState, phone: e.target.value }))
                                    }}
                                />
                            </div>

                            <div className="field-line">
                                <TextField
                                    for="address" label="Address" value={customer.address}
                                    tooltip={<>Address (street number and street name) of the customer<br></br>Must be less than 50 characters long</>}
                                    onChange={(e) => {
                                        setCustomer(prevState => ({ ...prevState, address: e.target.value }))
                                    }}
                                />
                            </div>

                            <div className="field-line">
                                <TextField
                                    for="zip" label="ZIP Code" value={customer.zipCode}
                                    tooltip={<>ZIP Code of the customer's address<br></br>Must be less than 9 characters long</>}
                                    onChange={(e) => {
                                        setCustomer(prevState => ({ ...prevState, zipCode: e.target.value }))
                                    }}
                                />
                                <TextField
                                    for="city" label="City" value={customer.city}
                                    tooltip={<>City of the customer's address<br></br>Must be less than 10 characters long</>}
                                    onChange={(e) => {
                                        setCustomer(prevState => ({ ...prevState, city: e.target.value }))
                                    }}
                                />
                                <SelectField
                                    for="country" label="Country" value={customer.country_id}
                                    options={countries.map((country) => {
                                        return { value: country.name, id: country.id }
                                    })}
                                    tooltip={<>Country of the customer's address<br></br>To modify a country, go to the <Link className="link" to='/countries'>countries</Link> page</>}
                                    onChange={(e) => {
                                        setCustomer(prevState => ({ ...prevState, country_id: e.target.value }))
                                    }}
                                />
                            </div>

                            <div className="field-line">
                                <NumberField
                                    for="credit" label="Credit" value={customer.credit}
                                    tooltip={<>The actual credit of the customer<br></br>Must be a positive number with two decimals</>}
                                    min="0"
                                    step="0.01"
                                    max="9999999"
                                    onChange={(e) => {
                                        setCustomer(prevState => ({ ...prevState, credit: e.target.value }))
                                    }}
                                />
                                {<NumberField
                                    for="credit_limit" label="Credit limit" value={customer.credit_limit}
                                    tooltip={<>The credit limit of the customer<br></br>Must be a positive number with two decimals</>}
                                    min="0"
                                    step="0.01"
                                    max="9999999"
                                    onChange={(e) => {
                                        setCustomer(prevState => ({ ...prevState, credit_limit: e.target.value }))
                                    }}
                                />}
                            </div>
                        </Section>


                        {type !== "adding" &&
                            <>
                                <Section title="Orders" isOpen={openOrders} setIsOpen={setOpenOrders} closeAll={() => closeAll()}>
                                            {orders.length === 0 ?
                                                <p className="no-orders">No orders</p> :
                                                displayOrders()}
                                            <div className="modify-buttons-list">
                                                <button className="modify-button save-button" onClick={() => { addOrder() }}>Add an order</button>
                                            </div>
                                        </Section>
                            </>
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
        </Modal>
    );
}

function formatDate(string) {
    let years = string.substring(0, 4)
    let months = string.substring(4, 6)
    let days = string.substring(6, 8)
    return `${years}-${months}-${days}`
}