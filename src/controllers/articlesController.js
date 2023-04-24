import React, { useEffect, useState } from "react";
import Items from "../views/ItemsView";
import { getAllArticles } from '../services/articleServices.js'
import Loading from '../views/misc/loadingView.js'

// Columns for the articles table
const columns = [
  { id: 1, name: "description", type: "string", displayName: "Article", display: true },
  { id: 2, name: "sold_price", type: "price", displayName: "Price", display: true },
  { id: 3, name: "production_cost", type: "price", displayName: "Production cost", display: true },
  { id: 4, name: "family", type: "string", displayName: "Family", display: true },
  { id: 5, name: "stock", type: "number", displayName: "Stock", display: true },
  { id: 6, name: "quantity_min", type: "number", displayName: "Min. quantity", display: false },
  { id: 7, name: "quantity_ordered", type: "number", displayName: "Ordered quantity", display: false },
  { id: 8, name: "quantity_provided", type: "number", displayName: "Provided quantity", display: false },
  { id: 9, name: "tax_id", type: "string", displayName: "Tax ID", display: false },
  { id: 10, name: "creation_date", type: "date", displayName: "Creation date", display: false },
  { id: 11, name: "last_update", type: "date", displayName: "Last update", display: false },

];

const tags = [
  { id: 1, name: "Clothes", type: "include" },
  { id: 2, name: "Furniture", type: "exclude" },
  { id: 3, name: "Price < 2000", type: "default" }
];

export default function Articles() {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  function modifyData (articles)  {
    const articlesToShow = articles.map((article) => {
      return {
        id: article.ARID,
        description: article.ARDESC,
        sold_price: article.ARSALEPR,
        production_cost: article.ARWHSPR,
        family : article.ARTIFA,
        stock : article.ARSTOCK,
        quantity_min : article.ARMINQTY,
        quantity_ordered : article.ARCUSQTY,
        quantity_provided : article.ARPURQTY,
        tax_id : article.ARVATCD,
        creation_date : article.ARCREA,
        last_update : article.ARMOD
      }});
      setData(articlesToShow);
      setLoading(false);
    }

  // Get all articles and categories
  useEffect(() => {
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
      tags={tags}
      title={'Articles'}
      singleTitle='article'
      data={data}
      categories={[]}
    />
  );
}
