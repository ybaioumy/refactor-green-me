
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { authHeader } from '../../utilits/authHeader';
export const inviteApi = createApi({
    reducerPath: 'inviteApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_API_BASE, prepareHeaders: (headers) => {
            headers.set('Content-Type', 'application/json');
            headers.set('Accept', 'application/json');

            headers.set('Authorization', authHeader());

            return headers;
        },
    }),
    endpoints: (builder) => ({
        inviteUser: builder.mutation({
            query: ({ emails, projectId, typeId, statusId, permissionId ,roleId}) => ({
                url: '/Users/invite',
                method: 'POST',
                body: { emails, projectId, typeId, statusId, permissionId ,roleId},
            }),
        }),
        getInvitations: builder.query({
            query: () => 'InvitationStatus',
        }),
        getUserPermissions: builder.query({
            query: () => `Permission`,
        })
    }),
});

export const { useInviteUserMutation, useGetInvitationsQuery, useGetUserPermissionsQuery } = inviteApi;
