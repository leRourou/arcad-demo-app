import "../style/item-view.scss";
import React, { useCallback, useEffect, useState } from "react";
import Modal from '../components/modal.js';
import Loading from "./misc/loadingView.js";
import { toast } from 'react-toastify';
import { Order } from "../classes/models/order";
import { Link } from "react-router-dom";
import { useTransition } from "@react-spring/web";
import { animated } from "@react-spring/web";
import { getCustomerById } from "../services/customerServices.js";
import { getOrderById, updateOrder, createOrder, deliver } from '../services/orderServices.js'
import { getOrderLinesByOrderId } from '../services/orderLineServices.js'
import { OrderLineView } from "./orderLineView.js";
/**
 * Order view
 * @category Views
 * @param {props} props
 * @returns The JSX code for the order view
 */
export default function OrderView(props) {

    const { removeModal, type, itemId } = props;

    // Data state
    const [order, setOrder] = useState({});
    const [customer, setCustomer] = useState({});
    const [loading, setLoading] = useState(true);
    const [openInfos, setOpenInfos] = useState(true);
    const [openArticles, setOpenArticles] = useState(false);
    const [orderLines, setOrderLines] = useState([]);
    const [orderLineModal, setOrderLineModal] = useState(false);

    var modified = false;

    const transition = {
        from: { maxHeight: 0 },
        enter: { maxHeight: 350 },
        leave: { maxHeight: 0 }
    }

    document.title = "Edit order"

    const transitionArticles = useTransition(openArticles, transition);
    const transitionEdit = useTransition(openInfos, transition);

    const getData = useCallback(async () => {
        let order = await getOrderById(itemId);
        setOrder(order);
        let orderLines = await getOrderLinesByOrderId(itemId);
        setOrderLines(orderLines);
        if (type === "adding") {
            setLoading(false);
            return;
        }
        let customer = await getCustomerById(order.customerId);
        setCustomer(customer);
        setLoading(false);
    }, [itemId, type]);

    useEffect(() => {
        const fetchData = async () => {
            await getData();
        };

        fetchData();
    }, [getData]);

    // Add order
    async function addOrder() {
        var nOrder = order;
        nOrder.creation_date = new Date().toISOString().slice(0, 10); // Format : YYYY-MM-DD
        nOrder.id = 0;
        const errors = Order.getErrors(order);

        if (errors.length > 0) {
            errors.forEach(error => toast(error, { type: "error" }));
            return;
        }

        createOrder(nOrder).then(
            (response) => {
                if (response.status === 201) {
                    toast("Order added successfully", { type: "success" })
                    removeModal(true);
                } else {
                    toast("An error occured while adding the order", { type: "error" })
                }
            }
        )
    }

    // Modify order
    async function modifyOrder() {
        var nOrder = order;
        nOrder.id = order.id;

        const errors = Order.getErrors(order);

        if (errors.length > 0) {
            errors.forEach(error => toast(error, { type: "error" }));
            return;
        }

        updateOrder(nOrder).then(
            (response) => {
                if (response.status === 204) {
                    modified = true;
                    toast("Order updated successfully", { type: "success" })
                } else {
                    toast("An error occured while updating the order", { type: "error" })
                }
            }
        )
    }

    function deliverOrder() {
        if (deliver(order)) {
            toast("Order delivered successfully", { type: "success" })
            removeModal();
        } else {
            toast("An error occured while delivering the order", { type: "error" })
            removeModal();
        }
    }

    function addOrderLine() {
        setOrderLineModal("add");
    }

    function editOrderLine() {
        setOrderLineModal("edit");
    }

    function deleteOrderLine() {
        setOrderLineModal("delete");
    }

    return (
        <Modal>
            <div
                id="black-back"
                onClick={() => {
                    removeModal(modified);
                }}
            />

            {
                orderLineModal &&
                <Modal>
                <div
                    id="black-back"
                    onClick={() => {
                        setOrderLineModal(false);
                    }}
                />
                <OrderLineView
                    order_id={order.id}
                    type={orderLineModal}
                    orderLines={orderLines}
                ></OrderLineView>
                </Modal>
            }

            <div id="modify-view">
                {
                    loading ? <Loading /> :
                        <>
                            <h1 id="section-title">{type === "adding" ? "Add a order" : "Order n°" + order.id} </h1>

                            {type !== "adding" &&
                                <>
                                    <h2 onClick={() => { setOpenInfos(!openInfos); setOpenArticles(false) }} className="subtitle-itemview">Informations  {openInfos ? "⯆" : "⯈"}</h2>
                                    <div style={{ overflow: 'hidden' }}>
                                        {transitionEdit((style, item) => item && (
                                            <animated.div style={style}>
                                                <p>Customer :   <Link to={{ pathname: "/customers/" + customer.id }}>{customer.name}</Link></p>
                                                <p>Year : {order.year}</p>
                                                {order.order_date !== undefined && <p>Order date : {formatDate(order.order_date.toString())}</p>}
                                                {order.delivery_date !== 0 && <p>Delivery date : {formatDate(order.delivery_date.toString())}</p>}
                                                {order.closing_date !== 0 && <p>Closing date : {formatDate(order.closing_date.toString())}</p>}
                                            </animated.div>
                                        ))}
                                    </div>
                                </>
                            }

                            {type !== "adding" &&
                                <>
                                    <h2 onClick={() => { setOpenArticles(!openArticles); setOpenInfos(false) }} className="subtitle-itemview">Articles  {openArticles ? "⯆" : "⯈"}</h2>
                                    <div style={{ overflow: 'scroll' }}>
                                        {transitionArticles((style, item) => item && (
                                            <animated.div style={style}>
                                                {orderLines.length === 0 ?
                                                    <p className="no-orders">No orders</p> :
                                                    <>

                                                        <table style={{ marginTop: "10px" }}>
                                                            <thead>
                                                                <tr>
                                                                    <th>Article ID</th>
                                                                    <th>Quantity</th>
                                                                    <th>Price</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {orderLines.map((orderLine) => {
                                                                    return (
                                                                        <tr onClick={() => window.location.pathname = "articles/" + orderLine.articleId}>
                                                                            <td key={orderLine.articleId}>{orderLine.articleId}</td>
                                                                            <td key={orderLine.quantity}>{orderLine.quantity}</td>
                                                                            <td key={orderLine.price}>{orderLine.price}</td>
                                                                        </tr>
                                                                    )
                                                                })}
                                                            </tbody>
                                                        </table>
                                                    </>}

                                                <button className="modify-button save-button" onClick={() => {
                                                    addOrderLine();
                                                }}>Add an article</button>
                                                {
                                                    orderLines.length !== 0 &&
                                                    <>
                                                        <button className="modify-button cancel-button" onClick={() => {
                                                            editOrderLine();
                                                        }}>Edit an article</button>

                                                        <button className="modify-button delete-button" onClick={() => {
                                                            deleteOrderLine();
                                                        }}>Delete an article</button>
                                                    </>
                                                }


                                            </animated.div>
                                        ))} </div></>
                            }

                            <div className="modify-buttons-list">

                                <button className="modify-button save-button" onClick={() => {
                                    if (type === "adding") {
                                        if (window.confirm("Are you sure you want to add this order ?")) {
                                            addOrder()
                                        }
                                    } else {
                                        if (window.confirm("Are you sure you want to save changes ?")) {
                                            modifyOrder()
                                        }
                                    }
                                }}>{type === "adding" ? "Add order" : "Save changes"}</button>

                                {type === "adding" &&
                                    <button className="modify-button cancel-button" onClick={() => {
                                        if (window.confirm("Are you sure you want to cancel ?")) {
                                            removeModal(false)
                                        }
                                    }}>Cancel</button>
                                }

                                {
                                    type !== "adding" &&
                                    <>
                                        {(order.delivery_date === 0 || order.delivery_date === undefined) && <button className="modify-button cancel-button" onClick={() => deliverOrder()}>Deliver</button>}
                                        <button className="modify-button delete-button">Delete order</button>
                                    </>
                                }

                            </div>
                        </>
                }
            </div>
        </Modal>
    );
}

function formatDate(string) {
    let years = string.substring(0, 4)
    let months = string.substring(4, 6)
    let days = string.substring(6, 8)
    return `${years}-${months}-${days}`
}