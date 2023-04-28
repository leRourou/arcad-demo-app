import { configureStore } from '@reduxjs/toolkit'
import { createArticleModel } from './models/article.js' 

const initialState = []

function articlesReducer(state = initialState, action) {
    switch (action.type) {
        case 'LOAD_DATA':
            return action.payload.data

        case 'ADD_ARTICLE':
            return [...state, action.payload.article]

        case 'UPDATE_ARTICLE':
            return state.map((item) => {
                if (item.id === action.payload.article.ARID) {
                    return createArticleModel(action.payload.article)
                }
                return item
            })

        case 'DELETE_DATA':
            return state.filter((item) => item.id !== action.payload.id)

        default:
            return state
    }
}

export default configureStore({
    reducer: {
        articles: articlesReducer
    }
})
