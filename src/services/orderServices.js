import { getAllCustomers } from '../services/customerServices.js'

export function getAllOrdersWithCustomers() {
    return fetch('http://localhost:3000/api/orders.json')
      .then(response => response.json())
      .then(orders => {
        
        // Fetch all customers
        return getAllCustomers()
          .then(customers => {
            // Dictionary of customers
            const customerDict = {};
            customers.forEach(customer => {
              customerDict[customer.id] = customer;
            });
  
            // Map orders to include customer
            const ordersWithCustomers = orders.map(order => {
              return {
                ...order,
                customer: customerDict[order.customer_id]
              };
            });
  
            return ordersWithCustomers;
          });
      });
  }
  