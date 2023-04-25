import axios from 'axios';
import store from '../store';

const api_endpoint = 'http://10.5.6.28:10010/web/services/articles/';

// Article Model
export function buildArticle(article) {
    return {
        id: article.ARID,
        description: article.ARDESC,
        sold_price: article.ARSALEPR,
        production_cost: article.ARWHSPR,
        family: article.ARTIFA,
        stock: article.ARSTOCK,
        quantity_min: article.ARMINQTY,
        quantity_ordered: article.ARCUSQTY,
        quantity_provided: article.ARPURQTY,
        tax_id: article.ARVATCD,
        creation_date: article.ARCREA,
        last_update: article.ARMOD
    }
}

// Reverse Article Model
export function reverseBuildArticle(article) {
    return {
        ARID: article.id,
        ARVATCD: article.tax_id,
        ARDESC: article.description,
        ARSALEPR: article.sold_price,
        ARWHSPR: article.production_cost,
        ARTIFA: article.family,
        ARSTOCK: article.stock,
        ARMINQTY: article.quantity_min,
        ARCUSQTY: article.quantity_ordered,
        ARPURQTY: article.quantity_provided,
        ARCREA: article.creation_date,
        ARMOD: article.last_update,
    }
}

// Get All Articles
export function getAllArticles() {
    return axios.get(api_endpoint + "?nb=10000")
        .then(response => response.data.articles.map(article => buildArticle(article)));
}

// Get Article By Id
export function getArticleById(id) {
    return axios.get(api_endpoint + id)
        .then(response => response.data);
}

// Create Article
export function updateArticle(article) {
    const newArticle = reverseBuildArticle(article);
    axios.put(api_endpoint + article.id, newArticle, {
        headers: {
            'Accept': '*/*',
            'Content-Type': 'application/json'
        }
    })
        .then(store.dispatch({ type: 'UPDATE_ARTICLE', payload: { article: newArticle } }))

}

// Delete Article
export function deleteArticle(id) {
    return axios.delete(api_endpoint + id)
        .then(response => response.data);
}