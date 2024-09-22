import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { authApi } from './redux/features/auth';
import authReducer from './redux/slices/user';
import { projectApi } from './redux/features/project';
import { lookingForApi } from './redux/features/eligibility';
import searchReducer from './redux/slices/filtersSlice';
import eligibilityReducer from './redux/slices/eligbility'
import project from './redux/slices/project';
const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth']
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [projectApi.reducerPath]: projectApi.reducer,
        [lookingForApi.reducerPath]: lookingForApi.reducer,
        auth: persistedAuthReducer,
        search: searchReducer,
        eligibility: eligibilityReducer,
        project: project,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER], // Add these actions to ignore list
            },
        }).concat(authApi.middleware, projectApi.middleware, lookingForApi.middleware),
});

setupListeners(store.dispatch);

export const persistor = persistStore(store);
