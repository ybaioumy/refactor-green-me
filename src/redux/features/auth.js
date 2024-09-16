import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

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
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: 'Users/login',
                method: 'POST',
                body: credentials,
            }),
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

