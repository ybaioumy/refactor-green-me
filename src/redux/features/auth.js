import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';
import { setCredentials } from '../slices/user';
import { REHYDRATE } from 'redux-persist';

// Helper function to check for REHYDRATE action
function isHydrateAction(action) {
    return action.type === REHYDRATE;
}

export const authApi = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_API_BASE,
        prepareHeaders: (headers, { getState }) => {
            // Get token from cookies
            const token = Cookies.get('token');

            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }

            return headers;
        },
    }),
    extractRehydrationInfo(action, { reducerPath }) {
        if (isHydrateAction(action)) {
            return action.payload?.[reducerPath]; // Rehydrate RTK Query state if present in payload
        }
    },
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: 'Users/login',
                method: 'POST',
                body: credentials,
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    // Dispatch setUser action with user info
                    dispatch(
                        setCredentials({
                            token: data.token,
                            expiry: data.expiry,
                            typeId: data.typeId,
                            role: data.role,
                            fullName: data.fullName,
                        })
                    );
                } catch (err) {
                    console.error('Login failed:', err);
                }
            }
        }),
        register: builder.mutation({
            query: (userData) => ({
                url: 'Users/register',
                method: 'POST',
                body: userData,
            }),
        }),
        getTypes: builder.query({
            query: () => 'Type',
        }),
        getMyUsers: builder.query({
            query: () => 'Users/MyUsers',
        }),
        getRoles: builder.query({
            query: () => 'Role',
        }),
        getAllCountries: builder.query({
            query: () => 'Country'
        })
    }),
  
});

export const { useLoginMutation, useRegisterMutation, useGetTypesQuery, useGetMyUsersQuery, useGetRolesQuery, useGetAllCountriesQuery } = authApi;

