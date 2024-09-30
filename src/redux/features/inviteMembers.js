
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { authHeader } from '../../utilits/authHeader';
export const inviteApi = createApi({
    reducerPath: 'inviteApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_API_BASE, prepareHeaders: (headers) => {
            headers.set('Authorization', authHeader());

            return headers;
        },
    }),
    // new body : esco id , clientId
    endpoints: (builder) => ({
        inviteUser: builder.mutation({
            query: ({ emails, projectId, typeId, statusId, permissionId, roleId, escoId }) => ({
                url: 'Invitation/invite',
                method: 'POST',
                body: { emails, projectId, typeId, statusId, permissionId, roleId, escoId },
            }),
        }),
        getInvitationStatus: builder.query({
            query: () => 'InvitationStatus',
        }),
        getUserPermissions: builder.query({
            query: () => `Permission`,
        }),
        reponseToProjectInvitation: builder.mutation({
            query: ({ permissionId, roleId, typeId, isAccept, invitationToken, invitationStatusId }) => ({
                url: `Invitation/RespondToInvitation`,
                method: 'POST',
                body: { permissionId, roleId, isAccept, typeId, invitationToken, invitationStatusId },
            }),
        })
    }),
});

export const { useInviteUserMutation, useGetInvitationStatusQuery, useGetUserPermissionsQuery, useReponseToProjectInvitationMutation } = inviteApi;
