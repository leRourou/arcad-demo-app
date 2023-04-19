// Get All Products
export function getAllProducts() {
    return fetch('http://localhost:3000/api/products.json')
        .then(response => response.json())
        .then(data => data);
}

// Get Product By Id
export function getProductById(id) {
    return fetch(`http://localhost:3000/api/products.json`)
        .then(response => response.json())
        .then(data => (data.find((product) => product.id === id)));
}

// Put Product
export function putProduct(product) {
    return fetch(`http://localhost:3000/api/products.json`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
    })
        .then(response => response.json())
        .then(data => data);
}

// Post Product
export function postProduct(product) {
    return fetch(`http://localhost:3000/api/products.json`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
    })
        .then(response => response.json())
        .then(data => data);
}

// Delete Product
export function deleteProduct(id) {
    return fetch(`http://localhost:3000/api/products.json`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: id })
    })
        .then(response => response.json())
        .then(data => data);
}