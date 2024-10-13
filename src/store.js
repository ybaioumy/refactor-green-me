import storage from 'redux-persist/lib/storage';
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import { authApi } from './redux/features/auth';
import { projectApi } from './redux/features/project';
import { lookingForApi } from './redux/features/eligibility';
import { proposalApi } from './redux/features/proposal';
import { inviteApi } from './redux/features/inviteMembers';
import { expertApi } from './redux/features/expert';
import authReducer from './redux/slices/user';
import searchReducer from './redux/slices/filtersSlice';
import invitaionReducer from './redux/slices/invitaion'
import eligibilityReducer from './redux/slices/eligbility'
import project from './redux/slices/project';

const authPersistConfig = {
    key: 'auth',
    storage, // using localStorage
    whitelist: ['token', 'expiry', 'typeId', 'role', 'fullName', 'userId', 'escoId', 'clientId', 'expertId'], // only persist these fields
};
const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);

export const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [projectApi.reducerPath]: projectApi.reducer,
        [lookingForApi.reducerPath]: lookingForApi.reducer,
        [proposalApi.reducerPath]: proposalApi.reducer,
        [inviteApi.reducerPath]: inviteApi.reducer,
        [expertApi.reducerPath]: expertApi.reducer,
        auth: persistedAuthReducer, // use persisted auth reducer
        search: searchReducer,
        eligibility: eligibilityReducer,
        project: project,
        invitation: invitaionReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }).concat(authApi.middleware, projectApi.middleware, lookingForApi.middleware, proposalApi.middleware, inviteApi.middleware, expertApi.middleware),
});

setupListeners(store.dispatch);

export const persistor = persistStore(store);
