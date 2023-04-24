export function getAllCustomers() {
    return fetch('http://localhost:3000/api/customers.json')
        .then(response => response.json())
        .then(data => data);
}

export function putCustomer(customer) {
    return fetch(`http://localhost:3000/api/customers.json`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(customer)
    })
        .then(response => response.json())
        .then(data => data);
}

export function postCustomer(customer) {
    return fetch(`http://localhost:3000/api/customers.json`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(customer)
    })
        .then(response => response.json())
        .then(data => data);
}

export function deleteCustomer(id) {
    return fetch(`http://localhost:3000/api/customers.json`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: id })
    })
        .then(response => response.json())
        .then(data => data);
}
