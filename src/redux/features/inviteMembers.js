
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { authHeader } from '../../utilits/authHeader'; 
export const inviteApi = createApi({
    reducerPath: 'inviteApi',
    baseQuery: async (args, api, extraOptions) => {
        const result = await fetchBaseQuery({
            baseUrl: process.env.REACT_APP_API_BASE,
            prepareHeaders: (headers) => {
                headers.set('Authorization', authHeader());
                return headers;
            },
        })(args, api, extraOptions);

        // Handle error response
        if (result.error) {
            // Extract error message from the response
            const errorMessage = result.error.data?.message || 'An unknown error occurred.';
            return { error: { status: result.error.status, message: errorMessage } };
        }

        return result;
    },
    endpoints: (builder) => ({
        inviteUser: builder.mutation({
            query: ({ emails, projectId, typeId, statusId, permissionId, ProjectRoleId, escoId }) => ({
                url: 'Invitation/invite',
                method: 'POST',
                body: { emails, projectId, typeId, statusId, permissionId, ProjectRoleId, escoId },
            }),
        }),
        getInvitationStatus: builder.query({
            query: () => 'InvitationStatus',
        }),
        getUserPermissions: builder.query({
            query: () => `Permission`,
        }),
        reponseToProjectInvitation: builder.mutation({
            query: ({ permissionId, ProjectRoleId, typeId, isAccept, invitationToken, invitationStatusId }) => ({
                url: `Invitation/RespondToInvitation`,
                method: 'POST',
                body: { permissionId, ProjectRoleId, isAccept, typeId, invitationToken, invitationStatusId },
            }),
        })
    }),
});

export const { useInviteUserMutation, useGetInvitationStatusQuery, useGetUserPermissionsQuery, useReponseToProjectInvitationMutation } = inviteApi;
