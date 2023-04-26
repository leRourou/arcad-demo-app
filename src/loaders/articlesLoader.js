import React, { useEffect, useState } from "react";
import Items from "../views/itemsDataView";
import { getAllArticles } from '../services/articleServices.js'
import Loading from '../views/misc/loadingView.js'
import store from "../store.js";
import { columns } from "../models/article";

export default function Articles() {

  const [loading, setLoading] = useState(true);

  // LOAD DATA
  async function loadData() {
    await getAllArticles();
    setLoading(false);
  }

  // Get all articles and categories
  useEffect(() => {
    
    // If data already load, do nothing
    if (store.getState().articles.length > 0) {
      setLoading(false);
      return;
    }

    // Else, load data
    loadData();

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
      categories={[]}
      data={() => {return store.getState().articles}}
    />
  );
}
