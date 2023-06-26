import React, { useState } from "react";
import Modal from "../../components/modal";
import SearchBar from "../../components/searchBar";
import { getAllArticles } from "../../services/articleServices";
import { NumberField } from "../../components/formField";
import { addOrderLine } from "../../services/orderLineServices";
import { toast } from "react-toastify";

export function AddOrderLineView(props) {

        const { order_id } = props;

        const [articles, setArticles] = useState([]);
        const [orderLineAddView, setOrderLineAddView] = useState(false);

        function getArticles(searchTerm) {
                getAllArticles(5, searchTerm, 1).then((response) => {
                        setArticles(response);
                })
        }

        return (
                <>
                        {
                                orderLineAddView &&
                                <Modal closeModal={() => setOrderLineAddView(false)}>
                                        <AddOrderLineFormView article={orderLineAddView} order_id={order_id} removeModal={() => setOrderLineAddView(false)}></AddOrderLineFormView>
                                </Modal>
                        }

                        <h1 id="section-title">Add an article to the order</h1>
                        <SearchBar
                                placeholder="Search an article"
                                onSearch={(value) => {
                                        getArticles(value)
                                }
                                }
                        ></SearchBar>
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
                </>
        )
}

function AddOrderLineFormView(props) {
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
                <>
                        <h1 id="section-title">Add <span style={{ fontStyle: "italic" }}>{article.description}</span> to the order</h1>
                        <div className="field-line">

                                <NumberField
                                        for="quantity" label="Quantity" value={0}
                                        tooltip={<>The quantity of article <br></br> Must be a positive integer</>}
                                        min="0" step="1" max="9999999"
                                        onChange={(e) => { setQuantity(e.target.value) }}
                                />

                                <NumberField
                                        for="price" label="Price" value={0}
                                        tooltip={<>The price of the article <br></br> Must be a positive 2-decimal digit</>}
                                        min="0" step="0.01" max="9999999"
                                        onChange={(e) => { setPrice(e.target.value) }}
                                />
                        </div>
                        <div className="modify-buttons-list">
                                <button className="modify-button save-button" onClick={() => {
                                        addArticleToOrder()
                                }}>Add article to the order</button>
                        </div>
                </>)
}