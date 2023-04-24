
// Get All Categories
export function getAllCategories() {
    return fetch('http://localhost:3000/api/categories.json')
        .then(response => response.json())
        .then(data => data);
}

// Get Category By Id
export function getCategoryById(id) {
    return fetch(`http://localhost:3000/api/categories.json`)
        .then(response => response.json())
        .then(data => (data.find((category) => category.id === id)));
}

// Put Category
export function putCategory(category) {
    return fetch(`http://localhost:3000/api/categories.json`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(category)
    })
        .then(response => response.json())
        .then(data => data);
}

// Post Category
export function postCategory(category) {
    return fetch(`http://localhost:3000/api/categories.json`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(category)
    })
        .then(response => response.json())
        .then(data => data);
}

// Delete Category
export function deleteCategory(id) {
    return fetch(`http://localhost:3000/api/categories.json`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: id })
    })
        .then(response => response.json())
        .then(data => data);
}