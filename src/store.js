import { configureStore } from '@reduxjs/toolkit'
import { Article } from './classes/models/article.js'
import { Customer } from './classes/models/customer.js'

/**
 * @module store
 * @description - Contains the Redux store of the application.
 * 
 */

export default configureStore({
    reducer: {
        articles: Article.reducer,
        customers: Customer.reducer
    },
    middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})
