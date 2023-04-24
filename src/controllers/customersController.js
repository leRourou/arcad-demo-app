import React, { useEffect, useState } from "react";
import Items from "../views/ItemsView";
import { getAllCustomers } from '../services/customerServices.js'
import Loading from '../views/misc/loadingView.js'

// Columns for the products table
const columns = [
  { id: 1, name: "name", type: "string", displayName: "Name", display: true },
  { id: 2, name: "date_of_birth", type: "string", displayName: "Age", display: true }
];

const tags = [
  { id: 1, name: "Clothes", type: "include" },
  { id: 2, name: "Furniture", type: "exclude" },
  { id: 3, name: "Price < 2000", type: "default" }
];

export default function Customers() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Get all products and categories
  useEffect(() => {
    getAllCustomers()
      .then((customersData) => {
        setData(customersData);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Error fetching data: ", error);
        setLoading(false);
      });
  }, []);

  // Display loading screen while fetching data
  if (loading) {
    return <Loading />;
  }

  return (
    <Items
      columns={columns}
      tags={tags}
      title={'Customers'}
      singleTitle='customer'
      data={data}
    />
  );
}
