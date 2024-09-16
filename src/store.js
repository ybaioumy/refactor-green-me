import { configureStore } from '@reduxjs/toolkit'
import { authApi } from './redux/features/auth'
import userReducer from './redux/slices/user'
export const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        auth: userReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authApi.middleware),
})
