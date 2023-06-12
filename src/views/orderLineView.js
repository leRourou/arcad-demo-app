import React, { useState } from "react";
import SearchBar from "../components/searchBar";
import { getAllArticles } from "../services/articleServices";
import Modal from "../components/modal";
import { NumberField, SelectField } from "../components/formField";
import { addOrderLine, editOrderLine } from "../services/orderLineServices";
import { toast } from "react-toastify";

export function OrderLineView(props) {

    const { type, order_id, orderLines } = props;
    const [articles, setArticles] = useState([]);
    const [orderLineAddView, setOrderLineAddView] = useState(false);
    const [articleToEdit, setArticleToEdit] = useState(false);
    const [quantity, setQuantity] = useState(0);
    const [price, setPrice] = useState(0);

    var titre = "";

    switch (type) {
        case "add":
            titre = "Add an article";
            break;
        case "edit":
            titre = "Edit an article";
            break;
        case "delete":
            titre = "Delete an article";
            break;
        default:
            titre = "Add an article";
            break;
    }

    function getArticles(searchTerm) {
        getAllArticles(5, searchTerm, 1).then((response) => {
            setArticles(response);
        })
    }

    function removeModal() {
        setOrderLineAddView(false);
    }

    function editArticle() {
        if (quantity <= 0) {
            toast.error("Quantity must be a positive integer");
            return;
        }
        if (price <= 0) {
            toast.error("Price must be a positive 2-decimal digit");
            return;
        }

        editOrderLine(order_id, articleToEdit, quantity, price).then((response) => {
            if (response === 204) {
                toast.success("Article edited");
                window.location.reload();
            }
            else {
                toast.error("Error while editing article");
            }
        }

        )
    }


    return (
        <div id="modify-view">
            {
                orderLineAddView &&
                <Modal>
                    <div
                        id="black-back"
                        onClick={() => {
                            setOrderLineAddView(false);
                        }}
                    />
                    <OrderLineAddView
                        article={orderLineAddView}
                        order_id={order_id}
                        removeModal={removeModal}
                    >
                    </OrderLineAddView>
                </Modal>
            }

            <h1 id="section-title">{titre}</h1>

            {
                type === "add" &&
                <SearchBar
                    placeholder="Search an article"
                    onSearch={(value) => {
                        getArticles(value)
                    }
                    }
                ></SearchBar>
            }

            {
                type === "edit" &&
                <>
                    <SelectField
                        for="articles"
                        label="Article"
                        value={orderLines[0]}
                        options={orderLines.map((article) => {
                            return {
                                value: article.articleId,
                                id: article.id
                            }
                        })
                        }
                        tooltip={<>Article to edit</>}
                        onChange={(e) => {
                            setArticleToEdit(e.target.value)
                        }}
                    />
                    <div className="field-line">
                        <NumberField
                            for="quantity"
                            label="Quantity"
                            value={quantity}
                            tooltip={<>The quantity of article <br></br> Must be a positive integer</>}
                            min="0"
                            step="1"
                            max="9999999"
                            onChange={(e) => {
                                setQuantity(e.target.value);
                            }}
                        />
                        <NumberField
                            for="price"
                            label="Price"
                            value={0}
                            tooltip={<>The price of the article <br></br> Must be a positive 2-decimal digit</>}
                            min="0"
                            step="0.01"
                            max="9999999"
                            onChange={(e) => {
                                setPrice(e.target.value);
                            }}
                        />
                    </div>

                    <div className="modify-buttons-list">
                        <button className="modify-button save-button" onClick={() => {
                            editArticle()
                        }}>Edit article</button>
                    </div>
                </>
            }

            {articles.length !== 0 &&
                <table style={{ marginTop: "10px" }}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {articles.map((article) => {
                            return (
                                <tr onClick={() => setOrderLineAddView(article)}>
                                    <td key={article.id}>{article.id}</td>
                                    <td key={article.description}>{article.description}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            }
        </div>
    )
}

function OrderLineAddView(props) {
    const { article, order_id, removeModal } = props;

    const [quantity, setQuantity] = useState(0);
    const [price, setPrice] = useState(0);

    function addArticleToOrder() {
        if (quantity <= 0) {
            toast.error("Quantity must be a positive integer");
            return;
        }
        if (price <= 0) {
            toast.error("Price must be a positive number");
            return;
        }
        addOrderLine(order_id, article.id, quantity, price).then((response) => {
            if (response === 201) {
                toast.success("Article added to the order");
                removeModal();
            }
            else {
                toast.error("Error while adding article to the order");
            }
        })
    }

    return (
        <div id="modify-view">
            <h1 id="section-title">{article.id + " - " + article.description}</h1>
            <div className="field-line">

                <NumberField
                    for="quantity"
                    label="Quantity"
                    value={0}
                    tooltip={<>The quantity of article <br></br> Must be a positive integer</>}
                    min="0"
                    step="1"
                    max="9999999"
                    onChange={(e) => {
                        setQuantity(e.target.value);
                    }}
                />

                <NumberField
                    for="price"
                    label="Price"
                    value={0}
                    tooltip={<>The price of the article <br></br> Must be a positive 2-decimal digit</>}
                    min="0"
                    step="0.01"
                    max="9999999"
                    onChange={(e) => {
                        setPrice(e.target.value);
                    }}
                />
            </div>
            <div className="modify-buttons-list">
                <button className="modify-button save-button" onClick={() => {
                    addArticleToOrder()
                }}>Add article to the order</button>
            </div>
        </div>
    )
}

function OrderLineEditView(props) {
    return (
        <div id="modify-view">
            <h1 id="section-title">Edit an article</h1>
        </div>
    )
}