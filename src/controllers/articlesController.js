import React, { useEffect, useState } from "react";
import Items from "../views/itemsView";
import { getAllArticles } from '../services/articleServices.js'
import Loading from '../views/misc/loadingView.js'
import store from "../store.js";

// Columns for the articles table
const columns = [
  { id: 1, name: "description", type: "string", displayName: "Article", display: true },
  { id: 2, name: "sold_price", type: "price", displayName: "Price", display: true },
  { id: 3, name: "production_cost", type: "price", displayName: "Production cost", display: false },
  { id: 4, name: "family", type: "string", displayName: "Family", display: false },
  { id: 5, name: "stock", type: "number", displayName: "Stock", display: true },
  { id: 6, name: "quantity_min", type: "number", displayName: "Min. quantity", display: false },
  { id: 7, name: "quantity_ordered", type: "number", displayName: "Ordered quantity", display: false },
  { id: 8, name: "quantity_provided", type: "number", displayName: "Provided quantity", display: false },
  { id: 9, name: "tax_id", type: "string", displayName: "Tax ID", display: false },
  { id: 10, name: "creation_date", type: "date", displayName: "Creation date", display: false },
  { id: 11, name: "last_update", type: "date", displayName: "Last update", display: false },
];

export default function Articles() {

  const [loading, setLoading] = useState(true);

  function modifyData(articles) {
    store.dispatch({ type: 'LOAD_DATA', payload: { data: articles } });
    setLoading(false);
  }

  // Get all articles and categories
  useEffect(() => {

    // If data already loaded, do nothing
    if (store.getState().articles.length > 0) {
      setLoading(false);
      return;
    }

    getAllArticles().then((articles) => {
      modifyData(articles);
    }).catch(
      (error) => {
        console.log("Error: ", error);
        setLoading(false);
      }
    )

  }, []);

  // Display loading screen while fetching data
  if (loading) {
    return <Loading />;
  }

  return (
    <Items
      columns={columns}
      title={'Articles'}
      singleTitle='article'
      data={store.getState().articles}
      categories={[]}
    />
  );
}
