import { configureStore } from '@reduxjs/toolkit'
import { Article } from './models/article.js'
import { createCustomerModel } from './models/customer.js'


const initialCustomersState = [] 

function customersReducer(state = initialCustomersState, action) {
    switch (action.type) {
        case 'LOAD_CUSTOMERS':
            return action.payload.data

        case 'ADD_CUSTOMER':
            return [...state, action.payload.customer]

        case 'UPDATE_CUSTOMER':
            return state.map((item) => {
                if (item.id === action.payload.customer.CID) {
                    return createCustomerModel(action.payload.customer)
                }
                return item
            })

        case 'DELETE_CUSTOMER':
            return state.filter((item) => item.id !== action.payload.id)

        default:
            return state
    }
}

export default configureStore({
    reducer: {
        articles: Article.reducer,
        customers: customersReducer
    },
    middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})
