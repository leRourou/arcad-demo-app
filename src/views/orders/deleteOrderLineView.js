import React, { useState, useEffect } from "react";
import { SelectField } from "../../components/formField";
import { getArticleById } from "../../services/articleServices";
import { toast } from "react-toastify";
import { deleteOrderLine } from "../../services/orderLineServices";

export function DeleteOrderLineView(props) {

    const { order_id, orderLines, close } = props;

    const [selectedArticle, setSelectedArticle] = useState(orderLines[0].articleId);
    const [isLoading, setIsLoading] = useState(true);
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        if (!isLoading) {
            return;
        }
        getAllArticlesName().then((response) => {
            setArticles(response);
            setIsLoading(false);
        })
    })

    function getAllArticlesName() {
        return Promise.all(orderLines.map(orderLine => getArticleById(orderLine.articleId)));
    }

    function deleteArticle() {
        deleteOrderLine(order_id, selectedArticle).then((response) => {
            if (response === 204) {
                toast.success("Article deleted");
                close();
            }
            else {
                toast.error("Error while deleting article");
            }
        })
    }

    return (
        <>
            <h1 id="section-title">Delete an article in order</h1>
            <SelectField
                for="articles" label="Article"
                options={articles.map((article) => { return { value: article.description, id: article.id} }) }
                tooltip={<>Article to delete</>}
                onChange={(e) => {setSelectedArticle(e.target.value)}}
            />
            <div className="modify-buttons-list">
                <button onClick={() => deleteArticle()} className="modify-button delete-button">Delete article from the order</button>
            </div>
        </>
    )
}