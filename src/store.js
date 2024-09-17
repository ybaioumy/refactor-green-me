import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; 
import { REHYDRATE } from 'redux-persist';

import { authApi } from './redux/features/auth';
import authReducer from './redux/slices/user'; // Updated name
import { projectApi } from './redux/features/project';
import { lookingForApi } from './redux/features/eligibility';
import searchReducer from './redux/slices/filtersSlice';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth'] // Persist only the 'auth' slice
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [projectApi.reducerPath]: projectApi.reducer,
        [lookingForApi.reducerPath]: lookingForApi.reducer,
        auth: persistedAuthReducer,
        search: searchReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [REHYDRATE],
            },
        }).concat(authApi.middleware, projectApi.middleware, lookingForApi.middleware),
});

setupListeners(store.dispatch);

export const persistor = persistStore(store);
