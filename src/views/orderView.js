import "../style/item-view.scss";
import React, { useCallback, useEffect, useState } from "react";
import Modal from '../components/modal.js';
import Loading from "./misc/loadingView.js";
import { toast } from 'react-toastify';
import { Link } from "react-router-dom";
import { useTransition } from "@react-spring/web";
import { animated } from "@react-spring/web";
import { getCustomerById } from "../services/customerServices.js";
import { getOrderById, deliver, deleteOrder } from '../services/orderServices.js'
import { getOrderLinesByOrderId } from '../services/orderLineServices.js'
import { AddOrderLineView } from "./orders/addOrderLineView.js";
import { EditOrderLineView } from "./orders/editOrderLineView.js";
import { DeleteOrderLineView } from "./orders/deleteOrderLineView.js";
import Section from "../components/section";

export default function OrderView(props) {

    document.title = "Edit order"

    const { removeModal, type, itemId } = props;

    const [order, setOrder] = useState({});
    const [customer, setCustomer] = useState({});
    const [loading, setLoading] = useState(true);
    const [openInfos, setOpenInfos] = useState(true);
    const [openArticles, setOpenArticles] = useState(false);
    const [orderLines, setOrderLines] = useState([]);
    const [addOrderLineModal, setAddOrderLineModal] = useState(false);
    const [editOrderLineModal, setEditOrderLineModal] = useState(false);
    const [deleteOrderLineModal, setDeleteOrderLineModal] = useState(false);

    var modified = false;

    const closeAll = () => {
        setOpenInfos(false);
        setOpenArticles(false);
    }

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
        getData();
    }, [addOrderLineModal, editOrderLineModal, deleteOrderLineModal]);

    useEffect(() => {
        const fetchData = async () => {
            await getData();
        };

        fetchData();
    }, [getData]);

    function deliverOrder() {
        if (deliver(order)) {
            toast("Order delivered successfully", { type: "success" })
            removeModal();
        } else {
            toast("An error occured while delivering the order", { type: "error" })
            removeModal();
        }
    }

    function delOrder() {
        if (window.confirm("Are you sure you want to delete this order ?")) {
            deleteOrder(order.id);
            removeModal(true);
            toast("Order deleted successfully", { type: "success" })
        }
    }

    return (
        <Modal closeModal={() => removeModal(modified)}>

            {addOrderLineModal && <Modal closeModal={() => setAddOrderLineModal(false)}><AddOrderLineView order_id={order.id}></AddOrderLineView></Modal>}
            {editOrderLineModal && <Modal closeModal={() => setEditOrderLineModal(false)}><EditOrderLineView close={() => setEditOrderLineModal(false)} orderLines={orderLines} order_id={order.id}></EditOrderLineView></Modal>}
            {deleteOrderLineModal && <Modal closeModal={() => setDeleteOrderLineModal(false)}><DeleteOrderLineView close={() => { setDeleteOrderLineModal(false) }} orderLines={orderLines} order_id={order.id}></DeleteOrderLineView></Modal>}


            {
                loading ? <Loading /> :
                    <>
                        <h1 id="section-title">{type === "adding" ? "Add a order" : "Order n°" + order.id} </h1>

                        {type !== "adding" &&
                            <Section title="Informations" isOpen={openInfos} setIsOpen={setOpenInfos} closeAll={() => closeAll()}>
                                <p>Customer :   <Link to={{ pathname: "/customers/" + customer.id }}>{customer.name}</Link></p>
                                <p>Year : {order.year}</p>
                                {order.order_date !== undefined && <p>Order date : {formatDate(order.order_date.toString())}</p>}
                                {order.delivery_date !== 0 && <p>Delivery date : {formatDate(order.delivery_date.toString())}</p>}
                                {order.closing_date !== 0 && <p>Closing date : {order.closing_date !== 0 ? formatDate(order.closing_date.toString()) : "No closing date"}</p>}
                            </Section>
                        }

                        {type !== "adding" &&
                            <>
                                <Section title="Articles" isOpen={openArticles} setIsOpen={setOpenArticles} closeAll={() => closeAll()}>
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
                                        setAddOrderLineModal("add");
                                    }}>Add an article</button>
                                    {
                                        orderLines.length !== 0 &&
                                        <>
                                            <button className="modify-button cancel-button" onClick={() => {
                                                setEditOrderLineModal(true);
                                            }}>Edit an article</button>

                                            <button className="modify-button delete-button" onClick={() => {
                                                setDeleteOrderLineModal(true);
                                            }}>Delete an article</button>
                                        </>
                                    }


                                </Section>
                            </>
                        }

                        <div className="modify-buttons-list">
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
                                    {(order.delivery_date === 0 || order.delivery_date === undefined) &&
                                        <button className="modify-button cancel-button" onClick={() => deliverOrder()}>Deliver</button>}
                                    <button className="modify-button delete-button" onClick={() => delOrder()}>Delete order</button>
                                </>
                            }

                        </div>
                    </>
            }
        </Modal >
    );
}

function formatDate(string) {
    let years = string.substring(0, 4)
    let months = string.substring(4, 6)
    let days = string.substring(6, 8)
    return `${years}-${months}-${days}`
}