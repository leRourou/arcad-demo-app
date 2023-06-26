import React, { useEffect, useState } from "react";
import { SelectField, NumberField } from "../../components/formField";
import Loading from "../misc/loadingView";
import { editOrderLine } from "../../services/orderLineServices";
import { toast } from "react-toastify";
import { getArticleById } from "../../services/articleServices";

export function EditOrderLineView(props) {

    const { order_id, orderLines, close } = props;

    const [selectedArticle, setSelectedArticle] = useState(orderLines[0].articleId);
    const [isLoading, setIsLoading] = useState(true);
    const [articles, setArticles] = useState([]);
    const [quantity, setQuantity] = useState(0);
    const [price, setPrice] = useState(0);

    useEffect(() => {
        if (!isLoading) {
            return;
        }
        getAllArticlesName().then((response) => {
            setArticles(response);
            setIsLoading(false);
        })
        getPriceAndQuantityOfOrderLine(orderLines[0].articleId);
    })

    function getAllArticlesName() {
        return Promise.all(orderLines.map(orderLine => getArticleById(orderLine.articleId)));
    }

    function getPriceAndQuantityOfOrderLine(articleId) {
        const orderLine = orderLines.find(orderLine => orderLine.articleId === articleId);
        setQuantity(orderLine.quantity);
        setPrice(orderLine.price);
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

        editOrderLine(order_id, selectedArticle, quantity, price).then((response) => {
            if (response === 204) {
                toast.success("Article edited");
                close();
            }
            else {
                toast.error("Error while editing article");
            }
        })
    }

    return (
        <>
            {
                isLoading ? <Loading /> :
                    <>
                        <h1 id="section-title">Edit an article in order</h1>
                        <SelectField
                            for="articles" label="Article"
                            options={articles.map((article) => {
                                return {
                                    value: article.description,
                                    id: article.id
                                }
                            })
                            }
                            tooltip={<>Article to edit</>}
                            onChange={(e) => {
                                setSelectedArticle(e.target.value)
                                getPriceAndQuantityOfOrderLine(e.target.value)
                            }}
                        />

                        <div className="field-line">
                            <NumberField
                                for="quantity" label="Quantity" value={quantity}
                                tooltip={<>The quantity of article <br></br> Must be a positive integer</>}
                                min="0" step="1" max="9999999"
                                onChange={(e) => { setQuantity(e.target.value) }}
                            />
                            <NumberField
                                for="price" label="Price" value={price}
                                tooltip={<>The price of the article <br></br> Must be a positive 2-decimal digit</>}
                                min="0" step="0.01" max="9999999"
                                onChange={(e) => { setPrice(e.target.value) }}
                            />
                        </div>

                        <div className="modify-buttons-list">
                            <button className="modify-button save-button" onClick={() => {
                                editArticle()
                            }}>Edit article</button>
                        </div>
                    </>
            }
        </>
    )
}