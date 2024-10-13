import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';
import { setCredentials } from '../slices/user';
import { REHYDRATE } from 'redux-persist';
import { jwtDecode } from 'jwt-decode';
import { setInvitaion } from '../slices/invitaion';

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
            return action.payload?.[reducerPath];
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
                    const decodedToken = jwtDecode(data.token);
                    const searchParams = new URLSearchParams(window.location.search);
                    const invitationTokenParamas = searchParams.get('encryptedData');
                    const encryptedData = invitationTokenParamas
                        ? jwtDecode(invitationTokenParamas)
                        : null;

                    dispatch(
                        setCredentials({
                            token: data.token,
                            expiry: data.expiry,
                            typeId: data.typeId,
                            role: data.role,
                            fullName: data.fullName,
                            userId: decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"],
                            escoId: data?.escoid || null,
                            clientId: data?.clientid || null,
                            expertId: data?.expertId || null,
                        })
                    );
                    if (invitationTokenParamas && encryptedData) {
                        dispatch(
                            setInvitaion({
                                invitationToken: encryptedData.InvitationToken,
                                email: encryptedData.Email || null,
                                expiry: encryptedData.exp || null,
                                typeId: encryptedData.TypeId || null,
                                roleId: encryptedData.RoleId || null,
                                escoId: encryptedData.EscoId || null,
                                permissionId: encryptedData.PermissionId || null,
                            }))
                    }

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
        }),
        getAllClientSectors: builder.query({
            query: () => 'ClientSector'
        }),
        getUserProjectPermissions: builder.query({
            query: ({ projectId, userId }) => ({
                url: 'userPermissionProject',
                method: 'GET',
                params: { userId, projectId }

            }),
        }),
        getClientById: builder.query({
            query: (clientId) => ({
                url: `Client/${clientId}`,
                method: 'GET',
            }),
            providesTags: ['Clients'],
        }),
        getESCOById: builder.query({
            query: (id) => ({
                url: `Esco/${id}`,
                method: 'GET',
            }),
            providesTags: ['ESCO'],
        }),
        getExpertById: builder.query({
            query: (id) => ({
                url: `Expert/${id}`,
                method: 'GET',
            }),
            providesTags: ['Experts'],
        }),
        getUserProfile: builder.query({
            query: () => 'Users/GetUserProfile'
        }),
        updateEscoProfile: builder.mutation({
            query: ({ escoData, id }) => ({
                url: `Esco/${id}`,
                method: 'PUT',
                body: escoData,
            }),
            invalidatesTags: ['ESCO'],
        }),
        updateExpertProfile: builder.mutation({
            query: ({ expertData, id }) => ({
                url: `Expert/${id}`,
                method: 'PUT',
                body: expertData,
            }),
            invalidatesTags: ['Experts'],
        })
    }),

});

export const {
    useLoginMutation,
    useRegisterMutation,
    useGetTypesQuery,
    useGetMyUsersQuery,
    useGetRolesQuery,
    useGetAllCountriesQuery,
    useGetAllClientSectorsQuery,
    useGetUserProjectPermissionsQuery,
    useGetClientByIdQuery,
    useGetESCOByIdQuery,
    useLazyGetExpertByIdQuery,
    useGetUserProfileQuery,
    useUpdateEscoProfileMutation,
    useUpdateExpertProfileMutation

} = authApi;

