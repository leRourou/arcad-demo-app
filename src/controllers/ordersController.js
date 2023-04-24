import React, { useEffect, useState } from "react";
import Items from "../views/ItemsView";
import { getAllOrdersWithCustomers } from '../services/orderServices.js'
import Loading from '../views/misc/loadingView.js'

// Columns for the products table
const columns = [
  { id: 1, name: "date", type: "string", displayName: "Date", display: true },
  { id: 2, name: "client_name", type: "string", displayName: "Client name", display: true },
  { id: 3, name: "products_nb", type: "string", displayName: "Nb. products", display: true },
];

// const tags = [];

export default function Customers() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Get all products and categories
  useEffect(() => {
    getAllOrdersWithCustomers().then((orders) => {
      const ordersToShow = orders.map((order) => {
        return {
          id: order.id,
          date: order.date,
          client_name: order.customer.name,
          products_nb: order.products.length,
        }});
      setLoading(false);
      setData(ordersToShow);
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
      /*tags={tags}*/
      title={'Orders'}
      singleTitle='order'
      data={data}
    />
  );
}
