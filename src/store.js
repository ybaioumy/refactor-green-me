import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'

import { authApi } from './redux/features/auth'
import userReducer from './redux/slices/user'
import { projectApi } from './redux/features/project'
export const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [projectApi.reducerPath]:projectApi.reducer,
        auth: userReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authApi.middleware,projectApi.middleware),
})

setupListeners(store.dispatch)